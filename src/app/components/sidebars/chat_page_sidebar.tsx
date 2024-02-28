import { Box } from "@mui/material";
import "../../../css/chat.css";

export function ChatPageSidebar() {
    return(
        <div className="chat_page_sidebar">
            <div className="account">
                <img src="/icons/user.png" alt="" className="user_icon"/>
            </div>

            <Box className='sidebar_line' />

            <div className="chat_sidebar_sections">
                <div className="sidebar_top_sections">
                    <div className="top_section">
                        <img src="/icons/left-sidebar-icons/home.png" alt="" className="sidebar_icon"/>
                    </div>
                    <div className="top_section">
                        <img src="/icons/left-sidebar-icons/shorts.png" alt="" className="sidebar_icon"/>
                    </div>
                    <div className="top_section">
                        <img src="/icons/left-sidebar-icons/members.png" alt="" className="sidebar_icon"/>
                    </div>
                    <div className="top_section">
                        <img src="/icons/left-sidebar-icons/life.png" alt="" className="sidebar_icon"/>
                    </div>
                </div>

                <Box className='sidebar_line' />

                <div className="sidebar_bottom_sections">
                    <div className="top_section">
                        <img src="/icons/left-sidebar-icons/setting.png" alt="" className="sidebar_icon"/>
                    </div>
                    <div className="top_section">
                        <img src="/icons/left-sidebar-icons/logout.png" alt="" className="sidebar_icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}