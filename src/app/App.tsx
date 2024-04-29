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
            <HomePage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
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
              <div className="progress_container"> <div className="process"> Now the members page is in the process of developing</div></div>
            </div>
          )}
          {isMobile && (
            <div>
              <MobileMembersPage />
            </div>
          )}
        </Route>

        {/* <Route path="/my-page">
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
              <div className="progress_container"> <div className="process"> Now the my page is in the process of developing</div></div>
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
        </Route> */}

        <Route path="/my-page">
          {verifiedMemberData ? (
            isDesktop ? (
              <MyPage 
                open={open}
                handleOpenModal={handleOpenModal}
                handleModalClose={handleModalClose}
              />
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the my page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <MobileMyPage 
                open={open}
                handleOpenModal={handleOpenModal}
                handleModalClose={handleModalClose}
              />
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/member/:memberId">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <OtherPage 
                  open={open}
                  handleOpenModal={handleOpenModal}
                  handleModalClose={handleModalClose}
                />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the chosen member page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileOtherPage 
                  open={open}
                  handleOpenModal={handleOpenModal}
                  handleModalClose={handleModalClose}
                />
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/video-contents">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <VideoContents />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the video-contents page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the video-contents page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/edit">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <EditProfile />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the edit page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the edit page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/upload-post">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <UploadPostPage />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the upload-post page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the upload-post page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/upload-story">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <UplaodStory />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the upload-story page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the upload-story page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/post/:postType/:postId">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <ChosenPost />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the chosen post page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileChosenPost />
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route exact path="/chat" >
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <ChatPage />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the chat page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the chat page is in the process of developing</div></div>
            </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/chat/:chatId">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <ChatPage />
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the life chat is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the life chat is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/stories/:mb_nick/:storyType/:storyId">
          {verifiedMemberData ? (
            isDesktop ? (
              <ChosenStory />
            ) : isTablet ? (
              <ChosenStory />
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the chosen story page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/live">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <Header />
                <LeftSidebar />
                <div className="progress_container"> <div className="process"> Now the live page is in the process of developing</div></div>
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the live page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the live page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>

        <Route path="/settings">
          {verifiedMemberData ? (
            isDesktop ? (
              <div>
                <Header />
                <LeftSidebar />
                <div className="progress_container"> <div className="process"> Now the settings page is in the process of developing</div></div>
              </div>
            ) : isTablet ? (
              <div>
                <Header />
                <div className="progress_container"> <div className="process"> Now the settings page is in the process of developing</div></div>
              </div>
            ) : isMobile ? (
              <div>
                <MobileHeader />
                <MobileFooter />
                <div className="progress_container"> <div className="process"> Now the settings page is in the process of developing</div></div>
              </div>
            ) : null
          ) : (
            <AuthPage 
              open={open}
              handleOpenModal={handleOpenModal}
              handleModalClose={handleModalClose}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
