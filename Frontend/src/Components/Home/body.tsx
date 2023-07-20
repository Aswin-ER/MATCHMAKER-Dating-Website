import React, { FC } from 'react'
import bodyImage from '../../assests/2760249.jpg'



const Body: FC = () => {

    return (
        <>
        
            <div className='w-full h-1/5 relative'>
                <h3 className='text-black  lg:absolute lg:top-8 lg:left-104 lg:text-6xl md:absolute md:top-3 md:left-46 md:text-3xl mobile:absolute mobile:top-1 mobile:left-22 mobile:text-sm italic font-semibold tracking-wide '>Find Your <span className='text-pink-700 italic'>Real Connections</span></h3>
                <img className='max-w-full h-full' alt='' src={bodyImage} />
            </div>

            <div className='lg:flex lg:justify-between md:flex md:justify-between bg-pink-900 pt-10 pb-10'>
                <div className="card lg:w-1/4 lg:h-80 md:w-1/4 md:h-1/2 bg-pink-700 text-primary-content lg:mt-20 lg:mx-20 lg:mb-20  md:mt-10 md:mx-10 md:mb-10 mobile:mx-10 shadow-2xl hover:bg-pink-600 transition duration-300">
                    <div className="card-body lg:mt-10 md:mt-10">
                        <h2 className=" text-black mb-5 font-bold lg:text-3xl">Efficient</h2>
                        <p className='text-black'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>

                <div className="card lg:w-1/4 lg:h-80 md:w-1/4 md:h-1/2 bg-pink-700 text-primary-content lg:mt-20 lg:mx-20 lg:mb-20  md:mt-10 md:mx-10 md:mb-10 shadow-2xl hover:bg-pink-600 transition duration-300">
                    <div className="card-body lg:mt-10 md:mt-10  ">
                        <h2 className=" text-black mb-5 font-bold lg:text-3xl ">Balance</h2>
                        <p className='text-black'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>  

                <div className="card lg:w-1/4 lg:h-80 md:w-1/4 md:h-1/2 bg-pink-700 text-primary-content lg:mt-20 lg:mx-20 lg:mb-20  md:mt-10 md:mx-10 md:mb-10 mobile:mx-10 shadow-2xl hover:bg-pink-600 transition duration-300 ">
                    <div className="card-body lg:mt-10 md:mt-10 ">
                        <h2 className=" text-black mb-5 font-bold lg:text-3xl">Smart Blocking</h2>
                        <p className='text-black'>Thousands of singles find love through our dating site each month, Register today to find that special someone on MatchMaker</p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Body;