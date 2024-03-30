import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import {  Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { MyPosts } from "./myPosts";
import { MySavedPosts } from "./mySavedPosts";
import { MyFavoritePosts } from "./myFavoritePosts";
import Modal from '@mui/material/Modal';
import { verifiedMemberData } from "../../apiServices/verify";
import moment from "moment";
import { serverApi } from "../../../lib/config";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Follower, Following, FollowSearchObj } from "../../../types/follow";
import { setMemberFollowers, setMemberFollowings } from "./slice";
import { retrieveMemberFollowers, retrieveMemberFollowings } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import FollowApiService from "../../apiServices/followApiService";
import { FollowersModal } from "./followersModal";
import { FollowingsModal } from "./followingsModal";
import { MobileHeader } from "../../components/header/mobileHeader";
import { MobileFooter } from "../../components/footer/mobileFooter";
import "../../../css/visitPage.css";


// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
    setMemberFollowings: (data: Following[]) => dispach(setMemberFollowings(data)),
    setMemberFollowers: (data: Follower[]) =>
        dispach(setMemberFollowers(data)),
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

export function MobileMyPage(props: any) {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    const { 
        open, 
        handleOpenModal, 
        handleModalClose 
    } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);

	const { setMemberFollowers } = actionDispatch(useDispatch());
	const { memberFollowers } = useSelector(memberFollowersRetriever);
	const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });

    const { setMemberFollowings } = actionDispatch(useDispatch());
	const { memberFollowings } = useSelector(memberFollowingsRetriever);
	const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });

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
    console.log("props > allPosts", allPosts);
    const filteredPosts = allPosts.filter(post => post.member._id === verifiedMemberData._id);
    console.log("filteredPosts", filteredPosts);

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

    return(
        <div>
            <MobileHeader/>
            <MobileFooter/>

            <div className="visit-contianer" style={{marginTop: "80px"}}>
                <div className="visit-page-contianer">
                    <div className="visit-page-box">
                        <div className="page-top">
                            <div className="left-info">
                                <img
                                    src={
                                        verifiedMemberData?.mb_profile_image 
                                        ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                                        : "/icons/user.png"
                                    } 
                                    alt="User profile img" 
                                    width={"80px"}
                                    height={"80px"}
                                    style={{borderRadius: "50%"}}
                                />
                                <Typography className="nickname" style={{margin: "10px 0"}}>@{verifiedMemberData?.mb_nick}</Typography>
                                <button className="story-btn"><img src="/icons/post/plus.png" alt="" width={"15px"}/>Upload Story</button>
                            </div>
                            <div className="right-info">
                                <button className="edit_profile button">Edit Profile</button>
                                <button className="upload-post button"><img src="/icons/post/plus.png" alt="" width={"15px"}/>Upload Post</button>
                            </div>
                        </div>
                        <div className="user-data-container">
                                <div className="user-data-wrapper">
                                    <div className="user-data">
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
                                                <FollowingsModal 
                                                    open={openFollowingsModal} 
                                                    handleCloseFollowings={handleCloseFollowingsModal}
                                                    memberFollowings={memberFollowings}
                                                />
                                            </div>
                                            <span className="user-data-count">{memberFollowings.length}</span>
                                        </div>
                                        <div className="data">
                                            <div className="user-data-title">Posts</div>
                                            <span className="user-data-count">{filteredPosts.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-description">
                                    <p>{verifiedMemberData?.mb_description}</p>
                                </div>
                            </div>
                            <div className="page-center">
                                <TabContext value={value}>
                                    <Stack className="my-page-stack">
                                        <div className="my-page-tablist">
                                            <TabList 
                                            onChange={handleChange} 
                                            textColor={"inherit"}
                                            TabIndicatorProps={{
                                                style: { backgroundColor: "#FF007A" }
                                            }}
                                        >
                                            <Tab label={<img src="/icons/other/posts.png" alt="" width={"20px"} className="center_icon" />} value="1" />
                                            <Tab label={<img src="/icons/other/save.png" alt=""  width={"20px"}className="center-icon" />} value="2" />
                                            <Tab label={<img src="/icons/other/heart.png" alt=""  width={"20px"}className="center-icon" />} value="3" />
                                            <div className="my_page_information" style={{marginTop: "10px", color: "white"}} onClick={handleOpenModal}><Typography>Information</Typography></div>  

                                            <div>
                                                <Modal
                                                    className="infoModalContainer"
                                                    open={open}
                                                    onClose={handleModalClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <div className="infoModal">
                                                        <div className="member_info_closing">
                                                            <span>@{verifiedMemberData?.mb_nick}<span>'s Information</span></span>
                                                            <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="close"/>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Name</div>
                                                            <div className="info">{verifiedMemberData?.mb_name}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Surname</div>
                                                            <div className="info">{verifiedMemberData?.mb_surname}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Birthday</div>
                                                            <div className="info">{verifiedMemberData?.mb_birthday}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Gender</div>
                                                            <div className="info">{verifiedMemberData?.mb_gender}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Country</div>
                                                            <div className="info">{verifiedMemberData?.mb_country}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">School</div>
                                                            <div className="info">{verifiedMemberData?.mb_school}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Description</div>
                                                            <div className="info">{verifiedMemberData?.mb_description}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Hobby</div>
                                                            <div className="info">{verifiedMemberData?.mb_hobby}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Address</div>
                                                            <div className="info">{verifiedMemberData?.mb_address}</div>
                                                        </div>
                                                        <div className="information">
                                                            <div className="info_category">Account creation date</div>
                                                            <div className="info">{moment(verifiedMemberData?.createdAt).format("YYYY-MM-DD")}</div>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </TabList>
                                        </div>
                                        
                                    </Stack>
                                    <Box className='line' />

                                    <TabPanel value="1"> <MyPosts filteredPosts={filteredPosts} setAllPosts={setAllPosts}/> </TabPanel>
                                    <TabPanel value="2"> <MySavedPosts /> </TabPanel>
                                    <TabPanel value="3"> <MyFavoritePosts /> </TabPanel>
                                </TabContext>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}