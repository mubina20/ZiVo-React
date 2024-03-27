import React, { ChangeEvent, useCallback, useState } from "react";
import "../../../css/upload.css";
import { UploadPost } from "../../../types/post";
import { NavLink } from "react-router-dom";
import assert from "assert";
import PostApiService from "../../apiServices/postApiService";
import { Definer } from "../../../lib/definer";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

export function UploadVideoPost(props: any) {
    /** INITIALIZATIONS **/
    const [file, setFile] = useState<File | null>(null);
    const [videoPostData, setVideoPostData] = useState<UploadPost>({
        post_title: "",
        post_content: ""
    });

    /** HANDLERS **/
    const handleVideoChange = (e: any) => {
        console.log("handleVideoChange ::  e.target.files :: ", e.target.files);
        const selectedVideoFile = e.target.files[0];

        const fileType = selectedVideoFile['type'];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const validTypes = ['video/mp4'];

        assert.ok(validTypes.includes(fileType) && selectedVideoFile, Definer.input_err2);

        videoPostData.post_content = selectedVideoFile;
            setVideoPostData({ ...videoPostData });

            setFile(selectedVideoFile);

        // setFile(selectedVideoFile);
        // if (selectedVideoFile) {
        //     setVideoPostData({
        //         ...videoPostData,
        //         post_content: selectedVideoFile.name
        //     });
        // }
    };

    const changeVideoPostTitleHandle = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setVideoPostData({
                ...videoPostData,
                post_title: e.target.value
            });
        },
        [videoPostData]
    );

    const handleVideoPostButton = async () => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            assert.ok(
                videoPostData.post_title !== "" &&
                videoPostData.post_content !== "" &&
                Definer.input_err1
            );

            const postService = new PostApiService();
            await postService.createVideoPost(videoPostData);
            await sweetTopSmallSuccessAlert("Post is created successfully!");

            setVideoPostData({ post_title: "", post_content: "" });
            setFile(null);
        } catch (error) {
            console.log(`ERROR :: handlePostButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };

    return (
        <div className="upload_post_bottom">
            <h3>Upload Video Post</h3>
            <div className="photo_panel_container">
                <div className="photo_panel_left">
                    <textarea
                        placeholder="Post title"
                        className="post_title_textarea"
                        value={videoPostData.post_title}
                        onChange={changeVideoPostTitleHandle}
                    ></textarea>
                    <div className="buttons">
                        <NavLink to={"/my-page"}>
                            <button className="upload_button cencel">Back</button>
                        </NavLink>
                        
                        <button
                            className="upload_button"
                            onClick={handleVideoPostButton}
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
                            <input type="file" onChange={handleVideoChange} className="Upload_file" accept="video/mp4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


