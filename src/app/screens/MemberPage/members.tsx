import { Typography } from "@mui/material";
import "../../../css/members.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
import { useEffect, useState } from "react";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import MemberApiService from "../../apiServices/memberApiService";
import { setAllMembers } from "./slice";
import { Member } from "../../../types/user";
import { retrieveChosenMember, retrieveMembers } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChosenMember } from "./slice";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => 
        dispatch(setAllMembers(data))
});

const allMembersRetriever = createSelector(
    retrieveMembers,
    (allMembers) => ({
        allMembers
    })
);

const chosenMemberRetriever = createSelector(
    retrieveChosenMember, 
    (chosenMember) => ({
        chosenMember
    })
);

export function MembersPage() {
    /** INITIALIZATIONS **/
    const [allMembers, setAllMembers] = useState<Member[]>([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenMember,
    } = actionDispatch(useDispatch());
    

    /* HANDLERS **/
    const handleMemberSelect = async (memberId: any) => {
        try {
            const memberService = new MemberApiService();
            const chosenMemberData = await memberService.getChosenMember(memberId);
            dispatch(setChosenMember(chosenMemberData)); 
            history.push(`/member/${chosenMemberData._id}`); 
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
    };

    useEffect(() => {
        const fetchAllMembers = async () => {
            try {
                const memberService = new MemberApiService();
                const allMembersData = await memberService.getAllMembers();
                setAllMembers(allMembersData);
            } catch (err) {
                console.error('Error while fetching members:', err);
            }
        };

        fetchAllMembers();
    }, []);
    console.log(allMembers);

    return(
        <div>
            <Header />
            <LeftSidebar />

            <div className="members_main_container">
                <div className="members">
                    <div className="text" style={{marginBottom: '30px',}}>
                        <img src="/icons/allMember.png" alt="" width={"38px"}/>
                        <Typography style={{fontSize: "24px"}}>Members</Typography>
                    </div>
                    
                    <div className="members_container">
                        {allMembers.map((member) => {
                            const profile_image = member?.mb_profile_image
                            ? `${serverApi}/${member?.mb_profile_image}`
                            : "/icons/user.png";
                        console.log("Profile image:", profile_image);
                            return(
                            <div className="card" key={member._id} onClick={() => handleMemberSelect(member._id)}>
                                <div className="close_box">
                                    <div className="close"><img src="/icons/other/close.png" alt="" width={"15px"}/></div>
                                </div>
                                <div className="user_info">
                                    <img src={profile_image} alt="" className="user_icon"/>
                                    <Typography style={{fontSize: "15px", cursor: "pointer"}}>{member.mb_name}</Typography>
                                    <Typography style={{fontSize: "12px", opacity: "0.5"}}>@{member.mb_nick}</Typography>
                                    <button className="follow_btn">Follow</button>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                
            </div>
        </div>
    )
}