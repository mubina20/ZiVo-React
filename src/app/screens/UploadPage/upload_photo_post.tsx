import { ChangeEvent, useCallback, useState } from "react";
import "../../../css/upload.css";
import { UploadPost } from "../../../types/post";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import PostApiService from "../../apiServices/postApiService";
import { NavLink } from "react-router-dom";

export function UploadPhotoPost(props: any) {
    /** INITIALIZATIONS **/
    const [file, setFile] = useState<File | null>(null);
    const [photoPostData, setPhotoPostData] = useState<UploadPost>({
        post_title: "",
        post_content: ""
    });

    /** HANDLERS **/
    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
            if (fileExtension && ['png', 'jpeg', 'jpg'].includes(fileExtension)) {
                setFile(selectedFile);
                setPhotoPostData({
                    ...photoPostData,
                    post_content: selectedFile.name
                });
            } else {
                console.log("Please select a file with .png, .jpeg, or .jpg format.");
            }
        }
    };
    
    const changePhotoPostTitleHandle = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setPhotoPostData({
                ...photoPostData,
                post_title: e.target.value
            });
        },
        [photoPostData]
    );

    const handlePostButton = async () => {
        try {
            assert.ok(
                photoPostData.post_title !== "" &&
                photoPostData.post_content !== "" &&
                Definer.input_err1
            );

            const postService = new PostApiService();
            const formData = new FormData();
            formData.append("post_title", photoPostData.post_title);
            if (file) {
                formData.append("post_content", file);
            }
            await postService.createPhotoPost(formData);
            await sweetTopSmallSuccessAlert("Post is created successfully!");

            setPhotoPostData({ post_title: "", post_content: "" });
            setFile(null);
        } catch (error) {
            console.log(`ERROR :: handlePostButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };

    return (
        <div className="upload_post_bottom">
            <h3>Upload Photo Post</h3>
            <div className="photo_panel_container">
                <div className="photo_panel_left">
                    <textarea
                        placeholder="Post title"
                        className="post_title_textarea"
                        value={photoPostData.post_title}
                        onChange={changePhotoPostTitleHandle}
                    ></textarea>
                    <div className="buttons">
                        <NavLink to={"/my-page"}>
                            <button className="upload_button cencel">Back</button>
                        </NavLink>
                        
                        <button
                            className="upload_button"
                            onClick={handlePostButton}
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
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    className="uploaded_image"
                                />
                            ) : (
                                <div className="upload_photo">You can see your chosen photo here!</div>
                            )}
                        </div>
                        <div className="file_input">
                            <span>Add Photo</span>
                            <input type="file" onChange={handlePhotoChange} className="Upload_file" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}