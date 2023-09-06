/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import Button from '../../common/button';
import { axiosInstance } from '../../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import Fancybox from 'Components/common/fancyBox';
import { useSelector } from 'react-redux';
import { UserCred, userDet } from 'Redux/slice';
import RootState from 'Redux/rootState';
import Pagination from 'Components/common/pagination';
import bodyImage from '../../../assests/3818988.jpg'

interface UserProfile {
    _id: string;
    name: string;
    age: number;
    about: string;
    gender: string;
    relationshipGoals: string;
    lifeStyle: string;
    passion: string;
    language: string;
    job: string;
    company: string;
    school: string;
    place: string;
    image: string;
    user: string;
}


const LikedProfiles: FC = () => {

    const navigate = useNavigate();

    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);

    const [likedProfile, setLikedProfile] = useState<string[]>([])

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage, setCardsPerPage] = useState<number>(2);

    useEffect(() => {
        if (user) {
            axiosInstance.get('/getLikedUserProfiles').then((res) => {
                setLikedProfile(res.data || []);
            }).catch((err) => {
                console.log(err)
            })
        }
    }, []);


    // pagination 
    const lastPageIndex: number = currentPage * cardsPerPage;
    const firstPostIndex: number = lastPageIndex - cardsPerPage;
    const curretCards = likedProfile.slice(firstPostIndex, lastPageIndex);
    console.log(curretCards, "current");


    const handleProfile = (id: any)=> {
        console.log("reached profile", id)
        navigate(`/profileDet/${id}`);
    }


    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-black relative">
                {
                    likedProfile?.filter((profile: any) => !user?.matches?.includes(profile.user)).length > 0 ?
                        <h3 className='text-white lg:text-6xl font-semibold lg:absolute lg:top-10 lg:mt-5 mobile:absolute mobile:top-0 mobile:text-4xl mobile:mt-16' >Liked <span className='text-pink-700'>Profiles</span></h3>
                        :
                        ""
                }

                {
                    user ?
                        <div className="grid grid-cols-1 lg:gap-30 md:grid-cols-2 lg:grid-cols-3 lg:mt-20 mobile:gap-10">

                            {
                                curretCards?.filter((profile: any) => !user?.matches?.includes(profile.user)).length > 0 ? (

                                    curretCards.filter((profile: any) => !user?.matches?.includes(profile.user)).map((profile: any, index: number) => {
                                        return (
                                            <div key={index} className="group relative  cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                                <div className="h-98 w-82">
                                                    <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={profile?.image?.[0]} alt="" />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                                    <h1 className="text-2xl font-semibold text-white lg:mb-16">{profile.name} {profile.age}</h1>
                                                    <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{profile.about}</p>
                                                    <Button handleClick={() => handleProfile(profile._id)} text="View More" />
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className='flex items-center justify-center h-full w-full lg:mx-150'>
                                        <div className='flex flex-col items-center'>
                                            <img src={bodyImage} alt='' className='lg:h-100 lg:w-130 md:h-100 md:w-130 p-10 mobile:w-90 mobile:h-70'></img>
                                                <h1 className='lg:text-4xl md:text-3xl mobile:text-2xl font-serif text-white text-center'>No <span className='text-pink-700'>Likes</span> Yet</h1>
                                                <p className='lg:text-md md:text-md mobile:text-sm font-normal font-serif text-white text-center mt-5'>Your likes will appear here. Start liking people right away.</p>
                                            <Link to='/userProfile' className='text-md font-normal font-serif text-white text-center mt-5 underline cursor-pointer hover:text-pink-700'>
                                                Start Liking
                                            </Link>
                                        </div>
                                    </div>


                                )}

                        </div>
                        :
                        <div className='flex items-center justify-center h-full w-full lg:mx-150'>
                            <div className='flex flex-col items-center'>
                                <img src={bodyImage} alt='' className='lg:h-100 lg:w-130 md:h-100 md:w-130 p-10 mobile:w-90 mobile:h-70'></img>
                                <h1 className='lg:text-4xl md:text-3xl mobile:text-2xl font-serif text-white text-center'>No <span className='text-pink-700'>Likes</span> Yet</h1>
                                <p className='lg:text-md md:text-md mobile:text-sm font-normal font-serif text-white text-center mt-5'>Your likes will appear here. Start liking people right away.</p>
                                <Link to='/userProfile' className='text-md font-normal font-serif text-white text-center mt-5 underline cursor-pointer hover:text-pink-700'>
                                    Start Liking
                                </Link>
                            </div>
                        </div>
                }

                <div className='flex absolute bottom-5'>
                    <Pagination totalPosts={likedProfile.length} cardsPerPage={cardsPerPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </>
    );
}

export default LikedProfiles;