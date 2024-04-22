import "../../../css/upload.css";
import React, { useState } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";
import { MobileHeader } from "../../components/header/mobileHeader";
import { MobileFooter } from "../../components/footer/mobileFooter";

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
            <MobileHeader />
            <MobileFooter />
            <div className="mobile_upload_big_container">
                <div className="upload_container" style={{marginLeft: "0", width: "100%"}}>
                    <div className="upload_text" style={{textAlign: "center", marginBottom: "40px"}}>Upload Post</div>
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
                                    <h3 style={{marginBottom: "20px"}}>Upload Photo Post</h3>
                                    <div className="photo_panel_container" style={{display: 'flex', flexDirection: 'column'}}>
                                        <div className="photo_panel_left">
                                            <textarea
                                                placeholder="Post title"
                                                className="post_title_textarea"
                                                // value={photoPostData.post_title}
                                                // onChange={changePhotoPostTitleHandle}
                                                style={{color: "black", width: "70vw"}}
                                            ></textarea>
                                        </div>
                                        <div className="photo_panel_right" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                            <div className="upload_image_box">
                                                <div className="photos" style={{width: "80vw"}}>
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
                                                <div className="file_input" style={{margin: "30px auto"}}>
                                                    <span>Add Photo</span>
                                                    <input type="file"  className="Upload_file" id="postContent"/>
                                                </div>
                                            </div>

                                            <div className="buttons" style={{marginBottom: "100px", gap: "40px"}}>
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
                                    </div>
                                </div>
                            </TabPanel>
                            

                            {/* Video Post */}
                            <TabPanel value="2">
                                <div className="upload_post_bottom">
                                    <h3 style={{marginBottom: "20px"}}>Upload Video Post</h3>
                                    <div className="photo_panel_container" style={{display: 'flex', flexDirection: 'column'}}>
                                        <div className="photo_panel_left">
                                            <textarea
                                                placeholder="Post title"
                                                className="post_title_textarea"
                                                // value={videoPostData.post_title}
                                                // onChange={changeVideoPostTitleHandle}
                                                style={{color: "black", width: "70vw"}}
                                            ></textarea>
                                        </div>
                                        <div className="photo_panel_right" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                            <div className="upload_image_box">
                                                <div className="photos" style={{width: "80vw"}}>
                                                {file ? (
                                                    <video controls className="uploaded_image">
                                                        <source src={file ? URL.createObjectURL(file) : ''} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <div className="upload_photo">You can see your chosen video here!</div>
                                                )}
                                                </div>
                                                <div className="file_input" style={{margin: "30px auto"}}>
                                                    <span>Add Video</span>
                                                    <input type="file" className="Upload_file" accept="video/mp4" />
                                                </div>
                                            </div>
                                            <div className="buttons" style={{marginBottom: "100px", gap: "40px"}}>
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
                                                style={{width: "80vw", marginTop: "20px", color: "black"}}
                                            ></textarea>
                                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                                <img src="/icons/post/center-align.png" alt=""  width={"50px"}/>
                                                <div>
                                                    <div className="change-color-buttons">
                                                        <span className="bg-span" style={{width: "100%", fontSize: "13px", padding: "10px"}}>Background <br /> color</span>
                                                        <input type="color"  className="input-color"/>
                                                    </div>
                                                    <div className="change-color-buttons">
                                                        <span className="bg-span" style={{width: "100%", fontSize: "13px", padding: "10px"}}>text color</span>
                                                        <input type="color"  className="input-color"/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                            <button
                                                className="upload_button"
                                                // onClick={handlePostButton}
                                                style={{width: "40%", height: "9%"}}
                                            >
                                                Upload
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </div>
                </div>
            </div>
        </div>
    );
};
