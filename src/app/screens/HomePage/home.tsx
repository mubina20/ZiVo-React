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
import { setAllMembers, setChosenMember, setMemberFollowings } from "../MemberPage/slice";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveChosenMember } from "../MemberPage/selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiServices/memberApiService";
import { retrieveMemberFollowings } from "../MemberPage/selector";
import { Following, FollowSearchObj } from "../../../types/follow";
import { verifiedMemberData } from "../../apiServices/verify";
import FollowApiService from "../../apiServices/followApiService";
import PostApiService from "../../apiServices/postApiService";
import { setChosenPost } from "./slice";
import { Post } from "../../../types/post";
import { serverApi } from "../../../lib/config";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

const members = [
    { id: 1, nickName: 'samo_ping12' },
    { id: 2, nickName: 'samo_ping12' },
    { id: 3, nickName: 'samo_ping12' },
    { id: 4, nickName: 'samo_ping12' },
    { id: 5, nickName: 'samo_ping12' }
];

const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data)),
    setChosenPost: (data: Post) => dispatch(setChosenPost(data)),
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setAllMembers: (data: Member[]) => 
        dispatch(setAllMembers(data))
});

// const chosenMemberRetriever = createSelector(
//     retrieveChosenMember, 
//     (chosenMember) => ({
//         chosenMember
//     })
// );

const memberFollowingsRetriever = createSelector(
    retrieveMemberFollowings, 
    (memberFollowings) => ({
	    memberFollowings
    })
);

export function Home() {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    // const [allMembers, setAllMembers] = useState<Member[]>([]);
    

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        setChosenMember,
    } = actionDispatch(useDispatch());

    const { memberFollowings } = useSelector(memberFollowingsRetriever);
    const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });
    const [open, setOpen] = useState(false);
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleOpenModal = () => {
        // setSelectedMember(member);  
        setOpen(true);  
    };
    
    const handleCloseModal = () => {
        // setSelectedMember(null); 
        setOpen(false);  
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

    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowings(followingsSearchObj)
			.then((data) => setMemberFollowings(data))
			.catch((err) => console.log(err));
	}, [followingsSearchObj]);
    // console.log("HOMEPAGE > member Followings :: ", memberFollowings);

    const handleVisitFollowingPage = (mb_id: string) => {
		history.push(`/member/${mb_id}`);
		document.location.reload();
	};

    return(
        <div className="main">
            <div className="story-wrapper">
            <Carousel
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
            <div className="user-icon" key={post._id}>
                {post.post_type === "photoStory" && (
                    <div>
                        <img src={`${serverApi}/${post?.post_content}`} className="storyContent" alt="user" />
                        <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                            @{post.member?.mb_nick}
                        </p>
                    </div>
                )}
                {post.post_type === "articleStory" && (
                    <div>
                        <div 
                            className="storyContentArticle"
                            style={{
                                background: post?.post_bg_color ? post?.post_bg_color : "#000",
                                color: post?.post_text_color ? post?.post_text_color : "#fff",
                                // textAlign: post.post_align === "center" ? "center" : "left"
                            }}
                            onClick={() => handlePostSelect(post?._id, "article")}
                        >
                            {post.post_content}
                        </div>
                        <p onClick={() => handleVisitFollowingPage(post.member?.mb_nick)}>
                            @{post.member?.mb_nick}
                        </p>
                    </div>
                )}
                {post.post_type === "videoStory" && (
                    <div>
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
            </div>
        );
    })
) : (
    <div>hech nima yo'q</div>
)}

</Carousel>
                {/* <Swiper
                    // slidesPerView={7}
                    // centeredSlides={true}
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
                                                <img src={`${serverApi}/${post?.post_content}`} className="storyContent" alt="user" />
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
                                                    onClick={() => handlePostSelect(post?._id, "article")}
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


                </Swiper> */}
            </div>

            <TabContext value={value}>
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
                </TabContext>

        </div>
    )
}