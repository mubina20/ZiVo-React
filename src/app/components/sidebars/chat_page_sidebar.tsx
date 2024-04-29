import { Box } from "@mui/material";
import "../../../css/chat.css";
import { NavLink } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/definer";

export function ChatPageSidebar() {

    /** HANDLERS **/
    const handleLogOutRequest = async () => {
        try {
            const memberApiService = new MemberApiService();
            await memberApiService.logOutRequest(); 

            await sweetTopSmallSuccessAlert("success", 700, true);
            window.location.href = '/';
        } catch (err) {
            console.log(err);
            sweetFailureProvider(Definer.general_err1);
        }
    };

    return(
        <div className="chat_page_sidebar">
            <div className="account">
                <NavLink to={'/my-page'}><img src={
                            verifiedMemberData?.mb_profile_image 
                            ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                            : "/icons/user.png"
                        } alt="" className="user_icon"/></NavLink>
            </div>

            <Box className='sidebar_line' />

            <div className="chat_sidebar_sections">
                <div className="sidebar_top_sections">
                    <div className="top_section">
                        <NavLink to={'/'}><img src="/icons/left-sidebar-icons/home.png" alt="" className="sidebar_icon"/></NavLink>
                    </div>
                    <div className="top_section">
                        <NavLink to={'/short-contents'}><img src="/icons/left-sidebar-icons/shorts.png" alt="" className="sidebar_icon"/></NavLink>
                    </div>
                    <div className="top_section">
                        <NavLink to={'/members'}><img src="/icons/left-sidebar-icons/members.png" alt="" className="sidebar_icon"/></NavLink>
                    </div>
                    <div className="top_section">
                        <NavLink to={'/live'}><img src="/icons/left-sidebar-icons/life.png" alt="" className="sidebar_icon"/></NavLink>
                    </div>
                </div>

                <Box className='sidebar_line' />

                <div className="sidebar_bottom_sections">
                    <div className="top_section">
                        <NavLink to={'/settings'}><img src="/icons/left-sidebar-icons/setting.png" alt="" className="sidebar_icon"/></NavLink>
                    </div>
                    <div className="top_section">
                        <NavLink to={'/logout'}  onClick={handleLogOutRequest}><img src="/icons/left-sidebar-icons/logout.png" alt="" className="sidebar_icon"/></NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}