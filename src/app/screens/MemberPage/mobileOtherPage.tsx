import React from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {  Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import { verifiedMemberData } from "../../apiServices/verify";
import moment from "moment";
import { serverApi } from "../../../lib/config";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Follower, Following, FollowSearchObj } from "../../../types/follow";
import { setChosenMember, setMemberFollowers, setMemberFollowings } from "./slice";
import { retrieveChosenMember, retrieveMemberFollowers, retrieveMemberFollowings } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import FollowApiService from "../../apiServices/followApiService";
import { FollowersModal } from "./followersModal";
import { MobileHeader } from "../../components/header/mobileHeader";
import { MobileFooter } from "../../components/footer/mobileFooter";
import "../../../css/mobileVistiPage.css";
import { MobileStories } from "./mobileStories";
import { MobileMyPosts } from "./mobileMyPosts";
import { Member } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";


// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
    setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});

// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
    retrieveMemberFollowers,
    (memberFollowers) => ({
        memberFollowers
    })
);
const memberFollowingsRetriever = createSelector(
    retrieveMemberFollowings, 
    (memberFollowings) => ({
        memberFollowings
    })
);
const chosenMemberRetriever = createSelector(
    retrieveChosenMember,
    (chosenMember) => ({
        chosenMember
    })
);
interface RouteParams {
    memberId: string;
}

export function MobileOtherPage(props: any) {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    const { memberId } = useParams<RouteParams>();
    const { 
        open, 
        handleOpenModal, 
        handleModalClose 
    } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const { chosenMember } = useSelector(chosenMemberRetriever);

	const { setMemberFollowers } = actionDispatch(useDispatch());
	const { memberFollowers } = useSelector(memberFollowersRetriever);
	const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>({ mb_id: memberId });

    const { setMemberFollowings } = actionDispatch(useDispatch());
	const { memberFollowings } = useSelector(memberFollowingsRetriever);
	const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: memberId });

    const [memberFollow, setMemberFollow] = useState<any>();
    const [followRebuild, setFollowerRebuild] = useState<Boolean>(false);

    const [openFollowersModal, setOpenFollowersModal] = useState(false);
    const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
    


    /** HANDLERS **/

    // Handle my Follower
    const handleOpenFollowersModal = () => {
        setOpenFollowersModal(true);
    };
    const handleCloseFollowersModal = () => {
        setOpenFollowersModal(false);
    };

    // Handle my Followings
    const handleOpenFollowingsModal = () => {
        setOpenFollowingsModal(true);
    };
    const handleCloseFollowingsModal = () => {
        setOpenFollowingsModal(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        const allPostsData = async () => {
            try {
                const postService = new PostApiService();
                const allPostsData = await postService.getAllPosts();
                setAllPosts(allPostsData);
            } catch (err) {
                console.error('Error while fetching members:', err);
            }
        };

        allPostsData();
    }, []);
    // console.log("allPosts", allPosts);
    // console.log("props > allPosts", allPosts);
    const filteredPosts = allPosts.filter(post => post.member._id === chosenMember?._id);
    // console.log("filteredPosts", filteredPosts);

    // Followers
    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowers(followersSearchObj)
			.then((data) => setMemberFollowers(data))
			.catch((err) => console.log(err));
	}, [followersSearchObj]);

    // Followings
    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowings(followingsSearchObj)
			.then((data) => setMemberFollowings(data))
			.catch((err) => console.log(err));
	}, [followingsSearchObj]);

    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.chosenMemberFollow(chosenMember?._id)
			.then((data) => setMemberFollow(data))
			.catch((err) => console.log(err));
	}, [followersSearchObj]);

    const subscribeHandler = async (e: any, id: any) => {
        try {
            e.stopPropagation();
            assert.ok(verifiedMemberData, Definer.auth_err1);
        
            const followService = new FollowApiService();
            await followService.subscribe(id);
        
            setFollowerRebuild(!followRebuild);
            await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
            window.location.reload();
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const unsubscribeHandler = async (e: any, id: any) => {
		try {
			e.stopPropagation();
			assert.ok(verifiedMemberData, Definer.auth_err1);

			const followService = new FollowApiService();
			await followService.unsubscribe(id);

			setFollowerRebuild(!followRebuild);
			await sweetTopSmallSuccessAlert('successfully unsubscribed', 700, false);
            window.location.reload();
		} catch (error: any) {
			console.log(error);
			sweetErrorHandling(error).then();
		}
	};

    const handleAlert = async () => {
        alert("Post liked successfully!");
    };

    return(
        <div>
            <MobileHeader/>
            <MobileFooter/>

            <div className="visit-contianer">
                <div className="visit-page-contianer">
                    <div className="visit-page-box">
                        <div className="page-top" style={{padding: "0px 20px"}}>
                            <div className="left-info">
                                <img
                                    src={
                                        chosenMember?.mb_profile_image 
                                        ? `${serverApi}/${chosenMember.mb_profile_image}`  
                                        : "/icons/user.png"
                                    }  
                                    alt="User profile img" 
                                    width={"80px"}
                                    height={"80px"}
                                    style={{borderRadius: "50%"}}
                                />
                                <Typography className="nickname" style={{margin: "10px 0"}}>@{chosenMember?.mb_nick}</Typography>
                            </div>
                            <div className="mobile-user-data-container">
                                <div className="user-data-wrapper">
                                    <div className="user-data" style={{gap: "20px"}}>
                                        <div className="data">
                                            <div className="user-data-title" onClick={handleOpenFollowersModal}>
                                                Followers
                                                <FollowersModal 
                                                    open={openFollowersModal} 
                                                    handleClose={handleCloseFollowersModal}
                                                    memberFollowers={memberFollowers}
                                                />
                                            </div>
                                            <span className="user-data-count">{memberFollowers.length}</span>
                                        </div>

                                        <div className="data">
                                            <div className="user-data-title" onClick={handleOpenFollowingsModal}>
                                                Followings
                                                {/* <FollowingsModal 
                                                    open={openFollowingsModal} 
                                                    handleCloseFollowings={handleCloseFollowingsModal}
                                                    memberFollowings={memberFollowings}
                                                /> */}
                                            </div>
                                            <span className="user-data-count">{memberFollowings.length}</span>
                                        </div>
                                        <div className="data">
                                            <div className="user-data-title">Posts</div>
                                            <span className="user-data-count">{filteredPosts.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my_page_mobile_description">
                                    <p>{verifiedMemberData?.mb_description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mobile_buttons">
                            {/* <button className="mobile_button" style={{background: "#FF007A"}}>Follow</button> */}
                            {memberFollow && memberFollow.length > 0 ? (
                                    memberFollow[0].subscriber_id === verifiedMemberData?._id ? (
                                        <button
                                            className="mobile_button"
                                            style={{ backgroundColor: "#f10101f2" }}
                                            onClick={(e) => unsubscribeHandler(e, chosenMember?._id)}
                                        >
                                            UNFOLLOW
                                        </button>
                                    ) : (
                                        <button
                                            className="mobile_button"
                                            onClick={(e) => subscribeHandler(e, chosenMember?._id)}
                                            style={{background: "#FF007A"}}
                                        >
                                            FOLLOW 
                                        </button>
                                    )
                                ) : <button
                                        className="mobile_button"
                                        onClick={(e) => subscribeHandler(e, chosenMember?._id)}
                                        style={{background: "#FF007A"}}
                                        >
                                        FOLLOW 
                                    </button>}
                            <button className="mobile_button" style={{background: "#fff", color: "#000"}} onClick={handleAlert}>Message</button>
                        </div>
                        <div className="other_page_center">
                            <TabContext value={value}>
                                <Stack className="my_page_stack">
                                    <div className="my_page_tablist">
                                        <TabList 
                                        onChange={handleChange} 
                                        textColor={"inherit"}
                                        TabIndicatorProps={{
                                            style: { backgroundColor: "#FF007A" }
                                        }}
                                    >
                                        <Tab label={<img src="/icons/other/posts.png" alt="" className="mobile_center_icon" />} value="1" />
                                        <Tab label={<img src="/icons/other/story.png" alt="" className="mobile_center_icon" />} value="2" />
                                        <div className="mobile_page_information" onClick={handleOpenModal}><Typography>Information</Typography></div>
                                    </TabList>
                                    </div>
                                </Stack>
                                <Box className='line' style={{marginTop: "-2px"}}/>
                                
                                <TabPanel value="1"> <MobileMyPosts filteredPosts={filteredPosts} setAllPosts={setAllPosts} /> </TabPanel>
                                <TabPanel value="2"> <MobileStories filteredPosts={filteredPosts} setAllPosts={setAllPosts}/> </TabPanel>
                            </TabContext>
                            <div>
                                <Modal
                                    className="mobileInfoModalContainer"
                                    open={open}
                                    onClose={handleModalClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div style={{width: "100%"}}>
                                        <div className="member_info_closing">
                                            <span>@{chosenMember?.mb_nick}<span>'s Information</span></span>
                                            <div>
                                                <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="info_close"/>
                                            </div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Name</div>
                                            <div className="info">{chosenMember?.mb_name}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Surname</div>
                                            <div className="info">{chosenMember?.mb_surname}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Birthday</div>
                                            <div className="info">{moment(chosenMember?.mb_birthday).format('YYYY-MM-DD')}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Gender</div>
                                            <div className="info">{chosenMember?.mb_gender}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Country</div>
                                            <div className="info">{chosenMember?.mb_country}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">School</div>
                                            <div className="info">{chosenMember?.mb_school}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Description</div>
                                            <div className="info">{chosenMember?.mb_description}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Hobby</div>
                                            <div className="info">{chosenMember?.mb_hobby}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Join</div>
                                            <div className="info">{moment(chosenMember?.createdAt).format("YYYY-MM-DD")}</div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}