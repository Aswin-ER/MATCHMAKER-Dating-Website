/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

type pages = {
    totalPosts: number;
    cardsPerPage: number;
    setCurrentPage: any;
};


const Pagination: React.FC<pages> = ({ totalPosts, cardsPerPage, setCurrentPage}) => {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / cardsPerPage); i++){
        pages.push(i);
    }

    return (
    <>
       {
        pages.map((page,index)=> {
            return (
                <button key={index} className='bg-pink-800 text-white mx-2 w-8 h-8 text-center hover:bg-pink-500' onClick={()=> setCurrentPage(page)}>{page}</button>
            )
        })
       }
    </>
    );
}

export default Pagination;