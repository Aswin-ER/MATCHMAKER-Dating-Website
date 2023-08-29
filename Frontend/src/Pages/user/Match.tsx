/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Match from 'Components/user/Match/match';
import Footer from 'Components/user/Footer/footer';

const Matches: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <Match/>
     <Footer/>
    </div>
  );
};

export default Matches;
