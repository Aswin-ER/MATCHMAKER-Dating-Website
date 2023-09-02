import React, { FC } from 'react'
import bodyImage from '../../../assests/2796437.jpg'
import { useNavigate } from 'react-router-dom'

const Premium: FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className=' grid grid-col-12 grid-row-12 pt-20 pb-18 bg-pink-100'>
                <div className='grid col-start-1 col-end-12 row-start-1 row-end-3'>
                    <h1 className='lg:text-6xl md:text-4xl mobile:text-2xl font-semibold text-black text-center mb-16'>Premium <span className='text-pink-700'>Membership</span></h1>
                </div>
                <div className='grid col-start-2 col-end-5 row-start-3 row-end-12 w-full mix-blend-multiply'>
                    <img src={bodyImage} alt="" />
                </div>
                <div className='grid col-start-9 col-end-11 row-start-3 row-end-4 lg:items-center  w-10/12 lg:mt-50 md:mt-16'>
                    <p className='lg:text-2xl md:text-lg mobile:text-sm font-medium text-black'>Enjoy the benefits of our dating services membereship! Use the psychological matching to find the best people and experience other great bonuses.</p>
                    <button className='lg:text-lg bg-pink-700 hover:bg-pink-500 font-medium lg:mb-50 lg:w-3/12 md:w-4/12 mobile:w-7/12 lg:p-1 mobile:mt-4 text-center text-black' onClick={() => navigate('/plans')}>View Plans</button>
                </div>
            </div>
        </>
    );
}

export default Premium;