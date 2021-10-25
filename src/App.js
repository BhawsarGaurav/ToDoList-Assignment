import "./App.css";
import Login from "./component/Login";
import NavBar from "./component/NavBar";
import ChangePass from "./component/ChangePass";
import UserDashboard from "./component/UserDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./component/Registration";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/navbar" component={NavBar}></Route>
          {/* <Route path="/changePass" component={ChangePass}></Route> */}
          <Route path="/userDashboard" component={UserDashboard}></Route>
          <Route path="/Registration" component={Registration}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
