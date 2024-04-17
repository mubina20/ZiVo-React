import { ChangeEvent, useCallback, useState } from "react";
import "../../../css/upload.css";
import { UploadPost } from "../../../types/post";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import PostApiService from "../../apiServices/postApiService";
import { NavLink, useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

export function UploadPhotoPost(props: any) {
    /** INITIALIZATIONS **/
    const [file, setFile] = useState<File | null>(null);
    const history = useHistory();

    const [photoPostData, setPhotoPostData] = useState<UploadPost>({
        post_title: "",
        post_content: "",
    });

    /** HANDLERS **/
    const handlePhotoChange = (e: any) => {
        try {
            console.log("handlePhotoChange ::  e.target.files :: ", e.target.files);
            const selectedPhotoFile = e.target.files[0];
    
            const fileType = selectedPhotoFile['type'],
                validTypes = ['image/lpg', 'image/jpeg', 'image/png'];
            assert.ok(validTypes.includes(fileType) && selectedPhotoFile, Definer.input_err2);
    
            photoPostData.post_content = selectedPhotoFile;
            setPhotoPostData({ ...photoPostData });
    
            setFile(selectedPhotoFile);
        } catch(err) {
            console.log(`ERROR :: handlePhotoChange, ${err}`);
            sweetErrorHandling(err).then();
        }
    }
    
    
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
            assert.ok(verifiedMemberData, Definer.auth_err1)
            assert.ok(
                photoPostData.post_title !== "" &&
                photoPostData.post_content !== "" &&
                Definer.input_err1
            );

            const postService = new PostApiService();
            await postService.createPhotoPost(photoPostData);

            await sweetTopSmallSuccessAlert("Post is created successfully!");

            setPhotoPostData({ post_title: "", post_content: "" });
            setFile(null);
        } catch (error) {
            console.log(`ERROR :: handlePostButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };

    const goBack = () => {
        history.goBack(); 
    };

    return (
        <div className="upload_post_bottom">
            <div className="photo_panel_container">
                <div className="photo_panel_left">
                    <span style={{fontSize: "20px", fontWeight: "700", marginBottom: "13px"}}>Photo title</span>
                    <textarea
                        placeholder="Post title"
                        className="post_title_textarea"
                        value={photoPostData.post_title}
                        onChange={changePhotoPostTitleHandle}
                    ></textarea>
                    
                </div>
                <div className="upload_image_box">
                    <span style={{fontSize: "20px", fontWeight: "700", marginBottom: "13px", marginTop: "40px"}}>Photo</span>
                    <div className="photos">
                        {file ? (
                            <img
                                src={file ? URL.createObjectURL(file) : ''}

                                alt=""
                                className="uploaded_image"
                            />
                        ) : (
                            <div className="upload_photo">You can see your chosen photo here!</div>
                        )}
                    </div>
                    <input type="file" onChange={handlePhotoChange} className="Upload_file" id="postContent"/>
                </div>
                <div className="buttons">
                    <button className="upload_button cencel" onClick={goBack}>Back</button>
                    <button
                        className="upload_button"
                        onClick={handlePostButton}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
