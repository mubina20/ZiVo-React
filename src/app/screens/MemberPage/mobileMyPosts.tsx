import { useEffect, useState } from "react";
import "../../../css/mobileVistiPage.css";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { serverApi } from "../../../lib/config";
import { setChosenPost } from "../HomePage/slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenPost: (data: Post) => dispatch(setChosenPost(data))
});

export function MobileMyPosts(props: any) {
    const filteredPosts = props.filteredPosts;
    const setAllPosts = props.setAllPosts;
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenPost,
    } = actionDispatch(useDispatch());

    /** HANDLERS **/
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const postService = new PostApiService();
                const allPostsData = await postService.getAllPosts();
                setAllPosts(allPostsData);
            } catch (err) {
                console.error('Error while fetching posts:', err);
            }
        };

        fetchAllPosts(); 
    }, [setAllPosts]);

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

    return (
        <div className="mobile_page_bottom">
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    post.post_type === "photo" ? (
                        // Photo Post
                        <div key={post._id}>
                            <div className="mobile_post" onClick={() => handlePostSelect(post?._id, "photo")}>
                                <img src={`${serverApi}/${post?.post_content}`} alt="" width="300px"/>
                                {/* {post.post_title} */}
                                {/* {post.post_content} */}
                            </div>
                        </div>
                    ) : post.post_type === "article" ? (
                        // Article Post
                        <div className="mobile_post" onClick={() => handlePostSelect(post?._id, "article")}>
                            <div 
                                className="article_post"
                                style={{
                                    background: post?.post_bg_color ? post?.post_bg_color : "#000",
                                    color: post?.post_text_color ? post?.post_text_color : "#fff",
                                    textAlign: post.post_align === "center" ? "center" : "left"

                                }}
                            >
                                {post.post_content}
                            </div>
                        </div>
                    ) : post.post_type === "video" ? (
                        // Video Post
                        <div key={post._id}>
                            <div className="mobile_post" onClick={() => handlePostSelect(post?._id, "video")}>
                                <video
                                    loop
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
                <div style={{color: "#fff", marginLeft: "140px", marginTop: "50px"}}>No posts yet</div>
            )}
        </div>
    )
}