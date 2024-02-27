import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css"
import { AuthenticationPage } from "./screens/AuthenticationPage/auth";
import { MembersPage } from "./screens/MemberPage/members";
import { HelpPage } from "./screens/HelpPage/help";

import { verifiedMemberData } from "./apiServices/verify";
import { HomePage } from "./screens/HomePage";
import { ShortContents } from "./screens/ShortContentsPage/shortContent";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {verifiedMemberData ? (
            <HomePage />
          ) : ( 
            <AuthenticationPage />
          )}
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/members">
          <MembersPage />
        </Route>
        <Route path="/short-contents">
          <ShortContents />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
