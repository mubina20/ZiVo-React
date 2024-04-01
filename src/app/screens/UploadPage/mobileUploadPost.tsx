import "../../../css/upload.css";
import React, { useState } from "react";
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { makeStyles } from '@mui/styles';
import { UploadVideoPost } from "./upload_video_post";
import { UploadPhotoPost } from "./upload_photo_post";
import { UploadArticlePost } from "./upload_article_post";
import { Link } from "react-router-dom";

export function MobileUploadPost() {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    const [file, setFile] = useState<File | null>(null);
    // const classes = useStyles();

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className="upload_big_container">
                <div className="upload_container">
                    <div className="upload_text">Upload Post</div>
                    <div className="upload_post_center">
                        <TabContext value={value}>
                            <Stack className="upload_page_tabs_container">
                                <TabList 
                                    onChange={handleChange} 
                                    textColor={"inherit"}
                                    TabIndicatorProps={{
                                        style: { backgroundColor: "#FF007A" }
                                    }}
                                >
                                    <Tab label="photo" value="1"/>
                                    <Tab label="video" value="2"/>
                                    <Tab label="article" value="3"/>
                                </TabList>
                            </Stack>

                            {/* Photo Post */}
                            <TabPanel value="1">
                                <div className="upload_post_bottom">
                                    <h3>Upload Photo Post</h3>
                                    <div className="photo_panel_container">
                                        <div className="photo_panel_left">
                                            <textarea
                                                placeholder="Post title"
                                                className="post_title_textarea"
                                                // value={photoPostData.post_title}
                                                // onChange={changePhotoPostTitleHandle}
                                            ></textarea>
                                            <div className="buttons">
                                                <Link to={"/my-page"}>
                                                    <button className="upload_button cencel">Back</button>
                                                </Link>
                                                
                                                <button
                                                    className="upload_button"
                                                    // onClick={handlePostButton}
                                                >
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <div className="photo_panel_right">
                                            <div className="upload_image_box">
                                                <div className="photos">
                                                    {file ? (
                                                        <img
                                                            src={"https://img.freepik.com/free-photo/natures-beauty-captured-in-colorful-flower-close-up-generative-ai_188544-8593.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1711411200&semt=ais"}

                                                            alt=""
                                                            className="uploaded_image"
                                                        />
                                                    ) : (
                                                        <div className="upload_photo">You can see your chosen photo here!</div>
                                                    )}
                                                </div>
                                                <div className="file_input">
                                                    <span>Add Photo</span>
                                                    <input type="file"  className="Upload_file" id="postContent"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            {/* Video Post */}
                            <TabPanel value="2">
                                <div className="upload_post_bottom">
                                    <h3>Upload Video Post</h3>
                                    <div className="photo_panel_container">
                                        <div className="photo_panel_left">
                                            <textarea
                                                placeholder="Post title"
                                                className="post_title_textarea"
                                                // value={videoPostData.post_title}
                                                // onChange={changeVideoPostTitleHandle}
                                            ></textarea>
                                            <div className="buttons">
                                                <Link to={"/my-page"}>
                                                    <button className="upload_button cencel">Back</button>
                                                </Link>
                                                
                                                <button
                                                    className="upload_button"
                                                    // onClick={handleVideoPostButton}
                                                >
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <div className="photo_panel_right">
                                            <div className="upload_image_box">
                                                <div className="photos">
                                                {file ? (
                                                    <video controls className="uploaded_image">
                                                        <source src={file ? URL.createObjectURL(file) : ''} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <div className="upload_photo">You can see your chosen photo here!</div>
                                                )}
                                                </div>
                                                <div className="file_input">
                                                    <span>Add Video</span>
                                                    <input type="file" className="Upload_file" accept="video/mp4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            {/* Article Post */}
                            <TabPanel value="3">
                                <div className="upload_post_bottom">
                                    <h3>Upload Article Post</h3>
                                    <div className="article_panel_container">
                                        <div className="article_container">
                                            <textarea 
                                                // style={{ backgroundColor, color: textColor }}
                                                placeholder="Article post"
                                                className="article_title_textarea"
                                                // onChange={handleArticleContent}
                                            ></textarea>
                                            <div className="change-color-buttons">
                                                <span className="bg-span">Background color</span>
                                                <input type="color"  className="input-color"/>
                                            </div>
                                            <div className="change-color-buttons">
                                                <span className="bg-span">text color</span>
                                                <input type="color"  className="input-color"/>
                                            </div>
                                            <button
                                                className="upload_button"
                                                // onClick={handlePostButton}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                    <img src="/icons/post/center-align.png" alt="" height={"100px"}  />
                                    
                                </div>
                            </TabPanel>
                        </TabContext>
                    </div>
                </div>
            </div>
        </div>
    );
};
