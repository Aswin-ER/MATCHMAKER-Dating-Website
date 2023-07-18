import  React,{FC, useState, useEffect} from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const NewPass:FC = ()=> {

    const navigate = useNavigate();

    const { userId, token } = useParams();
    console.log(userId, token);
    
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

//   const [resetData, setResetData] = useState(null);

  useEffect(() => {

    // Make API call to get the password reset data
    fetch(`/password-reset/${userId}/${token}`)
      .then((response) => response.json())
      .then((data) => {
        // setResetData(data);
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
      alert('Passwords do not match');
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
    navigate('/login');
  })
  .catch((error) => {
    console.log(error);
  });
  };

   // Handle form input changes
   const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    return(
        <div>
            <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='newPassword'>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            id='newPassword'
          />
        </div>
        <div>
          <label htmlFor='Password'>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            id='password'
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
        </div>
    )
}

export default NewPass;