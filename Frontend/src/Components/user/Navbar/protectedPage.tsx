/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { FC, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../../../api/axiosInstance';
import { UserCred, userDet } from '../../../Redux/slice';
import RootState from '../../../Redux/rootState';
import head from '../../../assests/5856.jpg';
import { AiFillStar } from 'react-icons/ai'


const ProtectedPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [image, setImages] = useState<string>('');
  const [premium, setPremium] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const validateToken = () => {
    // console.log("validateToken");

    axiosInstance.get('/').then((response) => {
      console.log(response,"res");

      if (response.data.success) {
        console.log("Protected page data",response.data.data.name);
        dispatch(userDet(response.data.data));

      } else {
        console.log('No user found');

      }
      
    })
  }

  const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);
  const userName: string | null = user?.name ?? null;

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      // console.log(localStorage.getItem('jwtToken'));
      validateToken();
    }else{
      navigate('/login')
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/'
  }

  useEffect(() => {
    axiosInstance.get('/userProfile').then((res) => {
      console.log(res.data, "user image here");
      if (res.data) {
        setImages((prevState) => res?.data?.image?.[0])
      }
    })
  }, [])


  useEffect(() => {

    axiosInstance.get('/premiumUser').then((res) => {
      // console.log(res.data);
      setPremium(res.data);

    })
  }, []);


  return (
    <div>
      <nav className="border-gray-900 bg-pink-100 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <a href="#" className="flex items-center">
            <span className="self-center text-2xl lg:mb-1 lg:text-3xl text-black font-semibold lg:font-bold whitespace-nowrap ">MATCH<span className=' text-pink-700'>MAKER</span></span>
          </a>

          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-solid-bg"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}>
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

          <div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent">
              <li className='mt-1'>
                <NavLink to={'/'} style={({ isActive }) => {
                  return {
                    color: isActive ? "darkred" : "black",
                  };
                }} >
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 lg:text-lg bg-pink-700 rounded bg-transparent lg:p-0"
                    aria-current="page">
                    Home
                  </a>
                </NavLink>
              </li>
              <li className='mt-1'>
                <NavLink to={'/userProfile'}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "darkred" : "black",
                    };
                  }}>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 lg:text-lg rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-pink-700 lg:p-0 "
                  >
                    Profiles
                  </a>
                </NavLink>
              </li>
              <li className='mt-1'>
                <NavLink to={'/Liked'}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "darkred" : "black",
                    };
                  }}>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 lg:text-lg  rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-pink-700 lg:p-0"
                  >
                    Likes
                  </a>
                </NavLink>
              </li>
              <li className='mt-1'>
                <NavLink to={'/matches'}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "darkred" : "black",
                    };
                  }}>
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 lg:text-lg  rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-pink-700 lg:p-0"
                  >
                    Matches
                  </a>
                </NavLink>
              </li>

              {/* <li className='mt-1'>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 lg:text-lg text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pink-700 lg:p-0"
                >
                  Settings
                </a>
              </li> */}

              <li className='mt-1'>

                {userName ?
                  <a
                    href="#"
                    className="block py-2 pl-3 pr-4 lg:text-lg text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-pink-700 lg:p-0"
                    onClick={handleClick}
                  >
                    Logout
                  </a>
                  :
                  <NavLink to={'/login'}> <a
                    href="#"
                    className="block py-2 pl-3 pr-4 lg:text-lg text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-pink-700 lg:p-0"
                  >
                    Login
                  </a>
                  </NavLink>
                }

              </li>
              <li>

                <NavLink to={'/profile'}>

                  {
                    userName && (
                      <div className='flex items-center'>
                        {
                          premium ?

                            <div className="w-10 h-10 mr-4 rounded-full bg-yellow-500 outline outline-yellow-500">
                              {image ? (
                                <img src={image} alt="User Profile" className="w-full h-full rounded-full" />
                              ) : (
                                <img src={head} alt="User Profile" className="w-full h-full rounded-full" />
                              )}
                            </div>
                            :
                            <div className="w-10 h-10 mr-4 rounded-full bg-gray-300">
                              {image ? (
                                <img src={image} alt="User Profile" className="w-full h-full rounded-full" />
                              ) : (
                                <img src={head} alt="User Profile" className="w-full h-full rounded-full" />
                              )}
                            </div>
                        }

                        {
                          premium ?
                            <>
                              <span className="text-lg text-gray-900 mr-2 cursor-pointer">{userName}</span><AiFillStar className='text-yellow-500' />
                            </>
                            :
                            <>
                              <span className="text-lg text-gray-900 mr-2 cursor-pointer">{userName}</span>
                            </>

                        }
                      </div>
                    )
                  }
                </NavLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default ProtectedPage