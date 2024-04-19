import React from "react";
import { Box, Typography } from "@mui/material";
import "../../../css/visitPage.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
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
import assert from "assert";
import { Definer } from "../../../lib/definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
    setMemberFollowers: (data: Follower[]) =>
        dispatch(setMemberFollowers(data)),
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

export function MyPage(props: any) {
    /** INITIALIZATIONS **/
    const history = useHistory();
    const [value, setValue] = useState("1");
    const { open, handleOpenModal, handleModalClose } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);

	const { setMemberFollowers } = actionDispatch(useDispatch());
	const { memberFollowers } = useSelector(memberFollowersRetriever);
	const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });

    const { setMemberFollowings } = actionDispatch(useDispatch());
	const { memberFollowings } = useSelector(memberFollowingsRetriever);
	const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });
    const [followRebuild, setFollowerRebuild] = useState<Boolean>(false);

    const [openFollowersModal, setOpenFollowersModal] = useState(false);
    const [openFollowingsModal, setOpenFollowingsModal] = useState(false);

    /** HANDLERS **/
    const handleOpenFollowersModal = () => setOpenFollowersModal(true);
    const handleCloseFollowersModal = () => setOpenFollowersModal(false);

    // const handleOpenFollowingsModal = () => setOpenFollowingsModal(true);
    // const handleCloseFollowingsModal = () => setOpenFollowingsModal(false);

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
    const filteredPosts = allPosts.filter(post => post.member._id === verifiedMemberData._id);
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

    const unsubscribeHandler = async (e: any, id: string) => {
		try {
			e.stopPropagation();
			assert.ok(verifiedMemberData, Definer.auth_err1);

			const followService = new FollowApiService();
			await followService.unsubscribe(id);

			await sweetTopSmallSuccessAlert('successfully unsubscribed', 700, false);
			setFollowerRebuild(!followRebuild);
		} catch (error: any) {
			console.log(error);
			sweetErrorHandling(error).then();
		}
	};

    const visitMemberHandler = (mb_id: string) => {
		history.push(`/member/${mb_id}`);
		document.location.reload();
	};

    return(
        <div>
            <Header />
            <LeftSidebar />

            <div className="visit_container">
                <div className="visit_page_container">
                    <div className="visit_page_box">
                        <div className="page_top">
                            <div className="left_info">
                                <img
                                    src={
                                        verifiedMemberData?.mb_profile_image 
                                        ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                                        : "/icons/user.png"
                                    } 
                                    alt="" 
                                    width={"100px"}
                                    height={"100px"}
                                    style={{borderRadius: "50%"}}
                                    
                                />
                                <Typography className="nickname">@{verifiedMemberData?.mb_nick}</Typography>
                                <Link to={"/upload-story"} style={{textDecoration: "none"}}>
                                    <button className="story-btn"><img src="/icons/post/plus.png" alt="" width={"15px"}/>Upload Story</button>
                                </Link>
                                
                            </div>
                            <div className="right_info">
                                <div className="info">
                                    <div className="my_data">
                                        <div className="group">
                                            <div className="text" onClick={handleOpenFollowersModal}>
                                                Followers
                                                <FollowersModal 
                                                    open={openFollowersModal}
                                                    memberFollowers={memberFollowers}
                                                    handleCloseFollowersModal={handleCloseFollowersModal}
                                                />

                                            </div>
                                            <span className="count">{memberFollowers.length}</span>
                                        </div>
                                        <div className="group">
                                            <div className="text" onClick={handleOpenFollowingsModal}>
                                                Followings
                                                <FollowingsModal 
                                                    open={openFollowingsModal}
                                                    memberFollowings={memberFollowings}
                                                    handleCloseFollowings={handleCloseFollowingsModal}
                                                />

                                                {/* <Modal
    className="infoModalContainer"
    open={openFollowingsModal}
    onClose={handleCloseFollowingsModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>

                <div className='followers_modal_box'> 
                    <div className="followers_modal_closing">
                        <span>Followings</span>
                        <img 
                            src="/icons/other/close.png" 
                            alt="" 
                            className='followers_close'
                            onClick={handleCloseFollowingsModal}
                        />
                        <button onClick={handleCloseFollowingsModal}>ssadfadf</button>
                    </div>
                    <div className="followers_container">
                        {memberFollowings.map((following: Following) => {
                            console.log("following", following);
                            const image_url = following?.follow_member_data?.mb_profile_image
                                ? `${serverApi}/${following.follow_member_data.mb_profile_image}`
                                : '/icons/user.png';
                            return(
                                <div className="follower_container" key={following?._id}>
                                    <div className="follower_info">
                                        <img src={image_url} alt="" className='follower_avatar' onClick={() => visitMemberHandler(following?.follow_id)}/>
                                        <span>@{following?.follow_member_data.mb_nick}</span>
                                    </div>
                                    {true &&(
                                        <button
                                            className="follow_btn un_follow_btn"
                                            onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                                        >
                                            Unfollow
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal> */}
                                            </div>
                                            <span className="count">{memberFollowings.length}</span>
                                        </div>
                                        <div className="group">
                                            <div className="text">Posts</div>
                                            <span className="count">{filteredPosts.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{verifiedMemberData?.mb_description}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="page_center">
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
                                        <Tab label={<img src="/icons/other/posts.png" alt="" className="center_icon" />} value="1" />
                                        <Tab label={<img src="/icons/other/save.png" alt="" className="center_icon" />} value="2" />
                                        <Tab label={<img src="/icons/other/heart.png" alt="" className="center_icon" />} value="3" />
                                        <div className="my-page-information" onClick={handleOpenModal}><Typography>Information</Typography></div>  

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
                                                        <div className="info">{moment(verifiedMemberData?.mb_birthday).format('YYYY-MM-DD')}</div>
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

                                <div className="upload_post_btn">
                                    <Link to={"/edit"}><button className="edit-profile">Edit Profile</button></Link>
                                    
                                    <Link to={"/upload-post"} style={{textDecoration: "none"}}>
                                        <button className="upload-post">
                                            <img src="/icons/post/plus.png" alt="" width={"15px"}/>
                                            Upload Post
                                        </button>
                                    </Link>
                                </div>
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