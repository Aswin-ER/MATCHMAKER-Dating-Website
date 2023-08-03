/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import LikedProfiles from '../../Components/user/Liked/likedProfiles';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <LikedProfiles/>
    </div>
  );
};

export default Home;
