import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Chat from "./components/Pages/Chat";
import ResetPassword from "./components/Pages/ResetPassword";
import NewPassword from "./components/Pages/NewPassword";
import ProtectedRoute from "./components/hoc/ProtectedRoute"
import ProtectedRouteAdmin from "./components/hoc/ProtectedRouteAdmin"
import Index from "./components/Pages/Admin/Index";
import User from "./components/Pages/Admin/User/User";
import Article from "./components/Pages/Admin/Article/Article";
import Comment from "./components/Pages/Admin/Comment/Comment";
import Image from "./components/Pages/Admin/Image/Image";
import HomeProducts from "./containers/HomeProducts";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token))
    var admin = localStorage.getItem('is_admin');
    setIsAdmin(admin)

  }, []);

  return (<>
    <Router forceRefresh>
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="pages">
        <Switch>
          <Route path="/" exact
            component={HomeProducts} />
          <Route path="/login"
            component={SignIn} />
          <Route path="/register"
            component={SignUp} />
          <Route path="/resetpassword"
            component={ResetPassword}/>
          <Route path="/newpassword"
            component={NewPassword}/>
          <Route path="/"
              component={HomeProducts} />

          <ProtectedRoute isLoggedIn={isLoggedIn}
            path="/chat">
            <Chat />
          </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn}
              path="/newpassword">
              <NewPassword />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn}
              path="/admin">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <Index />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn}
              path="/admin/article">
              <Article />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn}
              path="/admin/user">
              <User />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn}
              path="/admin/image">
              <Image />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn}
              path="/admin/comment">
              <Comment />
            </ProtectedRoute>
        </Switch>
      </div>
    </Router>
  </>)
}

export default App;
