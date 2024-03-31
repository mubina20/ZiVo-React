import { Typography } from '@mui/material';
import "../../../css/post.css";

export function ChosenPost() {
    /** INITIALIZATIONS **/

    /** HANDLERS **/

    return (
        <div className='chosen_post_page'>
            <div className="page_left">
                    <img 
                        src="https://www.holidayidea.com.my/promo/img/frntbck2.jpg" 
                        alt="" 
                        className='left_content_bg'
                        style={{opacity: "0.2"}}
                    />
                <div className='left_inside' style={{position: "absolute", display: "flex"}}>
                    <div className="left-1">
                        <img src="/icons/other/close.png" alt="" className='left_icon'/>
                    </div>
                    <div className="left-2">
                        <img 
                            src="https://www.holidayidea.com.my/promo/img/frntbck2.jpg" 
                            alt="" 
                            className='left_content'
                        />
                    </div>
                    <div className="left-3">
                        <img src="/icons/post/bookmark.png" alt="" className='left_icon' />
                    </div>
                </div>
            </div>

            <div className="page_right">
                <div className="author_info_container">
                    <div className="author_container">
                        <div className="user_container">
                            <img 
                                src={"/icons/user.png"} 
                                alt="" 
                                className="user_img"
                                style={{borderRadius: "50%"}}
                                
                            />
                            <div className="user_info">
                                <Typography className="name" style={{fontSize: "16px", cursor: "pointer"}}>@samo_ping12</Typography>
                                <Typography className="name" style={{opacity: "0.56", fontSize: "13px"}}> 2024-02-15</Typography>
                            </div>
                            
                        </div>
                        <div className="follows_btn">Follow</div>
                    </div>
                    <div className="post_description">
                        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, quis. Eaque pariatur quidem, rem, eum, soluta nisi dolores consequatur ad nihil dolorem architecto. Inventore rem vero temporibus iste, quos enim.</Typography>
                    </div>
                    <div className="like_container">
                        <img src="/icons/post/like.png" alt="" className='like'/>
                        <Typography style={{marginTop: "8px"}}>30K</Typography>
                    </div>
                </div>

                <div className="comment_title">
                    <Typography className='title'>Comments (100)</Typography>
                </div>

                <div className="comments_container">
                    <div className="comment_box">
                        <div className="comment_user_container">
                            <img 
                                src={"/icons/user.png"} 
                                alt="" 
                                className="comment_user_img"                                
                            />
                            <div className="comment_user_info">
                                <div className="info">
                                    <Typography className="name" style={{fontSize: "15px", cursor: "pointer"}}>@samo_ping12</Typography>
                                    <Typography style={{opacity: "0.56", fontSize: "11px"}}> 2024-02-15</Typography>
                                </div>
                                <div className="comment_content">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias laboriosam, corporis, consequuntur ratione nemo, sunt ex voluptas in minima laudantium tempora commodi accusamus maiores? Iusto obcaecati quibusdam consequatur sit ipsa.</p>
                                </div>
                            </div>
                            <div className="comment_like">
                                <img src="/icons/post/like.png" alt="" className='likE'/>
                                <Typography style={{fontSize: "12px"}}>30K</Typography>
                            </div>
                        </div>
                    </div>

                    <div className="comment_box">
                        <div className="comment_user_container">
                            <img 
                                src={"/icons/user.png"} 
                                alt="" 
                                className="comment_user_img"                                
                            />
                            <div className="comment_user_info">
                                <div className="info">
                                    <Typography className="name" style={{fontSize: "15px", cursor: "pointer"}}>@samo_ping12</Typography>
                                    <Typography style={{opacity: "0.56", fontSize: "11px"}}> 2024-02-15</Typography>
                                </div>
                                <div className="comment_content">
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            <div className="comment_like">
                                <img src="/icons/post/like.png" alt="" className='likE'/>
                                <Typography style={{fontSize: "12px"}}>30K</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="add_comment_container">
                    <input type="text" placeholder='Comment...' className='comment_input'/>
                    <img src="/icons/chat/sent.png" alt="" width={'30px'} style={{marginLeft: "-50px", cursor: "pointer"}}/>
                </div>

            </div>
        </div>
    )
}

