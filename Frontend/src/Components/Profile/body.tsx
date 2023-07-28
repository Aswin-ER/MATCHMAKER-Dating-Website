import React, { FC, useEffect, useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RootState from '../../Redux/rootState';
import { axiosInstance } from '../../api/axiosInstance';

const Body: FC = () => {

    // Images of user
    const [image, setImages] = useState<string>('');
    // const [image1, setImages1] = useState<string>('');
    // const [image2, setImages2] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file : any = e.target.files[0];
          console.log(file)
          setImages(file);
        }
      };

    // const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //       const file: any = e.target.files[0];
    //       setImages1(file);
    //     }
    //   };

    // const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //       const file: any = e.target.files[0];
    //       setImages2(file);
    //     }
    //   };


    //Username 
      const user: any = useSelector((state: RootState) => state.userCred.userCred);
      const userName: string | null = user?.name ?? null;

      
    //Textarea About user
      const [text, setText] = useState<string>('');
      const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setText(e.target.value);
      }

    //Textarea passion 
    const [passion, setPassion] = useState<string>('');
    const handlePassion = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
     setPassion(e.target.value);
    }

    //Gender
    const [gender, setGender] = useState<string>('');
    const handleGender = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setGender(e.target.value);
    }

     //Looking For
     const [looking, setLooking] = useState<string>('');
     const handleLookingFor = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setLooking(e.target.value);
     }

     //Langauge
     const [language, setLanguage] = useState<string>('');
     const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setLanguage(e.target.value);
     }

     //Life style
     const [lifeStyle, setLifeStyle] = useState<string>('');
     const handleLifeStyle = (e: React.ChangeEvent<HTMLSelectElement>)=> {
        setLifeStyle(e.target.value);
     }

     //Age
     const [age, setAge] = useState<any>(0);
     const handleAge = (e: any)=> {
        setAge(Number(e.target.value));
     }

     //Textarea Company
     const [company, setCompany] = useState<string>('');
     const handleCompany = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setCompany(e.target.value);
       console.log(text,"text here")
     }

     //Textarea school
     const [school, setSchool] = useState<string>('');
     const handleSchool = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setSchool(e.target.value);
     }

     //Textarea job
     const [job, setJob] = useState<string>('');
     const handleJob = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setJob(e.target.value);
     }

     //Textarea living In
     const [place, setPlace] = useState<string>('');
     const handlePlace = (e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setPlace(e.target.value);
       console.log(text,"text here")
     }

     //Show Age
    //  const [showAge, setShowAge] = useState<boolean>(false);
    //  const handleShowAge = (e: any)=> {
    //     setShowAge(e.target.checked);
    //  }

     //Show Distance
    //  const [showDistance, setShowDistance] = useState<boolean>(false);
    //  const handleShowDistance = (e: any)=> {
    //     setShowDistance (e.target.checked);
    //  }


     const handleData = ()=> {
        
        
        const formData = new FormData();

        // Helper function to append a field if it has a valid value
        function appendField(fieldName:string, fieldValue:any):any {
            if (fieldValue) {
              formData.append(fieldName, fieldValue);
            }
          }

          appendField('image',image);
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
          
        console.log(formData,"formdata here")

        axiosInstance.post('/userProfile',formData).then((res)=> {
            console.log(res)
            if(res.data.message){
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        })
     }


     useEffect(()=> {

        axiosInstance.get('/userProfile').then((res)=> {
            console.log(res.data, "user data hereeeeeeeeeeeeeeeeeeee");
            if(res.data){
                setImages((prevState)=> res.data.image)
                setText((prevState)=> res.data.about)
                setAge((prevState: any)=> res.data.age);
                setCompany((prevState)=> res.data.company);
                setGender((prevState)=> res.data.gender);
                setJob((prevState)=> res.data.job);
                setLanguage((prevState)=> res.data.language);
                setLifeStyle((prevState)=> res.data.lifeStyle);
                setPassion((prevState)=> res.data.passion);
                setPlace((prevState)=> res.data.place);
                setSchool((prevState)=> res.data.school);
                setLooking((prevState)=> res.data.relationshipGoals);
                // setShowAge(()=> res.data.showAge);
                // setShowDistance(()=> res.data.showDistance);
            }
            
        })
     }, [])


    return (
        <>
            <h1 className='text-black lg:text-5xl font-semibold lg:mt-10 flex justify-center mb-10'>Edit Profile</h1>
            <div className='flex flex-col justify-center bg-pink-100 w-full pb-18'>
                <h1 className='text-black flex justify-center mt-10'>Add images</h1>
            </div>

            {/* images  */}
            <div className='flex  justify-center bg-pink-100 w-full pb-30'>
                <div className='bg-black w-2/12 h-80 mx-20'>
                    <label htmlFor="imageInput" className='relative'>
                        <CiCirclePlus className='absolute left-60 top-74 w-7 h-7 bg-black text-white rounded-3xl' />
                    </label>
                    <input type="file" id='imageInput' className='hidden' onChange={handleChange}/>
                    <img src={image} alt='' className='w-full h-full'></img>
                </div>

                {/* <div className='bg-black w-2/12 h-80 mx-20'>
                    <label htmlFor="imageInput1" className='relative'>
                        <CiCirclePlus className='absolute left-60 top-74 w-7 h-7 bg-black text-white rounded-3xl' />
                    </label>
                    <input type="file" id='imageInput1' className='hidden' onChange={handleChange1} />
                    <img src={image1} alt='' className='w-full h-full'></img>
                </div>

                <div className='bg-black w-2/12 h-80 mx-20'>
                    <label htmlFor="imageInput2" className='relative'>
                        <CiCirclePlus className='absolute left-60 top-74 w-7 h-7 bg-black text-white rounded-3xl' />
                    </label>
                    <input type="file" id='imageInput2' className='hidden' onChange={handleChange2} />
                    <img src={image2} alt='' className='w-full h-full'></img>
                </div> */}
            </div>


            <div>
                <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-8 ml-20'>About {userName ? userName : 'you'}</h1>
                <textarea name="" id="" className='text-lg ml-20 mb-10 outline px-10' cols={60} rows={7} style={{ paddingTop: '20px' }} placeholder='Do not include social media handles or other contact information in your profile.'
                onChange={handleTextarea} value={text} required></textarea>
            </div>

            {/* Gender  */}
            <div className='flex justify-start gap-80 mb-10'>
                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Gender</h1>
                    <select name="gender" id="gender" className='ml-20 w-12/12 h-10 mb-10' onChange={handleGender} value={gender} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Relationship Goals</h1>
                    <select name="looking" id="looking" className='ml-20 w-12/12 h-10 mb-10' onChange={handleLookingFor} value={looking}  required>
                        <option value="">Looking For</option>
                        <option value="Long-term partne">Long-term partner</option>
                        <option value="Short-term fun">Short-term fun</option>
                        <option value="New friends">New friends</option>
                    </select>
                </div>

                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Passions</h1>
                    <textarea name="" id="" className='text-lg ml-20 mb-10 outline ' cols={20} rows={1} onChange={handlePassion} value={passion} required></textarea>
                </div>
            </div>

            {/* Age  */}
            <div>
                <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Age</h1>
                <input type="number" className='text-lg ml-20 mb-10 outline'onChange={handleAge} value={age} required/>
            </div>


            <div className='flex-col justify-start gap-80 mb-10'>
                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Languages i know</h1>
                    <select name="gender" id="gender" className='ml-20 w-12/12 h-10 mb-10'onChange={handleLanguage} value={language} required> 
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Tamil">Tamil</option>
                    </select>
                </div>

                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Life style</h1>
                    <select name="" id="gender" className='ml-20 w-12/12 h-10 mb-10'onChange={handleLifeStyle} value={lifeStyle} required>
                        <option value="">Looking For</option>
                        <option value="Long-term partner">Long-term partner</option>
                        <option value="Short-term fun">Short-term fun</option>
                        <option value="New friends">New friends</option>
                    </select>
                </div>

                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Job title</h1>
                    <textarea name="" id="" className='text-lg ml-20 mb-10 outline ' cols={20} rows={1} onChange={handleJob} value={job} required></textarea>
                </div>
            </div>

            <div className='flex justify-start gap-80 mb-10'>
                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Company</h1>
                    <textarea name="" id="" className='text-lg ml-20 mb-10 outline ' cols={20} rows={1} onChange={handleCompany} value={company} required ></textarea>
                </div>

                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>School</h1>
                    <textarea name="" id="" className='text-lg ml-20 mb-10 outline ' cols={20} rows={1} onChange={handleSchool} value={school} required></textarea>
                </div>

                <div>
                    <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-6 ml-20'>Living in</h1>
                    <textarea name="" id="" className='text-lg ml-20 mb-10 outline ' cols={20} rows={1} onChange={handlePlace} value={place} required></textarea>
                </div>
            </div>


            <div className=' bg-pink-100 w-full pt-5 pb-5 flex flex-col mb-10'>
                <h1 className='text-black lg:text-4xl font-semibold lg:mt-10 flex mb-8 ml-20'>Control your profile</h1>
                {/* <label className='switch-label text-black lg:text-lg font-semibold lg:mt-10 flex ml-20'>
                    <input type='checkbox' name='ageVisibility' onChange={handleShowAge} checked={showAge} required /> Show my Age
                    <span className='switch'></span>
                </label>
                <label className='switch-label text-black lg:text-lg font-semibold mb-10 flex ml-20'>
                    <input type='checkbox' name='distanceVisibility' onChange={handleShowDistance} checked={showDistance} required /> Show my Distance
                    <span className='switch'></span>
                </label> */}
                <div className='flex justify-center mb-10'>
                <button className='text-black font-semibold hover:bg-pink-600 bg-pink-700 rounded p-2 text-2xl' onClick={handleData}>Save Changes</button>
                </div>
            </div>


        </>
    );
}

export default Body;