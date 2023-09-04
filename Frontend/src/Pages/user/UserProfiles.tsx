/* eslint-disable jsx-a11y/anchor-is-valid */
import  React,{FC} from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Footer from 'Components/user/Footer/footer';
import FilterProfile from 'Components/user/FilterProfile/filterProfile';

 const UserProfiles:FC = ()=> {
 

  return (
    <>
    <ProtectedPage/>
    <FilterProfile/>
    <Footer/>
    </>
  );
}

export default UserProfiles;

