/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{FC, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../api/axiosInstance';
import { UserCred, userDet } from '../../Redux/slice';
import RootState from '../../Redux/rootState';


const ProtectedPage:FC = ()=> {

  const dispatch = useDispatch();
  
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const validateToken = () => {
    console.log("validateToken");
    
    axiosInstance.get('/').then((response) => {
      console.log(response);
      
      if(response.data.success){
        console.log(response.data.data.name);
        dispatch(userDet(response.data.data));
        
        
      }else{
        console.log('No user found');
        
      }
    })
  }

  const user: UserCred | null = useSelector((state:RootState) => state.userCred.userCred);
  console.log(user,"user vannuu");
  
  const userName: string | null = user?.name ?? null;

  console.log(userName);
  
  

  useEffect(()=> {
    if(localStorage.getItem('jwtToken')){
      console.log(localStorage.getItem('jwtToken'));
      validateToken();
    }
  }, []);

  const handleClick = ()=> {
      localStorage.removeItem('jwtToken');
      window.location.href = '/'
  }

  return (
    <div>
       <nav className="border-gray-200 bg-pink-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl md:text-3xl font-semibold md:font-bold whitespace-nowrap dark:text-white">MATCH<span className=' text-pink-700'>MAKER</span></span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-white bg-pink-700 rounded md:bg-transparent md:text-pink-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Likes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Matches
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Settings
                </a>
              </li>
              <li>
                {userName? 
                   
               <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={handleClick}
                >
                  Logout
                </a>
                :
                <Link to={'/login'}> <a
                  href="#"
                  className="block py-2 pl-3 pr-4 md:text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </a>
                </Link>

                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default ProtectedPage