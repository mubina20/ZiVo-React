import { Box, Typography } from "@mui/material";
import "../../../css/sidebar.css";
import { useEffect, useState } from "react";
import { Dispatch, createSelector } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Following, FollowSearchObj } from "../../../types/follow";
import { verifiedMemberData } from "../../apiServices/verify";
import FollowApiService from "../../apiServices/followApiService";
import { setMemberFollowings } from "../../screens/MemberPage/slice";
import { retrieveMemberFollowings } from "../../screens/MemberPage/selector";
import { serverApi } from "../../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
    setMemberFollowings: (data: Following[]) => dispatch(setMemberFollowings(data))
});

const memberFollowingsRetriever = createSelector(retrieveMemberFollowings, (memberFollowings) => ({
	memberFollowings,
}));

export function RightSidebar() {
    /** INITIALIZATIONS **/
    const { setMemberFollowings } = actionDispatch(useDispatch());
	const { memberFollowings } = useSelector(memberFollowingsRetriever);
	const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>({ mb_id: verifiedMemberData?._id });
    const history = useHistory();

    /** HANDLERS **/
    useEffect(() => {
		const followService = new FollowApiService();
		followService
			.getMemberFollowings(followingsSearchObj)
			.then((data) => setMemberFollowings(data))
			.catch((err) => console.log(err));
	}, [followingsSearchObj]);
    // console.log("member Followings :: ", memberFollowings);

    const handleVisitFollowingPage = (mb_id: string) => {
		history.push(`/member/${mb_id}`);
		document.location.reload();
	};

    return(
        <div className="right_container">
            <h2 style={{margin: "20px 0"}}>Followings</h2>

            {memberFollowings.length > 0 ? (
                memberFollowings.map((following: Following) => {
                    const image_url = following?.follow_member_data?.mb_profile_image
                        ? `${serverApi}/${following?.follow_member_data?.mb_profile_image}`
                        : '/icons/user.png';

                    return (
                        <div key={following.follow_id}>
                            <div className="followings_container">
                                <img
                                    src={image_url}
                                    alt=""
                                    className="user_icon"
                                    onClick={() => handleVisitFollowingPage(following?.follow_id)}
                                />
                                <div className="following_info">
                                    <div
                                        className="nickName"
                                        style={{ fontSize: "17px", cursor: "pointer" }}
                                        onClick={() => handleVisitFollowingPage(following?.follow_id)}
                                    >
                                        @{following?.follow_member_data?.mb_nick}
                                    </div>
                                    <Typography style={{ opacity: "0.56" }}>{following?.follow_member_data?.mb_name}</Typography>
                                </div>
                            </div>
                            <Box className='following-line' />
                        </div>
                    )
                })
            ) : (
                <div>No followings yet</div>
            )}
        </div>
    )
};