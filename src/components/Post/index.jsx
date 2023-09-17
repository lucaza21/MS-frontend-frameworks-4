
import React, { useState } from 'react'
import { FaHeart, FaRegCommentAlt } from "react-icons/fa";



export default function Post({post, changeLike}) {

    const [count, setCount] = useState(post.likes)

    const addLike = () =>{
        setCount(count + 1)
    }
  return (
    <>
        {/* <p className='text-red-500 bg'>{post.text}</p> */}
        <div className='flex flex-col items-center justify-center m-3 hover:scale-110' >
            <div className=''>
                <img src={'/post.png'} alt={'/post.png'} className='w-full rounded-t-lg'></img>
            </div>
            <div className='flex flex-col justify-end w-full p-2 border-b-2 border-indigo-300 border-solid rounded-b-lg h-2/3 border-x-2'>
                <div className='flex flex-row items-center justify-between mt-2'>
                    <p className='text-sm font-medium text-slate-500'>{post.createdAt}</p>
                    <button className='flex flex-row items-center justify-between w-auto h-8 text-white bg-red-500 rounded-md'
                    onClick={(id) => changeLike(post.id)}>
                        <FaHeart className='mx-1'/> 
                        <div className='mx-1'>{post.likes}</div>
                    </button>
                </div>
                <h3 className='self-start my-2 text-xl font-medium text-neutral-800'>@{post.autor}</h3>
                <div className='my-2 overflow-hidden grow'>
                    <p className='my-2 text-neutral-600'>{post.text}</p>
                </div>
                <div className='flex flex-row items-center w-full'>
                    <div className='flex flex-row items-center w-auto h-8 text-xs font-medium rounded-md text-slate-500'>
                        <FaRegCommentAlt className='mx-1'/> 
                        <button className='mx-1'>{post.comments}</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
