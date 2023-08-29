/* eslint-disable jsx-a11y/anchor-is-valid */
import  React,{FC} from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Body from '../../Components/user/Profile/body';
import Footer from 'Components/user/Footer/footer';

 const Profile:FC = ()=> {
 

  return (
    <>
    <ProtectedPage/>
    <Body/>
    <Footer/>
    </>
  );
}

export default Profile;

