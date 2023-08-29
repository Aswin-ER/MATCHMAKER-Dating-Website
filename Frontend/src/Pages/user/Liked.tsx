/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import LikedProfiles from '../../Components/user/Liked/likedProfiles';
import Footer from 'Components/user/Footer/footer';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <LikedProfiles/>
     <Footer/>
    </div>
  );
};

export default Home;
