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
      <body className='hold-transition sidebar-mini layout-fixed'>
      <Router>
        
        <React.Fragment>
        <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId,
            tokenExpiration: this.state.tokenExpiration, 
            login: this.login, 
            logout: this.logout}}>
          <main className='wrapper'>
          <Switch>
            { this.state.token && <Redirect from='/' to='/main' exact/> }
            { this.state.token && <Redirect from='/auth' to='/main' exact/> }
            { !this.state.token && <Route path='/' component={LandingPage} exact/> }

            <Route path='/auth' component={AuthPage} exact/>
            { this.state.token && <Route path='/main' render={(props) => <MainPage {...props} userId={this.state.userId}/> }/>}
            {/* { !this.state.token && <Redirect from='/main' to='/' exact/> } */}
           
          </Switch>
          <Route path='/main' component={MainPage}/>
          <Route path='/main/dashboard' component={Dashboard}/>
          <Route path='/main/project' exact component={Project}/>
          <Route path='/main/bug' exact component={Bug}/>
          <Route path='/main/user' exact component={User}/>
          </main>
        </AuthContext.Provider>
        </React.Fragment>
      </Router>
      </body>
    );
}}

export default App;
