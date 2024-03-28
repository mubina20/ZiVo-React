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

import { setAllPosts } from "./slice";
import { retrieveAllPosts } from "./selector";
import { serverApi } from "../../../lib/config";
import { AllPosts } from "./allPosts";
import { AllVideoPosts } from "./allVideoPosts";
import { AllPhotoPosts } from "./allPhotoPosts";
import { AllArticlePosts } from "./allArticlePosts";
import moment from 'moment';

const members = [
    { id: 1, nickName: 'samo_ping12' },
    { id: 2, nickName: 'samo_ping12' },
    { id: 3, nickName: 'samo_ping12' },
    { id: 4, nickName: 'samo_ping12' },
    { id: 5, nickName: 'samo_ping12' }
];

export function MobileHome() {
    /** INITIALIZATIONS **/
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [value, setValue] = useState("1");

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
    console.log("props > allPosts", allPosts);

    

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <div>
            <MobileHeader />
            <MobileFooter />
            
            <div className="mobile-main">
                <div style={{display: "flex", margin: "70px 0 70px 20px", width: "90%", overflow: "scroll", color: "white", fontSize: "13px", gap: "15px"}}>
                    {members.map((member) => {
                        return (
                            <div className="user_icon">
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
                        );
                    })}
                </div>

                <div className="mobile-post">
                    {/* <div className="post-container">
                        <div className="post-data">
                            <div className="post-top">
                                <div className="user-container">
                                    <img
                                        src='/icons/user.png' 
                                        alt="" 
                                        className="post-user-icon"
                                        style={{borderRadius: "50%"}}
                                    />
                                    <div className="user-info">
                                        <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@samo_ping12</Typography>
                                        <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>2024.07.10</Typography>
                                    </div>
                                </div>
                                <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                            </div>
                            <Typography className="post-desctiption">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Typography>
                        </div>

                        <div className="post-content">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWdcQ6mvC3TyHVt4IjXt2s42VSon8woXN-A&usqp=CAU" alt="" />
                        </div>

                        <div className="post-bottom">
                            <div className="mobile-left">
                                <img src="/icons/post/like.png" alt="" className="bottom-icon"/><span style={{marginRight: "50px"}}>464K</span>
                                <img src="/icons/post/chat.png" alt="" className="bottom-icon"/><span>100</span>
                            </div>
                            <div className="mobile-right">
                                <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                            </div>
                        </div>
                    </div> */}
                    {allPosts.map((post: Post) => (
                        post.post_type === "photo" ? (
                            // Photo Post
                            <div className="post-container" key={post._id}>
                                <div className="post-data">
                                    <div className="post-top">
                                        <div className="user-container">
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
                                    <Typography className="post-desctiption">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Typography>
                                </div>

                                <div className="post-content">
                                    <img src={`${serverApi}/${post?.post_content}`} alt=""/>
                                </div>

                                <div className="post-bottom">
                                    <div className="mobile-left">
                                        <img src="/icons/post/like.png" alt="" className="bottom-icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" alt="" className="bottom-icon"/><span>100</span>
                                    </div>
                                    <div className="mobile-right">
                                        <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                                    </div>
                                </div>
                            </div>
                        ) : post.post_type === "article" ? (
                            // Article Post
                            <div className="post-container" key={post._id}>
                                <div className="post-data">
                                    <div className="post-top">
                                        <div className="user-container">
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
                                        <img src="/icons/post/chat.png" alt="" className="bottom-icon"/><span>100</span>
                                    </div>
                                    <div className="mobile-right">
                                        <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Video Post
                            <div className="post-container" key={post._id}>
                                <div className="post-data">
                                    <div className="post-top">
                                        <div className="user-container">
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
                                    <Typography className="post-desctiption">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Typography>
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
                                        <img src="/icons/post/chat.png" alt="" className="bottom-icon"/><span>100</span>
                                    </div>
                                    <div className="mobile-right">
                                        <img src="/icons/post/share.png" alt="" className="bottom-icon"/>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )   
}
