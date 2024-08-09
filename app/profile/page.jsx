"use client"
import React from 'react'
import Profile from '@components/Profile'
import { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const profile = () => {
    const router=useRouter();
    const[posts,setPosts]=useState([])
    const{data:session}=useSession();

    useEffect(()=>{
        const fetchPosts=async()=>{
            const response=await fetch(`/api/users/${session?.user.id}/posts`)
            const data=await response.json()
            setPosts(data)
        }
        if(session?.user.id) fetchPosts();
    },[])
    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete=async(post)=>{
        const hasConfirmed=confirm("Are you sure you want to delete the prompt")
        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })

                const filteredPosts=posts.filter((p)=>(
                    p._id!==post._id
                ))
                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }
  return (
    <div>
        <Profile
        name="My"
        desc="Welcome to your personized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    </div>
  )
}

export default profile