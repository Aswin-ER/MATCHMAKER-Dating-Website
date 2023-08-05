/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { UserCred } from '../../../Redux/slice';
import RootState from '../../../Redux/rootState';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../api/axiosInstance';
import Button from '../../common/button';
import LoveIcon from '../../common/loveIcon';
import Fancybox from '../../common/fancyBox';

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


const Profile: FC = () => {

    const [selectedUserProfile, setSelectedUserProfile] = useState<any>(null);
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [userDet, setUserDet] = useState([])
    const [likedProfile, setLikedProfile] = useState<string[]>([])
    const [verify, setVerify] = useState<boolean>();


    //Logged in userDetails
    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);
    console.log(user)

    const handleButton = () => {
        toast.info('Login to see Profiles');
    }

    const handleSeeMore = () => {
        toast.info('Verify Your Profile to see others Profile')
    }


    useEffect(() => {
        axiosInstance.get('/getAllUserProfile').then((res) => {
            // console.log(res);
            setUserDet(res.data)
        })

    }, [])

    useEffect(() => {
        axiosInstance.get('/getLikedProfiles').then((res) => {
            // console.log(res.data,"likedProfiles")
            setLikedProfile(res.data || []);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        axiosInstance.get('/verifyProfile', user).then((res) => {

            console.log(res.data);
            if (res.data.message) {
                setVerify((prev) => !prev);
            }
        })
    }, []);


    const isProfileLiked = (userProfileId: string, likedProfile: Array<any>): boolean => {
        // console.log('Liked profiles:', likedProfile);
        return likedProfile.some((profile) => profile.userProfileId.includes(userProfileId));
    };

    function openModal(userProfile: UserProfile) {
        setSelectedUserProfile(userProfile);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    function handleClick() {
        closeModal();
    }

    function closeModalBgClick(e: any) {
        // console.log('clicked anywhere');
        if (e.target.id === 'modal-bg') {
            console.log('clicked modal bg')
            console.log(e.target);
            closeModal();
        }
    }

    const addToLikedCollection = (userProfile: UserProfile) => {
        axiosInstance.post('/like', userProfile).then((res) => {
            // console.log(res.data.likeProfileArray,"its here mannnnnnnnnnnnnnnnnnnnnnn")
            setLikedProfile(res.data.likeProfileArray || []);
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        });

    }


    return (
        <>

            <div className="flex min-h-screen items-center justify-center bg-neutral-800 relative">
                <h3 className='text-white lg:text-6xl font-semibold  lg:absolute lg:top-10 lg:mt-5 mobile:absolute mobile:top-0 mobile:text-4xl mobile:mt-16' >Find your <span className='text-pink-700'>Match Here</span></h3>


                <div className="grid grid-cols-1 lg:gap-30 md:grid-cols-2 lg:grid-cols-3 lg:mt-50 mobile:mt-40 mobile:gap-16">
                    {
                        user ?
                            userDet.filter((userProfile: UserProfile) => {
                                return userProfile.user !== user._id;
                            }).map((userProfile: UserProfile, index: number) => (

                                <div key={index} className="group relative  cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                    <div className="h-98 w-82">
                                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={userProfile?.image?.[0]} alt=""/>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                        <h1 className="text-2xl font-semibold text-white lg:mb-16">{userProfile.name} {userProfile.age}</h1>
                                        <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{userProfile.about}</p>
                                        {
                                            verify ?
                                                <Button handleClick={() => toast.info("Verify your Profile to see")} text="View More" />
                                                :
                                                <Button handleClick={() => openModal(userProfile)} text="View More" />
                                        }

                                        {
                                            verify ?
                                                ""
                                                :
                                                <LoveIcon isLiked={isProfileLiked(userProfile._id, likedProfile)} onClick={() => addToLikedCollection(userProfile)} />
                                        }
                                    </div>
                                </div>

                            ))

                            :

                            userDet.map((userProfile: UserProfile, index: number) => (

                                <div key={index} className="group relative blur-sm cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30" onClick={handleButton}>
                                    <div className="h-98 w-82">
                                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={userProfile?.image?.[0]} alt="" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                        <h1 className="text-2xl font-semibold text-white lg:mb-16">{userProfile.name}</h1>
                                        <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{userProfile.about}</p>
                                        <Button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60" onClick={handleSeeMore} text="View More" />
                                    </div>
                                </div>
                            ))
                    }

                </div>

                {selectedUserProfile && showModal && (

                    <div
                        id="modal-bg"
                        className="fixed top-0 left-0 w-full h-full bg-zinc-700/50 flex flex-col justify-center items-center"
                        onClick={closeModalBgClick}>
                        <div className="bg-white md:w-6/12 w-10/12 max-w-screen-md rounded-lg p-4 m-4 flex flex-col relative shadow-2xl">
                            <a onClick={closeModal} className="absolute text-2xl right-5 hover:cursor-pointer">
                                x
                            </a>
                            <h1 className="text-3xl pb-8 text-center">{selectedUserProfile.name} {selectedUserProfile.age}</h1>

                            <div className='flex justify-center items-center gap-5 mb-5'>
                                {
                                    selectedUserProfile?.image?.[0] ?
                                    <Fancybox>
                                       <a data-fancybox="gallery" href={selectedUserProfile?.image?.[0]} ><img src={selectedUserProfile?.image?.[0]} alt='' className='w-50 h-50'></img></a> 
                                        </Fancybox>
                                        :
                                        ""
                                }

                                {
                                    selectedUserProfile?.image?.[1] ?
                                    <Fancybox>
                                    <a data-fancybox="gallery" href={selectedUserProfile?.image?.[1]} ><img src={selectedUserProfile?.image?.[1]} alt='' className='w-50 h-50'></img></a> 
                                     </Fancybox>
                                        :
                                        ""
                                }

                                {
                                    selectedUserProfile?.image?.[2] ?
                                    <Fancybox>
                                    <a data-fancybox="gallery" href={selectedUserProfile?.image?.[2]} ><img src={selectedUserProfile?.image?.[2]} alt='' className='w-50 h-50'></img></a> 
                                     </Fancybox>
                                        :
                                        ""
                                }

                            </div>
                            <div className="grid grid-cols-2 gap-4 ml-10">
                                <h4 className="text-xl italic pb-4">Gender: {selectedUserProfile.gender}</h4>
                                <h4 className="text-xl italic pb-4">Relationship Goals: {selectedUserProfile.relationshipGoals}</h4>
                                <h4 className="text-xl italic pb-4">Life Style: {selectedUserProfile.lifeStyle}</h4>
                                <h4 className="text-xl italic pb-4">Passion: {selectedUserProfile.passion}</h4>
                                <h4 className="text-xl italic pb-4">Language: {selectedUserProfile.language}</h4>
                                <h4 className="text-xl italic pb-4">Job: {selectedUserProfile.job}</h4>
                                <h4 className="text-xl italic pb-4">Company: {selectedUserProfile.company}</h4>
                                <h4 className="text-xl italic pb-4">Education: {selectedUserProfile.school}</h4>
                                <h4 className="text-xl italic pb-4">Place: {selectedUserProfile.place}</h4>
                            </div>
                            <Button handleClick={handleClick} text="Click Me" />
                        </div>
                    </div>

                )}

            </div>
        </>

    );
}

export default Profile;