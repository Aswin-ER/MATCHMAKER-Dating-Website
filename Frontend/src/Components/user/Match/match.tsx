/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useState } from 'react'
import Button from '../../common/button';
import { axiosInstance } from '../../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import Fancybox from 'Components/common/fancyBox';
import Pagination from 'Components/common/pagination';
import bodyImage from '../../../assests/3796382.jpg'


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


const Match: FC = () => {

    const navigate  = useNavigate();

    const [matchedProfiles, setMatchedProfile] = useState<string[]>([])
    const [selectedUserProfile, setSelectedUserProfile] = useState<any>(null);
    const [showModal, setShowModal] = useState<Boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage, setCardsPerPage] = useState<number>(2);

    useEffect(() => {
        axiosInstance.get('/getMatchedUserProfiles').then((res) => {
            if(res.data.length > 0) {
                setMatchedProfile(res.data || []);
            }
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    // pagination 
    const lastPageIndex: number = currentPage * cardsPerPage;
    const firstPostIndex: number = lastPageIndex - cardsPerPage;
    const curretCards = matchedProfiles?.slice(firstPostIndex, lastPageIndex);
    console.log(curretCards, "current");

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
        console.log('clicked anywhere');
        if (e.target.id === 'modal-bg') {
            console.log(e.target);
            closeModal();
        }
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-black relative">
                {
                    curretCards.length > 0 ?

                        <>
                            <h3 className='text-white lg:text-6xl font-semibold lg:absolute lg:top-10 lg:mt-5 mobile:absolute mobile:top-0 mobile:text-4xl mobile:mt-16' >Matched <span className='text-pink-700 '>Profiles</span></h3>
                            <div className="grid grid-cols-1 lg:gap-30 md:grid-cols-2 lg:grid-cols-3 lg:mt-20 mobile:gap-10">
                                {
                                    curretCards.map((match: any, index: number) => (

                                        <div>
                                        <div key={index} className="group relative  cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                                            <div className="h-98 w-82">
                                                <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={match?.image?.[0]} alt="" />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                                            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                                <h1 className="text-2xl font-semibold text-white lg:mb-16">{match.name} {match.age}</h1>
                                                <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{match.about}</p>
                                                <Button handleClick={() => openModal(match)} text="View More" />
                                            </div>
                                        </div>
                                            <button className='bg-pink-800 text-white font-semibold text-lg w-full h-10 cursor-pointer hover:bg-pink-500' onClick={() => navigate('/chat')}>Click Here to Message...</button>
                                        </div>
                                    ))};
                            </div>
                        </>

                        :
                        
                        (
                            <>
                                <div className='flex-col text-center'>
                                    <img src={bodyImage} alt='' className='lg:h-100 lg:w-130 md:h-100 md:w-130 p-10 mobile:w-90 mobile:h-70'></img>
                                    <h1 className='lg:text-4xl md:text-3xl mobile:text-2xl font-serif text-white text-center'>No <span className='text-pink-700'>Matches</span> Yet</h1>
                                    <p className='lg:text-md md:text-md mobile:text-sm font-normal font-serif text-white text-center mt-5'>Yours likes will appear here. Start liking people right away.</p>
                                    <Link to={'/userProfile'}><p className='text-md font-normal font-serif text-white text-center mt-5 underline cursor-pointer hover:text-pink-700'>Start Liking To get Matched</p></Link>
                                </div>
                            </>
                        )}

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
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[0]} ><img src={selectedUserProfile?.image?.[0]} alt='' className='w-50 h-50 border-4 border-double border-black'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                                {
                                    selectedUserProfile?.image?.[1] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[1]} ><img src={selectedUserProfile?.image?.[1]} alt='' className='w-50 h-50 border-4 border-double border-black'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                                {
                                    selectedUserProfile?.image?.[2] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[2]} ><img src={selectedUserProfile?.image?.[2]} alt='' className='w-50 h-50 border-4 border-double border-black'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                            </div>
                            <div className="grid grid-cols-2 gap-4 ml-10">
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
                            <Button handleClick={handleClick} text="Click Me" />
                        </div>
                    </div>

                )}

                <div className='flex absolute bottom-5'>
                    <Pagination totalPosts={matchedProfiles.length} cardsPerPage={cardsPerPage} setCurrentPage={setCurrentPage} />
                </div>

            </div>
        </>
    )
}

export default Match;