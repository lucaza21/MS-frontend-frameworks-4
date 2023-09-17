import React, {useState} from 'react'
import { Pagination } from 'flowbite-react';

export default function Pages({currentPage, setCurrentPage}) {
    //const [currentPage, setCurrentPage] = useState(1);
    //console.log(currentPage)
    const onPageChange = (page) => {
        setCurrentPage(page)
        //pagesHandle(page*22)
    };
  
    return (
      <Pagination className='container w-4/5 mx-auto my-3 text-center'
        currentPage={currentPage}
        onPageChange={(page)=>{onPageChange(page)}}
        totalPages={5}
      />
    )
}
