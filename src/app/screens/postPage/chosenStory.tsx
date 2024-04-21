import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Post } from '../../../types/post';
import { useDispatch } from 'react-redux';
import PostApiService from '../../apiServices/postApiService';
import { setChosenPost } from '../HomePage/slice';
import { verifiedMemberData } from '../../apiServices/verify';
import { Typography } from '@mui/material';
import moment from 'moment';
import { serverApi } from '../../../lib/config';
import { Comment, CreateComment } from '../../../types/comment';
import CommentApiService from '../../apiServices/commentApiService';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import assert from 'assert';
import { Definer } from '../../../lib/definer';
import MemberApiService from '../../apiServices/memberApiService';

interface RouteParams {
    storyId: string;
    storyType: string;
}



export function ChosenStory() {
    /** INITIALIZATIONS **/
    const history = useHistory();
    const { storyId } = useParams<RouteParams>();
    const { storyType } = useParams<RouteParams>();
    const [story, setStory] = useState<Post>();
    const dispatch = useDispatch();
    const [comments, setComments] = useState<Comment[]>([]);
    const [createComment, setCreateComment] = useState<CreateComment>({
        mb_id: verifiedMemberData._id,
		post_id: storyId,
		comment: ""
	});
    const textInput: any = useRef(null);

    /** HANDLERS **/
    const handleGoBack = () => {
        history.goBack(); 
        history.goForward();
    };

    useEffect(() => {
        const handleChosenPost = async () => {
            try {
                const postService = new PostApiService();
                const chosenPostData = await postService.getChosenPost(storyId, storyType); 
                dispatch(setChosenPost(chosenPostData)); 
                setStory(chosenPostData);
            } catch (error) {
                console.error("ERROR while fetching chosen post:", error);
            }
        };
    
        handleChosenPost();
    }, [dispatch, storyId]);

    useEffect(() => {
        const findComments = async () => {
            try {
                const commentService = new CommentApiService();
                const postComments = await commentService.findChosenPostComments(storyId);
    
                if (postComments.length > 0) {
                    setComments(postComments);
                } else {
                    setComments([]);
                }
    
                // console.log("comments ::", postComments);
            } catch (error) {
                console.error("ERROR findComments ::", error);
            }
        };
    
        findComments();
    }, []);
    

    const handleMemberSelect = async (memberId: any) => {
        try {
            if(memberId === verifiedMemberData._id){
                history.push('/my-page');
            } else{
                history.push(`/member/${memberId}`)
            }
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
    };

    const handleComment = (e: any) => {
		createComment.comment = e.target.value;
		setCreateComment({ ...createComment });
	};

    const getKeyHandler = (e: any) => {
		try {
			if (e.key == 'Enter') {
				assert.ok(createComment.comment, Definer.input_err3);
				handleSendButton();
			}
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

    const handleSendButton = async () => {
        try {
            const postService = new PostApiService();
            await postService.createComment(createComment);

            textInput.current.value = "";            

            await sweetTopSmallSuccessAlert("Comment sent successfully!", 700, false);
        } catch (error) {
            console.log(`ERROR :: handleSendButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };

    const handleStoryLike = async (e: any, id: any, type: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            
            const memberService = new MemberApiService();
            const likeResult = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: type,
            });
            assert.ok(likeResult, Definer.general_err1);
            
            await sweetTopSmallSuccessAlert("success", 700, false);
            window.location.reload();
        } catch (err: any) {
            console.log(`ERROR :: targetLikeTop, ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <div className='chosen_story_page'>
            <img src="/icons/other/white_close.png" alt="" className='story_close' onClick={handleGoBack}/>
            {
                story?.member._id === verifiedMemberData._id ? (
                    <div className='chosen_story_page'>
                        <div className="story_left">
                            <div 
                                className="user_container" 
                                key={story?.member?._id} 
                                style={{gap: "0", padding: "0 10px"}}
                                // onClick={() => handleMemberSelect(post?.member?._id)}
                            >
                                <img 
                                    src={
                                        story?.member?.mb_profile_image 
                                        ? `${serverApi}/${story?.member.mb_profile_image}`  
                                        : "/icons/user.png"} 
                                    alt="" 
                                    className="post_user_icon"
                                    style={{borderRadius: "50%"}}
                                    onClick={() => handleMemberSelect(story?.member?._id)}
                                    
                                />
                                <div style={{display: "flex", alignItems: "center", gap: "10px", color: "#fff"}}>
                                    <Typography 
                                        className="name" 
                                        style={{fontSize: "16px", cursor: "pointer"}}  
                                        onClick={() => handleMemberSelect(story?.member?._id)}
                                    >
                                        @{story?.member.mb_nick}
                                    </Typography>
                                    <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(story?.createdAt).format("YYYY-MM-DD")}</Typography>
                                </div>
                            </div>
                            <div className="story_title">
                                <span style={{color: "#fff"}}>{story?.post_title} </span>
                            </div>
                            <div className="story_container">
                                {story?.post_type === "photoStory" ? (
                                    <img 
                                        src={`${serverApi}/${story?.post_content}`}
                                        alt="" 
                                        className='story'
                                    />
                                ) : story?.post_type === "articleStory" ? (
                                    <div className="story">
                                        <div 
                                            className="left_article_content"
                                            style={{
                                                background: story?.post_bg_color ? story?.post_bg_color : "grey",
                                                color: story?.post_text_color ? story?.post_text_color : "black",
                                                textAlign: story.post_align === "center" ? "center" : "left"
                                            }}
                                        >
                                            {story.post_content}
                                        </div>
                                    </div>
                                    
                                ) : story?.post_type === "videoStory" ? (
                                    <video 
                                        src={`${serverApi}/${story?.post_content}`} 
                                        className="story" 
                                        controls
                                    >
                                    </video>
                                ) : (
                                    <div>Unsupported post type</div>
                                )}
                            </div>

                            <div className="story_bottom">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        color: "#fff"
                                    }}
                                >
                                    <img src="/icons/post/heart.png" alt="" className='story_icon'/>
                                    <Typography style={{fontSize: "12px", opacity: "0.5"}}>{story?.post_likes}</Typography>
                                </div>
                                <img src="/icons/post/trash.png" alt=""  className='story_icon'/>
                            </div>

                        </div>


                        <div className="story_right">
                            <span className='comment_title'>Comment({comments.length})</span>

                            <div className="story_comments_container">
                    {comments?.map((comment: Comment) => { 
                        return(
                            <div className="">
                                <div className="story_comment_user_container">
                                    <img  
                                        src={
                                            comment?.member?.mb_profile_image 
                                            ? `${serverApi}/${comment?.member.mb_profile_image}`  
                                            : "/icons/user.png"
                                        } 
                                        alt="" 
                                        className="comment_user_img"  
                                        onClick={() => handleMemberSelect(comment.member._id)}                              
                                    />
                                    <div className="comment_user_info">
                                        <div className="info">
                                            <Typography className="name" style={{fontSize: "15px", cursor: "pointer"}} onClick={() => handleMemberSelect(comment.member._id)} >
                                                @{comment.member.mb_nick}
                                            </Typography>
                                            <Typography style={{opacity: "0.56", fontSize: "11px"}}>{moment(comment?.createdAt).format("YYYY-MM-DD")}</Typography>
                                        </div>
                                        <div className="comment_content">
                                            <p>{comment?.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
                        </div>
                    </div>
                ) : (
                    <div className="story_left">
                        <div 
                            className="user_container" 
                            key={story?.member?._id} 
                            style={{gap: "0", padding: "0 10px"}}
                            // onClick={() => handleMemberSelect(post?.member?._id)}
                        >
                            <img 
                                src={
                                    story?.member?.mb_profile_image 
                                    ? `${serverApi}/${story?.member.mb_profile_image}`  
                                    : "/icons/user.png"} 
                                alt="" 
                                className="post_user_icon"
                                style={{borderRadius: "50%"}}
                                onClick={() => handleMemberSelect(story?.member?._id)}
                                
                            />
                            <div style={{display: "flex", alignItems: "center", gap: "10px", color: "#fff"}}>
                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}} onClick={() => handleMemberSelect(story?.member?._id)}>
                                    @{story?.member.mb_nick}
                                </Typography>
                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(story?.createdAt).format("YYYY-MM-DD")}</Typography>
                            </div>
                        </div>
                        <div className="story_title">
                            <span style={{color: "#fff"}}>{story?.post_title} </span>
                        </div>
                        <div className="story_container">
                            {story?.post_type === "photoStory" ? (
                                <img 
                                    src={`${serverApi}/${story?.post_content}`}
                                    alt="" 
                                    className='story'
                                />
                            ) : story?.post_type === "articleStory" ? (
                                <div className="story">
                                    <div 
                                        className="left_article_content"
                                        style={{
                                            background: story?.post_bg_color ? story?.post_bg_color : "grey",
                                            color: story?.post_text_color ? story?.post_text_color : "black",
                                            textAlign: story.post_align === "center" ? "center" : "left"

                                        }}
                                    >
                                        {story.post_content}
                                    </div>
                                </div>
                                
                            ) : story?.post_type === "videoStory" ? (
                                <video 
                                    src={`${serverApi}/${story?.post_content}`} 
                                    className="story" 
                                    controls
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div>Unsupported post type</div>
                            )}
                        </div>
                        <div className="story_bottom">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    color: "#fff"
                                }}
                            >
                                {story?.post_type === "articleStory" ? (
                                    story?.me_liked && story?.me_liked[0]?.my_favorite ? (
                                        <img 
                                            src="/icons/post/heart.png" 
                                            onClick={(e) => handleStoryLike(e, story?._id, "article")}
                                            alt="" 
                                            className="like"
                                        />
                                    ) : (
                                        <img 
                                            src="/icons/post/like.png" 
                                            onClick={(e) => handleStoryLike(e, story?._id, "article")}
                                            alt="" 
                                            className="like"
                                        />
                                    )
                                ) : story?.post_type === "videoStory" ? (
                                    story?.me_liked && story?.me_liked[0]?.my_favorite ? (
                                        <img 
                                            src="/icons/post/heart.png" 
                                            onClick={(e) => handleStoryLike(e, story?._id, "video")}
                                            alt="" 
                                            className="like"
                                        />
                                    ) : (
                                        <img 
                                            src="/icons/post/like.png" 
                                            onClick={(e) => handleStoryLike(e, story?._id, "video")}
                                            alt="" 
                                            className="like"
                                        />
                                    )
                                ) : story?.post_type === "photoStory" ? (
                                    story?.me_liked && story?.me_liked[0]?.my_favorite ? (
                                        <img 
                                            src="/icons/post/heart.png" 
                                            onClick={(e) => handleStoryLike(e, story?._id, "photo")}
                                            alt="" 
                                            className="like"
                                        />
                                    ) : (
                                        <img 
                                            src="/icons/post/like.png" 
                                            onClick={(e) => handleStoryLike(e, story?._id, "photo")}
                                            alt="" 
                                            className="like"
                                        />
                                    )
                                ) : (
                                    null
                                )}
                            </div>
                            <div style={{display: "flex", alignItems: "center", gap: "10px", width: "90%"}}>
                                <input 
                                    type="text" 
                                    placeholder='Comment...' 
                                    className='story_commenting' 
                                    onChange={handleComment} 
                                    ref={textInput}
                                    onKeyDown={getKeyHandler}
                                />
                                <img src="/icons/chat/sent.png" alt="" className='story_icon' onClick={handleSendButton}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
