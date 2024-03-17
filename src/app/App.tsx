import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css"
import { AuthenticationPage } from "./screens/AuthenticationPage/auth";
import { MembersPage } from "./screens/MemberPage/members";
import { HelpPage } from "./screens/HelpPage/help";

import { verifiedMemberData } from "./apiServices/verify";
import { HomePage } from "./screens/HomePage";
import { ShortContents } from "./screens/ShortContentsPage/shortContent";
import { MyPage } from "./screens/MemberPage/myPage";
import { ChatPage } from "./screens/ChatPage/chat";
import { OtherPage } from "./screens/MemberPage/otherPage";
import { UploadPostPage } from "./screens/UploadPage/uploadPost";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* {verifiedMemberData ? ( */}
            <HomePage />
          {/* ) : (  */}
            {/* <AuthenticationPage />
          )} */}
        </Route>
        <Route path="/members">
          <MembersPage />
        </Route>
        <Route path="/my-page">
          <MyPage />
        </Route>
        <Route path="/member/:mb_id">
          <OtherPage />
        </Route>
        <Route path="/short-contents">
          <ShortContents />
        </Route>
        <Route path="/upload-post">
          <UploadPostPage />
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
