import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import AuthPage from './pages/Auth';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/Main'
import BookingsPage from './pages/Bookings';
import ProjectsPage from './pages/Projects';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Main/Dashboard/Dashboard'
import Project from './components/Main/Project/Project'
import Bug from './components/Main/Bug/Bug'
import User from './components/Main/User/User'


class App extends Component {
  state = {
    token: null,
    userId: null,
    tokenExpiration: null,
  }

  login = (token, userId, tokenExpiration) =>{
    this.setState({
      token,
      userId,
      tokenExpiration
    })
  }
  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  }
  render(){
    
    return (

        <div className='wrapper'>
      <Router>
        
        <React.Fragment>
        <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId,
            tokenExpiration: this.state.tokenExpiration, 
            login: this.login, 
            logout: this.logout}}>
          
          <Switch>


            { this.state.token && <Route path='/' component={MainPage}/>}
            { !this.state.token && <Route path='/' component={LandingPage} exact/> }
            <Route path='/auth' component={AuthPage} exact/>
          </Switch>
           
          
        </AuthContext.Provider>
        {this.state.token && 
              <div>
              
              <Route path='/dashboard' exact component={Dashboard}/>
              <Route path='/project' exact component={Project}/>
              <Route path='/bug' exact component={Bug}/>
              <Route path='/user' exact component={User}/>
              </div>
            }
        </React.Fragment>
       
          
      </Router>
      </div>

    );
}}

export default App;
