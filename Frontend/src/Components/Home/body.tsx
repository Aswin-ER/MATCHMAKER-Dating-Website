import React, { FC } from 'react'
import bodyImage from '../../assests/2760249.jpg'
import bodyImage2 from '../../assests/3753095.jpg'



const Body: FC = () => {

    return (
        <>
        
            <div className='relative'>
                <h3 className='text-black  lg:absolute lg:top-8 lg:left-104 lg:text-6xl md:absolute md:top-3 md:left-46 md:text-3xl mobile:absolute mobile:top-1 mobile:left-22 mobile:text-sm italic font-semibold tracking-wide '>Find Your <span className='text-pink-700 italic'>Real Connections</span></h3>
                <img className='max-w-full h-full' alt='' src={bodyImage} />
            </div>

            <div className='lg:h-96 lg:flex lg:justify-between md:flex md:justify-between bg-pink-900 pt-10 pb-10'>
                <div className="card lg:w-1/4 lg:h-60 md:w-1/2 md:h-1/2 bg-pink-700 text-primary-content  lg:mt-8 lg:mx-20 lg:mb-20  md:mt-5  md:mb-5 mobile:mx-10 shadow-2xl hover:bg-pink-600 transition duration-300">
                    <div className="card-body lg:mt-1">
                        <h2 className=" text-black lg:mb-5 font-bold lg:text-3xl md:text-xl">Efficient</h2>
                        <p className='text-black'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>

                <div className="card lg:w-1/4 lg:h-60 md:w-1/2 md:h-1/2 bg-pink-700 text-primary-content lg:mt-8 lg:mx-20 lg:mb-20  md:mt-5  md:mb-5 mobile:mx-10 mobile:my-8 shadow-2xl hover:bg-pink-600 transition duration-300">
                    <div className="card-body lg:mt-1 ">
                        <h2 className=" text-black lg:mb-5 font-bold lg:text-3xl md:text-xl ">Balance</h2>
                        <p className='text-black'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>  

                <div className="card lg:w-1/4 lg:h-60 md:w-1/2 md:h-1/2 bg-pink-700 text-primary-content lg:mt-8 lg:mx-20 lg:mb-20  md:mt-5 md:mb-5 mobile:mx-10 shadow-2xl hover:bg-pink-600 transition duration-300 ">
                    <div className="card-body lg:mt-1 ">
                        <h2 className=" text-black lg:mb-5 font-bold lg:text-3xl md:text-xl">Smart Blocking</h2>
                        <p className='text-black'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>
            </div>


            <div className='w-full h-full'>
            <div className='relative'>
                <h3 className='text-black  lg:absolute lg:top-18 lg:left-20 lg:text-6xl md:absolute md:top-10 md:left-16 md:text-4xl mobile:absolute mobile:top-8 mobile:left-8 mobile:text-2xl italic font-semibold tracking-wide '>What our <span className='text-pink-700 italic'>Users Say</span></h3>
                <h1 className='text-pink-700  lg:absolute lg:top-40 lg:left-20 lg:text-8xl md:absolute md:top-22 md:left-16 md:text-4xl mobile:absolute mobile:top-20 mobile:left-8 mobile:text-4xl italic font-semibold tracking-wide '>"</h1>
                <h3 className='text-black lg:absolute lg:top-62 lg:left-20 lg:text-2xl lg:w-7/12 md:absolute md:top-32 md:text-sm md:left-16 md:w-7/12 mobile:absolute mobile:top-28 mobile:left-8 mobile:text-xs mobile:w-7/12'>MatchMaker propmts really made the differnce I felt like i got a good sense of a guy’s vibes from his answers, and it was easy to jump right into a real conversation. The MatchMaker prompts revolutionized the way online dating worked. Unlike traditional dating apps that relied heavily on shallow profiles and generic bios, MatchMaker introduced a unique approach. Instead of writing lengthy self-descriptions, users were provided with a series of thought-provoking prompts to respond to. These prompts covered a wide range of topics, from favorite travel experiences to deeply held beliefs and aspirations.</h3>
                <h3 className='text-pink-700 lg:absolute lg:top-130 lg:left-20 lg:text-2xl font-semibold md:absolute md:top-84 md:left-16 mobile:absolute mobile:top-88  mobile:left-8 mobile:text-xs pb-20'>Helen Ann</h3>
                <img className='lg:h-100 lg:w-100 lg:absolute lg:right-30 lg:mt-40 mobile:w-40 mobile:h-40 mobile:absolute mobile:right-0 mobile:mt-16 md:w-70 md:h-70' alt='' src={bodyImage2} />
            </div>
            </div>

        </>
    );
}

export default Body;