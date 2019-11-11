import React, {Component} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import './Animate.css';

import MainPage from './pages/Main';
import AuthContext from './context/auth-context';

import Dashboard from './components/Main/Dashboard/Dashboard';
import Project from './pages/Project/Project';
import ProjectCreate from './pages/Project/ProjectCreate';
import ProjectEdit from './pages/Project/ProjectEdit';
import Bug from './pages/Bug/Bug';
import BugCreate from './pages/Bug/BugCreate';
import BugEdit from './pages/Bug/BugEdit'
import User from './pages/User/User';
import UserCreate from './pages/User/UserCreate';
import UserEdit from './pages/User/UserEdit';
import SplashScreen from './components/SplashScreen/SplashScreen'
import NewLandingPage from './pages/NewLandingPage';



class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      user: {},
      token: null,
      userId: null,
      tokenExpiration: null,
      splashScreen: true
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }
  
  componentDidMount(){
    setTimeout(() => this.setState({splashScreen: false}), 4000)
  }

  login = (token, userId, tokenExpiration) =>{
    this.setState({
      token,
      userId,
      tokenExpiration
    });
    this.fetchUser(userId);
  }

  fetchUser = (id) =>{
    const requestBody = {
        query: `
            query {
                singleUser(userId: "${id}"){
                    firstName
                    lastName
                    email
                    address
                    credential
                }
            }
        `
    }

    fetch('/graphql',{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status !== 200 && res.status !== 201){
            throw new Error('Failed')
        }
        return res.json()
    }).then(resData => {
        const user = resData.data.singleUser
        this.setState({
            user: user
        })

    }).catch(err => console.log(err))
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
        {!this.state.token && <Redirect to='/'/>}
        {this.state.token && 
        <div className='wrapper'>
          {/* <Navbar/> */}
          <Route path='/' render={(props) => <MainPage {...props} user={this.state.user} logout={this.logout}/>}/>
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
                <Dashboard userId={this.state.userId}/> 
              </div>
              } />}

            { !this.state.token && <Route path='/' component={NewLandingPage} exact/> }

          </Switch>
           
          
        
        {this.state.token && 
              <>            
              <Route path='/project' exact render={(props) => <Project {...props} userId={this.state.userId}/>}/>
              <Route path='/project/create' exact render={(props) =><ProjectCreate {...props} token={this.state.token} userId={this.state.userId}/> }/>
              <Route path='/project/:id/edit' exact render={(props) => <ProjectEdit {...props}/>}/>
              <Route path='/issue' exact  component={Bug}/>
              <Route path='/issue/create' exact render={(props) =><BugCreate {...props} token={this.state.token} userId={this.state.userId}/> }/>
              <Route path='/bug/:id/edit' exact render={(props) => <BugEdit {...props}/>}/>
              <Route path='/user' exact render={(props) => <User user={this.state.user} {...props}/>}/>
              <Route path='/user/create' exact render={(props) => <UserCreate {...props}/>}/>
              <Route path='/user/:id/edit' exact render={(props) => <UserEdit {...props}/>}/>

              
              </>
            }
            </AuthContext.Provider>
        </React.Fragment>
       
       
          
      </Router>
      </div>

    );
    }
   
}}

export default App;
