import { Navbar } from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login} from "./components/Pages/Login";
import { Register } from "./components/Pages/Register";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Chat from "./Chat";


function App() {
  return (
    <>

      <Router>
        <Navbar />

        <div className="pages">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          
          </Switch>
        </div>
      </Router>






      <SignUp/>
      <SignIn/>
      <Chat/>
    </>
  );
}

export default App;
