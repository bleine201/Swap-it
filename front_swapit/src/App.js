import {useEffect , useState } from "react";
import { Navbar } from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Chat from "./components/Pages/Chat";
import ResetPassword from "./components/Pages/ResetPassword";
import SecretKey from "./components/Pages/SecretKey";
import NewPassword from "./components/Pages/NewPassword";
import ProtectedRoute from "./components/hoc/ProtectedRoute"
import Home from "./components/Pages/Home";
import Index from "./components/Pages/Admin/Index";
import User from "./components/Pages/Admin/User/User";
import Article from "./components/Pages/Admin/Article/Article";
import Comment from "./components/Pages/Admin/Comment/Comment";
import Image from "./components/Pages/Admin/Image/Image";


function App() { 

  const [isLoggedIn,setIsLoggedIn] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token))
    
  }, []);
  
  return (
    <>

      <Router forceRefresh>
        <Navbar isLoggedIn={isLoggedIn} />

        <div className="pages">
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/chat">
              <Chat/>
            </ProtectedRoute>
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/home" component={Home} />
            <Route path="/newpassword" component={NewPassword} />
            <Route path="/secretkey" component={SecretKey} />
            <Route path="/admin" exact component={Index} />
            <Route path="/admin/article" component={Article} />
            <Route path="/admin/user" component={User} />
            <Route path="/admin/image" component={Image} />
            <Route path="/admin/comment" component={Comment} />

          </Switch>
        </div>
      </Router>
    </>
  )}

  export default App;