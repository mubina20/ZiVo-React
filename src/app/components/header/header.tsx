import {Stack } from '@mui/material';
import "../../../css/header.css"

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
                    <img className='icon' src="/icons/chat.png" alt="chat" />
                    <img className='icon' src="/icons/user.png" alt="user" />
                </div>
            </div>
            
        </div>
    )
}