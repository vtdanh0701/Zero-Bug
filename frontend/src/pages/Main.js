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
            userId: this.props.userId,
            user: {},
        }
    }
    componentDidMount(){
        this.fetchUser()
    }

    fetchUser = () =>{
        const userId = this.state.userId
        const requestBody = {
            query: `
                query {
                    singleUser(userId: "${userId}"){
                        firstName
                        lastName
                        email
                        address
                        credential
                    }
                }
            `
        }

        fetch('http://localhost:8000/graphql',{
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
                user
            })

        }).catch(err => console.log(err))
    }
    render(){
        return(
            <>
                <Navbar user={this.state.user} logout={this.props.logout}/>
                <Sidebar {...this.props}/>
            </>
           
        )
    }
}

export default MainPage;