import {Stack } from '@mui/material';
import "../../../css/header.css"
import { NavLink } from 'react-router-dom';
import { verifiedMemberData } from '../../apiServices/verify';
import { serverApi } from '../../../lib/config';

export function Header() {
    return(
        <div className='navbar'>
            <Stack className='logo'>
                <img src="/Logo/Zivo.png" alt="" width={"100px"} height={"30px"}/>
            </Stack>

            <div className='right'>
                <Stack className='search'>
                    <input className='search-input' type='text' placeholder='Search' />
                    <img className='search-icon' src="/icons/search.png" alt='search-icon'/>
                </Stack>

                <div className='icons'>
                    <img className='icon' src="/icons/notification.png" alt="notification" />
                    <NavLink to={'/chat'}><img className='icon' src="/icons/chat.png" alt="chat" /></NavLink>
                    <NavLink to={'/my-page'}>
                        <img  
                            src={
                                verifiedMemberData?.mb_profile_image 
                                ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                                : "/icons/user.png"
                            } 
                            alt="my page"
                            className='icon'
                        />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}