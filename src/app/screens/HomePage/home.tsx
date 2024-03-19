import { Box, Container, Stack, Typography } from "@mui/material";
import "../../../css/home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useEffect, useReducer, useState } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import PostApiService from "../../apiServices/postApiService";
import { Post } from "../../../types/post";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setAllPosts } from "./slice";
import { retrieveAllPosts } from "./selector";
import { serverApi } from "../../../lib/config";

const members = [
    { id: 1, nickName: 'samo_ping12' },
    { id: 2, nickName: 'samo_ping12' },
    { id: 3, nickName: 'samo_ping12' },
    { id: 4, nickName: 'samo_ping12' },
    { id: 5, nickName: 'samo_ping12' }
];

const actionDispatch = (dispatch: Dispatch) => ({
    setAllPosts: (data: Post[]) => 
        dispatch(setAllPosts(data))
});

const allPostsRetriever = createSelector(
    retrieveAllPosts,
    (allPosts) => ({
        allPosts
    })
);

export function Home() {

    const [allPosts, setAllPosts] = useState<Post[]>([]);

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
    console.log("allPosts", allPosts);

    return(
        <Container>
            <div className="main">
                <Box className="story-wrapper" style={{ width: '1000px', }} flexDirection={'row'} sx={{ }}>
                    <Swiper
                        className="ddddddd"
                        slidesPerView={7}
                        centeredSlides={true}
                        // direction={'horizontal'} 
                        spaceBetween={30}
                        // navigation
                        // pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        {members.map((member) => {
                            return (
                                <div className="hori">
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

                <div className="post-mode">
                    <button>Only Videos</button>
                    <button>Only Photos</button>
                    <button>Only Articles</button>
                    <button>Default</button>
                </div>


                <div className="post">
                    {allPosts.map((post: Post) => (
                        post.post_type === "photo" ? (
                            // Photo Post
                            <div className="post_container" key={post._id}>
                                <div className="post_data">
                                    <div className="post_top">
                                        <div className="user_container">
                                            <img 
                                                src={
                                                    post?.member?.mb_profile_image 
                                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                                    : "/icons/user.png"} 
                                                alt="" 
                                                className="post_user_icon"
                                                style={{borderRadius: "50%"}}
                                            />
                                            <div className="user_info">
                                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>2024.02.25</Typography>
                                            </div>
                                        </div>
                                        <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                                    </div>
                                    <Typography className="post_desctiption">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Typography>
                                </div>

                                <div className="post_content">
                                    <img src={`${serverApi}/${post?.post_content}`} alt=""/>
                                </div>

                                <div className="post_bottom">
                                    <div className="left">
                                        <img src="/icons/post/like.png" alt="" className="bottom_icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" alt="" className="bottom_icon"/><span>100</span>
                                    </div>
                                    <div className="right">
                                        <img src="/icons/post/share.png" alt="" className="bottom_icon"/>
                                    </div>
                                </div>
                            </div>
                        ) : post.post_type === "article" ? (
                            // Article Post
                            <div className="post_container" key={post._id}>
                                <div className="post_data">
                                    <div className="post_top">
                                        <div className="user_container">
                                            <img 
                                                src={
                                                    post?.member?.mb_profile_image 
                                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                                    : "/icons/user.png"} 
                                                alt="" 
                                                className="post_user_icon"
                                                style={{borderRadius: "50%"}}
                                            />
                                            <div className="user_info">
                                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>2024.02.25</Typography>
                                            </div>
                                        </div>
                                        <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                                    </div>
                                </div>

                                <div 
                                    className="post_content"
                                    style={{
                                        fontSize: "22px",
                                        fontWeight: "700",
                                        padding: "15px",
                                        width: "94.9%",
                                        background: post?.post_bg_color ? post?.post_bg_color : "grey",
                                        color: post?.post_text_color ? post?.post_text_color : "black",
                                        textAlign: post.post_align === "center" ? "center" : "left"

                                    }}
                                >
                                    {post.post_content}
                                </div>

                                <div className="post_bottom">
                                    <div className="left">
                                        <img src="/icons/post/like.png" alt="" className="bottom_icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" alt="" className="bottom_icon"/><span>100</span>
                                    </div>
                                    <div className="right">
                                        <img src="/icons/post/share.png" alt="" className="bottom_icon"/>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Video Post
                            <div className="post_container" key={post._id}>
                                <div className="post_data">
                                    <div className="post_top">
                                        <div className="user_container">
                                            <img 
                                                src={
                                                    post?.member?.mb_profile_image 
                                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                                    : "/icons/user.png"} 
                                                alt="" 
                                                className="post_user_icon"
                                                style={{borderRadius: "50%"}}
                                            />
                                            <div className="user_info">
                                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>2024.02.25</Typography>
                                            </div>
                                        </div>
                                        <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                                    </div>
                                    <Typography className="post_desctiption">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</Typography>
                                </div>

                                <div className="post_content">
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

                                <div className="post_bottom">
                                    <div className="left">
                                        <img src="/icons/post/like.png" alt="" className="bottom_icon"/><span style={{marginRight: "50px"}}>464K</span>
                                        <img src="/icons/post/chat.png" alt="" className="bottom_icon"/><span>100</span>
                                    </div>
                                    <div className="right">
                                        <img src="/icons/post/share.png" alt="" className="bottom_icon"/>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                
            </div>
        </Container>
    )
}