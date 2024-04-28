import { useEffect, useState } from "react";
import "../../../css/video.css";
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { serverApi } from "../../../lib/config";
import { Typography } from "@mui/material";
import moment from "moment";
import { verifiedMemberData } from "../../apiServices/verify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenPost } from "../HomePage/slice";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenPost: (data: Post) => dispatch(setChosenPost(data))
});

export function VideoContents(props: any) {
    /** INITIALIZATIONS **/
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        setChosenPost,
    } = actionDispatch(useDispatch());

    /** HANDLERS **/
    useEffect(() => {
        const postService = new PostApiService();
        postService
        .getAllPosts()
        .then((data) => setAllPosts(data))
        .catch((err) => console.log("ERROR :: getAllPosts,", err));
    }, []);
    // console.log("props > allPosts", allPosts);
    
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

    const handlePostSelect = async (postType: any, postId: any) => {
        try {
            const postService = new PostApiService();
            const chosenPostData = await postService.getChosenPost(postType, postId);
            dispatch(setChosenPost(chosenPostData)); 
            history.push(`/post/${chosenPostData.post_type}/${chosenPostData._id}`); 
        } catch (error) {
            console.error("ERROR handlePostSelect ::", error);
        }
    };

    return(
        <div>
            <Header />
            <LeftSidebar />
            <div className="shorts_big_container">
                <div className="shorts_container">
                    {allPosts.map((post: Post) => (
                        post.post_type === "video" ? (
                            <div className="short_content" key={post?._id}>
                                <div className="video_left">
                                    <video
                                        loop
                                        playsInline
                                        controls
                                        className="video_content"
                                    >
                                        <source
                                            src={`${serverApi}/${post?.post_content}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </div>
                                <div className="video_right">
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
                                    <Typography className="video_title">{post.post_title}</Typography>
                                    <button className="video_information" onClick={() => handlePostSelect(post?._id, "video")}>View information</button>
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}