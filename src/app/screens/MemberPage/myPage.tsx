import { Box, Button, Typography } from "@mui/material";
import "../../../css/visitPage.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
import { Link } from "react-router-dom";
import {  Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { MyPosts } from "./myPosts";
import { MySavedPosts } from "./mySavedPosts";
import { MyFavoritePosts } from "./myFavoritePosts";
import Modal from '@mui/material/Modal';
import { verifiedMemberData } from "../../apiServices/verify";
import moment from "moment";
import { serverApi } from "../../../lib/config";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";

export function MyPage(props: any) {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    const { open, handleOpenModal, handleModalClose } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
    console.log("props > allPosts", allPosts);
    const filteredPosts = allPosts.filter(post => post.member._id === verifiedMemberData._id);
    console.log("filteredPosts", filteredPosts);

    return(
        <div>
            <Header />
            <LeftSidebar />

            <div className="visit_container">
                <div className="visit_page_container">
                    <div className="visit_page_box">
                        <div className="page_top">
                            <div className="left_info">
                                <img
                                    src={
                                        verifiedMemberData?.mb_profile_image 
                                        ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                                        : "/icons/user.png"
                                    } 
                                    alt="" 
                                    width={"100px"}
                                    height={"100px"}
                                    style={{borderRadius: "50%"}}
                                />
                                <Typography className="nickname">@{verifiedMemberData?.mb_nick}</Typography>
                                <button className="story-btn"><img src="/icons/post/plus.png" alt="" width={"15px"}/>Upload Story</button>
                            </div>
                            <div className="right_info">
                                <div className="info">
                                    <div className="my_data">
                                        <div className="group">
                                            <Typography className="text">Followers</Typography>
                                            <span className="count">35.8K</span>
                                        </div>
                                        <div className="group">
                                            <Typography className="text">Followings</Typography>
                                            <span className="count">35</span>
                                        </div>
                                        <div className="group">
                                            <Typography className="text">Posts</Typography>
                                            <span className="count">{filteredPosts.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{verifiedMemberData?.mb_description}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="page_center">
                            <TabContext value={value}>
                                <Stack className="my_page_stack">
                                    <div className="my_page_tablist">
                                        <TabList 
                                        onChange={handleChange} 
                                        textColor={"inherit"}
                                        TabIndicatorProps={{
                                            style: { backgroundColor: "#FF007A" }
                                        }}
                                    >
                                        <Tab label={<img src="/icons/other/posts.png" alt="" className="center_icon" />} value="1" />
                                        <Tab label={<img src="/icons/other/save.png" alt="" className="center_icon" />} value="2" />
                                        <Tab label={<img src="/icons/other/heart.png" alt="" className="center_icon" />} value="3" />
                                        <div className="my-page-information" onClick={handleOpenModal}><Typography>Information</Typography></div>  

                                        <div>
                                            <Modal
                                                className="infoModalContainer"
                                                open={open}
                                                onClose={handleModalClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <div className="infoModal">
                                                    <div className="member_info_closing">
                                                        <span>@{verifiedMemberData?.mb_nick}<span>'s Information</span></span>
                                                        <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="close"/>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Name</div>
                                                        <div className="info">{verifiedMemberData?.mb_name}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Surname</div>
                                                        <div className="info">{verifiedMemberData?.mb_surname}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Birthday</div>
                                                        <div className="info">{verifiedMemberData?.mb_birthday}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Gender</div>
                                                        <div className="info">{verifiedMemberData?.mb_gender}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Country</div>
                                                        <div className="info">{verifiedMemberData?.mb_country}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">School</div>
                                                        <div className="info">{verifiedMemberData?.mb_school}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Description</div>
                                                        <div className="info">{verifiedMemberData?.mb_description}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Hobby</div>
                                                        <div className="info">{verifiedMemberData?.mb_hobby}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Address</div>
                                                        <div className="info">{verifiedMemberData?.mb_address}</div>
                                                    </div>
                                                    <div className="information">
                                                        <div className="info_category">Account creation date</div>
                                                        <div className="info">{moment(verifiedMemberData?.createdAt).format("YYYY-MM-DD")}</div>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    </TabList>
                                    </div>
                                    
                                </Stack>
                                <Box className='line' />

                                <div className="upload_post_btn">
                                    <Link to={"/edit"}><button className="edit-profile">Edit Profile</button></Link>
                                    
                                    <Link to={"/upload-post"} style={{textDecoration: "none"}}>
                                        <button className="upload-post">
                                            <img src="/icons/post/plus.png" alt="" width={"15px"}/>
                                            Upload Post
                                        </button>
                                    </Link>
                                </div>
                                <TabPanel value="1"> <MyPosts filteredPosts={filteredPosts} setAllPosts={setAllPosts}/> </TabPanel>
                                <TabPanel value="2"> <MySavedPosts /> </TabPanel>
                                <TabPanel value="3"> <MyFavoritePosts /> </TabPanel>
                            </TabContext>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}