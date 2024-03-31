import { Button, Modal } from '@mui/material'
import React, { useState } from 'react'
import { Following } from '../../../types/follow';
import { serverApi } from '../../../lib/config';
import assert from 'assert';
import { verifiedMemberData } from '../../apiServices/verify';
import { Definer } from '../../../lib/definer';
import FollowApiService from '../../apiServices/followApiService';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert';
import { useHistory } from 'react-router-dom';

export function FollowingsModal(props: any) {
    const history = useHistory();
    const { open, handleCloseFollowings, handleClose, memberFollowings } = props;
    const [followRebuild, setFollowerRebuild] = useState<Boolean>(false);

    const unsubscribeHandler = async (e: any, id: string) => {
		try {
			e.stopPropagation();
			assert.ok(verifiedMemberData, Definer.auth_err1);

			const followService = new FollowApiService();
			await followService.unsubscribe(id);

			await sweetTopSmallSuccessAlert('successfully unsubscribed', 700, false);
			setFollowerRebuild(!followRebuild);
		} catch (error: any) {
			console.log(error);
			sweetErrorHandling(error).then();
		}
	};

    const visitMemberHandler = (mb_id: string) => {
		history.push(`/member/${mb_id}`);
		document.location.reload();
	};

    return (
        <div>
            <Modal
                className="infoModalContainer"
                open={open}
                onClose={handleCloseFollowings }
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
                            onClick={handleClose}
                        />
                    </div>
                    <div className="followers_container">
                        {memberFollowings.map((following: Following) => {
                            // console.log("follower", following);
                            const image_url = following?.follow_member_data?.mb_profile_image
                                ? `${serverApi}/${following.follow_member_data.mb_profile_image}`
                                : '/icons/user.png';
                            return(
                                <div className="follower_container" key={following?._id}>
                                    <div className="follower_info">
                                        <img src={image_url} alt="" className='follower_avatar' onClick={() => visitMemberHandler(following?.follow_id)}/>
                                        <span>@{following?.follow_member_data.mb_nick}</span>
                                    </div>
                                    {true &&(
                                        <button
                                            className="follow_btn un_follow_btn"
                                            onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                                        >
                                            Unfollow
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
