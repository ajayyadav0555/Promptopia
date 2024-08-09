"use client"; // Ensure this is a client component
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Form } from '@components/Form'; // Make sure this path is correct
import { useRouter } from 'next/navigation';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router=useRouter()
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id 
        })
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to create prompt:', await response.text()); 
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default CreatePrompt;
