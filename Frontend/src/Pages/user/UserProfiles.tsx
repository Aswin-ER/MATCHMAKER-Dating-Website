/* eslint-disable jsx-a11y/anchor-is-valid */
import  React,{FC} from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Profile from '../../Components/user/Home/profiles';
import Footer from 'Components/user/Footer/footer';

 const UserProfiles:FC = ()=> {
 

  return (
    <>
    <ProtectedPage/>
    <Profile/>
    <Footer/>
    </>
  );
}

export default UserProfiles;

