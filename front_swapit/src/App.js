import { Navbar } from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Chat from "./components/Pages/Chat";
import ResetPassword from "./components/Pages/ResetPassword";
import SecretKey from "./components/Pages/SecretKey";
import NewPassword from "./components/Pages/NewPassword";
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
import ImageId from "./components/Pages/Admin/Image/ImageId";
import ImageEdit from "./components/Pages/Admin/Image/ImageEdit";




function App() {
  return (
    <>

      <Router>
        <Navbar />

        <div className="pages">
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/chat" component={Chat} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/newpassword" component={NewPassword} />
            <Route path="/secretkey" component={SecretKey} />
            <Route path="/admin" exact component={Index} />
            <Route path="/admin/article" exact component={Article} />
            <Route path="/admin/article/:id" exact component={ArticleId} />
            <Route path="/admin/article/edit/:id" component={ArticleEdit} />
            <Route path="/admin/user" exact component={User} />
            <Route path="/admin/user/:id" exact component={UserId} />
            <Route path="/admin/user/edit/:id" component={UserEdit} />
            <Route path="/admin/image" exact component={Image} />
            <Route path="/admin/image/:id" exact component={ImageId} />
            <Route path="/admin/image/edit/:id" component={ImageEdit} />
            <Route path="/admin/comment" exact component={Comment} />
            <Route path="/admin/comment/:id" exact component={CommentId} />
            <Route path="/admin/comment/edit/:id" component={CommentEdit} />


          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
