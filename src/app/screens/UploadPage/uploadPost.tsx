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

const useStyles = makeStyles({
    tabs: {
        "& .MuiTabs-indicator": {
            backgroundColor: "#FF007A",
            height: 3,
        },
        "& .MuiTabs-selected": {
            color: 'white',
        },
    },
    tab: {
        // color: 'white', 
        // backgroundColor: "blue",
        // '&.Mui-selected': {
        //     color: 'white',
        // },
    }, 
});

export function UploadPostPage(props: any) {
    /** INITIALIZATIONS **/
    const [value, setValue] = useState("1");
    const classes = useStyles();

    /** HANDLERS **/
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div>
            <Header />
            <LeftSidebar />
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
                                    <Tab className={classes.tab} label="photo" value="1"/>
                                    <Tab className={classes.tab} label="video" value="2"/>
                                    <Tab className={classes.tab} label="article" value="3"/>
                                </TabList>
                            </Stack>
                            <TabPanel value="1"><UploadPhotoPost /></TabPanel>
                            <TabPanel value="2"><UploadVideoPost /></TabPanel>
                            <TabPanel value="3"><UploadArticlePost /></TabPanel>
                        </TabContext>
                    </div>
                </div>
            </div>
        </div>
    );
}
