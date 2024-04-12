import React, { useEffect, useState } from 'react'
import { serverApi } from '../../../lib/config'
import { Typography } from '@mui/material'
import { Post } from '../../../types/post'
import PostApiService from '../../apiServices/postApiService';
import { setAllPosts } from './slice';
import { retrieveAllPosts } from './selector';
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import moment from 'moment';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import { Definer } from '../../../lib/definer';
import assert from 'assert';
import MemberApiService from '../../apiServices/memberApiService';
import { verifiedMemberData } from '../../apiServices/verify';

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
export function AllVideoPosts(props: any) {
    /** INITIALIZATIONS **/
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const { handleMemberSelect } = props;
    const { handlePostSelect } = props;

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

    const videoPostLike = async (e: any, id: string) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            
            const memberService = new MemberApiService();
            const likeResult = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: "video",
            });
            assert.ok(likeResult, Definer.general_err1);
            
            const updatedPosts = allPosts.map(post => {
                if (post._id === id) {
                    return {
                        ...post,
                        post_likes: likeResult.like_status
                    };
                }
                return post;
            });
            setAllPosts(updatedPosts);
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log(`ERROR :: targetLikeTop, ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div>
            {allPosts.map((post: Post) => {
                if (post.post_type === "video") {
                    return (
                        <div className="post_container" key={post._id}>
                            <div className="post_data">
                                <div className="post_top">
                                    <div 
                                        className="user_container"
                                        key={post?.member?._id} 
                                        onClick={() => handleMemberSelect(post?.member?._id)}
                                    >
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

                            <div className="post_content" onClick={() => handlePostSelect(post?._id, "video")}>
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
                                    <img 
                                        src={post?.post_likes > 0 ? "/icons/post/heart.png" : "/icons/post/like.png" }
                                        onClick={(e) => videoPostLike(e, post._id)}
                                        alt="" className="bottom_icon"
                                    />
                                    <span style={{marginRight: "50px"}}>{post.post_likes}</span>
                                    <img src="/icons/post/chat.png" alt="" className="bottom_icon"/><span>100</span>
                                </div>
                                <div className="right">
                                    <img src="/icons/post/share.png" alt="" className="bottom_icon"/>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null;
            })}
        </div>
    );
}