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

// src 
      // components
          // SignIn (folder)
            // styles.js
            // index.js
            // components
                //UserInput
                    //index.js
                    //styles.js
            //..
      // pages (every single route has a page)
      // hoc
      // routes
      // business
      // redux
      // helpers

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
            <Route path="/newpassword" component={NewPassword} />
            <Route path="/secretkey" component={SecretKey} />

          </Switch>
        </div>
      </Router>
    </>
  )}

  export default App;