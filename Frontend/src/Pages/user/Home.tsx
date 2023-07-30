/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Body from '../../Components/user/Home/body';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <Body/>
    </div>
  );
};

export default Home;
