/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import ProtectedPage from '../../Components/user/Navbar/protectedPage';
import Chat from 'Components/user/Chat/body';

const ChatPage: FC = () => {


    return (
        <>
            <ProtectedPage />
            <Chat/>
        </>
    );
}

export default ChatPage;

