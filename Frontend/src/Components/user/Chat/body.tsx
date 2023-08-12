/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import RootState from 'Redux/rootState';
import { UserCred } from 'Redux/slice';
import { axiosInstance } from 'api/axiosInstance';
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001';

var socket: any, selectedChatCompare: any;

const Chat: FC = () => {


    const user: UserCred | any = useSelector((state: RootState) => state.userCred.userCred);
    const userID = user?._id;
    console.log(userID, "userid in chat")

    const [messages, setMessages] = useState<string[]>([]);

    const [input, setInput] = useState<string>();

    const [oppoId, setOppoId] = useState<string>();

    const [matched, setMatched] = useState<any>();

    const [chatId, setChatId] = useState<string>('');

    const [isSocket, isSocketConnected] = useState<boolean>();

    useEffect(() => {
        console.log("reached user")
        socket = io(ENDPOINT);
        console.log(userID, "user in the house")

        socket.emit('setup', userID);
        socket.on('connection', () => isSocketConnected(true));

    }, [userID]);


    const handleInput = (e: any) => {
        setInput((prev) => e.target.value);
    }

    const sendMessage = async () => {
        if (input) {
            try {
                const res = await axiosInstance.post('/message', { content: input, chatId: chatId, oppoId: oppoId });
                const message: any = res;
                setInput("");
                socket.emit("new message", res.data)
                // console.log(message.data, "sendMessage")
                setMessages([...messages, message.data.content]);


            } catch (error) {
                console.error("Error sending message:", error);
                toast.error("Send message failed")
            }
        }
    }

    const handleChat = (id: any) => {
        const oppoId = id;
        setOppoId(oppoId)

        try {
            axiosInstance.post('/getChatId', { oppoId: oppoId }).then((res) => {
                setChatId((prev) => res.data._id)

            }).catch((err) => {
                console.log(err, "error")
            })

        } catch (err) {
            console.log(err, "id herer")
        }
    }

    console.log(oppoId, "oppoId")

    useEffect(() => {
        axiosInstance.get('/getMatchedUserProfiles').then((res) => {
            setMatched(res.data);
        })
    }, []);

    console.log(chatId, "chatId");


    const fetchMessage = () => {
        try {
            const id = chatId;
            axiosInstance.get(`/message/${id}`).then((res) => {
                console.log(res.data, "all messages")
                const contentArray = res.data.map((obj: { content: any; }) => obj.content);
                // console.log(contentArray, "setmessage");

                setMessages((prev) => [...prev, ...contentArray]);

                socket.emit('join chat', chatId)

            }).catch((err) => {
                console.log(err, "Unexpected error")
            })
        } catch (err) {
            console.log(err, "message");
        }
    }


    useEffect(() => {
        if (chatId){
            fetchMessage();
            selectedChatCompare = chatId;
        }
    }, [chatId])

    useEffect(() => {
        socket.on('message received', (newMessageRecieved: any) => {

            if (!chatId || chatId !== newMessageRecieved.chat._id) {
                console.log("bihahaha", newMessageRecieved);
            } else {
                console.log("perfect ok", newMessageRecieved);
                setMessages([...messages, newMessageRecieved.content]);
            }
        })
    })


    console.log(messages, "full message")

    return (
        <>
            <div className="flex h-screen antialiased text-gray-800">
                <div className="flex flex-row h-3/4  w-full overflow-x-hidden">
                    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                        <div className="flex flex-row items-center justify-center h-12 w-full">
                            <div
                                className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="ml-2 font-bold text-2xl">Matched Users</div>
                        </div>

                        {/* User listing area */}

                        <div className="flex flex-col mt-8">
                            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-100 overflow-y-auto">

                                {
                                    matched?.map((match: any, index: number) => {
                                        return (

                                            <button key={index}
                                                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                                onClick={() => handleChat(match.user)} >
                                                <div
                                                    className="flex items-center justify-center h-8 w-10 bg-indigo-200 rounded-full mx-5"
                                                >
                                                    <img src={match.image[0]} alt='' className='rounded'></img>
                                                </div>
                                                <div className="ml-2 text-sm font-semibold" >{match.name}</div>
                                            </button>
                                        )
                                    })
                                }

                            </div>
                            <div className="flex flex-col space-y-1 mt-4 -mx-2">
                                <button
                                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                >
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Messaging area here */}
                    <div className="flex flex-col flex-auto h-full p-6">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">

                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                {
                                    messages?.map((message: any, index) => {
                                        return (

                                            <div className="flex flex-col h-full" key={index}>
                                                <div className="grid grid-cols-12 gap-y-2">
                                                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                        <div className="flex items-center justify-start flex-row-reverse">
                                                            <div
                                                                className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                            >
                                                                {/* <img src={}></img> */}
                                                            </div>
                                                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                <div>
                                                                    {message}
                                                                </div>
                                                                <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                                                    Seen
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>


                            <div
                                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                            >
                                <div>
                                    <button
                                        className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-grow ml-4">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            onChange={handleInput}
                                            value={input}
                                            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        />
                                        <button
                                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button
                                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                        onClick={sendMessage}>
                                        <span>Send</span>
                                        <span className="ml-2">
                                            <svg
                                                className="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat