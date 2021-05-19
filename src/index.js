import { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Habits from "./components/Habits";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./components/styles/reset.css";
import "./components/styles/styles.css";
import TodayHabits from "./components/TodayHabits";
import UserContext from "./contexts/UserContext";


function App() {
  const [user, setUser] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  const [selected, setSelected] = useState(false);

  return (    
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/habits" exact>
            <Habits selected={selected} setSelected={setSelected} selectedWeekDays={selectedWeekDays} setSelectedWeekDays={setSelectedWeekDays}/>
          </Route>
          <Route path="/today" exact>
            <TodayHabits />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
