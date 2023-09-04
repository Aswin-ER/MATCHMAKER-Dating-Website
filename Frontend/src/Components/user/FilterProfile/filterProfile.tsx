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
import Pagination from 'Components/common/pagination';
import { useNavigate } from 'react-router-dom';

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


const FilterProfile: FC = () => {

    const navigate = useNavigate();

    const verify: boolean | any = useSelector((state: RootState) => state.userCred.userCred?.profile);

    const [userDet, setUserDet] = useState([])
    const [likedProfile, setLikedProfile] = useState<string[]>([]);
    const [premium, setPremium] = useState<boolean>(false);
    const [updateUi, setUpdateUi] = useState<boolean>(false);


    //Logged in userDetails
    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);

    const handleButton = () => {
        toast.info('Login to see Profiles');
    }

    const handleSeeMore = () => {
        toast.info('Verify Your Profile to see others Profile')
    }

    const isProfileLiked = (userProfileId: string, likedProfile: Array<any>): boolean => {
        return likedProfile.some((profile) => profile.userProfileId.includes(userProfileId));
    };

    const addToLikedCollection = (userProfile: UserProfile) => {
        axiosInstance.post('/like', userProfile).then((res) => {
            setLikedProfile(res.data.likeProfileArray || []);
            if (res.data.match) {
                setUpdateUi((prev) => !prev)
                setLikedProfile(res.data.likeProfileArray || []);
                toast.success(res.data.match)
            } else if (res.data.LikeLimit) {
                toast.info(res.data.LikeLimit);
            }
            toast.success(res.data.message)
        }).catch((err) => {
            console.log(err)
        });
    }

    const [filter, setFilter] = useState<any>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage, setCardsPerPage] = useState<number>(6);

    useEffect(() => {
        if (user) {
            axiosInstance.get('/profile').then((res) => {
                const data = res.data;
                const filtered = data.filter((users: any) => users.user !== user._id);
                // console.log(filtered, "asas")
                setUserDet(filtered || []);
            })
        } else {
            axiosInstance.get('/getAllUserProfile').then((res) => {
                // console.log(res.data, "log out profile")
                setUserDet(res.data || []);
            })
        }

    }, [updateUi, user])

    // pagination 
    const lastPageIndex: number = currentPage * cardsPerPage;
    const firstPostIndex: number = lastPageIndex - cardsPerPage;
    const curretCards = userDet.slice(firstPostIndex, lastPageIndex);
    console.log(curretCards, "current");


    useEffect(() => {
        axiosInstance.get('/getLikedProfiles').then((res) => {
            // console.log(res.data, "liked")
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

        axiosInstance.put('/getFilteredUsers', data).then((res) => {
            // console.log(res.data, "filtered users here");
            const filtered = res.data.filter((users: any) => users.user !== user._id);
            toast.success("Filter applied successfully")
            setFilter(filtered);
        })
    }

    const handleClear = () => {
        toast.success("Filter cleared successfully");
        setUpdateUi((prev) => !prev)
    }

    useEffect(() => {

        axiosInstance.get('/premiumUser').then((res) => {
            setPremium(res.data);
        })

    }, []);

    useEffect(() => {
        setUserDet(filter)
    }, [filter])

    const handleProfile = (id: any) => {
        console.log("reached profile", id)
        navigate(`/profileDet/${id}`);
    }


    return (
        <>
            <div className={`grid grid-cols-3 ${user ? 'grid-rows-2 h-130' : 'h-50'}  w-full justify-center bg-black`}>

                <div className='grid lg:w-fit lg:col-start-2 my-20 mobile:w-100 md:col-start-2 md:w-fit lg:row-start-1 md:row-start-1 text-center'>
                    <h3 className='text-pink-100 lg:text-5xl mobile:text-3xl md:text-4xl font-semibold block'>Find Your <span className='text-pink-700'>Match Here</span></h3>
                </div>

                {
                    user ?
                        <>
                            <div className='grid lg:col-start-2 lg:row-start-2 lg:row-end-2 mobile:mb-40 mobile:col-start-2 mobile:mt-30 mobile:row-start-2 mobile:place-content-center md:col-start-2'>
                                <div className="lg:w-8/12 mx-10 lg:h-10 md:w-10/12 md:h-5 mobile:w-8/12 bg-pink-100 rounded-lg shadow-lg lg:mb-80 md:mb-40 mobile:mb-40">
                                    <div className="bg-pink-800 p-3 rounded-lg shadow-md">
                                        <h2 className="text-2xl font-semibold mb-2 text-white text-center">Filters</h2>
                                        <div className="flex flex-wrap mb-4">
                                            <div className="w-full lg:w-1/3 md:w-full px-4">
                                                <label className="block font-medium mb-2 text-white text-center" htmlFor="gender">Gender</label>
                                                <select id="gender" name="gender" className="w-full p-2 border rounded-md">
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-1/3 md:w-1/2 px-4">
                                                <label className="block font-medium mb-2 text-white text-center" htmlFor="relationship-goals">Relationship</label>
                                                <select id="relationship-goals" name="relationship-goals" className="w-full p-2 border rounded-md">
                                                    <option value="">Select Relationship Goals</option>
                                                    <option value="Long-term partner">Long-term partner</option>
                                                    <option value="Short-term fun">Short-term fun</option>
                                                    <option value="New friends">New friends</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-1/3 md:w-1/2 px-4">
                                                <label className="block font-medium mb-2 text-white text-center" htmlFor="age">Age</label>
                                                <select id="age" name="age" className="w-full p-2 border rounded-md">
                                                    <option value="">Select Age</option>
                                                    <option value="18-24">18-24</option>
                                                    <option value="25-34">25-34</option>
                                                    <option value="35-44">35-44</option>
                                                    <option value="45+">45+</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end px-4">
                                            <button className="bg-pink-600 text-white px-4 py-1 rounded-md mr-2" type="submit" onClick={handleFilter}>Apply</button>
                                            <button className="bg-gray-600 text-white px-4 py-1 rounded-md" type="submit" onClick={handleClear}>Clear</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </>

                        :

                        ""
                }
            </div>

            <div className="grid  w-full max-h-fit justify-center bg-black ">
                {
                    user ?

                        <div className="grid lg:gap-30 md:gap-20 mobile:gap-20 lg:grid-cols-3 md:grid-cols-2 mobile:grid-cols-1 mobile:mx-8  mb-20 w-fit md:mt-20">

                            {
                                user ?
                                    curretCards.map((userProfile: UserProfile, index: number) => (

                                        <div key={index} className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
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
                                                            <Button handleClick={() => handleProfile(userProfile._id)} text="View More" />
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
                                                                <Button handleClick={() => handleProfile(userProfile._id)} text="View More" />
                                                                <LoveIcon isLiked={isProfileLiked(userProfile._id, likedProfile)} onClick={() => addToLikedCollection(userProfile)} />
                                                            </>
                                                            :
                                                            <Button handleClick={() => toast.info("Verify your Profile to see")} text="View More" />
                                                    }
                                                </div>
                                            </div>
                                        ))

                                        :

                                        curretCards.map((userProfile: UserProfile, index: number) => (

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

                        :

                        <div className="grid lg:gap-30 md:gap-20 mobile:gap-20 lg:grid-cols-3 md:grid-cols-2 mobile:grid-cols-1 mb-20 w-fit md:mt-20">
                            {
                                user ?
                                    curretCards.map((userProfile: UserProfile, index: number) => (

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
                                                            <Button handleClick={() => handleProfile(userProfile._id)} text="View More" />
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
                                                                <Button handleClick={() => handleProfile(userProfile._id)} text="View More" />
                                                                <LoveIcon isLiked={isProfileLiked(userProfile._id, likedProfile)} onClick={() => addToLikedCollection(userProfile)} />
                                                            </>
                                                            :
                                                            <Button handleClick={() => toast.info("Verify your Profile to see")} text="View More" />
                                                    }
                                                </div>
                                            </div>
                                        ))

                                        :

                                        curretCards.map((userProfile: UserProfile, index: number) => (

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

                }

                {
                    premium ?

                        ""
                        :
                        <div className='flex text-white text-lg '>
                            <h1>To See More Profiles and Unlimited Likes <a href="/plans" className='text-pink-700 hover:text-pink-500'>CLICK HERE...</a></h1>
                        </div>
                }

                <div className='flex justify-center mb-10'>
                    <Pagination totalPosts={userDet.length} cardsPerPage={cardsPerPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>



        </>

    );
}

export default FilterProfile;