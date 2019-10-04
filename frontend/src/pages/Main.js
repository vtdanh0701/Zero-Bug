import React , {Component} from 'react';
import { BrowserRouter as Link,Router, Redirect, Route, Switch} from 'react-router-dom';
import './Main.css'
import Sidebar from '../components/Main/Sidebar/Sidebar'

import Navbar from '../components/Main/Navbar/Navbar'

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
            </>
        )
    }
}

export default MainPage;