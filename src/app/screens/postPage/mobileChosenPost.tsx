import React, { useState } from 'react';
import "../../../css/post.css";
import { Modal } from '@mui/material';

export function MobileChosenPost() {
    /** INITIALIZATIONS **/
  const [openComment, setOpenComment] = useState(false);

  /** HANDLERS **/
  const handleOpenCommentModal = () => setOpenComment(true);
  const handleCloseCommentModal = () => setOpenComment(false);
    return (
        <div className='mobile-post-container'>
            <img src="/icons/other/close.png" alt="" className='close-button'/>
            <div className='mobile-post-img-wrapper'>
                {/* <img src="https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" alt="" className='mobile-post-img'/> */}
                {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnOrOwY43A2IXz1v0yLjmHVWj0d2_YMm_6eA&usqp=CAU" alt="" className='mobile-post-img'/> */}
                <img src="https://www.holidayidea.com.my/promo/img/frntbck2.jpg" alt="" className='mobile-post-img'/>
            </div>
            <div className="post-left-data-wrapper">
                <img src="/icons/post/like.png" alt="" />    
                <img src="/icons/post/chat.png" alt=""  onClick={handleOpenCommentModal}/>
                <img src="/icons/post/share.png" alt="" />
                <img src="/icons/post/bookmark.png" alt="" />
            </div> 
            <div className="post-user-data-wrapper">
                <div className="user-data">
                    <img src="/icons/user.png" alt="" width={"50px"}/>
                    <div>
                        <p className="username">
                            @Krodeg
                        </p>
                        <p className="date">
                            2024.3.31
                        </p>
                    </div>
                </div>
            </div>
            <div className="description-wrapper">
                <p className="description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus itaque excepturi aut molestiae, consequuntur corporis veniam quod quaerat amet numquam, illo, eligendi voluptatum id impedit inventore. Excepturi non exercitationem ipsa nulla esse aliquam, unde vel animi laborum distinctio accusantium magnam natus cumque voluptatibus magni expedita obcaecati reiciendis quos cupiditate perferendis omnis ducimus? Minima quam vero porro reiciendis laboriosam odio voluptatem quos ut deserunt doloribus dolores quae nemo libero voluptate asperiores, deleniti saepe expedita! Odio itaque ipsam eos tenetur quibusdam facere a corrupti enim! Neque deleniti, harum voluptatibus animi provident culpa doloribus earum hic aspernatur architecto in nam voluptatum adipisci dolore?
                </p>
            </div>





            <Modal
                className="infoModalContainer"
                open={openComment}
                onClose={handleCloseCommentModal }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-container'> 
                    <div style={{position: "fixed"}}>
                        <img src="/icons/other/close.png" alt="" className='close-button' onClick={handleCloseCommentModal}/>
                    </div>
                    <div className="modal-user-comment-wrapper">
                        <img src="/icons/user.png" alt="" className='modal-user-profile'/>
                        <div className="modal-user-data">
                            <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                                <p className="modal-username">@Krodeg</p>
                                <p className="modal-date">2024-04-01</p>
                            </div>
                            <div>
                                <p className="modal-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vero atque blanditiis repudiandae maiores doloribus, quas ab veritatis eaque consequatur delectus tempore perferendis quidem modi dolorem facere iusto tenetur qui. Eos unde laudantium non earum rerum vel ipsam aut numquam. Dolorem ipsa, perspiciatis tempora commodi eos, ex error placeat porro voluptas repellendus eveniet molestiae vel maiores culpa saepe suscipit minus at. Veritatis veniam quasi sed amet id quam vero inventore consectetur dignissimos ducimus fugiat earum mollitia rerum vel fugit voluptate, quo quibusdam quae illo corrupti sunt est blanditiis. Recusandae dicta ducimus adipisci minus dignissimos! Unde sunt accusantium alias veniam odit ex quidem voluptates repellendus porro nesciunt, itaque eos magni laboriosam nostrum. Autem nostrum odio debitis officia atque, expedita quaerat soluta amet non error magnam odit qui illum delectus architecto fugit minus ullam! Magnam autem soluta molestiae, quibusdam ratione deleniti asperiores accusamus perferendis dicta, voluptas temporibus cumque ipsum, dolorum consectetur voluptate suscipit non velit! Dignissimos voluptatum aut numquam dolore facere, placeat officia molestias repellat? Accusamus saepe eum itaque voluptatibus reprehenderit enim consequuntur fugit esse. Vitae totam dolore commodi eius et maiores ab reprehenderit? Ipsum, ad reprehenderit tempore obcaecati doloribus delectus fugit, quod in impedit aperiam, labore est pariatur deleniti incidunt molestiae!</p>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", marginTop: "10px", alignItems: "end", fontSize: "13px", justifyContent: "center"}}>
                                <img src="/icons/post/like.png" alt="" className='modal-like'/>
                                <p className="modal-like-count">30K</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-user-comment-wrapper">
                        <img src="/icons/user.png" alt="" className='modal-user-profile'/>
                        <div className="modal-user-data">
                            <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                                <p className="modal-username">@Krodeg</p>
                                <p className="modal-date">2024-04-01</p>
                            </div>
                            <div>
                                <p className="modal-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vero atque blanditiis repudiandae maiores doloribus, quas ab veritatis eaque consequatur delectus tempore perferendis quidem modi dolorem facere iusto tenetur qui. Eos unde laudantium non earum rerum vel ipsam aut numquam. Dolorem ipsa, perspiciatis tempora commodi eos, ex error placeat porro voluptas repellendus eveniet molestiae vel maiores culpa saepe suscipit minus at. Veritatis veniam quasi sed amet id quam vero inventore consectetur dignissimos ducimus fugiat earum mollitia rerum vel fugit voluptate, quo quibusdam quae illo corrupti sunt est blanditiis. Recusandae dicta ducimus adipisci minus dignissimos! Unde sunt accusantium alias veniam odit ex quidem voluptates repellendus porro nesciunt, itaque eos magni laboriosam nostrum. Autem nostrum odio debitis officia atque, expedita quaerat soluta amet non error magnam odit qui illum delectus architecto fugit minus ullam! Magnam autem soluta molestiae, quibusdam ratione deleniti asperiores accusamus perferendis dicta, voluptas temporibus cumque ipsum, dolorum consectetur voluptate suscipit non velit! Dignissimos voluptatum aut numquam dolore facere, placeat officia molestias repellat? Accusamus saepe eum itaque voluptatibus reprehenderit enim consequuntur fugit esse. Vitae totam dolore commodi eius et maiores ab reprehenderit? Ipsum, ad reprehenderit tempore obcaecati doloribus delectus fugit, quod in impedit aperiam, labore est pariatur deleniti incidunt molestiae!</p>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", marginTop: "10px", alignItems: "end", fontSize: "13px", justifyContent: "center"}}>
                                <img src="/icons/post/like.png" alt="" className='modal-like'/>
                                <p className="modal-like-count">30K</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-user-comment-wrapper">
                        <img src="/icons/user.png" alt="" className='modal-user-profile'/>
                        <div className="modal-user-data">
                            <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                                <p className="modal-username">@Krodeg</p>
                                <p className="modal-date">2024-04-01</p>
                            </div>
                            <div>
                                <p className="modal-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vero atque blanditiis repudiandae maiores doloribus, quas ab veritatis eaque consequatur delectus tempore perferendis quidem modi dolorem facere iusto tenetur qui. Eos unde laudantium non earum rerum vel ipsam aut numquam. Dolorem ipsa, perspiciatis tempora commodi eos, ex error placeat porro voluptas repellendus eveniet molestiae vel maiores culpa saepe suscipit minus at. Veritatis veniam quasi sed amet id quam vero inventore consectetur dignissimos ducimus fugiat earum mollitia rerum vel fugit voluptate, quo quibusdam quae illo corrupti sunt est blanditiis. Recusandae dicta ducimus adipisci minus dignissimos! Unde sunt accusantium alias veniam odit ex quidem voluptates repellendus porro nesciunt, itaque eos magni laboriosam nostrum. Autem nostrum odio debitis officia atque, expedita quaerat soluta amet non error magnam odit qui illum delectus architecto fugit minus ullam! Magnam autem soluta molestiae, quibusdam ratione deleniti asperiores accusamus perferendis dicta, voluptas temporibus cumque ipsum, dolorum consectetur voluptate suscipit non velit! Dignissimos voluptatum aut numquam dolore facere, placeat officia molestias repellat? Accusamus saepe eum itaque voluptatibus reprehenderit enim consequuntur fugit esse. Vitae totam dolore commodi eius et maiores ab reprehenderit? Ipsum, ad reprehenderit tempore obcaecati doloribus delectus fugit, quod in impedit aperiam, labore est pariatur deleniti incidunt molestiae!</p>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", marginTop: "10px", alignItems: "end", fontSize: "13px", justifyContent: "center"}}>
                                <img src="/icons/post/like.png" alt="" className='modal-like'/>
                                <p className="modal-like-count">30K</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-input-wrapper">
                        <input type="text" className='modal-input' placeholder='Comment...'/>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
