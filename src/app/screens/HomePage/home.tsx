import { Box, Container, Stack, Tab, Typography } from "@mui/material";
import "../../../css/home.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useEffect, useReducer, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'
import PostApiService from "../../apiServices/postApiService";
import { Post } from "../../../types/post";

import { setAllPosts } from "./slice";
import { retrieveAllPosts } from "./selector";
import { serverApi } from "../../../lib/config";
import { AllPosts } from "./allPosts";
import { AllVideoPosts } from "./allVideoPosts";
import { AllPhotoPosts } from "./allPhotoPosts";
import { AllArticlePosts } from "./allArticlePosts";

const members = [
    { id: 1, nickName: 'samo_ping12' },
    { id: 2, nickName: 'samo_ping12' },
    { id: 3, nickName: 'samo_ping12' },
    { id: 4, nickName: 'samo_ping12' },
    { id: 5, nickName: 'samo_ping12' }
];

export function Home() {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
                                    <Tab label="All Video Posts" value="2"/>
                                    <Tab label="All Photo Posts" value="3"/>
                                    <Tab label="All Article Posts" value="4"/>
                                </TabList>
                            </Stack>
                            <TabPanel value="1"> 
                                <AllPosts 
                                /> 
                            </TabPanel>
                            <TabPanel value="2"> <AllVideoPosts /> </TabPanel>
                            <TabPanel value="3"> <AllPhotoPosts /> </TabPanel>
                            <TabPanel value="4"> <AllArticlePosts /> </TabPanel>
                    </TabContext>

            </div>
        </Container>
    )
}