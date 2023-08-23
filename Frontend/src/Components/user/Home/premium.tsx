import React, { FC } from 'react'
import bodyImage from '../../../assests/2796437.jpg'
import { useNavigate } from 'react-router-dom'

const Premium: FC = () => {

    const navigate = useNavigate();


    return (
        <>
            <div className=' grid grid-col-12 grid-row-12 mt-20 mb-18'>
                <div className='grid col-start-1 col-end-12 row-start-1 row-end-3'>
                    <h1 className='text-6xl font-semibold text-black text-center mb-16'>Premium <span className='text-pink-700'>Membership</span></h1>
                </div>
                <div className='grid col-start-6 col-end-9 row-start-3 row-end-12 w-full'>
                    <img src={bodyImage} alt="" />
                </div>
                <div className='grid col-start-9 col-end-11 row-start-3 row-end-4 items-center w-10/12 mt-50'>
                    <p className='text-2xl font-medium'>Enjoy the benefits of our dating services membereship! Use the psychological matching to find the best people and experience other great bonuses.</p>
                    <button className='text-lg bg-pink-700 hover:bg-pink-500 font-medium mb-50 w-3/12 p-1 text-center' onClick={() => navigate('/plans')}>View Plans</button>
                </div>
            </div>
        </>
    );
}

export default Premium;