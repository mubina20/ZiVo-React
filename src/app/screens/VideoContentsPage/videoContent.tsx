import { useEffect, useRef, useState } from "react";
import "../../../css/video.css";
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/sidebars/left_sidebar';
import { Post, UpdatePost } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { serverApi } from "../../../lib/config";
import { Typography } from "@mui/material";
import CommentApiService from "../../apiServices/commentApiService";
import { Comment, CreateComment } from "../../../types/comment";
import moment from "moment";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import assert from "assert";
import { Definer } from "../../../lib/definer";
import { verifiedMemberData } from "../../apiServices/verify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Favorite } from "@mui/icons-material";

export function VideoContents(props: any) {
    /** INITIALIZATIONS **/
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const history = useHistory();
    const [post, setPost] = useState<Post>();
    const dispatch = useDispatch();
    const textInput: any = useRef(null);
    const [createComment, setCreateComment] = useState<CreateComment>({
        mb_id: verifiedMemberData._id,
		post_id: "",
		comment: ""
	});
    /** HANDLERS **/
    useEffect(() => {
        const postService = new PostApiService();
        postService
        .getAllPosts()
        .then((data) => setAllPosts(data))
        .catch((err) => console.log("ERROR :: AllRestaurants,", err));
    }, []);
    console.log("props > allPosts", allPosts);

        const findComments = async (postId: any) => {
            try {
                const commentService = new CommentApiService();
                const postComments = await commentService.findChosenPostComments(postId);
    
                if (postComments.length > 0) {
                    setComments(postComments);
                } else {
                    setComments([]);
                }
    
                console.log("video post comments ::", postComments);
            } catch (error) {
                console.error("ERROR findComments ::", error);
            }
        };

        const handlePostLike = async (e: any, id: string) => {
            try {
                assert.ok(verifiedMemberData, Definer.auth_err1);
                
                const memberService = new MemberApiService();
                const likeResult = await memberService.memberLikeTarget({
                    like_ref_id: id,
                    group_type: "video",
                });
                assert.ok(likeResult, Definer.general_err1);
    
                await sweetTopSmallSuccessAlert("success", 700, false);
                window.location.reload();
            } catch (err: any) {
                console.log(`ERROR :: handlePostLike, ${err}`);
                sweetErrorHandling(err).then();
            }
        };
    
        const handleComment = (e: any) => {
            createComment.comment = e.target.value;
            setCreateComment({ ...createComment });
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
    
                // Like tugmasini bosgan kommentni ID sini likedComments holatiga qo'shamiz
                // setLikedComments((prevLikedComments) => [...prevLikedComments, id]);
    
                await sweetTopSmallSuccessAlert("success", 700, false);
                // window.location.reload();
            } catch (err: any) {
                console.log(`ERROR :: handleCommentLike, ${err}`);
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
    
    return(
        <div>
            <Header />
            <LeftSidebar />
            <div className="shorts_big_container">
                <div className="shorts_container">
                    {allPosts.map((post: Post) => (
                        post.post_type === "video" ? (
                            <div className="short_content">
                                <div className="video_left">
                                    <video
                                        loop
                                        playsInline
                                        controls
                                        className="video_content"
                                    >
                                        <source
                                            src={`${serverApi}/${post?.post_content}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </div>
                                <div className="video_right">
                                    <button onClick={() => findComments(post._id)}>dfdfdfdf</button>
                                    <Typography className="post_desctiption">{post.post_title}</Typography>
                                    {comments?.map((comment: Comment) => { 
                                        return(
                                            <div className="video_comments">
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
                                        // onClick={() => handleMemberSelect(comment?.member?._id)}                            
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
                                            </div>
                                        )
                                    })} 
                                </div>
                                {post?.me_liked && post?.me_liked[0]?.my_favorite ? (
                                        <img 
                                            src="/icons/post/heart.png" 
                                            onClick={(e) => handlePostLike(e, post?._id,)}
                                            alt="" 
                                            className="like"
                                        />
                                    ) : (
                                        <img 
                                            src="/icons/post/like.png" 
                                            onClick={(e) => handlePostLike(e, post?._id,)}
                                            alt="" 
                                            className="like"
                                        />
                                    )}
                                    {post?.post_likes}
                                {/* <Favorite
                                                    onClick={(e) => handlePostLike(e, post._id)}
                                                    style={{ 
                                                        fill:
                                                        post?.me_liked && post?.me_liked[0]?.my_favorite
                                                            ? "red"
                                                            : "white"
                                                    }} 
                                                /> */}
                            </div>
                            // // Video Post
                            // <div className="post_container" key={post._id}>
                            //     <div className="post_data">
                            //         <div className="post_top">
                            //             <div 
                            //                 className="user_container" 
                            //                 key={post?.member?._id} 
                            //                 onClick={() => handleMemberSelect(post?.member?._id)}
                            //             >
                            //                 <img 
                            //                     src={
                            //                         post?.member?.mb_profile_image 
                            //                         ? `${serverApi}/${post?.member.mb_profile_image}`  
                            //                         : "/icons/user.png"} 
                            //                     alt="" 
                            //                     className="post_user_icon"
                            //                     style={{borderRadius: "50%"}}
                            //                 />
                            //                 <div className="user_info">
                            //                     <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@{post.member.mb_nick}</Typography>
                            //                     <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}>{moment(post.createdAt).format("YYYY-MM-DD")}</Typography>
                            //                 </div>
                            //             </div>
                            //             <img src={"/icons/post/bookmark.png"} alt="" className="icon"/>
                            //         </div>
                            //         <Typography className="post_desctiption">{post.post_title}</Typography>
                            //     </div>

                            //     <div className="post_content">
                            //         <video
                            //             loop
                            //             playsInline
                            //             controls
                            //         >
                            //             <source
                            //                 src={`${serverApi}/${post?.post_content}`}
                            //                 type="video/mp4"
                            //             />
                            //         </video>
                            //     </div>

                            //     <div className="post_bottom">
                            //         <div className="left">
                                        // <img 
                                        //     src={post?.post_likes > 0 ? "/icons/post/heart.png" : "/icons/post/like.png" }
                                        //     // onClick={(e) => videoPostLike(e, post._id)}
                                        //     alt="" className="bottom_icon"
                                        // />
                            //             <span style={{marginRight: "50px"}}>{post.post_likes}</span>
                            //             {/* <img src="/icons/post/chat.png" alt="" className="bottom_icon"/><span>100</span> */}
                            //             <span style={{cursor: "pointer"}} onClick={() => handlePostSelect(post?._id, "video")}>view comment</span>
                            //         </div>
                            //         <div className="right">
                            //             <img src="/icons/post/share.png" alt="" className="bottom_icon"/>
                            //         </div>
                            //     </div>
                            // </div>
                        ) : (
                            null
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}