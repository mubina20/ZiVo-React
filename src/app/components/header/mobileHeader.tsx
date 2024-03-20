import { Stack } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export function MobileHeader() {
  return (
    <div>
      <div className='mobile-navbar' style={{zIndex: "10"}}>
            <div className='mobile-navbar-inside'>
                <div className='mobile-navbar-logo'>
                    <h1 style={{color: "white"}}>ZiVo</h1>
                </div>

                <div className='mobile-navbar-right'>
                    <Stack className='mobile-navbar-search'>
                        <input className='mobile-navbar-search-input' type='text' placeholder='Search' />
                        <img className='mobile-navbar-search-icon' src="/icons/search.png" alt='search-icon'/>
                    </Stack>

                    <div className='mobile-navbar-icons'>
                        <img className='mobile-navbar-icon' src="/icons/notification.png" alt="notification" />
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
  )
}
