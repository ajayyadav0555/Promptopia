"use client"; 
import React, { useEffect, useState } from 'react';
import { Form } from '@components/Form'; 
import { useRouter ,useSearchParams} from 'next/navigation';

const EditPrompt = () => {
  const router=useRouter()
  const [submitting, setSubmitting] = useState(false);
  const searchParams=useSearchParams()
  const promptId=searchParams.get('id');


  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  });

  useEffect(()=>{
    const getPromptDetails=async()=>{
      const response=await fetch(`/api/prompt/${promptId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch prompt details');
      }
      const data=await response.json()
      setPost({
        prompt:data.prompt,
        tag:data.tag
      })
    }
    if(promptId) getPromptDetails();
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptId) alert("Misiing prompt id")
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default EditPrompt;
