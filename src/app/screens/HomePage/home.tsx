import "../../../css/home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { AllPosts } from "./allPosts";
import { Member } from "../../../types/user";
import { setAllMembers, setChosenMember } from "../MemberPage/slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiServices/memberApiService";
import PostApiService from "../../apiServices/postApiService";
import { setChosenPost, setChosenStory } from "./slice";
import { Post } from "../../../types/post";
import { serverApi } from "../../../lib/config";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Dispatch } from "@reduxjs/toolkit";
import { Autoplay, FreeMode, Navigation } from "swiper";

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenPost: (data: Post) => dispatch(setChosenPost(data)),
    setChosenStory: (data: Post) => dispatch(setChosenStory(data)),
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => 
        dispatch(setAllMembers(data))
});

export function Home() {
    /** INITIALIZATIONS **/
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenMember,
    } = actionDispatch(useDispatch());
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    /** HANDLERS **/
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

    const handleVisitFollowingPage = (mb_id: string) => {
		history.push(`/member/${mb_id}`);
		document.location.reload();
	};

    return(
        <div className="main">
            <div className="story-wrapper">
                <Swiper
                    slidesPerView={6}
                    // centeredSlides={true}
                    spaceBetween={5}
                    //   scrollbar={{ draggable: true }}
                    modules={[FreeMode, Navigation, Autoplay]}
                >
                    {allPosts.map((post: Post) =>
                        post.post_type === "photoStory" ||
                        post.post_type === "articleStory" ||
                        post.post_type === "videoStory" ? (
                            <SwiperSlide
                                key={post._id}
                                style={{ cursor: "pointer", width: "auto", height: "100%" }}
                            >
                                {post.post_type === "photoStory" ? (
                                    <div className="user-icon">
                                        <img
                                            src={`${serverApi}/${post?.post_content}`}
                                            className="storyContent"
                                            alt="user"
                                            onClick={() => handleStorySelct(post?._id, "photoStory")}
                                        />
                                        <p
                                            onClick={() =>
                                                handleVisitFollowingPage(post.member?.mb_nick)
                                            }
                                        >
                                            @{post.member?.mb_nick}
                                        </p>
                                    </div>
                                ) : post.post_type === "articleStory" ? (
                                    <div className="user-icon">
                                        <div
                                            className="storyContentArticle"
                                            style={{
                                                background: post?.post_bg_color
                                                ? post?.post_bg_color
                                                : "#000",
                                                color: post?.post_text_color
                                                ? post?.post_text_color
                                                : "#fff",
                                                // textAlign: post.post_align === "center" ? "center" : "left"
                                            }}
                                            onClick={() =>
                                                handleStorySelct(post?._id, "articleStory")
                                            }
                                        >
                                            {post.post_content}
                                        </div>
                                        <p
                                            onClick={() =>
                                                handleVisitFollowingPage(post.member?.mb_nick)
                                            }
                                        >
                                            @{post.member?.mb_nick}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="user-icon">
                                        <video
                                            loop
                                            playsInline
                                            // controls
                                            style={{ borderRadius: "50%" }}
                                            className="storyContent"
                                            onClick={() => handleStorySelct(post?._id, "videoStory")}
                                        >
                                            <source
                                                src={`${serverApi}/${post?.post_content}`}
                                                type="video/mp4"
                                            />
                                        </video>
                                        <p
                                            onClick={() =>
                                                handleVisitFollowingPage(post.member?.mb_nick)
                                            }
                                        >
                                            @{post.member?.mb_nick}
                                        </p>
                                    </div>
                                )}
                            </SwiperSlide>
                        ) : null
                    )}
                </Swiper>
            </div>

            <AllPosts  
                setChosenMember={setChosenMember}
                handleMemberSelect={handleMemberSelect}
                handlePostSelect={handlePostSelect}
            /> 
        </div>
    )
}