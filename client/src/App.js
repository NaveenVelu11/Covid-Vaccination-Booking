import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import Signup from './components/Signup';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Booked_userdetails from './components/Booked_userdetails';
import Book_slot from './components/Book_slot';
import Logout from './components/Logout';
import Nevigation from './components/Nevigation';
import Edit_profile from './components/Edit_profile'
import My_profile from './components/My_profile'
function App() {
  const isLoggedIn = localStorage.getItem("user_id");
  
  if (isLoggedIn == null) {
    return (
      <>    
     
      <Nevigation />
        <Router>
          <Switch>         
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />            
            <Route exact path='/signin' component={Signup} />
            
            <Route exact path='/book_slot' component={Login} />            
            <Route exact path='/dashboard' component={Login} />
            <Route exact path='/booked_userdetails' component={Login} />
            <Route exact path='/logout' component={Login} />
          </Switch>
        </Router>
      </>
    )
  }
  else {
    return (
      <>
       
  
        <Nevigation />
        <Router>
          <Switch>
            <Route exact path='/book_slot' component={Book_slot} />            
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/edit_profile' component={Edit_profile} />
            <Route exact path='/my_profile' component={My_profile} />
            <Route exact path='/booked_userdetails' component={Booked_userdetails} />
            <Route exact path='/logout' component={Logout} />
          </Switch>
        </Router>
       
      </>
    );
  }
}
export default App;
