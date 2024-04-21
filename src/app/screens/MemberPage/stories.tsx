import { useEffect, useState } from "react";
import "../../../css/visitPage.css";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { serverApi } from "../../../lib/config";
import { setChosenPost, setChosenStory } from "../HomePage/slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenStory: (data: Post) => dispatch(setChosenStory(data))
});

export function Stories(props: any) {
    const filteredPosts = props.filteredPosts;
    const setAllPosts = props.setAllPosts;
    const dispatch = useDispatch();
    const history = useHistory();

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

    return (
        <div className="page_bottom">
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map((post: Post) => (
                    post.post_type === "photoStory" ? (
                        // Photo Post
                        <div key={post._id}>
                            <div className="story_post" onClick={() => handleStorySelct(post?._id, "photoStory")}>
                                <img src={`${serverApi}/${post?.post_content}`} alt="" width="300px"/>
                            </div>
                        </div>
                    ) : post.post_type === "articleStory" ? (
                        // Article Post
                        <div className="story_post" onClick={() => handleStorySelct(post?._id, "articleStory")}>
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
                    ) : post.post_type === "videoStory" ? (
                        // Video Post
                        <div key={post._id}>
                            <div className="story_post" onClick={() => handleStorySelct(post?._id, "videoStory")}>
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
    )
}