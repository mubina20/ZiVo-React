import { Box, Modal, Typography } from "@mui/material";
import "../../../css/visitPage.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MemberApiService from "../../apiServices/memberApiService";
import { retrieveChosenMember } from "./selector";
import { serverApi } from "../../../lib/config";
import { Post } from "../../../types/post";
import PostApiService from "../../apiServices/postApiService";
import { Member } from "../../../types/user";
import { useParams } from "react-router-dom";
import moment from "moment";

interface RouteParams {
    memberId: string;
}


export function OtherPage(props: any) {
    /** INITIALIZATIONS **/
    const chosenMember = useSelector(retrieveChosenMember);
    const { memberId } = useParams<RouteParams>();
    const { open, handleOpenModal, handleModalClose } = props;
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [member, setMember] = useState<Member>();

    /** HANDLERS **/
    useEffect(() => {
        const allPostsData = async () => {
            try {
                const postService = new PostApiService();
                const allPostsData = await postService.getAllPosts();
                setAllPosts(allPostsData);
            } catch (err) {
                console.error('Error while fetching members:', err);
            }
        };

        allPostsData();
    }, []);
    const filteredPosts = allPosts.filter(post => post.member._id === member?._id);
    console.log("filteredPosts", filteredPosts);

    
    useEffect(() => {
        const chosenMemberData = async () => {
            try {
                console.log("params memberId::", memberId);
                const memberService = new MemberApiService();
                const chosenMemberData = await memberService.getChosenMember(memberId);
                setMember(chosenMemberData); 
            } catch (error) {
                console.error("Error :: while fetching chosen member:", error);
            }
        };
    
        if (memberId) {
            chosenMemberData();
        }
    }, [memberId]);
    
    return(
        <div>
            <Header />
            <LeftSidebar />

            <div className="visit_container">
                <div className="visit_page_container">
                    <div className="visit_page_box">
                        <div className="page_top">
                            <div className="left_info">
                                <img 
                                    src={
                                            member?.mb_profile_image 
                                            ? `${serverApi}/${member.mb_profile_image}`  
                                            : "/icons/user.png"
                                    }  
                                    alt="" 
                                    className="user_icon" 
                                />
                                <Typography className="nickname">@{member?.mb_nick}</Typography>
                                <button className="follow_btn" style={{marginBottom: "10px"}}>Follow</button>
                                <button className="follow_btn" style={{background: "rgb(96 138 255)"}}>Message</button>
                            </div>
                            <div className="right_info">
                                <div className="info">
                                    <div className="top_icons">
                                        <img src="/icons/post/share.png" alt="" className="top_icon"/>
                                        <img src="/icons/post/more.png" alt="" className="top_icon"/>
                                    </div>
                                    <div className="bottom_infos">
                                        <div className="group">
                                            <Typography className="text">Followers</Typography>
                                            <span className="count">35.8K</span>
                                        </div>
                                        <div className="group">
                                            <Typography className="text">Followings</Typography>
                                            <span className="count">35</span>
                                        </div>
                                        <div className="group">
                                            <Typography className="text">Posts</Typography>
                                            <span className="count">{filteredPosts.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>{chosenMember?.mb_description}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="other_page_center">
                            <img src="/icons/other/posts.png" alt="" className="center_icon"/>
                            <Typography style={{cursor: "pointer"}} onClick={handleOpenModal}>Information</Typography>
                            <div>
                                <Modal
                                    className="infoModalContainer"
                                    open={open}
                                    onClose={handleModalClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className="infoModal">
                                        <div className="member_info_closing">
                                            <span>@{member?.mb_nick}<span>'s Information</span></span>
                                            <img src="/icons/other/close.png" alt="" onClick={handleModalClose} className="close"/>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Name</div>
                                            <div className="info">{member?.mb_name}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Surname</div>
                                            <div className="info">{member?.mb_surname}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Birthday</div>
                                            <div className="info">{member?.mb_birthday}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Gender</div>
                                            <div className="info">{member?.mb_gender}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Country</div>
                                            <div className="info">{member?.mb_country}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">School</div>
                                            <div className="info">{member?.mb_school}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Description</div>
                                            <div className="info">{member?.mb_description}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Hobby</div>
                                            <div className="info">{member?.mb_hobby}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Address</div>
                                            <div className="info">{member?.mb_address}</div>
                                        </div>
                                        <div className="information">
                                            <div className="info_category">Join</div>
                                            <div className="info">{moment(member?.createdAt).format("YYYY-MM-DD")}</div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <Box className='line' />

                        <div className="page_bottom">
                            {filteredPosts && filteredPosts.length > 0 ? (
                                filteredPosts.map((post: Post) => (
                                    post.post_type === "photo" ? (
                                        // Photo Post
                                        <div key={post._id}>
                                            <div className="post">
                                                <img src={`${serverApi}/${post?.post_content}`} alt="" width="300px"/>
                                                {post.post_title}
                                                {/* {post.post_content} */}
                                            </div>
                                        </div>
                                    ) : post.post_type === "article" ? (
                                        // Article Post
                                        <div className="post">
                                            <div 
                                                className="article_post"
                                                style={{
                                                    background: post?.post_bg_color ? post?.post_bg_color : "grey",
                                                    color: post?.post_text_color ? post?.post_text_color : "black",
                                                    textAlign: post.post_align === "center" ? "center" : "left"

                                                }}
                                            >
                                                {post.post_content}
                                            </div>
                                        </div>
                                    ) : (
                                        // Video Post
                                        <div key={post._id}>
                                            <div className="post">
                                                <video
                                                    loop
                                                    // playsInline
                                                    controls
                                                    width={"100%"}
                                                >
                                                    <source
                                                        src={`${serverApi}/${post?.post_content}`}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            </div>
                                        </div>
                                    )
                                ))
                            ) : (
                                <div>Post hali yo'q</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}