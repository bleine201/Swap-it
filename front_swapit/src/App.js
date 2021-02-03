import { Navbar } from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Chat from "./components/Pages/Chat";
import ResetPassword from "./components/Pages/ResetPassword";
import SecretKey from "./components/Pages/SecretKey";
import NewPassword from "./components/Pages/NewPassword";


function App() {
  return (
    <>

      <Router forceRefresh>
        <Navbar />

        <div className="pages">
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/home" component={Chat} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/newpassword" component={NewPassword} />
            <Route path="/secretkey" component={SecretKey} />

          </Switch>
        </div>
      </Router>
    </>
  )}

  export default App;