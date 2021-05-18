import { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Habits from "./components/Habits";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./components/styles/reset.css";
import "./components/styles/styles.css";
import TodayHabits from "./components/TodayHabits";

function App() {
    const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
        <LoginPage token={token} setToken={setToken} />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/habits" exact>
          <Habits />
        </Route>
        <Route path="/today" exact>
          <TodayHabits />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
