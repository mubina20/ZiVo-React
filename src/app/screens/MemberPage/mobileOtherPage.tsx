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

export function MobileOtherPage(props: any) {
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
                        <div className="page-top" style={{padding: "10px"}}>
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
                            </div>
                            <div className="right-info">
                                <button className="edit_profile button" style={{borderRadius: "21px"}}>Follow</button>
                                <button className="upload-post button" style={{color: "white", borderRadius: "21px"}}>Message</button>
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
                                <div className="user-description" style={{color: "white"}}>
                                    <p>{verifiedMemberData?.mb_description}</p>
                                </div>
                            </div>
                            <div className="page-center" style={{color: "white"}}>
                                <div style={{display: "flex", alignItems: "center", gap: "30px"}}>
                                    <img src="/icons/other/posts.png" alt="" className="center_icon" width={"25px"}/>
                                    <Typography style={{cursor: "pointer"}} onClick={handleOpenModal}>Information</Typography>
                                    
                                </div>
                                <div className="line"></div>

                                <div>
                                    {/* <Modal
                                        className="infoModalContainer"
                                        open={open}
                                        onClose={handleModalClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <div className="infoModal">
                                            <div className="member_info_closing">
                                                <span>@{member?.mb_nick}<span>'s Information</span></span>
                                                <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="close"/>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Name</div>
                                                <div className="info">{member?.mb_name}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Surname</div>
                                                <div className="info">{member?.mb_surname}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Birthday</div>
                                                <div className="info">{member?.mb_birthday}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Gender</div>
                                                <div className="info">{member?.mb_gender}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Country</div>
                                                <div className="info">{member?.mb_country}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">School</div>
                                                <div className="info">{member?.mb_school}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Description</div>
                                                <div className="info">{member?.mb_description}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Hobby</div>
                                                <div className="info">{member?.mb_hobby}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Address</div>
                                                <div className="info">{member?.mb_address}</div>
                                            </div>
                                            <div className="information">
                                                <div className="info_category">Join</div>
                                                <div className="info">{moment(member?.createdAt).format("YYYY-MM-DD")}</div>
                                            </div>
                                        </div>
                                    </Modal> */}
                                </div>
                            <div>
                            <div className="page_bottom" style={{marginTop: "50px"}}>
                                {filteredPosts && filteredPosts.length > 0 ? (
                                    filteredPosts.map((post: Post) => (
                                        post.post_type === "photo" ? (
                                            // Photo Post
                                            <div key={post._id}>
                                                <div className="post">
                                                    <img src={`${serverApi}/${post?.post_content}`} alt="" width="300px"/>
                                                    {post.post_title}
                                                    {/* {post.post_content} */}
                                                </div>
                                            </div>
                                        ) : post.post_type === "article" ? (
                                            // Article Post
                                            <div className="post">
                                                <div 
                                                    className="article_post"
                                                    style={{
                                                        background: post?.post_bg_color ? post?.post_bg_color : "grey",
                                                        color: post?.post_text_color ? post?.post_text_color : "black",
                                                        textAlign: post.post_align === "center" ? "center" : "left"

                                                    }}
                                                >
                                                    {post.post_content}
                                                </div>
                                            </div>
                                        ) : (
                                            // Video Post
                                            <div key={post._id}>
                                                <div className="post">
                                                    <video
                                                        loop
                                                        // playsInline
                                                        controls
                                                        width={"100%"}
                                                    >
                                                        <source
                                                            src={`${serverApi}/${post?.post_content}`}
                                                            type="video/mp4"
                                                        />
                                                    </video>
                                                </div>
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <div>Post hali yo'q</div>
                                )}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}