import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import './Animate.css'


import LandingPage from './pages/LandingPage';
import MainPage from './pages/Main'
import BookingsPage from './pages/Bookings';
import ProjectsPage from './pages/Projects';

import AuthContext from './context/auth-context';

import Dashboard from './components/Main/Dashboard/Dashboard'
import Project from './components/Main/Project/Project'
import Bug from './components/Main/Bug/Bug'
import User from './components/Main/User/User'
import Sidebar from './components/Main/Sidebar/Sidebar';
import Navbar from './components/Main/Navbar/Navbar';
import SplashScreen from './components/SplashScreen/SplashScreen'
import NewLandingPage from './pages/NewLandingPage';



class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      token: null,
      userId: null,
      tokenExpiration: null,
      splashScreen: true
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  componentDidMount(){
    setTimeout(() => this.setState({splashScreen: false}), 4000)
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
    if(this.state.splashScreen){
      return(
        <SplashScreen/>
      )
    } else {
      return (
        <div className='wrapper'>
      <Router>
        {this.state.token && 
        <div className='wrapper'>
          <Navbar/>
          <Route path='/' render={(props) => <Sidebar {...props}/>}/>
        </div>}
        <React.Fragment>
        <AuthContext.Provider 
          value={{
            token: this.state.token, 
            userId: this.state.userId,
            tokenExpiration: this.state.tokenExpiration, 
            login: this.login, 
            logout: this.logout}}>
          
          <Switch>


            { this.state.token && <Route path='/' exact render={(props)=> 
              <div className='wrapper'>
                <Dashboard/> 
              </div>
              } />}

            { !this.state.token && <Route path='/' component={NewLandingPage} exact/> }

          </Switch>
           
          
        </AuthContext.Provider>
        {this.state.token && 
              <>            
              <Route path='/project' component={Project}/>
              <Route path='/bug'  component={Bug}/>
              <Route path='/user' component={User}/>
              
              </>
            }
        </React.Fragment>
       
       
          
      </Router>
      </div>

    );
    }
   
}}

export default App;
