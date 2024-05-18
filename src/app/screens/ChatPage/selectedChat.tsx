import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../context/socket';
import { ChatGreetMsg, Chatmessage, ChosenChat, CreateMessage } from '../../../types/chat';
import { verifiedMemberData } from '../../apiServices/verify';
import { serverApi } from '../../../lib/config';
import moment from 'moment';
import ChatApiService from '../../apiServices/chatApiService';
import { sweetErrorHandling } from '../../../lib/sweetAlert';
import { Definer } from '../../../lib/definer';
import assert from 'assert';
import { Member } from '../../../types/user';
import { Typography } from '@mui/material';

export function SelectedChat(props: any) {
    const { selectedChat } = props;
    const { setSelectedChat } = props;
    const { chatId } = useParams<{ chatId: string }>();
    const [messageData, setMessageData] = useState<CreateMessage>({
        sender_id: verifiedMemberData._id,
        chat_id: chatId,
        message: ""
    });

    const [messagesList, setMessagesList] = useState<JSX.Element[]>([]);
    const socket = useContext(SocketContext);
    const textInput: any = useRef(null);

    useEffect(() => {
        if (!socket) {
            console.error("Socket is null or undefined");
            return;
        }
    
        socket.connect();
        socket?.on('connect', function () {
            console.log('CLIENT: Connected');
        });
    
        socket?.on('newMsg', (new_message: Chatmessage) => {
            if (new_message.chat_id === chatId) {
                setMessagesList(prevMessages => [
                    ...prevMessages,
                    <div key={prevMessages.length} className='socket_message'>
                        {new_message.sender_id === verifiedMemberData?._id ? (
                            <div className="my_message_container">
                                <div className="message_time">{moment(new_message.createdAt).format('HH:mm')}</div>
                                <div className="my_message">
                                    <div className="message">{new_message.msg}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="friend_message_container">
                                <div className="friend_message_data">
                                    <div className="friend_message">
                                        <div className="message">{new_message.msg}</div>
                                    </div>
                                    <div className="message_time">{moment(new_message.createdAt).format('HH:mm')}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ]);
            } 
        });
    
        return () => {
            socket.disconnect();
        };
    }, [socket, chatId]);

    const getKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (e.key === 'Enter') {
                assert.ok(messageData.message, Definer.input_err3);
                handleSendButton();
            }
        } catch (err: any) {
            sweetErrorHandling(err).then();
        }
    };

    const handleMessage = (e: any) => {
        setMessageData({ ...messageData, message: e.target.value });
        
    };

    const handleSendButton = async () => {
        try {
            const chatService = new ChatApiService();
            await chatService.createMessage(messageData);

            socket.emit('createMsg', {
                msg: messageData.message,
                sender_id: verifiedMemberData._id,
                chat_id: chatId
            });

            textInput.current.value = "";
        } catch (error) {
            console.log(`ERROR :: handlePostButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };
    

    return (
        (selectedChat && selectedChat.length > 0 ? (
        <div className="chat_right_container">
            <div className="chat_top">
                {selectedChat && selectedChat.length > 0 && selectedChat[0].data && selectedChat[0].data.members && selectedChat[0].data.members.length > 0 && (
                    selectedChat[0].data.members.map((member: Member) => (
                        verifiedMemberData._id == member._id ? (
                            null
                        ) : (
                            <div className={`user_container${verifiedMemberData._id === member._id ? ' verified' : ''}`} key={member._id}>
                            <img 
                                src={member.mb_profile_image ? `${serverApi}/${member.mb_profile_image}` : "/icons/user.png"}
                                alt="" 
                                className="user_icon"
                                />
                            <div className="user_info">
                                <Typography className="name" style={{fontSize: "24px", cursor: "pointer"}}>
                                    {member.mb_name}
                                </Typography>
                            </div>
                        </div>
                        )
                    ))
                )}
                <div className="icons_container">
                    <img src="/icons/chat/search.png" alt="" className="chat_top_icon"/>
                    <img src="/icons/chat/phone.png" alt="" className="chat_top_icon"/>
                    <img src="/icons/chat/video.png" alt="" className="chat_top_icon"/>
                    <img src="/icons/chat/more.png" alt="" className="chat_top_icon"/>
                </div>
            </div>
            {/* Chat content */}
            <div className="conversation_container">
                <div className="conversation">
                    {selectedChat[0]?.data?.messages?.map((chat: ChosenChat) => (
                        chat.message ? (
                            chat.sender_id._id === verifiedMemberData?._id ? (
                                <div className="my_message_container" key={chat._id}>
                                    <div className="message_time">{moment(chat.createdAt).format('HH:mm')}</div>
                                    <div className="my_message">
                                        <div className="message">{chat.message}</div>
                                        {/* <div className="read">R</div> */}
                                    </div>
                                </div>
                            ) : (
                                <div className="friend_message_container" key={chat._id}>
                                    <div className="friend_message_data">
                                        <div className="friend_message">
                                            <div className="message">{chat.message}</div>
                                        </div>
                                        <div className="message_time">{moment(chat.createdAt).format('HH:mm')}</div>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div style={{fontSize: "50rem", display: "flex", alignItems: 'center'}} key={chat._id}>Xabar yo'q</div>
                        )
                    ))}
                    <div className="conversation_container">
                        <div className="conversation">
                            {messagesList}
                        </div>
                    </div>
                </div>
            </div>
            {/* Message input */}
            <div className="chat_bottom">
                <div className="chat_bottom_container">
                    <div className="input_box">
                        <input 
                            type="text" 
                            placeholder="Message" 
                            className="chat_bottom_input" 
                            onChange={handleMessage}
                            name='message'
                            onKeyPress={getKeyHandler}
                            ref={textInput}
                        />
                        <img src="/icons/chat/sticker.png" alt="" className="sticker"/>
                        <div className="two_icons">
                            <img src="/icons/chat/clip.png" alt="" className="input_sticker"/>
                            <img src="/icons/chat/sent.png" alt="" className="input_sticker" onClick={handleSendButton}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ) : <div className="chat_right_container"/>)
    );
}