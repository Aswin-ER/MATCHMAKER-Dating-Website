/* eslint-disable @typescript-eslint/no-unused-vars */
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

    const verify: boolean | any = useSelector((state: RootState) => state.userCred.userCred?.profile);
    // console.log(verify,"userprofileCreated here")

    const [selectedUserProfile, setSelectedUserProfile] = useState<any>(null);
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [userDet, setUserDet] = useState([])
    const [likedProfile, setLikedProfile] = useState<string[]>([])

    //Logged in userDetails
    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);
    // console.log(user)

    const handleButton = () => {
        toast.info('Login to see Profiles');
    }

    const handleSeeMore = () => {
        toast.info('Verify Your Profile to see others Profile')
    }

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
        if (e.target.id === 'modal-bg') {
            console.log('clicked modal bg')
            console.log(e.target);
            closeModal();
        }
    }
    const [updateUi, setUpdateUi] = useState<boolean>(false);

    const addToLikedCollection = (userProfile: UserProfile) => {
        axiosInstance.post('/like', userProfile).then((res) => {
            setLikedProfile(res.data.likeProfileArray || []);
            if (res.data.match) {
                setUpdateUi((prev) => !prev)
                setLikedProfile(res.data.likeProfileArray || []);
                toast.success(res.data.match)
            }
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        });
    }

    const [filter, setFilter] = useState<any>([]);

    useEffect(() => {
        axiosInstance.get('/getAllUserProfile').then((res) => {
            console.log(res, "all profile here mannnnnnn");
            setUserDet(res.data)
        })

    }, [updateUi])

    useEffect(() => {
        axiosInstance.get('/getLikedProfiles').then((res) => {
            setLikedProfile(res.data || []);
        }).catch((err) => {
            console.log(err)
        })
    }, []);


    const handleFilter = () => {
        const genderElement = document.getElementById('gender') as HTMLSelectElement;
        const gender = genderElement.value;

        const relationshipElement = document.getElementById('relationship-goals') as HTMLSelectElement;
        const relationship = relationshipElement.value;

        const ageElement = document.getElementById('age') as HTMLSelectElement;
        const age = ageElement.value;

        const data: object = {
            gender: gender,
            relationship: relationship,
            age: age
        }

        axiosInstance.post('/getFilteredUsers', data).then((res) => {
            console.log(res.data, "filtered users here");
            toast.success("Filter applied successfully")
            setFilter(res.data);
        })
    }

    const handleClear = () => {
        toast.success("Filter cleared successfully");
        setUpdateUi((prev) => !prev)
    }

    useEffect(() => {
        setUserDet(filter)
    }, [filter])


    return (
        <>

            <div className="flex min-h-screen items-center justify-center bg-neutral-800 relative">
                <h3 className='text-white lg:text-6xl font-semibold absolute lg:absolute lg:top-10 lg:mt-5 md:mt-12 mobile:absolute mobile:top-0 mobile:text-4xl mobile:mt-16' >Find Your <span className='text-pink-700'>Match Here</span></h3>

                {
                    user ?
                        <>
                            <h3 className='text-white lg:text-sm font-medium absolute lg:absolute lg:top-36 lg:mt-5 md:absolute md:top-10 md:text-xs md:mt-16 mobile:absolute mobile:top-18 mobile:text-xs mobile:mt-16' >Filter to see profiles according to your preference ✨</h3>
                            <div className='lg:w-3/6 mobile:w-4/6 md:w-5/6 lg:flex bg-pink-100 mobile:absolute mobile:top-40  md:absolute md:top-30 md:mt-2 lg:absolute lg:top-44 lg:mt-5 rounded mobile:flex-col mobile:align-middle'>
                                <div className='mobile:mx-10 md:flex lg:flex lg:mb-3 mobile:mb-5'>

                                    <div className='bg-pink-100 lg:mx-10 flex-col mt-2 lg:w-2/6 md:mx-5 mobile:w-full mobile:mx-3'>
                                        <label className="text-pink-800 mobile:w-1/2 font-semibold text-lg  md:mx-6" htmlFor="gender">Gender</label>
                                        <select id='gender' name='gender' className="block w-12/12 h-10 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className='bg-pink-100 lg:mx-10 flex-col mt-2 w-3/6 md:mx-5 mobile:w-full mobile:mx-3 mobile:mt-3'>
                                        <label className="text-pink-800 mobile:w-1/2 md:w-full font-semibold text-lg" htmlFor="relationship-goals">Relationship Goals</label>
                                        <select id='relationship-goals' name="relationship-goals" className="block lg:w-full w-10/12 h-10 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md">
                                            <option value="">Select Relationship Goals</option>
                                            <option value="Long-term partne">Long-term partner</option>
                                            <option value="Short-term fun">Short-term fun</option>
                                            <option value="New friends">New friends</option>
                                        </select>
                                    </div>

                                    <div className='bg-pink-100 lg:mx-10 flex-col mt-2  w-2/6 md:mx-5
                    mobile:w-full mobile:mx-3 mobile:mb-3'>
                                        <label className="text-pink-800 font-semibold text-lg md:mx-10" htmlFor="age">Age</label>
                                        <select className="block w-10/12 h-10 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" id="age" name="age">
                                            <option value="">Select Age</option>
                                            <option value="18-24">18-24</option>
                                            <option value="25-34">25-34</option>
                                            <option value="35-44">35-44</option>
                                            <option value="45+">45+</option>
                                        </select>
                                    </div>
                                    <div className='lg:flex-col lg:my-3'>
                                        <button className='bg-pink-700 lg:mb-3 lg:mt-2 lg:p-1 text-white rounded' type='submit' onClick={handleFilter}>Apply</button>
                                        <button className='bg-pink-700 lg:p-1 text-white rounded' type='submit' onClick={handleClear}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        ""
                }


                <div className="grid grid-cols-1 lg:gap-30 md:grid-cols-2 lg:grid-cols-3 lg:mt-100 md:mt-90 mobile:mt-120 mobile:gap-16">
                    {
                        user ?
                            userDet.filter((userProfile: UserProfile) => {
                                return (userProfile.user !== user._id
                                )
                            }).filter((userProfile: UserProfile) => !user?.matches?.includes(userProfile.user)).map((userProfile: UserProfile, index: number) => (

                                <div key={index} className="group relative  cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                    <div className="h-98 w-82">
                                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={userProfile?.image?.[0]} alt="" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                        <h1 className="text-2xl font-semibold text-white lg:mb-16">{userProfile.name} {userProfile.age}</h1>
                                        <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{userProfile.about}</p>
                                        {
                                            verify ?
                                                <>
                                                    <Button handleClick={() => openModal(userProfile)} text="View More" />
                                                    <LoveIcon isLiked={isProfileLiked(userProfile._id, likedProfile)} onClick={() => addToLikedCollection(userProfile)} />
                                                </>
                                                :
                                                <Button handleClick={() => toast.info("Verify your Profile to see")} text="View More" />
                                        }
                                    </div>
                                </div>

                            ))

                            : user && filter ?
                                filter.filter((userProfile: UserProfile) => {
                                    return userProfile.user !== user._id;
                                }).map((userProfile: UserProfile, index: number) => (

                                    <div key={index} className="group relative  cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                        <div className="h-98 w-82">
                                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={userProfile?.image?.[0]} alt="" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                            <h1 className="text-2xl font-semibold text-white lg:mb-16">{userProfile.name} {userProfile.age}</h1>
                                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{userProfile.about}</p>
                                            {
                                                verify ?
                                                    <>
                                                        <Button handleClick={() => openModal(userProfile)} text="View More" />
                                                        <LoveIcon isLiked={isProfileLiked(userProfile._id, likedProfile)} onClick={() => addToLikedCollection(userProfile)} />
                                                    </>
                                                    :
                                                    <Button handleClick={() => toast.info("Verify your Profile to see")} text="View More" />
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

                            <div className='flex justify-center items-center gap-5 mb-5 '>
                                {
                                    selectedUserProfile?.image?.[0] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[0]} ><img src={selectedUserProfile?.image?.[0]} alt='' className='w-50 h-50 border-4 border-black border-double'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                                {
                                    selectedUserProfile?.image?.[1] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[1]} ><img src={selectedUserProfile?.image?.[1]} alt='' className='w-50 h-50 border-4 border-black border-double'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                                {
                                    selectedUserProfile?.image?.[2] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[2]} ><img src={selectedUserProfile?.image?.[2]} alt='' className='w-50 h-50 border-4 border-black border-double'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                            </div>
                            <div className="grid grid-cols-2 gap-4 mx-20">
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Gender: </span>{selectedUserProfile.gender}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Relationship Goals: </span> {selectedUserProfile.relationshipGoals}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Life Style: </span> {selectedUserProfile.lifeStyle}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Passion: </span> {selectedUserProfile.passion}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Language: </span> {selectedUserProfile.language}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Job: </span> {selectedUserProfile.job}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Company: </span> {selectedUserProfile.company}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Education: </span> {selectedUserProfile.school}</h4>
                                <h4 className="text-xl  pb-4"><span className='font-bold font-sans text-lg'>Place: </span> {selectedUserProfile.place}</h4>
                            </div>
                            <Button handleClick={handleClick} text="Close" />
                        </div>
                    </div>

                )}

            </div>
        </>

    );
}

export default Profile;