import React , {Component} from 'react';
import { BrowserRouter as Link,Router, Redirect, Route, Switch} from 'react-router-dom';
import './Main.css'
import Sidebar from '../components/Main/Sidebar/Sidebar'
import Navbar from '../components/Main/Navbar/Navbar'
import Dashboard from '../components/Main/Dashboard/Dashboard'
import MainFooter from '../components/Main/Footer/MainFooter'
import Project from '../components/Main/Project/Project'

class MainPage extends Component {
    constructor(props){
        super(props)
        this.state={
            userId: this.props.userId
        }
    }
    render(){
        return(
        
            <>
                <Navbar/>
                <Sidebar/>

                <Route path='/dashboard' exact component={Dashboard}/>
              <Route path='/project' exact component={Project}/>
              {/* <Route path='/bug' exact component={Bug}/>
              <Route path='/user' exact component={User}/> */}

            </>
           
        )
    }
}

export default MainPage;