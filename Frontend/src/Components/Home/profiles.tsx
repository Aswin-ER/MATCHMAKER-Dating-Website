import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { UserCred } from '../../Redux/slice';
import RootState from '../../Redux/rootState';
import { toast } from 'react-toastify';

const Profile: FC = () => {

    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);

    console.log(user)

    const handleClick = ()=> {
        toast.info('Login to see Profiles');
    }

    const handleSeeMore = ()=> {
        toast.info('Verify Your Profile to see others Profile')
    }

    return (
        <>

            <div className="flex min-h-screen items-center justify-center bg-neutral-800 relative">

            <h3 className='text-white lg:text-6xl font-semibold italic lg:absolute lg:top-10 lg:mt-5 mobile:absolute mobile:top-0 mobile:text-4xl mobile:mt-16' >Find your <span className='text-pink-700 italic'>Match Here</span></h3>

                <div className="grid grid-cols-1 lg:gap-40 md:grid-cols-2 lg:grid-cols-3 lg:mt-10 mobile:mt-40 mobile:gap-16">

                    {
                        user ? 

                    <div className="group relative  cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                        <div className="h-98 w-82">
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="text-2xl font-semibold text-white lg:mb-16">Beauty</h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60" onClick={handleSeeMore}>See More</button>
                        </div>
                    </div> 
                    :
                    <div className="group relative blur-sm cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30" onClick={handleClick}>
                        <div className="h-98 w-82">
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="text-2xl font-semibold text-white lg:mb-16">Beauty</h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>
                    </div> 

                    }
                    
                    {
                        user ? 

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                        <div className="h-98 w-82">
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="text-2xl font-semibold text-white lg:mb-16">Beyond Builder</h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60"onClick={handleSeeMore}>See More</button>
                        </div>
                    </div>
                    :
                    <div className="group relative blur-sm cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30" onClick={handleClick}>
                        <div className="h-98 w-82">
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className="text-2xl font-semibold text-white lg:mb-16">Beyond Builder</h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>
                    </div>

                    }
                    
                    {
                        user ?

                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                        <div className="h-98 w-82">
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className=" text-2xl font-semibold   text-white lg:mb-16">Shooting Star</h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60" onClick={handleSeeMore}>See More</button>
                        </div>
                    </div>
                    :
                    <div className="group relative blur-sm cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30" onClick={handleClick}>
                        <div className="h-98 w-82">
                            <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src="https://images.unsplash.com/photo-1502675135487-e971002a6adb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            <h1 className=" text-2xl font-semibold   text-white lg:mb-16">Shooting Star</h1>
                            <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                            <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button>
                        </div>
                    </div>
                    }


                </div>

            </div>


        </>
    );
}

export default Profile;