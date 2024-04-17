import { Box, Container, Stack, Tab } from "@mui/material";
import "../../../css/home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { AllPosts } from "./allPosts";
import { AllVideoPosts } from "./allVideoPosts";
import { AllPhotoPosts } from "./allPhotoPosts";
import { AllArticlePosts } from "./allArticlePosts";
import { Member } from "../../../types/user";
import { setAllMembers, setChosenMember, setMemberFollowings } from "../MemberPage/slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveChosenMember } from "../MemberPage/selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiServices/memberApiService";
import { retrieveMemberFollowings } from "../MemberPage/selector";
import { Following, FollowSearchObj } from "../../../types/follow";
import { verifiedMemberData } from "../../apiServices/verify";
import FollowApiService from "../../apiServices/followApiService";
import PostApiService from "../../apiServices/postApiService";
import { setChosenPost } from "./slice";
import { Post } from "../../../types/post";

const members = [
    { id: 1, nickName: 'samo_ping12' },
    { id: 2, nickName: 'samo_ping12' },
    { id: 3, nickName: 'samo_ping12' },
    { id: 4, nickName: 'samo_ping12' },
    { id: 5, nickName: 'samo_ping12' }
];

const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
    setChosenPost: (data: Post) => dispatch(setChosenPost(data)),
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => 
        dispatch(setAllMembers(data))
});

// const chosenMemberRetriever = createSelector(
//     retrieveChosenMember, 
//     (chosenMember) => ({
//         chosenMember
//     })
// );

// const memberFollowingsRetriever = createSelector(retrieveMemberFollowings, (memberFollowings) => ({
// 	memberFollowings,
// }));

export function Home() {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    // const [allMembers, setAllMembers] = useState<Member[]>([]);
    

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenMember,
    } = actionDispatch(useDispatch());

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
        <div className="main">
            <Box className="story-wrapper" style={{ width: '1000px', }} flexDirection={'row'}>
                <Swiper
                    slidesPerView={7}
                    centeredSlides={true}
                    spaceBetween={30}
                    scrollbar={{ draggable: true }}
                >
                    {members.map((member) => {
                        return (
                            <div>
                                <SwiperSlide
                                    key={member.id}
                                    style={{ cursor: 'pointer' }}
                                    className="slide"
                                    
                                >
                                    <div className="user-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                                            <circle cx="45" cy="45" r="44" stroke="url(#paint0_angular_35_88)" strokeWidth="2" />
                                            <defs>
                                                <radialGradient id="paint0_angular_35_88" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(45 45) rotate(90) scale(45)">
                                                    <stop offset="0.0961368" stopColor="#FF007A" />
                                                    <stop offset="0.329601" stopColor="#780039" />
                                                    <stop offset="0.622687" stopColor="#FF007A" />
                                                    <stop offset="0.87147" stopColor="#7F003D" />
                                                </radialGradient>
                                            </defs>
                                        </svg>
                                        <img src="/icons/user.png" alt="user" width={"82px"} />
                                        <p>@{member.nickName}</p>
                                    </div>
                                </SwiperSlide>
                            </div>
                        );
                    })}
                </Swiper>
            </Box>

            <TabContext value={value}>
                        <Stack className="upload_page_tabs_container">
                            <TabList 
                                onChange={handleChange} 
                                textColor={"primary"}
                                TabIndicatorProps={{
                                    style: { backgroundColor: "#FF007A"}
                                }}
                                style={{marginTop: "50px"}}
                            >
                                <Tab label="All Posts" value="1"/>
                                <Tab label="Video Posts" value="2"/>
                                <Tab label="Photo Posts" value="3"/>
                                <Tab label="Article Posts" value="4"/>
                            </TabList>
                        </Stack>
                        <TabPanel value="1"> 
                            <AllPosts  
                                setChosenMember={setChosenMember}
                                handleMemberSelect={handleMemberSelect}
                                handlePostSelect={handlePostSelect}
                            /> 

                        </TabPanel>
                        <TabPanel value="2"> 
                            <AllVideoPosts 
                                handleMemberSelect={handleMemberSelect}
                                handlePostSelect={handlePostSelect}
                            /> 
                        </TabPanel>
                        <TabPanel value="3"> 
                            <AllPhotoPosts
                                handleMemberSelect={handleMemberSelect} 
                                handlePostSelect={handlePostSelect}
                            /> 
                        </TabPanel>
                        <TabPanel value="4"> 
                            <AllArticlePosts
                                handleMemberSelect={handleMemberSelect}
                                handlePostSelect={handlePostSelect}
                            /> 
                        </TabPanel>
                </TabContext>

        </div>
    )
}