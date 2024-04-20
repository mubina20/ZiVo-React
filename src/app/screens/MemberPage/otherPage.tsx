import { Box, Modal, Typography } from "@mui/material";
import "../../../css/visitPage.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MemberApiService from "../../apiServices/memberApiService";
import { retrieveChosenMember, retrieveMemberFollowers, retrieveMemberFollowings } from "./selector";
import { serverApi } from "../../../lib/config";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { Member } from "../../../types/user";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { CreateChat } from "../../../types/chat";
import { verifiedMemberData } from "../../apiServices/verify";
import ChatApiService from "../../apiServices/chatApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import Popup from 'reactjs-popup';
import { FollowingsModal } from "./followingsModal";
import FollowApiService from "../../apiServices/followApiService";
import { Follower, Following, FollowSearchObj } from "../../../types/follow";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setChosenMember, setMemberFollowers, setMemberFollowings } from "./slice";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import { setChosenPost } from "../HomePage/slice";

interface RouteParams {
    memberId: string;
}

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
    setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
    setChosenPost: (data: Post) => dispatch(setChosenPost(data))
});

// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
    retrieveChosenMember,
    (chosenMember) => ({
        chosenMember
    })
);

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


export function OtherPage(props: any) {
    /** INITIALIZATIONS **/
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        setChosenPost,
    } = actionDispatch(useDispatch());

    const { chosenMember } = useSelector(chosenMemberRetriever);
    const { setChosenMember} = actionDispatch(useDispatch());
    console.log("Chosen Member::", chosenMember)
    const { memberId } = useParams<RouteParams>();
    const { open, handleOpenModal, handleModalClose } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [member, setMember] = useState<Member>();
    const [createChat, setCreateChat] = useState<CreateChat>({
        sender_id: verifiedMemberData._id,
		receiver_id: memberId
	});

    const { setMemberFollowers } = actionDispatch(useDispatch());
	const { memberFollowers } = useSelector(memberFollowersRetriever);
	const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>({ mb_id: memberId });
    console.log("memberFollowers", memberFollowers)

    const { setMemberFollowings } = actionDispatch(useDispatch());
	const { memberFollowings } = useSelector(memberFollowingsRetriever);
	const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: memberId });
    const [followRebuild, setFollowerRebuild] = useState<Boolean>(false);

    const [openFollowersModal, setOpenFollowersModal] = useState(false);
    const [openFollowingsModal, setOpenFollowingsModal] = useState(false);

    /** HANDLERS **/
    const handleOpenFollowersModal = () => {
        setOpenFollowersModal(true);
    };
    const handleOpenFollowingsModal = () => {
        setOpenFollowingsModal(true);
    };

    const handleCloseFollowersModal = (event: {
        stopPropagation: () => void;
    }) => {
        event.stopPropagation(); 
        // console.log("Closing Followers Modal");
        setOpenFollowersModal(false);
    };
    
    const handleCloseFollowingsModal = (event: {
        stopPropagation: () => void;
    }) => {
        event.stopPropagation(); 
        // console.log("Closing Followings Modal");
        setOpenFollowingsModal(false);
    };

    /** HANDLERS **/
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
    const filteredPosts = allPosts.filter(post => post.member._id === chosenMember?._id);
    // console.log("filteredPosts", filteredPosts);

    useEffect(() => {
        if(memberId === verifiedMemberData?._id) {
            history.push('/my-page');
        }
    
        const memberService = new MemberApiService();
        memberService
        .getChosenMember(memberId)
        .then((data) => setChosenMember(data))
        .catch((err) => console.log(err));
    
    }, [verifiedMemberData, memberId, followRebuild]);

    const handleCreateChatButton = async () => {
        try {
            const chatService = new ChatApiService();
            const result = await chatService.createChat(createChat);
            const chat_id = result._id;
    
            history.push(`/chat/${chat_id}`);
        } catch (error) {
            console.log(`ERROR :: handleSendButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };

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

    const subscribeHandler = async (e: any, id: any) => {
        try {
            e.stopPropagation();
            assert.ok(verifiedMemberData, Definer.auth_err1);
        
            const followService = new FollowApiService();
            await followService.subscribe(id);
        
            setFollowerRebuild(!followRebuild);
            await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
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

			await sweetTopSmallSuccessAlert('successfully unsubscribed', 700, false);
			setFollowerRebuild(!followRebuild);
		} catch (error: any) {
			console.log(error);
			sweetErrorHandling(error).then();
		}
	};

    const handlePostSelect = async (postType: any, postId: any) => {
        try {
            const postService = new PostApiService();
            const chosenPostData = await postService.getChosenPost(postType, postId);
            dispatch(setChosenPost(chosenPostData)); 
            history.push(`/post/${chosenPostData.post_type}/${chosenPostData._id}`); 
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
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
                                            chosenMember?.mb_profile_image 
                                            ? `${serverApi}/${chosenMember.mb_profile_image}`  
                                            : "/icons/user.png"
                                    }  
                                    alt="" 
                                    className="user_icon" 
                                />
                                <Typography className="nickname">@{chosenMember?.mb_nick}</Typography>
                                {/* <button className="follow_btn" style={{marginBottom: "10px"}}> */}
                                    {/* Follow */}
                                    {memberFollowers ? (
                                        memberFollowers[0]?.subscriber_id === verifiedMemberData._id ? (
                                            <button
                                                className="follow_btn"
                                                style={{ backgroundColor: "#f10101f2" }}
                                                onClick={(e) => unsubscribeHandler(e, chosenMember?._id)}
                                            >
                                                UNFOLLOW
                                            </button>
                                        ) : (
                                            <button
                                                className="follow_btn"
                                                // style={{marginBottom: "10px"}}
                                                onClick={(e) => subscribeHandler(e, chosenMember?._id)}
                                            >
                                                FOLLOW 
                                            </button>
                                        )
                                    ) : null}
                                {/* </button> */}
                                <button className="follow_btn" style={{background: "#fff", color: "#000"}} onClick={handleCreateChatButton}>Message</button>
                            </div>
                            <div className="right_info">
                                <div className="info">
                                    <div className="top_icons">
                                        <img src="/icons/post/share.png" alt="" className="top_icon"/>
                                        <img src="/icons/post/more.png" alt="" className="top_icon"/>
                                    </div>
                                    <div className="bottom_infos">
                                        <div className="group">
                                            <div className="text" onClick={handleOpenFollowersModal}>
                                                Followers
                                                <div>
                                                    <Modal
                                                        className="infoModalContainer"
                                                        open={openFollowersModal}
                                                        onClose={handleCloseFollowersModal }
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{width: "350px"}}
                                                    >
                                                        <div className='followers_modal_box'> 
                                                            <div className="followers_modal_closing">
                                                                <span>Followers</span>
                                                                <img 
                                                                    src="/icons/other/close.png" 
                                                                    alt="" 
                                                                    className='followers_close'
                                                                    onClick={handleCloseFollowersModal}
                                                                />
                                                            </div>
                                                            <div className="followers_container">
                                                                {memberFollowers.map((follower: Follower) => {
                                                                    // console.log("follower", follower);
                                                                    const image_url = follower?.subscriber_member_data?.mb_profile_image
                                                                        ? `${serverApi}/${follower.subscriber_member_data.mb_profile_image}`
                                                                        : '/icons/user.png';
                                                                        
                                                                    return(
                                                                        <div className="follower_container" key={follower?._id}>
                                                                            <div className="follower_info">
                                                                                <img src={image_url} alt="" className='follower_avatar'/>
                                                                                <span>@{follower.subscriber_member_data.mb_nick}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </div>
                                            <span className="count">{chosenMember?.mb_subscriber_count}</span>
                                        </div>
                                        <div className="group">
                                            <div className="text" onClick={handleOpenFollowingsModal}>
                                                Followings  
                                                <div>
                                                    <Modal
                                                        className="infoModalContainer"
                                                        open={openFollowingsModal}
                                                        onClose={handleCloseFollowingsModal }
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        style={{width: "350px"}}
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
                                                                                <img src={image_url} alt="" className='follower_avatar'/>
                                                                                <span>@{following?.follow_member_data.mb_nick}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            </div>
                                            <span className="count">{chosenMember?.mb_follow_count}</span>
                                        </div>
                                        <div className="group">
                                            <div className="text">Posts</div>
                                            <span className="count">{filteredPosts.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{chosenMember?.mb_description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="other_page_center">
                            <img src="/icons/other/posts.png" alt="" className="center_icon"/>
                            <Typography style={{cursor: "pointer"}} onClick={handleOpenModal}>Information</Typography>
                            <div>
                                <Modal
                                    className="infoModalContainer"
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
                                            <div className="info_category">Address</div>
                                            <div className="info">{chosenMember?.mb_address}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Join</div>
                                            <div className="info">{moment(chosenMember?.createdAt).format("YYYY-MM-DD")}</div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <Box className='line' />

                        <div className="page_bottom">
                            {filteredPosts && filteredPosts.length > 0 ? (
                                filteredPosts.map((post: Post) => (
                                    post.post_type === "photo" ? (
                                        // Photo Post
                                        <div key={post._id}>
                                            <div className="post" onClick={() => handlePostSelect(post?._id, "photo")}>
                                                <img src={`${serverApi}/${post?.post_content}`} alt="" width="300px"/>
                                            </div>
                                        </div>
                                    ) : post.post_type === "article" ? (
                                        // Article Post
                                        <div className="post" onClick={() => handlePostSelect(post?._id, "article")}>
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
                                    ) : post.post_type === "video" ? (
                                        // Video Post
                                        <div key={post._id}>
                                            <div className="post" onClick={() => handlePostSelect(post?._id, "video")}>
                                                <video
                                                    loop
                                                    // playsInline
                                                    // controls
                                                    width={"100%"}
                                                    style={{border: "1px solid #000", background: "#000"}}
                                                >
                                                    <source
                                                        src={`${serverApi}/${post?.post_content}`}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            </div>
                                        </div>
                                    ) : (
                                        null
                                    )
                                ))
                            ) : (
                                <div style={{marginLeft: "400px", marginTop: "100px"}}>No posts yet</div>
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}