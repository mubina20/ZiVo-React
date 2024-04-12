import { Typography } from '@mui/material';
import "../../../css/chat.css";
import { ChosenChat, CreateMessage } from '../../../types/chat';
import { verifiedMemberData } from '../../apiServices/verify';
import { serverApi } from '../../../lib/config';
import moment from 'moment';
import { Member } from '../../../types/user';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import assert from 'assert';
import ChatApiService from '../../apiServices/chatApiService';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';

export function SelectedChat(props: any) {
    /** INITIALIZATIONS **/
    const { selectedChat } = props;
    console.log("selectedChat::::", selectedChat);

    const { chatId } = useParams<{ chatId: string }>();
    const [messageData, setMessageData] = useState<CreateMessage>({
        sender_id: verifiedMemberData._id,
        chat_id: chatId,
        message: ""
    });

    /** HANDLERS **/
    const handleMessage = (e: any) => {
		messageData.message = e.target.value;
		setMessageData({ ...messageData });
	};

    const handleSendButton = async () => {
        try {
            // assert.ok(
            //     articlePostData.post_content !== "",
            //     Definer.input_err1
            // );

            console.log("messageData ::", messageData);
            const chatService = new ChatApiService();

            await chatService.createMessage(messageData);
            // await sweetTopSmallSuccessAlert("Post is created successfully!");

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
                                <Typography className="oneline">Online</Typography>
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
            <div className="conversation_container">
                <div className="conversation">
                    

                    {selectedChat[0]?.data?.messages?.map((chat: ChosenChat) => (
                        chat.message ? (
                            chat.sender_id._id === verifiedMemberData?._id ? (
                                <div className="my_message_container" key={chat._id}>
                                    <div className="message_time">{moment(chat.createdAt).format('HH:mm')}</div>
                                    <div className="my_message">
                                        <div className="message">{chat.message}</div>
                                        <div className="read">R</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="friend_message_container" key={chat._id}>
                                    <div className="user_profile">
                                        <img 
                                            src={
                                                chat?.sender_id?.mb_profile_image 
                                                ? `${serverApi}/${chat?.sender_id?.mb_profile_image}` 
                                                : "/icons/user.png"
                                            } 
                                            alt="" 
                                            className="profile"
                                            />
                                    </div>
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
                </div>
            </div>
            <div className="chat_bottom">
                <div className="chat_bottom_container">
                    <div className="microphone">
                        <img src="/icons/chat/microphone.png" alt="" className="microphone_icon"/>
                    </div>
                    <div className="input_box">
                        <input type="text" placeholder="Message" className="chat_bottom_input" onChange={handleMessage}/>
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