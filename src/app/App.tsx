import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css";
import { MembersPage } from "./screens/MemberPage/members";
import { HelpPage } from "./screens/HelpPage/help";

import { verifiedMemberData } from "./apiServices/verify";
import { HomePage } from "./screens/HomePage";
import { ShortContents } from "./screens/ShortContentsPage/shortContent";
import { MyPage } from "./screens/MemberPage/myPage";
import { ChatPage } from "./screens/ChatPage/chat";
import { OtherPage } from "./screens/MemberPage/otherPage";
import { UploadPostPage } from "./screens/UploadPage/uploadPost";
import React, { useState } from "react";
import { EditProfile } from "./screens/MemberPage/editProfile";
import { AuthPage } from "./screens/AuthenticationPage";
import { ChosenPost } from "./screens/postPage/chosenPost";
import useDeviceSize from "./hooks";
import { MobileEditProfile } from "./screens/MemberPage/mobileEditProfile";
import { MobileMyPage } from "./screens/MemberPage/mobileMyPage";
import { MobileOtherPage } from "./screens/MemberPage/mobileOtherPage";
import { MobileChosenPost } from "./screens/postPage/mobileChosenPost";
import { MobileUploadPost } from "./screens/UploadPage/mobileUploadPost";
import { MobileMembersPage } from "./screens/MemberPage/mobileMembersPage";

function App() {
  /** INITIALIZATIONS **/
  const [open, setOpen] = React.useState(false);
  const { isDesktop, isMobile, isTablet } = useDeviceSize();

  /** HANDLERS **/
  const handleOpenModal = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  // const handleOpenFollowersModal = () => setOpen(true);
  // const handleCloseFollowersModal = () => setOpen(false);

  // const handleOpenFollowingsModal = () => setOpen(true);
  // const handleCloseFollowingsModal = () => setOpen(false);

  // LogOut Request
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {verifiedMemberData ? (
            <HomePage />
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>
        <Route path="/members">
          {isDesktop && (
            <div>
              <MembersPage />
            </div>
          )}
          {isTablet && (
            <div>
              <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileMembersPage />
            </div>
          )}
          
        </Route>
        <Route path="/my-page">
          {isDesktop && (
            <div>
              <MyPage 
                open={open}
                handleOpenModal={handleOpenModal}
                handleModalClose={handleModalClose}
              />
            </div>
          )}
          {isTablet && (
            <div>
              <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileMyPage />
            </div>
          )}
        </Route>
        <Route path="/member/:memberId">
          {isDesktop && (
            <div>
              <OtherPage 
                open={open}
                handleOpenModal={handleOpenModal}
                handleModalClose={handleModalClose}
              />
            </div>
          )}
          {isTablet && (
            <div>
              <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileOtherPage />
            </div>
          )}
        </Route>
        <Route path="/short-contents">
          <ShortContents />
        </Route>
        <Route path="/edit">
          {isDesktop && (
            <div>
              <EditProfile />
            </div>
          )}
          {isTablet && (
            <div>
              <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileEditProfile />
            </div>
          )}
        </Route>
        <Route path="/upload-post">
          {isDesktop && (
            <div>
              <UploadPostPage />
            </div>
          )}
          {isTablet && (
            <div>
              <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileUploadPost />
            </div>
          )}
          
        </Route>
        <Route path="/post/:postType/:postId">
          {isDesktop && (
            <div>
              <ChosenPost />
            </div>
          )}
          {isTablet && (
            <div>
              <div style={{color: "white", fontSize: "5rem"}}>isTablet</div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileChosenPost />
            </div>
          )}
        </Route>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
