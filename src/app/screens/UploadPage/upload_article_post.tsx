import React, { useState } from "react";
import "../../../css/upload.css";
import { UploadPost } from "../../../types/post";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import PostApiService from "../../apiServices/postApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";

export function UploadArticlePost(props: any) {
    /** INITIALIZATIONS **/
    const [backgroundColor, setBackgroundColor] = useState('');
    const history = useHistory();
    const [textColor, setTextColor] = useState('');
    const [lastSelectedBGColor, setLastSelectedBGColor] = useState('');
    const [lastSelectedColor, setLastSelectedColor] = useState('');
    const [articlePostData, setArticlePostData] = useState<UploadPost>({
        post_title: "",
        post_content: "",
        post_bg_color: "",
        post_text_color: "",
        post_align: ""
    });

    /** HANDLERS **/
    const handleArticleContent = (e: any) => {
		articlePostData.post_content = e.target.value;
		setArticlePostData({ ...articlePostData });
	};

    const handleCenterText = () => {
        const textarea = document.querySelector(".article_title_textarea") as HTMLTextAreaElement;
        let textAlign;
        if (textarea.style.textAlign === "center") {
            textarea.style.textAlign = "";
            textAlign = "start";
            articlePostData.post_align = textAlign;
        } else {
            textarea.style.textAlign = "center";
            textAlign = "center";
            articlePostData.post_align = textAlign;
        }
        console.log("center?????", textAlign);

        setArticlePostData({ ...articlePostData });
    };    

    const handleColorChange = (event: any) => {
        const bgColor = event.target.value;
        setBackgroundColor(bgColor);
        setLastSelectedBGColor(bgColor); 
        console.log("bgColor", lastSelectedBGColor);

        articlePostData.post_bg_color = lastSelectedBGColor;
    setArticlePostData({ ...articlePostData });
    };

    const handleTextColorChange = (event: any) => {
        const textColor = event.target.value;
        setTextColor(textColor);
        setTextColor(textColor);
        setLastSelectedColor(textColor);
        console.log("textColor", lastSelectedColor);

        articlePostData.post_text_color = lastSelectedColor;
        setArticlePostData({ ...articlePostData });
    };

    const handlePostButton = async () => {
        try {
            assert.ok(
                articlePostData.post_content !== "",
                Definer.input_err1
            );

            const postService = new PostApiService();

            await postService.createArticlePost(articlePostData);
            await sweetTopSmallSuccessAlert('Post uploaded successfully!', 700, false);
    		window.location.href = '/my-page';

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
            <div className="article_panel_container">
                <div className="article_container">
                    <div className="article_left">
                        <span style={{fontSize: "20px", fontWeight: "700", marginBottom: "13px", marginTop: "40px"}}>Article</span>
                        <textarea 
                            style={{ backgroundColor, color: textColor }}
                            placeholder="Article post"
                            className="article_title_textarea"
                            onChange={handleArticleContent}
                        ></textarea>
                    </div>
                    
                    <div className="article_right">
                        <div className="change-color-buttons">
                            <span className="bg-span">Background color</span>
                            <input type="color" onChange={handleColorChange} className="input-color"/>
                        </div>
                        <div className="change-color-buttons">
                            <span className="bg-span">text color</span>
                            <input type="color" onChange={handleTextColorChange} className="input-color"/>
                        </div>
                        <div className="change-color-buttons" style={{marginTop: "130px"}}>
                            <span className="bg-span" onClick={handleCenterText}>Text Center</span>
                        </div>
                    </div>
                </div>
                <div className="buttons" style={{marginTop: "100px"}}>
                    <button className="upload_button cencel" onClick={goBack}>Cencel</button>
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
};