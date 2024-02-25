import { Box, Typography } from "@mui/material";
import "../../../css/sidebar.css";

export function LeftSidebar() {
    return(
        <div className="container">
            <div className="user_container">
                <img src="/icons/user.png" alt="" className="user_icon"/>
                <div className="user_info">
                    <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>Samo</Typography>
                    <Typography className="name" style={{opacity: "0.56"}}>@samo_ping12</Typography>
                </div>
            </div>

            <Box className='line' />

            <div className="sections">
                <div className="top_sections">
                    <div className="section">
                        <img src="/icons/left-sidebar-icons/home.png" alt="" className="icon"/><span>Home</span>
                    </div>
                    <div className="section">
                        <img src="/icons/left-sidebar-icons/shorts.png" alt="" className="icon"/><span>Short Contents</span>
                    </div>
                    <div className="section">
                        <img src="/icons/left-sidebar-icons/members.png" alt="" className="icon"/><span>Members</span>
                    </div>
                    <div className="section">
                        <img src="/icons/left-sidebar-icons/life.png" alt="" className="icon"/><span>Life</span>
                    </div>
                </div>

                <Box className='line' />

                <div className="bottom_sections">
                    <div className="section">
                        <img src="/icons/left-sidebar-icons/setting.png" alt="" className="icon"/><span>Settings</span>
                    </div>
                    <div className="section">
                        <img src="/icons/left-sidebar-icons/logout.png" alt="" className="icon"/><span>LogOut</span>
                    </div>
                </div>
            </div>
        </div>
    )
}