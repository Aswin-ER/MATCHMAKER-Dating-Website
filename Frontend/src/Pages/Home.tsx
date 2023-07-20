/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../Components/Navbar/protectedPage';
import Body from '../Components/Home/body';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <Body/>
    </div>
  );
};

export default Home;
