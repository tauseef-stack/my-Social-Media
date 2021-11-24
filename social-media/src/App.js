import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Profile } from "./Pages/Profile/Profile";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import { Messenger } from "./Pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  // console.log("from App",user)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Register />}
          </Route>
          <Route path="/login">{user ? <Navigate to="/" /> : <Login />} </Route>
          <Route path="/register">
            {user ? <Navigate to="/" /> : <Register />}{" "}
          </Route>
          <Route path="/messenger">
            {!user ? <Navigate to="/" /> : <Messenger />}{" "}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
