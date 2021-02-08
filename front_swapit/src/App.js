import { useEffect, useState } from "react";
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
import HomeProducts from "./containers/HomeProducts";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            <Route path="/" component={HomeProducts} />
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />

            <ProtectedRoute isLoggedIn={isLoggedIn} path="/chat">
              <Chat />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/resetpassword">
              <ResetPassword />
            </ProtectedRoute>
            <Route path="/home" component={Home} />
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/newpassword">
              <NewPassword />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/secretkey">
              <SecretKey />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin">
              <Index />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/article">
              <Article />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/user">
              <User />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/image">
              <Image />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/comment">
              <Comment />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App;