import { Box, Typography } from "@mui/material";
import "../../../css/sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/definer";
import { serverApi } from "../../../lib/config";

export function LeftSidebar() {
    /** INITIALIZATIONS **/

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
        <div className="container">
            <div className="user_container">
                <Link to={"/my-page"}>
                    <img 
                        src={
                            verifiedMemberData?.mb_profile_image 
                            ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                            : "/icons/user.png"
                        } 
                        alt="" 
                        className="user_icon"
                    />
                </Link>
                
                <div className="user_info">
                    <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>{verifiedMemberData?.mb_name}</Typography>
                    <Typography className="name" style={{opacity: "0.56"}}>@{verifiedMemberData?.mb_nick}</Typography>
                </div>
            </div>

            <Box className='line' />

            <div className="sections">
                <div className="top_sections">
                <NavLink to="/" className={'navlink'}>
                        <div className="section">
                            <img src="/icons/left-sidebar-icons/black_home.png" alt="" className="icon"/><span>Home</span>
                        </div>
                    </NavLink>
                    <NavLink to="/video-contents" className={'navlink'}>
                        <div className="section">
                            <img src="/icons/left-sidebar-icons/black_shorts.png" alt="" className="icon"/><span>Video Contents</span>
                        </div>
                    </NavLink>
                    <NavLink to="/members" className={'navlink'}>
                        <div className="section">
                            <img src="/icons/left-sidebar-icons/black_members.png" alt="" className="icon"/><span>Members</span>
                        </div>
                    </NavLink>
                    <NavLink to="/live" className={'navlink'}>
                        <div className="section">
                            <img src="/icons/left-sidebar-icons/black_life.png" alt="" className="icon"/><span>Live</span>
                        </div>
                    </NavLink>
                </div>

                <Box className='line' />

                <div className="bottom_sections">
                    <NavLink to={'/settings'} className={'navlink'}>
                        <div className="section">
                            <img src="/icons/left-sidebar-icons/black_setting.png" alt="" className="icon"/><span>Settings</span>
                        </div>
                    </NavLink>
                    <div className="section" onClick={handleLogOutRequest}>
                        <img src="/icons/left-sidebar-icons/black_logout.png" alt="" className="icon"/><span>LogOut</span>
                    </div>
                </div>
            </div>
        </div>
    )
}