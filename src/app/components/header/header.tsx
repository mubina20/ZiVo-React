import {Stack } from '@mui/material';
import "../../../css/header.css"
import { NavLink } from 'react-router-dom';

export function Header() {
    return(
        <div className='navbar'>
            <Stack className='logo'>
                <h1 style={{color: "white"}}>ZiVo</h1>
            </Stack>

            <div className='right'>
                <Stack className='search'>
                    <input className='search-input' type='text' placeholder='Search' />
                    <img className='search-icon' src="/icons/search.png" alt='search-icon'/>
                </Stack>

                <div className='icons'>
                    <img className='icon' src="/icons/notification.png" alt="notification" />
                    <NavLink to={'/chat'}><img className='icon' src="/icons/chat.png" alt="notification" /></NavLink>
                    <NavLink to={'/my-page'}><img className='icon' src="/icons/user.png" alt="notification" /></NavLink>
                </div>
            </div>
            
        </div>
    )
}