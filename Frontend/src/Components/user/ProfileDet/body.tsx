/* eslint-disable jsx-a11y/anchor-is-valid */
import { axiosInstance } from 'api/axiosInstance';
import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Fancybox from '../../common/fancyBox';

const Plans: FC = () => {

    const { id } = useParams();

    const [selectedUserProfile, setSelectedUserProfile] = useState<any>([])

    useEffect(() => {
        axiosInstance.get(`/profileDet/${id}`).then((res) => {
            console.log(res.data, "details");
            setSelectedUserProfile((prev: any) => res.data)
        })
    }, [id])



    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const showCurrentImage = () => {
        const carouselItems = document.querySelectorAll("[data-carousel-item]");

        carouselItems.forEach((item:any, index:number) => {
            if (index === currentIndex) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    };

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + selectedUserProfile?.image?.length) % selectedUserProfile?.image?.length);
        showCurrentImage();
    };

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % selectedUserProfile?.image?.length);
        showCurrentImage();
    };



    return (

        <section className="relative pt-12 bg-blueGray-50">
            <div className="items-center flex flex-wrap">
                <div className="w-full md:w-3/12 ml-auto mr-auto px-4 mt-12">
                    <div id="controls-carousel" className="relative w-full" >
                        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                            <div className="duration-700 ease-in-out" data-carousel-item>
                                {
                                    selectedUserProfile?.image?.[0] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[0]} ><img src={selectedUserProfile?.image?.[0]} alt='' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }

                            </div>


                            <div className=" duration-700 ease-in-out" data-carousel-item>
                                {
                                    selectedUserProfile?.image?.[1] ?
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[1]} ><img src={selectedUserProfile?.image?.[1]} alt='' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'></img></a>
                                        </Fancybox>
                                        :
                                        ""
                                }
                            </div>


                            {
                                selectedUserProfile?.image?.[2] ?
                                    <div className="duration-700 ease-in-out" data-carousel-item>
                                        <Fancybox>
                                            <a data-fancybox="gallery" href={selectedUserProfile?.image?.[2]} ><img src={selectedUserProfile?.image?.[2]} alt='' className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'></img></a>
                                        </Fancybox>
                                    </div>
                                    :
                                    ""
                            }
                        </div>
                        <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={handlePrevClick}>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={handleNextClick}>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                </div>


                <div className="w-full md:w-5/12 ml-auto mr-auto px-4 mt-12">
                    <div className="md:pr-12">
                        <h3 className="text-3xl font-semibold">{selectedUserProfile.name} {selectedUserProfile.age}</h3>
                        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                            {selectedUserProfile.about}
                        </p>
                        <ul className="list-none mt-6">
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="fas fa-fingerprint">Gender</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">
                                            {selectedUserProfile.gender}
                                        </h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="fab fa-html5">Relationship Goals</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.relationshipGoals}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Passion</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.passion}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Life Style</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.lifeStyle}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Job</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.job}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Company</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.company}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Education</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.school}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Language</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.language}</h4>
                                    </div>
                                </div>
                            </li>
                            <li className="py-2">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3"><i className="far fa-paper-plane">Place</i></span>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-semibold text-lg">{selectedUserProfile.place}</h4>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="relative  pt-8 pb-6 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                    </div>
                </div>
            </footer>
        </section>

    );
}

export default Plans;