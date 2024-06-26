import { Box, Modal, Typography, Tab, Stack } from "@mui/material";
import "../../../css/visitPage.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
import { useEffect, useState } from "react";
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
import FollowApiService from "../../apiServices/followApiService";
import { Follower, Following, FollowSearchObj } from "../../../types/follow";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setChosenMember, setMemberFollowers, setMemberFollowings } from "./slice";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import { setChosenPost } from "../HomePage/slice";
import { MyPosts } from "./myPosts";
import { Stories } from "./stories";

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
    const [value, setValue] = useState("1");

    let { chosenMember } = useSelector(chosenMemberRetriever);
    const { setChosenMember} = actionDispatch(useDispatch());
    const { memberId } = useParams<RouteParams>();
    const { open, handleOpenModal, handleModalClose } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [memberFollow, setMemberFollow] = useState<any>();
    const [createChat, setCreateChat] = useState<CreateChat>({
        sender_id: verifiedMemberData._id,
		receiver_id: memberId
	});

    const { setMemberFollowers } = actionDispatch(useDispatch());
	const { memberFollowers } = useSelector(memberFollowersRetriever);
	const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>({ mb_id: memberId });

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
        setOpenFollowersModal(false);
    };
    
    const handleCloseFollowingsModal = (event: {
        stopPropagation: () => void;
    }) => {
        event.stopPropagation(); 
        setOpenFollowingsModal(false);
    };

    /** HANDLERS **/
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
                console.error('Error allPostsData:', err);
            }
        };

        allPostsData();
    }, []);
    const filteredPosts = allPosts.filter(post => post.member._id === chosenMember?._id);

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
            console.log(`ERROR :: handleCreateChatButton, ${error}`);
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

    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.chosenMemberFollow(memberId)
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
        alert("This logic is still in process!");
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
                                    
                                {memberFollow && memberFollow.length > 0 ? (
                                    memberFollow[0].subscriber_id === verifiedMemberData?._id ? (
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
                                            onClick={(e) => subscribeHandler(e, chosenMember?._id)}
                                        >
                                            FOLLOW 
                                        </button>
                                    )
                                ) : <button
                                        className="follow_btn"
                                        onClick={(e) => subscribeHandler(e, chosenMember?._id)}
                                        >
                                        FOLLOW 
                                    </button>}
                                <button className="follow_btn" style={{background: "#000000", color: "#ffffff"}} onClick={handleCreateChatButton}>Message</button>
                            </div>
                            <div className="right_info">
                                <div className="info">
                                    <div className="top_icons">
                                        <img src="/icons/post/share-other.png" alt="" className="top_icon" onClick={handleAlert}/>
                                        <img src="/icons/post/more.png" alt="" className="top_icon" onClick={handleAlert}/>
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
                                        <Tab label={<img src="/icons/other/story.png" alt="" className="center_icon" />} value="2" />
                                        <div className="my-page-information" onClick={handleOpenModal}><Typography>Information</Typography></div>
                                    </TabList>
                                    </div>
                                </Stack>
                                <Box className='line' />
                                
                                <TabPanel value="1"> <MyPosts filteredPosts={filteredPosts} setAllPosts={setAllPosts} /> </TabPanel>
                                <TabPanel value="2"> <Stories filteredPosts={filteredPosts} setAllPosts={setAllPosts}/> </TabPanel>
                            </TabContext>
                            {/* <Typography style={{cursor: "pointer"}} onClick={handleOpenModal}>Information</Typography> */}
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