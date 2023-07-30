import  React,{FC, useState, useEffect} from 'react';
import { axiosInstance } from '../../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewPass:FC = ()=> {

    const navigate = useNavigate();

    const { userId, token } = useParams();
    console.log(userId, token);
    
  const [formData, setFormData] = useState({newPassword: '',confirmPassword: ''});

  useEffect(() => {

    // Make API call to get the password reset data
    fetch(`/password-reset/${userId}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, token]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();


    // Validate form data
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }


    // Prepare the data to be sent to the backend
    const passwordData = {
      userId,
      token,
      newPassword: formData.newPassword,
    };


    // Make API call to save the new password
    axiosInstance.post('/password-reset', passwordData).then((response) => {
    const data = response.data;
    console.log(data, "data stored in backend finished");
    toast.success("Password reset successfull")
    setTimeout(()=> {
      navigate('/login');
    }, 2000)
  })
  .catch((error) => {
    console.log(error);
  });
  };


   // Handle form input changes
   const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };


    return(

      <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-10">
        MATCH<span className="text-3xl md:text-5xl font-bold text-center text-pink-700 mt-6 md:mt-16">MAKER</span>
      </h1>
      <div className="container md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto px-4 mt-6 md:mt-16 bg-pink-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-pink-700 underline decoration-solid uppercase mb-10">
          Create New Password
        </h1>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-6 w-4/5">
            <label htmlFor='newPassword' className="block text-base md:text-md font-medium text-gray-800 mb-2">New Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={formData.newPassword}
              onChange={handleChange}
              name='newPassword'
              id='newPassword'
            />
          </div>

          <div className="mb-6 w-4/5">
            <label htmlFor='confirmPassword' className="block text-base md:text-md font-medium text-gray-800 mb-2">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 text-lg md:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              name='confirmPassword'
              id='confirmPassword'
            />
          </div>

          <div className="w-1/2 mt-5">
            <button type='submit' className="w-full px-1 py-2 text-lg md:text-xl font-medium text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default NewPass;