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

const actionDispatch = (dispatch: Dispatch) => ({
    setChosenPost: (data: Post) => dispatch(setChosenPost(data)),
    setChosenStory: (data: Post) => dispatch(setChosenStory(data)),
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => 
        dispatch(setAllMembers(data))
});

export function Home() {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenMember,
    } = actionDispatch(useDispatch());

    const [allPosts, setAllPosts] = useState<Post[]>([]);

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
            {/* <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                    },
                    mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                    },
                    tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
                >
                    {allPosts.length > 0 ? (
                        allPosts.map((post: Post) => {
                            return (
                                <div className="user-icon">
                                    {post.post_type === "photoStory" && (
                                        <div key={post._id} >
                                            <img src={`${serverApi}/${post?.post_content}`} className="storyContent" alt="user" onClick={() => handleStorySelct(post?._id, "photoStory")}/>
                                            <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                                                @{post.member?.mb_nick}
                                            </p>
                                        </div>
                                    )}
                                    {post.post_type === "articleStory" && (
                                        <div>
                                            <div 
                                                key={post._id} onClick={() => handleStorySelct(post?._id, "articleStory")}
                                                className="storyContentArticle"
                                                style={{
                                                    background: post?.post_bg_color ? post?.post_bg_color : "#000",
                                                    color: post?.post_text_color ? post?.post_text_color : "#fff",
                                                    // textAlign: post.post_align === "center" ? "center" : "left"
                                                }}
                                                // onClick={() => handlePostSelect(post?._id, "article")}
                                            >
                                                {post.post_content}
                                            </div>
                                            <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                                                @{post.member?.mb_nick}
                                            </p>
                                        </div>
                                    )}
                                    {post.post_type === "videoStory" && (
                                        <div key={post._id} onClick={() => handleStorySelct(post?._id, "videoStory")}>
                                            <video
                                                loop
                                                playsInline
                                                className="storyContent"
                                            >
                                                <source
                                                    src={`${serverApi}/${post?.post_content}`}
                                                    type="video/mp4"
                                                />
                                            </video>
                                            <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
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

                </Carousel> */}
                <Swiper
                    // slidesPerView={7}
                    centeredSlides={true}
                    spaceBetween={30}
                    scrollbar={{ draggable: true }}
                >
                    {allPosts.length > 0 ? (
                        allPosts.map((post: Post) => {
                            return (
                                <SwiperSlide
                                    key={post._id}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {
                                        post.post_type === "photoStory" ? (
                                            <div className="user-icon">
                                                <img src={`${serverApi}/${post?.post_content}`} className="storyContent" alt="user" onClick={() => handleStorySelct(post?._id, "photoStory")}/>
                                                <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                                                    @{post.member?.mb_nick}
                                                </p>
                                            </div>
                                        ) : post.post_type === "articleStory" ? (
                                            <div className="user-icon">
                                                <div 
                                                    className="storyContentArticle"
                                                    style={{
                                                        background: post?.post_bg_color ? post?.post_bg_color : "#000",
                                                        color: post?.post_text_color ? post?.post_text_color : "#fff",
                                                        // textAlign: post.post_align === "center" ? "center" : "left"

                                                    }}
                                                    onClick={() => handleStorySelct(post?._id, "articleStory")}
                                                >
                                                    {post.post_content}
                                                </div>
                                                <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                                                    @{post.member?.mb_nick}
                                                </p>
                                            </div>
                                        ) : post.post_type === "videoStory" ? (
                                            <div className="user-icon">
                                                <video
                                                    loop
                                                    playsInline
                                                    // controls
                                                    // style={{borderRadius: "50%"}}
                                                    className="storyContent"
                                                    onClick={() => handleStorySelct(post?._id, "videoStory")}
                                                    >
                                                    <source
                                                        src={`${serverApi}/${post?.post_content}`}
                                                        type="video/mp4"
                                                        />
                                                </video>
                                                <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                                                    @{post.member?.mb_nick}
                                                </p>
                                            </div>
                                        ) : (
                                            null
                                        )
                                    }
                                    
                                </SwiperSlide>
                            );
                        })
                    ) : (
                        <div>hech nima yo'q</div>
                    )}


                </Swiper>
            </div>

            <AllPosts  
                                setChosenMember={setChosenMember}
                                handleMemberSelect={handleMemberSelect}
                                handlePostSelect={handlePostSelect}
                            /> 

            {/* <TabContext value={value}>
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
                </TabContext> */}

        </div>
    )
}