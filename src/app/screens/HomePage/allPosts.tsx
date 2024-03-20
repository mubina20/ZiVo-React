import React, { useEffect, useState } from 'react'
import { serverApi } from '../../../lib/config'
import { Typography } from '@mui/material'
import { Post } from '../../../types/post'
import PostApiService from '../../apiServices/postApiService';
import { setAllPosts } from './slice';
import { retrieveAllPosts } from './selector';
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import moment from 'moment';

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

export function AllPosts(props: any) {
    /** INITIALIZATIONS **/
    const [allPosts, setAllPosts] = useState<Post[]>([]);

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
    return (
        <div>
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
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
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
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
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
                                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
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
    )
}