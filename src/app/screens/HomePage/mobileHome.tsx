import React from 'react'
import { MobileHeader } from '../../components/header/mobileHeader'
import "../../../css/mobileHome.css"
import { MobileFooter } from '../../components/footer/mobileFooter'

import { Box, Container, Stack, Tab, Typography } from "@mui/material";
import "../../../css/mobileHome.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useEffect, useReducer, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import PostApiService from "../../apiServices/postApiService";
import { Post } from "../../../types/post";

import { setAllPosts, setChosenPost, setChosenStory } from "./slice";
import { retrieveAllPosts } from "./selector";
import { serverApi } from "../../../lib/config";
import { AllPosts } from "./allPosts";
import { AllVideoPosts } from "./allVideoPosts";
import { AllPhotoPosts } from "./allPhotoPosts";
import { AllArticlePosts } from "./allArticlePosts";
import moment from 'moment';
import { Dispatch } from '@reduxjs/toolkit';
import { setAllMembers, setChosenMember } from '../MemberPage/slice';
import { Member } from '../../../types/user';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { verifiedMemberData } from '../../apiServices/verify';

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenPost: (data: Post) => dispatch(setChosenPost(data)),
    setChosenStory: (data: Post) => dispatch(setChosenStory(data)),
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => dispatch(setAllMembers(data))
});

export function MobileHome() {
    /** INITIALIZATIONS **/
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [value, setValue] = useState("1");
    const dispatch = useDispatch();
    const history = useHistory();

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
    // console.log("allPosts", allPosts);
    // const {allPosts} = props;
    // console.log("props > allPosts", allPosts);

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
    const handleStorySelct = async (story_type: any, story_id: any) => {
        try {
            const postService = new PostApiService();
            const chosenStoryData = await postService.getChosenPost(story_type, story_id);
            dispatch(setChosenStory(chosenStoryData)); 
            history.push(`/stories/${chosenStoryData.member.mb_nick}/${chosenStoryData.post_type}/${chosenStoryData._id}`); 
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
    };

    const handleMemberSelect = async (memberId: any) => {
        try {
            if(memberId === verifiedMemberData._id){
                history.push('/my-page');
            } else{
                history.push(`/member/${memberId}`)
            }
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
    };

    

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div>
            <MobileHeader />
            <MobileFooter />
            
            <div className="mobile-main">
                <div className='mobile_home_stories'>
                {allPosts.length > 0 ? (
    allPosts.map((post: Post) => {
        return (
            <div className="user-icon">
                {post.post_type === "photoStory" && (
                    <div key={post._id} className='story_box'>
                        <img src={`${serverApi}/${post?.post_content}`} className="mobileStoryContent" alt="user" onClick={() => handleStorySelct(post?._id, "photoStory")}/>
                        <p onClick={() => handleMemberSelect(post.member?.mb_nick)}>
                            @{post.member?.mb_nick}
                        </p>
                    </div>
                )}
                {post.post_type === "articleStory" && (
                    <div className='story_box'>
                        <div 
                            key={post._id} onClick={() => handleStorySelct(post?._id, "articleStory")}
                            className="mobileStoryContentArticle"
                            style={{
                                background: post?.post_bg_color ? post?.post_bg_color : "#000",
                                color: post?.post_text_color ? post?.post_text_color : "#fff",
                                // textAlign: post.post_align === "center" ? "center" : "left"
                            }}
                            // onClick={() => handlePostSelect(post?._id, "article")}
                        >
                            {post.post_content}
                        </div>
                        <p onClick={() => handleMemberSelect(post.member?.mb_nick)}>
                            @{post.member?.mb_nick}
                        </p>
                    </div>
                )}
                {post.post_type === "videoStory" && (
                    <div key={post._id} className='story_box' onClick={() => handleStorySelct(post?._id, "videoStory")}>
                        <video
                            loop
                            playsInline
                            className="mobileStoryContent"
                        >
                            <source
                                src={`${serverApi}/${post?.post_content}`}
                                type="video/mp4"
                            />
                        </video>
                        <p onClick={() => handleMemberSelect(post.member?.mb_nick)}>
                            @{post.member?.mb_nick}
                        </p>
                    </div>
                )}
                {post.post_type !== "videoStory" && post.post_type !== "articleStory" && post.post_type !== "photoStory" && (
    null
)}

            </div>
        );
    })
) : (
    <div>hech nima yo'q</div>
)}
                </div>

                <div className="mobile-post">
                    {allPosts.map((post: Post) => (
                        post.post_type === "photo" ? (
                            // Photo Post
                            <div className="post-container" key={post._id} >
                                <div className="mobile-post-data" style={{borderRadius: "none"}}>
                                    <div className="post-top">
                                        <div className="user-container" onClick={() => handleMemberSelect(post?.member?._id)}>
                                            <img 
                                                src={
                                                    post?.member?.mb_profile_image 
                                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                                    : "/icons/user.png"} 
                                                alt="" 
                                                className="post-user-icon"
                                                style={{borderRadius: "50%"}}
                                            />
                                            <div className="user-info">
                                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
                                            </div>
                                        </div>
                                        <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                                    </div>
                                    <Typography className="post-desctiption">{post.post_title}</Typography>
                                </div>

                                <div className="post-content">
                                    <img src={`${serverApi}/${post?.post_content}`} alt=""/>
                                </div>

                                <div className="post-bottom">
                                    <div className="mobile-left">
                                        <img src="/icons/post/like.png" alt="" className="bottom-icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" alt="" className="bottom-icon" onClick={() => handlePostSelect(post?._id, "photo")}/><span>100</span>
                                    </div>
                                    <div className="mobile-right">
                                        <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                                    </div>
                                </div>
                            </div>
                        ) : post.post_type === "article" ? (
                            // Article Post
                            <div className="post-container" key={post._id}>
                                <div className="mobile-post-data">
                                    <div className="post-top">
                                        <div className="user-container" onClick={() => handleMemberSelect(post?.member?._id)}>
                                            <img 
                                                src={
                                                    post?.member?.mb_profile_image 
                                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                                    : "/icons/user.png"} 
                                                alt="" 
                                                className="post-user-icon"
                                                style={{borderRadius: "50%"}}
                                            />
                                            <div className="user-info">
                                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
                                            </div>
                                        </div>
                                        <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                                    </div>
                                </div>

                                <div 
                                    className="post-content"
                                    style={{
                                        background: post?.post_bg_color ? post?.post_bg_color : "grey",
                                        color: post?.post_text_color ? post?.post_text_color : "black",
                                        textAlign: post.post_align === "center" ? "center" : "left"

                                    }}
                                >
                                    {post.post_content}
                                </div>

                                <div className="post-bottom">
                                    <div className="mobile-left">
                                        <img src="/icons/post/like.png" alt="" className="bottom-icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" alt="" className="bottom-icon" onClick={() => handlePostSelect(post?._id, "article")}/><span>100</span>
                                    </div>
                                    <div className="mobile-right">
                                        <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                                    </div>
                                </div>
                            </div>
                        ) : post.post_type === "video" ? (
                            // Video Post
                            <div className="post-container" key={post._id}>
                                <div className="mobile-post-data">
                                    <div className="post-top">
                                        <div className="user-container" onClick={() => handleMemberSelect(post?.member?._id)}>
                                            <img 
                                                src={
                                                    post?.member?.mb_profile_image 
                                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                                    : "/icons/user.png"} 
                                                alt="" 
                                                className="post-user-icon"
                                                style={{borderRadius: "50%"}}
                                            />
                                            <div className="user_info">
                                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
                                            </div>
                                        </div>
                                        <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                                    </div>
                                    <Typography className="post-desctiption">{post?.post_title}</Typography>
                                </div>

                                <div className="post-content">
                                    <video
                                        loop
                                        playsInline
                                        controls
                                    >
                                        <source
                                            src={`${serverApi}/${post?.post_content}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </div>

                                <div className="post-bottom">
                                    <div className="mobile-left">
                                        <img src="/icons/post/like.png" alt="" className="bottom-icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" onClick={() => handlePostSelect(post?._id, "video")} alt="" className="bottom-icon"/><span>100</span>
                                    </div>
                                    <div className="mobile-right">
                                        <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                                    </div>
                                </div>
                            </div>
                        ): (
                            null
                        )
                    ))}
                </div>
            </div>
        </div>
    )   
}
