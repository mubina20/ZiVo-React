import { Stack, Typography } from "@mui/material";
import "../../../css/chat.css";
import { ChatPageSidebar } from "../../components/sidebars/chat_page_sidebar";
import { useEffect, useState } from "react";
import ChatApiService from "../../apiServices/chatApiService";
import { Chats } from "../../../types/chat";
import { serverApi } from "../../../lib/config";

export function ChatPage() {
    const [chats, setChats] = useState<Chats[]>();

    useEffect(() => {
        const findMyChats = async () => {
            try {
                const chatService = new ChatApiService();
                const myChats = await chatService.findMyChats();
                setChats(myChats);
                console.log("myChats ::", myChats);
            } catch (error) {
                console.error("ERROR handleMemberSelect ::", error);
            }
        };
    
        findMyChats();
    },[]); 
    

    return(
        <div>
            <ChatPageSidebar />
                <div className="big_chat_container">
                    <div className="chat_container">
                        <div className="chat_left_container">
                            <Stack className='left_search'>
                                <input className='search-input' type='text' placeholder='Search' />
                                <img className='search_icon' src="/icons/search.png" alt='search-icon'/>
                            </Stack>

                            {chats?.map((chat: Chats) => {
                                return(
                                    <div className="chatting_container" key={chat._id}>
                                        <div className="chat">
                                            <div className="chat_profile">
                                                <img 
                                                    src={
                                                        chat?.receiver_id?.mb_profile_image 
                                                            ? `${serverApi}/${chat?.receiver_id?.mb_profile_image}` 
                                                            : "/icons/user.png"
                                                    } 
                                                    alt="" 
                                                    className="profile_image"
                                                />
                                            </div>
                                            <div className="chat_info">
                                                <div className="chat_top_info">
                                                    <Typography className="nickname">
                                                        {chat?.receiver_id?.mb_nick}
                                                    </Typography>
                                                    <span className="date">2024-02-24</span>
                                                </div>
                                                <div className="chat_bottom_info">
                                                    <div className="message">Hello</div>
                                                    <div className="checking"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="chat_right_container">
                            <div className="chat_top">
                                <div className="user_container">
                                    <img src="/icons/user.png" alt="" className="user_icon"/>
                                    <div className="user_info">
                                        <Typography className="name" style={{fontSize: "24px", cursor: "pointer"}}>Samo</Typography>
                                        <Typography className="oneline">Online</Typography>
                                    </div>
                                </div>
                                <div className="icons_container">
                                    <img src="/icons/chat/search.png" alt="" className="chat_top_icon"/>
                                    <img src="/icons/chat/phone.png" alt="" className="chat_top_icon"/>
                                    <img src="/icons/chat/video.png" alt="" className="chat_top_icon"/>
                                    <img src="/icons/chat/more.png" alt="" className="chat_top_icon"/>
                                </div>
                            </div>
                            <div className="conversation_container">
                                <div className="conversation">
                                    <div className="chatting_date">2024.02.15</div>
                                    <div className="my_message_container">
                                        <div className="message_time">8:12</div>
                                        <div className="my_message">
                                            <div className="message">Hello Samo, It's me Mubina!</div>
                                            <div className="read">R</div>
                                        </div>
                                    </div>
                                    <div className="friend_message_container">
                                        <div className="user_profile">
                                            <img src="/icons/user.png" alt="" className="profile"/>
                                        </div>
                                        <div className="friend_message_data">
                                            <div className="friend_message">
                                                <div className="message">ohh Hi! How are you?</div>
                                            </div>
                                            <div className="message_time">8:12</div>
                                        </div>
                                    </div>

                                    <div className="my_message_container">
                                        <div className="message_time">8:12</div>
                                        <div className="my_message">
                                            <div className="message">Hello Samo, It's me Mubina!</div>
                                            <div className="read">R</div>
                                        </div>
                                    </div>
                                    <div className="friend_message_container">
                                        <div className="user_profile">
                                            <img src="/icons/user.png" alt="" className="profile"/>
                                        </div>
                                        <div className="friend_message_data">
                                            <div className="friend_message">
                                                <div className="message">ohh Hi! How are you?</div>
                                            </div>
                                            <div className="message_time">8:12</div>
                                        </div>
                                    </div><div className="my_message_container">
                                        <div className="message_time">8:12</div>
                                        <div className="my_message">
                                            <div className="message">Hello Samo, It's me Mubina!</div>
                                            <div className="read">R</div>
                                        </div>
                                    </div>
                                    <div className="friend_message_container">
                                        <div className="user_profile">
                                            <img src="/icons/user.png" alt="" className="profile"/>
                                        </div>
                                        <div className="friend_message_data">
                                            <div className="friend_message">
                                                <div className="message">ohh Hi! How are you?</div>
                                            </div>
                                            <div className="message_time">8:12</div>
                                        </div>
                                    </div><div className="my_message_container">
                                        <div className="message_time">8:12</div>
                                        <div className="my_message">
                                            <div className="message">Hello Samo, It's me Mubina!</div>
                                            <div className="read">R</div>
                                        </div>
                                    </div>
                                    <div className="friend_message_container">
                                        <div className="user_profile">
                                            <img src="/icons/user.png" alt="" className="profile"/>
                                        </div>
                                        <div className="friend_message_data">
                                            <div className="friend_message">
                                                <div className="message">ohh Hi! How are you?</div>
                                            </div>
                                            <div className="message_time">8:12</div>
                                        </div>
                                    </div><div className="my_message_container">
                                        <div className="message_time">8:12</div>
                                        <div className="my_message">
                                            <div className="message">Hello Samo, It's me Mubina!</div>
                                            <div className="read">R</div>
                                        </div>
                                    </div>
                                    <div className="friend_message_container">
                                        <div className="user_profile">
                                            <img src="/icons/user.png" alt="" className="profile"/>
                                        </div>
                                        <div className="friend_message_data">
                                            <div className="friend_message">
                                                <div className="message">ohh Hi! How are you?</div>
                                            </div>
                                            <div className="message_time">8:12</div>
                                        </div>
                                    </div>
                                    <div className="my_message_container">
                                        <div className="message_time">8:12</div>
                                        <div className="my_message">
                                            <div className="message">Hello Samo, It's me Mubina!</div>
                                            <div className="read">R</div>
                                        </div>
                                    </div>
                                    <div className="friend_message_container">
                                        <div className="user_profile">
                                            <img src="/icons/user.png" alt="" className="profile"/>
                                        </div>
                                        <div className="friend_message_data">
                                            <div className="friend_message">
                                                <div className="message">ohh Hi! How are you?</div>
                                            </div>
                                            <div className="message_time">8:12</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat_bottom">
                                <div className="chat_bottom_container">
                                    <div className="microphone">
                                        <img src="/icons/chat/microphone.png" alt="" className="microphone_icon"/>
                                    </div>
                                    <div className="input_box">
                                        <input type="text" placeholder="Message" className="chat_bottom_input"/>
                                        <img src="/icons/chat/sticker.png" alt="" className="sticker"/>
                                        <div className="two_icons">
                                            <img src="/icons/chat/clip.png" alt="" className="input_sticker"/>
                                            <img src="/icons/chat/sent.png" alt="" className="input_sticker"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}