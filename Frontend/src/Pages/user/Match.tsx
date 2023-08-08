/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Match from 'Components/user/Match/match';

const Matches: FC = () => {

  return (
    <div>
     <ProtectedPage/>
     <Match/>
    </div>
  );
};

export default Matches;
