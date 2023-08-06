import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RootState from '../../../Redux/rootState';
import { axiosInstance } from '../../../api/axiosInstance';
import { AiFillEdit } from 'react-icons/ai'

const Body: FC = () => {

    // Images of user
    const [image, setImages] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<any>()

    const [image1, setImages1] = useState<string>('');
    const [img1, setImg1] = useState<string>('');
    const [selectedImage1, setSelectedImage1] = useState<any>()

    const [image2, setImages2] = useState<string>('');
    const [img2, setImg2] = useState<string>('');
    const [selectedImage2, setSelectedImage2] = useState<any>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file: any = e.target.files[0];
            console.log(file)
            setImages(file);
            setSelectedImage(URL.createObjectURL(file));
            setVerify((prev) => !prev);

        }
    };


    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file: any = e.target.files[0];
            console.log(file)
            setImages1(file);
            setSelectedImage1(URL.createObjectURL(file));
            setVerify1((prev) => !prev);
        }
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file2: any = e.target.files[0];
            console.log(file2)
            setImages2(file2);
            setSelectedImage2(URL.createObjectURL(file2));
            setVerify2((prev) => !prev);
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

    // State for validation
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    console.log(emptyFields)

    const handleData = () => {

        // Reset previous empty fields
        setEmptyFields([]);

        // Check for empty fields
        const requiredFields = [
            'image',
            'about',
            'gender',
            'relationshipGoals',
            'passion',
            'age',
            'language',
            'lifeStyle',
            'job',
            'company',
            'school',
            'place'
        ];

        const formData = new FormData();
        function appendField(fieldName: string, fieldValue: any): any {
            if (fieldValue) {
                formData.append(fieldName, fieldValue);
            }
        }

        appendField('image', image);
        appendField('image', image1);
        appendField('image', image2);
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

        const emptyFieldsList: string[] = [];
        requiredFields.forEach(field => {
            if (!formData.get(field)) {
                emptyFieldsList.push(field);
            }
        });

        if (emptyFieldsList.length > 0) {
            setEmptyFields(emptyFieldsList); // Update empty fields state with the list of empty fields
            toast.info("Please verify all fields");
            return;
        }

        axiosInstance.post('/userProfile', formData).then((res) => {
            console.log(res, "response")
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
                setImages((prevState) => res.data?.image?.[0])
                setImg((prevState) => res.data?.image?.[0])
                setImages1((prevState) => res.data?.image?.[1])
                setImg1((prevState) => res.data?.image?.[1])
                setImages2((prevState) => res.data?.image?.[2])
                setImg2((prevState) => res.data?.image?.[2])
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

    const [verify, setVerify] = useState<boolean>();
    const [verify1, setVerify1] = useState<boolean>();
    const [verify2, setVerify2] = useState<boolean>();

    const handlePic = () => {
        setVerify((prev) => !prev);
    }

    const handlePic1 = () => {
        setVerify1((prev) => !prev);
    }

    const handlePic2 = () => {
        setVerify2((prev) => !prev);
    }

    return (
        <>
            <section className="max-w-4xl p-6 lg:mx-auto mobile:mx-6 md:mx-20 bg-gradient-to-r from-gray-900 to-pink-700 rounded-md shadow-md dark:bg-gray-800 mt-20 mb-20">
                <h1 className="text-2xl font-semibold text-white capitalize dark:text-white mb-10 flex justify-center">USER PROFILE</h1>
                <div className="mb-6">
                    <h1 className="block text-lg font-medium text-white">
                        Fill all the details and verify your profile
                    </h1>
                    <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-solid border-white rounded-md">
                        <div className="space-y-1 text-center">
                            {
                                image ?
                                    <h1 className='text-2xl text-white font-medium font-mono'>Uploaded Profile Pics</h1>
                                    :
                                    <h1 className='text-2xl text-white font-medium font-mono'>Upload Profile Pics</h1>
                            }
                            <div className="text-sm text-gray-300 flex-col">
                                <div className='flex gap-5 mobile:flex-col lg:flex-row lg:justify-center md:flex-row md:justify-center'>

                                    <div className='mt-5 border-white border-2 border-dashed w-50 mobile:flex-col'>
                                        {
                                            selectedImage ?
                                                <img src={selectedImage} alt='' className='w-50 h-50'></img>
                                                :
                                                <img src={image} alt='' className='w-50 h-50'></img>
                                        }


                                        {
                                            img?.length > 0 ?
                                                <>
                                                    <div className='flex bg-black cursor-pointer' onClick={handlePic} >
                                                        <AiFillEdit className='bg-black w-8 h-5' />
                                                        <p className='bg-black ml-11'>Edit pic</p>
                                                    </div>
                                                </>
                                                : selectedImage?.length > 0 ?
                                                    ""
                                                    :
                                                    <label htmlFor="file-upload1" className="relative cursor-pointer rounded-md font-medium">
                                                        <span className="block bg-pink-800 hover:bg-pink-500 text-white">Upload Profile Pic</span>
                                                        <input id="file-upload1" name="image" type="file" className="sr-only" onChange={handleChange} />
                                                    </label>

                                        }

                                        {
                                            (img && verify) ?
                                                <label htmlFor="file-upload1" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span className="block bg-pink-800 hover:bg-pink-500 text-white">Upload Profile Pic</span>
                                                    <input id="file-upload1" name="image" type="file" className="sr-only" onChange={handleChange} />
                                                </label>
                                                :
                                                ""
                                        }


                                    </div>


                                    <div className='mt-5 border-white border-2 border-dashed w-50'>
                                        {
                                            selectedImage1 ?
                                                <img src={selectedImage1} alt='' className='w-50 h-50'></img>
                                                :
                                                <img src={image1} alt='' className='w-50 h-50'></img>
                                        }

                                        {
                                            img1?.length > 0 ?
                                                <>
                                                    <div className='flex bg-black cursor-pointer' onClick={handlePic1} >
                                                        <AiFillEdit className='bg-black w-8 h-5' />
                                                        <p className='bg-black ml-11'>Edit pic</p>
                                                    </div>
                                                </>
                                                : selectedImage1?.length > 0 ?
                                                    ""
                                                    :
                                                    <label htmlFor="file-upload1" className="relative cursor-pointer rounded-md font-medium">
                                                        <span className="block bg-pink-800 hover:bg-pink-500 text-white">Upload Profile Pic</span>
                                                        <input id="file-upload1" name="image" type="file" className="sr-only" onChange={handleChange1} />
                                                    </label>
                                        }

                                        {
                                            (img1 && verify1) ?
                                                <label htmlFor="file-upload1" className="relative cursor-pointerrounded-md font-medium">
                                                    <span className="block bg-pink-800 hover:bg-pink-500 text-white">Upload Profile Pic</span>
                                                    <input id="file-upload1" name="image" type="file" className="sr-only" onChange={handleChange1} />
                                                </label>
                                                :
                                                ""
                                        }

                                    </div>


                                    <div className='mt-5 border-2 border-dashed w-50'>
                                        {
                                            selectedImage2 ?
                                                <img src={selectedImage2} alt='' className='w-50 h-50'></img>
                                                :
                                                <img src={image2} alt='' className='w-50 h-50'></img>

                                        }

                                        {
                                            img2?.length > 0 ?
                                                <>
                                                    <div className='flex bg-black cursor-pointer' onClick={handlePic2} >
                                                        <AiFillEdit className='bg-black w-8 h-5' />
                                                        <p className='bg-black ml-11'>Edit pic</p>
                                                    </div>
                                                </>
                                                : selectedImage2?.length > 0 ?
                                                    ""
                                                    :
                                                    <label htmlFor="file-upload1" className="relative cursor-pointer rounded-md font-medium">
                                                        <span className="block bg-pink-800 hover:bg-pink-500 text-white">Upload Profile Pic</span>
                                                        <input id="file-upload1" name="image" type="file" className="sr-only" onChange={handleChange2} />
                                                    </label>
                                        }

                                        {
                                            (img2 && verify2) ?
                                                <label htmlFor="file-upload1" className="relative cursor-pointer bg-white rounded-md font-medium">
                                                    <span className="block bg-pink-800 hover:bg-pink-500 text-white">Upload Profile Pic</span>
                                                    <input id="file-upload1" name="image" type="file" className="sr-only" onChange={handleChange2} />
                                                </label>
                                                :
                                                ""
                                        }

                                    </div>
                                </div>
                                <h1 className='mt-5 text-md'>Upload image size less than or upto 10MB</h1>
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
                            <option value=''>Select gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-white dark:text-gray-200" htmlFor="password">Relationship Goals</label>
                        <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={handleLookingFor} value={looking} required>
                            <option value="">Select Relationship Goals</option>
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