import { Typography } from '@mui/material';
import "../../../css/post.css";
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Post } from '../../../types/post';
import PostApiService from '../../apiServices/postApiService';
import { setChosenPost } from '../HomePage/slice';
import { serverApi } from '../../../lib/config';
import moment from 'moment';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import assert from 'assert';
import { Definer } from '../../../lib/definer';
import { verifiedMemberData } from '../../apiServices/verify';
import MemberApiService from '../../apiServices/memberApiService';
import CommentApiService from '../../apiServices/commentApiService';
import { Comment } from '../../../types/comment';

interface RouteParams {
    postId: string;
    postType: string;
}

export function ChosenPost(props: any) {
    /** INITIALIZATIONS **/
    const history = useHistory();
    const { postId } = useParams<RouteParams>();
    const { postType } = useParams<RouteParams>();
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<Comment[]>();
    const dispatch = useDispatch();

    /** HANDLERS **/
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
                
                setComments(postComments);
                console.log("comments ::", postComments);
            } catch (error) {
                console.error("ERROR handleMemberSelect ::", error);
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
            
            // const updatedPosts = post?.post_likes = likeResult.like_status;
            // setAllPosts(updatedPosts);
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log(`ERROR :: targetLikeTop, ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    const handleCommentLike = async (e: any, id: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            
            const memberService = new MemberApiService();
            const likeResult = await memberService.memberLikeTarget({
                like_ref_id: id,
                group_type: "comment",
            });
            assert.ok(likeResult, Definer.general_err1);
            
            // const updatedPosts = post?.post_likes = likeResult.like_status;
            // setAllPosts(updatedPosts);
            await sweetTopSmallSuccessAlert("success", 700, false);
        } catch (err: any) {
            console.log(`ERROR :: handleCommentLike, ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    const handleMemberSelect = async (memberId: any) => {
        try {
            history.push(`/member/${memberId}`); 
        } catch (error) {
            console.error("ERROR handleMemberSelect ::", error);
        }
    };

    return (
        <div className='chosen_post_page'>
            <div className="page_left">
                {post?.post_type === "photo" ? (
                    <img 
                        src={`${serverApi}/${post?.post_content}`}
                        alt="" 
                        className='left_content_bg'
                    />
                ) : post?.post_type === "article" ? (
                    <div className="left_content_bg">
                        <div 
                            // className="left_article_content"
                            style={{
                                height: "100vh",
                                background: post?.post_bg_color ? post?.post_bg_color : "grey",
                                color: post?.post_text_color ? post?.post_text_color : "black",
                                textAlign: post.post_align === "center" ? "center" : "left"

                            }}
                        >
                            {post.post_content}
                        </div>
                    </div>
                    
                ) : post?.post_type === "video" ? (
                    <video 
                        src={`${serverApi}/${post?.post_content}`} 
                        className="left_content_bg" 
                    ></video>
                ) : (
                    <div>Unsupported post type</div>
                )}
                <div className='left_inside' style={{position: "absolute", display: "flex"}}>
                    <div className="left-1">
                        <img src="/icons/other/close.png" alt="" className='left_icon' onClick={handleGoBack}/>
                    </div>
                    <div className="left-2">
                        {post?.post_type === "photo" ? (
                            <img 
                                src={`${serverApi}/${post?.post_content}`}
                                alt="" 
                                className='left_content'
                            />
                        ) : post?.post_type === "article" ? (
                            <div className="left_content">
                                <div 
                                    className="left_article_content"
                                    style={{
                                        background: post?.post_bg_color ? post?.post_bg_color : "grey",
                                        color: post?.post_text_color ? post?.post_text_color : "black",
                                        textAlign: post.post_align === "center" ? "center" : "left"

                                    }}
                                >
                                    {post.post_content}
                                </div>
                            </div>
                            
                        ) : post?.post_type === "video" ? (
                            <video 
                                src={`${serverApi}/${post?.post_content}`} 
                                className="left_content" 
                                controls
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div>Unsupported post type</div>
                        )}
                    </div>
                    <div className="left-3">
                        <img src="/icons/post/bookmark.png" alt="" className='left_icon' />
                    </div>
                </div>
            </div>

            <div className="page_right">
                <div className="author_info_container">
                    <div className="author_container">
                        <div className="user_container" onClick={() => handleMemberSelect(post?.member?._id)}>
                            <img 
                                src={
                                    post?.member?.mb_profile_image 
                                    ? `${serverApi}/${post?.member.mb_profile_image}`  
                                    : "/icons/user.png"
                                } 
                                alt="" 
                                className="user_img"
                                style={{borderRadius: "50%"}}
                                
                            />
                            <div className="user_info">
                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>
                                    @{post?.member.mb_nick}
                                </Typography>
                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>
                                    {moment(post?.createdAt).format("YYYY-MM-DD")}
                                </Typography>
                            </div>
                            
                        </div>
                        <div className="follows_btn">Follow</div>
                    </div>
                    <div className="post_description">
                        <Typography>{post?.post_title}</Typography>
                    </div>
                    <div className="like_container">
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
                        <Typography style={{marginTop: "8px"}}>{post?.post_likes}</Typography>
                    </div>
                </div>

                <div className="comment_title">
                    <Typography className='title'>Comments ({comments?.length ? comments?.length : 0})</Typography>
                </div>

                <div className="comments_container">
                    {comments?.map((comment: Comment) => {
                        return(
                            <div className="comment_box" key={comment._id}>
                                <div className="comment_user_container">
                                    <img  
                                        src={
                                            comment?.member?.mb_profile_image 
                                            ? `${serverApi}/${comment?.member.mb_profile_image}`  
                                            : "/icons/user.png"
                                        } 
                                        alt="" 
                                        className="comment_user_img"                                
                                    />
                                    <div className="comment_user_info">
                                        <div className="info">
                                            <Typography className="name" style={{fontSize: "15px", cursor: "pointer"}}>@{comment.member.mb_nick}</Typography>
                                            <Typography style={{opacity: "0.56", fontSize: "11px"}}>{moment(comment?.createdAt).format("YYYY-MM-DD")}</Typography>
                                        </div>
                                        <div className="comment_content">
                                            <p>{comment?.comment}</p>
                                        </div>
                                    </div>
                                    <div className="comment_like">
                                    {comment?.me_liked && comment?.me_liked[0]?.my_favorite ? (
                                        <img 
                                            src="/icons/post/heart.png" 
                                            onClick={(e) => handleCommentLike(e, comment?._id)}
                                            alt="" 
                                            className="likE"
                                        />
                                    ) : (
                                        <img 
                                            src="/icons/post/like.png" 
                                            onClick={(e) => handleCommentLike(e, comment?._id)}
                                            alt="" 
                                            className="likE"
                                        />
                                    )}

                                        {/* <img src="/icons/post/like.png" alt="" className='likE'/> */}
                                        <Typography style={{fontSize: "12px"}}>{comment.comment_likes}</Typography>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
                
                <div className="add_comment_container">
                    <input type="text" placeholder='Comment...' className='comment_input'/>
                    <img src="/icons/chat/sent.png" alt="" width={'30px'} style={{marginLeft: "-50px", cursor: "pointer"}}/>
                </div>

            </div>
        </div>
    )
}

