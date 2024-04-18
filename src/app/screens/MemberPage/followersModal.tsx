import { Button, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Follower } from '../../../types/follow';
import assert from 'assert';
import { verifiedMemberData } from '../../apiServices/verify';
import { Definer } from '../../../lib/definer';
import FollowApiService from '../../apiServices/followApiService';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import { serverApi } from '../../../lib/config';
import "../../../css/follow.css";
import { useHistory } from 'react-router-dom';

export function FollowersModal(props: any) {
    const history = useHistory();
    const {memberFollowers} = props;
    const { handleCloseFollowersModal, open } = props;

    const [followerRebuild, setFollowerRebuild] = useState<Boolean>(false);

    const subscribeHandler = async (e: any, id: string) => {
        try {
            e.stopPropagation();
            assert.ok(verifiedMemberData, Definer.auth_err1);
        
            const followService = new FollowApiService();
            await followService.subscribe(id);
        
            setFollowerRebuild(!followerRebuild);
            await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    const visitMemberHandler = (mb_id: string) => {
		history.push(`/member/${mb_id}`);
		document.location.reload();
	};

    return (
        <div>
            <Modal
                className="followers_modal_container"
                open={open}
                onClose={handleCloseFollowersModal} 
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='followers_modal_box'>
                    <div className="followers_modal_closing">
                        <span>Followers</span>
                        <img 
                            src="/icons/other/close.png" 
                            alt="" 
                            className='followers_close'
                            onClick={handleCloseFollowersModal}
                        />
                        <button onClick={handleCloseFollowersModal}>Close</button>
                    </div>
                    <div className="followers_container">
                        {memberFollowers.map((follower: Follower) => {
                            // console.log("follower", follower);
                            const image_url = follower?.subscriber_member_data?.mb_profile_image
                                ? `${serverApi}/${follower.subscriber_member_data.mb_profile_image}`
                                : '/icons/user.png';
                                
                            return(
                                <div className="follower_container" key={follower?._id}>
                                    <div className="follower_info">
                                        <img src={image_url} alt="" className='follower_avatar' onClick={() => visitMemberHandler(follower?.subscriber_id)}/>
                                        <span>@{follower.subscriber_member_data.mb_nick}</span>
                                    </div>
                                    { true &&
                                        (follower?.me_followed && follower.me_followed[0]?.my_following ? (
                                            <span className="friend" >
                                                Friend
                                            </span>
                                        ) : (
                                            <button
                                            className="follow_btn"
                                            onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                                            >
                                            Follow
                                            </button>
                                        ))}
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            </Modal>
        </div>
    )
}
