import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css";
import { MembersPage } from "./screens/MemberPage/members";
import { verifiedMemberData } from "./apiServices/verify";
import { HomePage } from "./screens/HomePage";
import { VideoContents } from "./screens/VideoContentsPage/videoContent";
import { MyPage } from "./screens/MemberPage/myPage";
import { ChatPage } from "./screens/ChatPage/chatPage";
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
import { MobileMembersPage } from "./screens/MemberPage/mobileMembersPage";
import { UplaodStory } from "./screens/UploadPage/uploadStory";
import { ChosenStory } from "./screens/postPage/chosenStory";
import { Header } from "./components/header/header";
import { MobileHeader } from "./components/header/mobileHeader";
import { MobileFooter } from "./components/footer/mobileFooter";
import { LeftSidebar } from "./components/sidebars/left_sidebar";

function App() {
  /** INITIALIZATIONS **/
  const [open, setOpen] = React.useState(false);
  const { isDesktop, isMobile, isTablet } = useDeviceSize();

  /** HANDLERS **/
  const handleOpenModal = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  
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
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
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
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileMyPage 
                open={open}
                handleOpenModal={handleOpenModal}
                handleModalClose={handleModalClose}
              />
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
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileOtherPage 
                open={open}
                handleOpenModal={handleOpenModal}
                handleModalClose={handleModalClose}
              />
            </div>
          )}
        </Route>

        <Route path="/video-contents">
          {isDesktop && (
            <div>
              <VideoContents />
            </div>
          )}
          {isTablet && (
            <div>
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileEditProfile />
            </div>
          )}
        </Route>

        <Route path="/edit">
          {isDesktop && (
            <div>
              <EditProfile />
            </div>
          )}
          {isTablet && (
            <div>
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
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
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileHeader />
              <MobileFooter />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
        </Route>

        <Route path="/upload-story">
          {isDesktop && (
            <div>
              <UplaodStory />
            </div>
          )}
          {isTablet && (
            <div>
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileHeader />
              <MobileFooter />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
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
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileChosenPost />
            </div>
          )}
        </Route>

        <Route exact path="/chat" >
          {isDesktop && (
            <div>
              <ChatPage />
            </div>
          )}
          {isTablet && (
            <div>
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileHeader />
              <MobileFooter />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
        </Route>

        <Route path="/chat/:chatId">
          {isDesktop && (
            <div>
              <ChatPage />
            </div>
          )}
          {isTablet && (
            <div>
              <Header />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileHeader />
              <MobileFooter />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
        </Route>

        <Route path="/stories/:mb_nick/:storyType/:storyId">
          <ChosenStory />
        </Route>

        <Route path="/life">
          {isDesktop && (
            <div>
              <Header />
              <LeftSidebar />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isTablet && (
            <div>
            <Header />
            <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
          </div>
          )}
          {isMobile && (
            <div>
            <MobileHeader />
            <MobileFooter />
            <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
          </div>
          )}
        </Route>
        
        <Route path="/settings">
          {isDesktop && (
            <div>
              <Header />
              <LeftSidebar />
              <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
            </div>
          )}
          {isTablet && (
            <div>
            <Header />
            <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
          </div>
          )}
          {isMobile && (
            <div>
            <MobileHeader />
            <MobileFooter />
            <div className="progress_container"> <div className="process"> Now the life page is in the process of developing</div></div>
          </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
