import { Box, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export function Header() {
    return (
        <div className="header_container">
            {/* LOGO */}
            <Box className="logo">
                <h1>ZiVo</h1>
            </Box>

            {/* SEARCH */}
            <div className="search">
                <Box className={'search_container'}>
                    <form className={'search_form'} action={''} method={''}>
                        <input
                            type={'search'}
                            className={'search_input'}
                            placeholder={'Search'}
                        />
                        <button type="button" className='button_search'>
                            <SearchIcon />
                        </button>

                        
                    </form>
                </Box>
            </div>

            {/* CENTER */}
            <div className="center">
                <Box className="hover_line">
                    <NavLink to="/" activeClassName="underline" className={"navLink"}>
                        Home
                    </NavLink>
                </Box>

                <Box className="hover_line">
                    <NavLink to="/member" activeClassName="underline" className={"navLink"}>
                        Friends
                    </NavLink>
                </Box>
                <Box className="hover_line">
                    <NavLink to="/member" activeClassName="underline" className={"navLink"}>
                        Profile
                    </NavLink>
                </Box>
            </div>

            {/* RIGHT */}
            <div className="icons">
                <Box className="icon">
                    <NavLink to="/member" activeClassName="underline" className={"navLink"}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </NavLink>
                </Box>
                <Box className="icon">
                    <NavLink to="/member" activeClassName="underline" className={"navLink"}>
                        <NotificationsNoneOutlinedIcon />
                    </NavLink>
                </Box>
                <Box className="icon">
                    <NavLink to="/member" activeClassName="underline" className={"navLink"}>
                        <AccountCircleOutlinedIcon />
                    </NavLink>
                </Box>
            </div>
        </div>
    )
}