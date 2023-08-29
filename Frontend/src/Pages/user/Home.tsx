/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Body from '../../Components/user/Home/body';
import Premium from 'Components/user/Home/premium';
import Footer from 'Components/user/Footer/footer';

const Home: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <Body/>
     <Premium/>
     <Footer/>
    </div>
  );
};

export default Home;
