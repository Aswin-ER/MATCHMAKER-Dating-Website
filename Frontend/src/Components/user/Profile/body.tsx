import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RootState from '../../../Redux/rootState';
import { axiosInstance } from '../../../api/axiosInstance';

const Body: FC = () => {

    // Images of user
    const [image, setImages] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file: any = e.target.files[0];
            console.log(file)
            setImages(file);
        }
    };


    //Username 
    const user: any = useSelector((state: RootState) => state.userCred.userCred);
    const userName: string | null = user?.name ?? null;


    //Textarea About user
    const [text, setText] = useState<string>('');
    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    //Textarea passion 
    const [passion, setPassion] = useState<string>('');
    const handlePassion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassion(e.target.value);
    }

    //Gender
    const [gender, setGender] = useState<string>('');
    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    }

    //Looking htmlFor
    const [looking, setLooking] = useState<string>('');
    const handleLookingFor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLooking(e.target.value);
    }

    //Langauge
    const [language, setLanguage] = useState<string>('');
    const handleLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(e.target.value);
    }

    //Life style
    const [lifeStyle, setLifeStyle] = useState<string>('');
    const handleLifeStyle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLifeStyle(e.target.value);
    }

    //Age
    const [age, setAge] = useState<any>(0);
    const handleAge = (e: any) => {
        setAge(Number(e.target.value));
    }

    //Textarea Company
    const [company, setCompany] = useState<string>('');
    const handleCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value);
        console.log(text, "text here")
    }

    //Textarea school
    const [school, setSchool] = useState<string>('');
    const handleSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSchool(e.target.value);
    }

    //Textarea job
    const [job, setJob] = useState<string>('');
    const handleJob = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJob(e.target.value);
    }

    //Textarea living In
    const [place, setPlace] = useState<string>('');
    const handlePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlace(e.target.value);
        console.log(text, "text here")
    }


    const handleData = () => {
        console.log('vannu ivede')
        const formData = new FormData();

        function appendField(fieldName: string, fieldValue: any): any {
            if (fieldValue) {
                formData.append(fieldName, fieldValue);
            }
        }

        appendField('image', image);
        appendField('about', text);
        appendField('gender', gender);
        appendField('relationshipGoals', looking);
        appendField('passion', passion);
        appendField('age', age);
        appendField('language', language);
        appendField('lifeStyle', lifeStyle);
        appendField('job', job);
        appendField('company', company);
        appendField('school', school);
        appendField('place', place);

        console.log(formData, "formdata here")

        axiosInstance.post('/userProfile', formData).then((res) => {
            console.log(res)
            if (res.data.message) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        })
    }


    useEffect(() => {
        axiosInstance.get('/userProfile').then((res) => {
            console.log(res.data, "user data hereeeeeeeeeeeeeeeeeeee");
            if (res.data) {
                setImages((prevState) => res.data.image)
                setText((prevState) => res.data.about)
                setAge((prevState: any) => res.data.age);
                setGender((prevState) => res.data.gender);
                setLanguage((prevState) => res.data.language);
                setLifeStyle((prevState) => res.data.lifeStyle);
                setPassion((prevState) => res.data.passion);
                setJob((prevState) => res.data.job);
                setCompany((prevState) => res.data.company);
                setPlace((prevState) => res.data.place);
                setSchool((prevState) => res.data.school);
                setLooking((prevState) => res.data.relationshipGoals);
            }

        })
    }, [])


    return (
        <>
            <section className="max-w-4xl p-6 lg:mx-auto mobile:mx-6 md:mx-20 bg-gradient-to-r from-gray-900 to-pink-700 rounded-md shadow-md dark:bg-gray-800 mt-20 mb-20">
                <h1 className="text-2xl font-bold text-white capitalize dark:text-white mb-10">User Profile</h1>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white">
                            Profile Picture
                        </label>
                        <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-4 border-dashed border-white rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-300 flex-col">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span className="block">Upload Profile Pic</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
                                    </label>
                                    <div className='mt-10'>
                                        <img src={image} alt='' className='w-50 h-50'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">About {userName ? userName : 'you'}</label>
                            <textarea id="textarea" typeof="textarea" cols={30} rows={5} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleTextarea} value={text} required></textarea>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Gender</label>
                            <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleGender} value={gender} required>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="password">Relationship Goals</label>
                            <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleLookingFor} value={looking} required>
                                <option value="">Looking htmlFor</option>
                                <option value="Long-term partne">Long-term partner</option>
                                <option value="Short-term fun">Short-term fun</option>
                                <option value="New friends">New friends</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passion">Passions</label>
                            <input id="passion" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handlePassion} value={passion} required />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="age">Age</label>
                            <input id="age" type="number" min={18} max={50} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleAge} value={age} required />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="language">Language I know</label>
                            <input id="language" typeof="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleLanguage} value={language} required></input>
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="lifestyle">Life style</label>
                            <input id="lifestyle" typeof="textarea" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleLifeStyle} value={lifeStyle} required></input></div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="jobTitle">Job title</label>
                            <input id="jobTitle" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleJob} value={job} required />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="company">Company</label>
                            <input id="company" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleCompany} value={company} required />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="education">Education</label>
                            <input id="education" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handleSchool} value={school} required />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="place">Place</label>
                            <input id="place" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={handlePlace} value={place} required />
                        </div>

                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-pink-800" onClick={handleData}>Save</button>
                    </div>
            </section>

        </>
    );
}

export default Body;