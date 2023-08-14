/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Body from '../../Components/user/Home/body';
import Premium from 'Components/user/Home/premium';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <Body/>
     <Premium/>
    </div>
  );
};

export default Home;
