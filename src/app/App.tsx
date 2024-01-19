import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css"
import { LoginPage } from "./screens/LoginPage/login";
import { HomePage } from "./screens/HomePage/home";
import { MemberPage } from "./screens/MemberPage/member";
import { HelpPage } from "./screens/HelpPage/help";
import { Header } from "./components/header/header";

// import theme from "./components/header/theme/theme";

import "../css/header.css";
import MemberApiService from "./apiServices/memberApiService";

function App() {
  return (
    <Router>
      {/* <Link to={"/"}>Login</Link>
      <Link to={"/home"}>Home</Link>
      <Link to={"/member"}>Member</Link>
      <Link to={"/help"}>Help</Link> */}
      
      <Switch>
        <Route path="/" exact>
          <Header />
          <LoginPage />
        </Route>
        <Route path="/home">
          <Header />
          <HomePage />
        </Route>
        <Route path="/member">
          <Header />
          <MemberPage />
        </Route>
        <Route path="/help">
          <Header />
          <HelpPage />
        </Route>
      </Switch>
    </Router>
  );
}

console.log(localStorage.getItem("member_data"));

const memberService = new MemberApiService();
		memberService
			.getAllMembers()
			.then((data) => console.log("Data Length :: ", data.length))
			.catch((err) => console.log(err));

export default App;
