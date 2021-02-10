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
import Home from "./components/Pages/Home";
import Index from "./components/Pages/Admin/Index";
import User from "./components/Pages/Admin/User/User";
import UserId from "./components/Pages/Admin/User/UserId";
import UserEdit from "./components/Pages/Admin/User/UserEdit";
import Article from "./components/Pages/Admin/Article/Article";
import ArticleId from "./components/Pages/Admin/Article/ArticleId";
import ArticleEdit from "./components/Pages/Admin/Article/ArticleEdit";
import Comment from "./components/Pages/Admin/Comment/Comment";
import CommentId from "./components/Pages/Admin/Comment/CommentId";
import CommentEdit from "./components/Pages/Admin/Comment/CommentEdit";
import Image from "./components/Pages/Admin/Image/Image";
import HomeProducts from "./containers/HomeProducts";
import ImageId from "./components/Pages/Admin/Image/ImageId";
import ImageEdit from "./components/Pages/Admin/Image/ImageEdit";
import AddArticle from "./components/Pages/CRUD/AddArticle";
import MyArticles from "./components/Pages/CRUD/MyArticles";
import MyArticleId from "./components/Pages/CRUD/MyArticleId";
import MyArticleEdit from "./components/Pages/CRUD/MyArticleEdit";




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
            <Route path="/" exact component={HomeProducts} />
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
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin">
              <Index />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/article">
              <Article />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/article/:id">
              <ArticleId />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/article/edit/:id">
              <ArticleEdit />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/user">
              <User />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/user/:id">
              <UserId />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/user/edit/:id">
              <UserEdit />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/image">
              <Image />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/image/:id">
              <ImageId />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/image/edit/:id">
              <ImageEdit />
            </ProtectedRoute>
            <ProtectedRoute exact isLoggedIn={isLoggedIn} path="/admin/comment">
              <Comment />
            </ProtectedRoute>
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
            
            {/* <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/comment/:id">
              <CommentId />
            </ProtectedRoute>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/admin/comment/edit/:id">
              <CommentEdit />
            </ProtectedRoute> */}
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App;