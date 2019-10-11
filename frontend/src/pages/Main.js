import React , {Component} from 'react';
import { BrowserRouter as Link,Router, Redirect, Route, Switch} from 'react-router-dom';
import './Main.css'
import Sidebar from '../components/Main/Sidebar/Sidebar'
import Navbar from '../components/Main/Navbar/Navbar'
import Dashboard from '../components/Main/Dashboard/Dashboard'
import MainFooter from '../components/Main/Footer/MainFooter'


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
                
                <Dashboard/>
            </>
           
        )
    }
}

export default MainPage;