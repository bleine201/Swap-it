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
import ArticleEdit from "./components/Pages/Admin/Article/ArticleEdit";
import UserId from "./components/Pages/Admin/User/UserId";
import UserEdit from "./components/Pages/Admin/User/UserEdit";
import CommentEdit from "./components/Pages/Admin/Comment/CommentEdit";
import ArticleId from "./components/Pages/Admin/Article/ArticleId";
import Image from "./components/Pages/Admin/Image/Image";
import HomeProducts from "./containers/HomeProducts";
import ImageId from "./components/Pages/Admin/Image/ImageId";
import ImageEdit from "./components/Pages/Admin/Image/ImageEdit";
import AddArticle from "./components/Pages/CRUD/AddArticle";
import MyArticles from "./components/Pages/CRUD/MyArticles";
import MyArticleId from "./components/Pages/CRUD/MyArticleId";
import MyArticleEdit from "./components/Pages/CRUD/MyArticleEdit";
import Profile from "./components/Pages/Profile/Profile";
import UpdateProfile from "./components/Pages/Profile/UpdateProfile";
import 'bootstrap/dist/css/bootstrap.min.css';




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

          <ProtectedRoute isLoggedIn={isLoggedIn}
            path="/chat">
            <Chat />
          </ProtectedRoute>


          {/* ADS CRUD */}
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/addarticle">
            <AddArticle />
          </ProtectedRoute>
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/myarticles">
            <MyArticles />
          </ProtectedRoute>
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/myarticles/:id">
            <MyArticleId />
          </ProtectedRoute>
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/myarticles/edit/:id">
            <MyArticleEdit />
          </ProtectedRoute>
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/myprofile">
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/profileupdate">
            <UpdateProfile />
          </ProtectedRoute>
            

          {/* ADMIN */}
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin">
            <ProtectedRouteAdmin isAdmin={isAdmin}>
                <Index />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/article">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <Article />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/article/:id">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <ArticleId />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/article/edit/:id">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <ArticleEdit />
              </ ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/user">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <User />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/user/:id">
            <ProtectedRouteAdmin isAdmin={isAdmin}>
              <UserId />
            </ProtectedRouteAdmin>  
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/user/edit/:id">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <UserEdit />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/image">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <Image />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/image/:id">
            <ProtectedRouteAdmin isAdmin={isAdmin}>
              <ImageId />
            </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/image/edit/:id">
            <ProtectedRouteAdmin isAdmin={isAdmin}>
              <ImageEdit />
            </ProtectedRouteAdmin>
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/comment/edit/:id">
              <ProtectedRouteAdmin isAdmin={isAdmin}>
                <CommentEdit />
              </ProtectedRouteAdmin>
            </ProtectedRoute>
           
            {/* <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/comment/:id">
              <CommentId />
            </ProtectedRoute> 
             <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/comment">
              <Comment />
            </ProtectedRoute> */}
        </Switch>
      </div>
    </Router>
  </>)
}

export default App;