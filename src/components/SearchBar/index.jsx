import React from 'react'

export default function SearchBar({author, filterAuthor}) {
  return (
    <>
  
    <div className='container w-4/5 mx-auto my-3 text-center'>
        <input type='text' placeholder='Search' className='p-3 text-2xl font-medium border border-gray-300 rounded-none h-18 xs:w-1/2 md:w-2/3 lg:w-3/4 text-black-700'
        onChange={(e) => filterAuthor(e.target.value)}
        value={author}></input>
    </div>
    </>
  )
}
