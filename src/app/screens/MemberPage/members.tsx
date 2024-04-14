import { Modal, Typography } from "@mui/material";
import "../../../css/members.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
import { useEffect, useState } from "react";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import MemberApiService from "../../apiServices/memberApiService";
import { setAllMembers, setMemberFollowers, setMemberFollowings } from "./slice";
import { Member } from "../../../types/user";
import { retrieveChosenMember, retrieveMemberFollowers, retrieveMemberFollowings, retrieveMembers } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChosenMember } from "./slice";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Definer } from "../../../lib/definer";
import FollowApiService from "../../apiServices/followApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Follower, Following, FollowSearchObj } from "../../../types/follow";
import { MobileMyPage } from "./mobileMyPage";
import moment from "moment";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => 
        dispatch(setAllMembers(data)),
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
    setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data))
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

const memberFollowingsRetriever = createSelector(
    retrieveMemberFollowings, 
    (memberFollowings) => ({
        memberFollowings
    })
);

const memberFollowersRetriever = createSelector(
    retrieveMemberFollowers,
    (memberFollowers) => ({
        memberFollowers
    })
);

export function MembersPage() {
    /** INITIALIZATIONS **/
    const [allMembers, setAllMembers] = useState<Member[]>([]);
    const [followerRebuild, setFollowerRebuild] = useState<Boolean>(true);

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenMember,
    } = actionDispatch(useDispatch());

    const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });
    const { setMemberFollowings } = actionDispatch(useDispatch());
    const { memberFollowings } = useSelector(memberFollowingsRetriever);

    const { setMemberFollowers } = actionDispatch(useDispatch());
	const { memberFollowers } = useSelector(memberFollowersRetriever);
	const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });

    const [informationModalOpen, setInformationModalOpen] = useState(true);

    const [selectedMember, setSelectedMember] = useState<Member | null>(null); // Tanlangan foydalanuvchi ma'lumotlari

    // Modallarni ochish va yopish uchun funksiyalar
    const handleOpenModal = (member: Member) => {
        setSelectedMember(member); // Tanlangan foydalanuvchi ma'lumotlarini o'zgaruvchiga saqlash
        setInformationModalOpen(true); // Modalni ochish
    };
    const handleCloseModal = () => {
        setSelectedMember(null); // Tanlangan foydalanuvchi ma'lumotlarini tozalash
        setInformationModalOpen(false); // Modalni yopish
    };


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
        const memberService = new MemberApiService();
        memberService
        .getAllMembers()
        .then((data) => setAllMembers(data))
        .catch((err) => console.log("ERROR :: AllRestaurants,", err));
    }, []);

    const subscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation();
            assert.ok(verifiedMemberData, Definer.auth_err1);
        
            const followService = new FollowApiService();
            await followService.subscribe(id);
        
            setFollowerRebuild(!followerRebuild);
            await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    // Followings
    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowings(followingsSearchObj)
			.then((data) => setMemberFollowings(data))
			.catch((err) => console.log(err));
	}, [followingsSearchObj]);

    // Followers
    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowers(followersSearchObj)
			.then((data) => setMemberFollowers(data))
			.catch((err) => console.log(err));
	}, [followersSearchObj]);

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
                        // console.log("Profile image:", profile_image);
                            return(
                            <div className="card" key={member._id}>
                                {/* <div className="close_box">
                                    <div className="close"><img src="/icons/other/close.png" alt="" width={"15px"}/></div>
                                </div> */}
                                <div className="user_info" style={{marginTop: "30px"}}>
                                    <img src={profile_image} alt="" className="user_icon" onClick={() => handleMemberSelect(member._id)}/>
                                    <Typography style={{fontSize: "15px", cursor: "pointer"}} onClick={() => handleMemberSelect(member._id)}>{member.mb_name}</Typography>
                                    <Typography style={{fontSize: "12px", opacity: "0.5"}}>@{member.mb_nick}</Typography>
                                    <button className="follow_btn" onClick={() => handleOpenModal(member)}>Information</button>
                                    <Modal
                                        className="members_page_modal"
                                        open={informationModalOpen}
                                        onClose={handleCloseModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <div className=''> 
                                            <div className="followers_modal_closing">
                                                <span>@{selectedMember?.mb_nick} Info</span>
                                                <img 
                                                    src="/icons/other/close.png" 
                                                    alt="" 
                                                    className='followers_close'
                                                    onClick={handleCloseModal}
                                                />
                                            </div>
                                            <div className="member_infos">
                                                <div className="information">
                                                    <div className="info_category">Name</div>
                                                    <div className="info">{selectedMember?.mb_name}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Surname</div>
                                                    <div className="info">{selectedMember?.mb_surname}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Birthday</div>
                                                    <div className="info">{moment(selectedMember?.mb_birthday).format('YYYY-MM-DD')}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Gender</div>
                                                    <div className="info">{selectedMember?.mb_gender}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Country</div>
                                                    <div className="info">{selectedMember?.mb_country}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">School</div>
                                                    <div className="info">{selectedMember?.mb_school}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Description</div>
                                                    <div className="info">{selectedMember?.mb_description}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Hobby</div>
                                                    <div className="info">{selectedMember?.mb_hobby}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">Following</div>
                                                    <div className="info">{selectedMember?.mb_follow_count}</div>
                                                </div>
                                                <div className="information">
                                                    <div className="info_category">subscriber</div>
                                                    <div className="info">{selectedMember?.mb_subscriber_count}</div>
                                                </div>
                                                
                                                <div className="information">
                                                    <div className="info_category">Join</div>
                                                    <div className="info">{moment(selectedMember?.createdAt).format("YYYY-MM-DD")}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
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