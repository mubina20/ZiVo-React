import { Stack, Typography } from '@mui/material';
import { Chats } from '../../../types/chat';
import { serverApi } from '../../../lib/config';
import { verifiedMemberData } from '../../apiServices/verify';
import { Member } from '../../../types/user';

export function MemberChats(props: any) {
    const { chats } = props;
    const { handleSelectChat } = props;

    return (
        <div>
            <div className="chat_left_container">
                <Stack className='left_search'>
                    <input className='search-input' type='text' placeholder='Search' />
                    <img className='search_icon' src="/icons/search.png" alt='search-icon'/>
                </Stack>

                {chats?.map((chat: Chats) => (
                    <div className="chatting_container" key={chat._id} onClick={() => handleSelectChat(chat._id)}>
                        {chat.members.map((member: Member) => {
                            const isCurrentUser = member._id === verifiedMemberData._id;

                            return (
                                !isCurrentUser && (
                                    <div className="chat" key={member._id} >
                                        <div className="chat_profile">
                                            <img 
                                                src={member.mb_profile_image ? `${serverApi}/${member.mb_profile_image}` : "/icons/user.png"} 
                                                alt="" 
                                                className="profile_image"
                                            />
                                            </div>
                                        <div className="chat_info">
                                            <div className="chat_top_info">
                                                <Typography className="nickname">{member.mb_nick}</Typography>
                                                <span className="date">2024-02-24</span>
                                            </div>
                                            <div className="chat_bottom_info">
                                                <div className="message">Hello</div>
                                                <div className="checking"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
