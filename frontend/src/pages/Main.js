import React , {Component} from 'react';
import './Main.css'
import Sidebar from '../components/Main/Sidebar/Sidebar'
import Navbar from '../components/Main/Navbar/Navbar'

class MainPage extends Component {
    render(){
        return(
            <>
                <Navbar user={this.props.user} logout={this.props.logout}/>
                <Sidebar user={this.props.user} {...this.props}/>
            </>
           
        )
    }
}

export default MainPage;