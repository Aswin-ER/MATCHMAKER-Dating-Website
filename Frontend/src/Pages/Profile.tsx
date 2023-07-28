/* eslint-disable jsx-a11y/anchor-is-valid */
import  React,{FC} from 'react';
import ProtectedPage from '../Components/Navbar/protectedPage';
import Body from '../Components/Profile/body';

 const Profile:FC = ()=> {
 

  return (
    <>
    <ProtectedPage/>
    <Body/>
    </>
  );
}

export default Profile;

