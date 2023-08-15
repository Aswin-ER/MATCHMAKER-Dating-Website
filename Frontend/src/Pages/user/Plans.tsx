/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Plan from 'Components/user/Plans/plans';

const Plans: FC = () => {


    return (
        <>
            <ProtectedPage />
            <Plan/>
        </>
    );
}

export default Plans;

