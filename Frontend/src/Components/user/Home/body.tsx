import React, { FC } from 'react'
import bodyImage from '../../../assests/2760249.jpg'
import bodyImage2 from '../../../assests/3753095.jpg'
import Profile from './profiles';

const Body: FC = () => {

    return (
        <>
            <div className='relative text-center bg-black lg:pt-5 md:pt-3 mobile:pt-2'>
                <h3 className='text-pink-100 lg:text-6xl md:text-3xl mobile:text-2xl italic font-semibold tracking-wide lg:pb-5 md:pb-3 mobile:pb-2'>
                    Find Your <span className='text-pink-700 italic'>Real Connections</span>
                </h3>
                <img className='w-full h-full' alt='' src={bodyImage} />
            </div>


            <div className='lg:h-96 lg:flex lg:justify-between md:flex md:justify-between bg-black pt-10 pb-10'>
                <div className="card lg:w-1/4 lg:h-60 md:w-1/2 md:h-1/2 bg-pink-700 text-primary-content  lg:mt-8 lg:mx-20 lg:mb-20  md:mt-5  md:mb-5 mobile:mx-10 shadow-2xl hover:bg-pink-900 transition duration-300">
                    <div className="card-body lg:mt-1">
                        <h2 className=" text-black lg:mb-5 font-bold lg:text-3xl md:text-xl">Efficient</h2>
                        <p className='text-pink-100'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>

                <div className="card lg:w-1/4 lg:h-60 md:w-1/2 md:h-1/2 bg-pink-700 text-primary-content lg:mt-8 lg:mx-20 lg:mb-20  md:mt-5  md:mb-5 mobile:mx-10 mobile:my-8 shadow-2xl hover:bg-pink-900 transition duration-300">
                    <div className="card-body lg:mt-1 ">
                        <h2 className=" text-black lg:mb-5 font-bold lg:text-3xl md:text-xl ">Balance</h2>
                        <p className='text-pink-100'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>

                <div className="card lg:w-1/4 lg:h-60 md:w-1/2 md:h-1/2 bg-pink-700 text-primary-content lg:mt-8 lg:mx-20 lg:mb-20  md:mt-5 md:mb-5 mobile:mx-10 shadow-2xl hover:bg-pink-900 transition duration-300 ">
                    <div className="card-body lg:mt-1 ">
                        <h2 className=" text-black lg:mb-5 font-bold lg:text-3xl md:text-xl">Smart Blocking</h2>
                        <p className='text-pink-100'>Thousands of singles find love through our dating site each month, Register today to find that special someone</p>
                    </div>
                </div>
            </div>


            <div className='lg:flex lg:items-center bg-pink-100 relative'>
                <div className='lg:w-1/2 lg:pr-16'>
                    <h3 className='text-black lg:text-6xl lg:mt-24 lg:ml-16 md:text-4xl md:mt-0 mobile:text-2xl mobile:ml-5 mobile:pt-10 italic font-semibold tracking-wide'>
                        What our <span className='text-pink-700 italic'>Users Say</span>
                    </h3>
                    <h1 className='text-pink-700 lg:text-8xl md:text-4xl lg:ml-16 mobile:text-4xl mobile:ml-5 italic font-semibold tracking-wide '>
                        "
                    </h1>
                    <h3 className='text-black lg:text-2xl lg:w-11/12 lg:ml-16 md:text-sm md:w-7/12 mobile:text-xs mobile:w-11/12 mobile:ml-5'>
                        MatchMaker prompts really made the difference. I felt like I got a good sense of a guy’s vibes from his answers, and it was easy to jump right into a real conversation. The MatchMaker prompts revolutionized the way online dating worked. Unlike traditional dating apps that relied heavily on shallow profiles and generic bios, MatchMaker introduced a unique approach. Instead of writing lengthy self-descriptions, users were provided with a series of thought-provoking prompts to respond to. These prompts covered a wide range of topics, from favorite travel experiences to deeply held beliefs and aspirations.
                    </h3>
                    <h3 className='text-pink-700 lg:text-2xl lg:ml-16 lg:mt-10 lg:mb-10 md:mb-0 font-semibold mobile:ml-5 mobile:pt-5 mobile:pb-6'>Helen Ann</h3>
                </div>
                <div className='absolute right-0 md:bottom-0 '>
                <img
                    className='lg:h-100 lg:w-100 md:h-500 md:w-50 mix-blend-multiply lg:visible md:visible mobile:invisible'
                    alt=''
                    src={bodyImage2}
                />
                </div>
            </div>

            <Profile />

        </>
    );
}

export default Body;