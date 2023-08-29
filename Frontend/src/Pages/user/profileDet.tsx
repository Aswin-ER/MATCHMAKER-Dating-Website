/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Body from '../../Components/user/ProfileDet/body';
import Footer from 'Components/user/Footer/footer';

const ProfileDet: FC = () => {


    return (
        <>
            <ProtectedPage />
            <Body/>
            <Footer/>
        </>
    );
}

export default ProfileDet;

