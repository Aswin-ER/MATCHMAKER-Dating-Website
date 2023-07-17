/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../Components/Navbar/protectedPage';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
    </div>
  );
};

export default Home;
