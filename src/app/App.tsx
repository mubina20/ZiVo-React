import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css"
import { AuthenticationPage } from "./screens/AuthenticationPage/auth";
import { MemberPage } from "./screens/MemberPage/member";
import { HelpPage } from "./screens/HelpPage/help";

import { verifiedMemberData } from "./apiServices/verify";
import { HomePage } from "./screens/HomePage";

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
        <Route path="/member">
          <MemberPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
