import { Box, Typography } from "@mui/material";
import "../../../css/visitPage.css";
import { Header } from "../../components/header/header";
import { LeftSidebar } from "../../components/sidebars/left_sidebar";

export function OtherPage() {
    return(
        <div>
            <Header />
            <LeftSidebar />

            <div className="visit_container">
                <div className="visit_page_container">
                    <div className="visit_page_box">
                        <div className="page_top">
                            <div className="left_info">
                                <img src="/icons/user.png" alt="" className="user_icon" />
                                <Typography className="nickname">@samo_ping12</Typography>
                                <button className="follow_btn">Follow</button>
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
                                            <span className="count">100</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="description">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="other_page_center">
                            <img src="/icons/other/posts.png" alt="" className="center_icon"/>
                            <Typography style={{cursor: "pointer"}}>Information</Typography>
                        </div>
                        <Box className='line' />

                        <div className="page_bottom">
                            <div className="post">
                                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
                            </div>
                            <div className="post">
                                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
                            </div>
                            <div className="post">
                                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
                            </div>
                            <div className="post">
                                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
                            </div>
                            <div className="post">
                                <img src="https://www.animalfriends.co.uk/siteassets/media/images/article-images/cat-articles/51_afi_article1_the-secret-language-of-cats.png" alt="" />
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}