import React from 'react'
import "../../../css/mobileFooter.css"
import { Link } from 'react-router-dom'
import { verifiedMemberData } from '../../apiServices/verify'
import { serverApi } from '../../../lib/config'

export function MobileFooter() {
  return (
    <div className='footer'>
        <div className='footer-navigation'>
            <Link to={"/"}><img src="/icons/left-sidebar-icons/home.png" alt="home" width={"25px"}/></Link>
            <Link to={"/short-contents"}><img src="/icons/left-sidebar-icons/shorts.png" alt="home" width={"25px"}/></Link>
            <Link to={"/my-page"}>
              <img 
                src={
                  verifiedMemberData?.mb_profile_image 
                  ? `${serverApi}/${verifiedMemberData.mb_profile_image}`  
                  : "/icons/user.png"
                }
                alt="home" 
                width={"40px"}
                height={"40px"}
                style={{borderRadius: "50%"}}
              />
            </Link>
            <Link to={"/members"}><img src="/icons/left-sidebar-icons/members.png" alt="home" width={"25px"}/></Link>
            <Link to={"/life"}><img src="/icons/left-sidebar-icons/life.png" alt="home" width={"25px"}/></Link>
        </div>
    </div>
  )
}
