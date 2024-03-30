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

function App() {
  /** INITIALIZATIONS **/
  const [open, setOpen] = React.useState(false);

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
          <MembersPage />
        </Route>
        <Route path="/my-page">
          <MyPage 
            open={open}
            handleOpenModal={handleOpenModal}
            handleModalClose={handleModalClose}
            handleOpenFollowersModal={handleOpenModal}
            handleCloseFollowersModal={handleModalClose}
            handleOpenFollowingsModal={handleOpenModal}
            handleCloseFollowingsModal={handleModalClose}
          />
        </Route>
        <Route path="/member/:memberId">
          <OtherPage 
            open={open}
            handleOpenModal={handleOpenModal}
            handleModalClose={handleModalClose}
          />
        </Route>
        <Route path="/short-contents">
          <ShortContents />
        </Route>
        <Route path="/edit">
          <EditProfile />
        </Route>
        <Route path="/upload-post">
          <UploadPostPage />
        </Route>
        <Route path="/post/:postId">
          <ChosenPost />
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
