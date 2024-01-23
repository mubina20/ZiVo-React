import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css"
import { AuthenticationPage } from "./screens/AuthenticationPage/auth";
import { HomePage } from "./screens/HomePage/home";
import { MemberPage } from "./screens/MemberPage/member";
import { HelpPage } from "./screens/HelpPage/help";
import { Header } from "./components/header/header";

import { verifiedMemberData } from "./apiServices/verify";

function App() {
  return (
    <Router>
      <Switch>
        {/* HEADER */}
        {verifiedMemberData ? (
            <Header />
          ) : ( 
            null
        )}

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

// console.log(localStorage.getItem("member_data"));
// const memberService = new MemberApiService();
// 		memberService
// 			.getAllMembers()
// 			.then((data) => console.log("Data Length :: ", data.length))
// 			.catch((err) => console.log(err));

export default App;
