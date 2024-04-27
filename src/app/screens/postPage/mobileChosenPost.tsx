import React, { useEffect, useRef, useState } from 'react';
import "../../../css/post.css";
import { Modal, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { Post } from '../../../types/post';
import { useDispatch } from 'react-redux';
import { Comment, CreateComment } from '../../../types/comment';
import { verifiedMemberData } from '../../apiServices/verify';
import PostApiService from '../../apiServices/postApiService';
import { setChosenPost } from '../HomePage/slice';
import CommentApiService from '../../apiServices/commentApiService';
import { Definer } from '../../../lib/definer';
import assert from 'assert';
import MemberApiService from '../../apiServices/memberApiService';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import { serverApi } from '../../../lib/config';
import moment from 'moment';

interface RouteParams {
    postId: string;
    postType: string;
}

export function MobileChosenPost() {
    /** INITIALIZATIONS **/
    const [openComment, setOpenComment] = useState(false);

    
    const history = useHistory();
    const { postId } = useParams<RouteParams>();
    const { postType } = useParams<RouteParams>();
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<Comment[]>();
    const dispatch = useDispatch();
    const textInput: any = useRef(null);
    const [createComment, setCreateComment] = useState<CreateComment>({
        mb_id: verifiedMemberData._id,
		post_id: postId,
		comment: ""
	});
    
    /** HANDLERS **/
    const handleOpenCommentModal = () => setOpenComment(true);
    const handleCloseCommentModal = () => setOpenComment(false);

    const handleGoBack = () => {
        history.goBack(); 
        history.goForward();
    };

    useEffect(() => {
        const handleChosenPost = async () => {
            try {
                const postService = new PostApiService();
                const chosenPostData = await postService.getChosenPost(postId, postType); 
                dispatch(setChosenPost(chosenPostData)); 
                setPost(chosenPostData);
            } catch (error) {
                console.error("ERROR while fetching chosen post:", error);
            }
        };
    
        handleChosenPost();
    }, [dispatch, postId]);

    useEffect(() => {
        const findComments = async () => {
            try {
                const commentServive = new CommentApiService();
                const postComments = await commentServive.findChosenPostComments(postId);
                
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

    const handlePostLike = async (e: any, id: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            
            const memberService = new MemberApiService();
            const likeResult = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: postType,
            });
            assert.ok(likeResult, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            window.location.reload();
        } catch (err: any) {
            console.log(`ERROR :: targetLikeTop, ${err}`);
            sweetErrorHandling(err).then();
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

    const handleSendButton = async () => {
        try {
            const postService = new PostApiService();
            await postService.createComment(createComment);
    
            window.location.reload();
            await sweetTopSmallSuccessAlert("Comment sent successfully!", 700, false);
        } catch (error) {
            console.log(`ERROR :: handleSendButton, ${error}`);
            sweetErrorHandling(error).then();
        }
    };

    return (
        <div className='mobile-post-container'>
            <img src="/icons/other/close.png" alt="" className='close-button' onClick={handleGoBack}/>
            <div className='mobile-post-img-wrapper'>
                {post?.post_type === "photo" ? (
                    <img 
                        src={`${serverApi}/${post?.post_content}`}
                        alt="" 
                        className='mobile-post-img'
                    />
                ) : post?.post_type === "article" ? (
                    <div className="left_content">
                        <div 
                            className="left_article_content"
                            style={{
                                background: post?.post_bg_color ? post?.post_bg_color : "#000",
                                color: post?.post_text_color ? post?.post_text_color : "#fff",
                                textAlign: post.post_align === "center" ? "center" : "left"

                            }}
                        >
                            {post.post_content}
                        </div>
                    </div>
                    
                ) : post?.post_type === "video" ? (
                    <video 
                        src={`${serverApi}/${post?.post_content}`} 
                        className="mobile-post-img" 
                        controls
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div>Unsupported post type</div>
                )}
            </div>
            <div className="post-left-data-wrapper">
                {post?.me_liked && post?.me_liked[0]?.my_favorite ? (
                    <img 
                        src="/icons/post/heart.png" 
                        onClick={(e) => handlePostLike(e, post?._id)}
                        alt="" 
                        className="like"
                    />
                ) : (
                    <img 
                        src="/icons/post/like.png" 
                        onClick={(e) => handlePostLike(e, post?._id)}
                        alt="" 
                        className="like"
                    />
                )}    
                <img src="/icons/post/chat.png" alt=""  onClick={handleOpenCommentModal}/>
                <img src="/icons/post/share.png" alt="" />
                <img src="/icons/post/bookmark.png" alt="" />
            </div> 
            <div className="post-user-data-wrapper">
                <div className="user-data">
                    <img 
                        src={
                            post?.member?.mb_profile_image 
                            ? `${serverApi}/${post?.member.mb_profile_image}`  
                            : "/icons/user.png"
                        } 
                        alt="" 
                        width={"50px"}
                        height={"50px"}
                        style={{borderRadius: "50%", cursor: "pointer"}}
                        onClick={() => handleMemberSelect(post?.member?._id)}
                    />
                    <div>
                        <p className="username" onClick={() => handleMemberSelect(post?.member?._id)}>
                            @{post?.member.mb_nick}
                        </p>
                        <p className="date">
                            {moment(post?.createdAt).format("YYYY-MM-DD")}
                        </p>
                    </div>
                </div>
            </div>
            <div className="description-wrapper">
                <p className="description">
                    {post?.post_title}
                </p>
            </div>

            <Modal
                className="mobileInfoModalContainer"
                open={openComment}
                onClose={handleCloseCommentModal }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-container'> 
                    <div style={{position: "fixed"}}>
                        <img src="/icons/other/close.png" alt="" className='close-button' onClick={handleCloseCommentModal}/>
                    </div>
                    {comments?.map((comment: Comment) => {
                        return(
                            <div className="modal-user-comment-wrapper">
                                <img src={
                                            comment?.member?.mb_profile_image 
                                            ? `${serverApi}/${comment?.member.mb_profile_image}`  
                                            : "/icons/user.png"
                                        } alt="" className='modal-user-profile' onClick={() => handleMemberSelect(comment?.member?._id)}/>
                                <div className="modal-user-data">
                                    <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                                        <p className="modal-username">@{comment.member.mb_nick}</p>
                                        <p className="modal-date">{moment(comment?.createdAt).format("YYYY-MM-DD")}</p>
                                    </div>
                                    <div>
                                        <p className="modal-description">{comment?.comment}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}                    
                    <div className="modal-input-wrapper">
                        <input type="text" className='modal-input' placeholder='Comment...' onChange={handleComment} onKeyDown={getKeyHandler} ref={textInput}/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
