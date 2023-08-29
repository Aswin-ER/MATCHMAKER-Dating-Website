/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Plan from 'Components/user/Plans/plans';
import Footer from 'Components/user/Footer/footer';

const Plans: FC = () => {


    return (
        <>
            <ProtectedPage />
            <Plan/>
            <Footer/>
        </>
    );
}

export default Plans;

