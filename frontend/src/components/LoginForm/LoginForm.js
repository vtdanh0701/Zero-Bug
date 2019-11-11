import React, { Component} from 'react';
import './LoginForm.css'
import AuthContext from '../../context/auth-context';
import $ from 'jquery';

class LoginForm extends Component {
    state = {
        isLogin: true,
        dataDismiss: '',
        message: '',
    }

    static contextType = AuthContext;
    
    constructor(prop){
        super(prop);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0){
            return;
        }

        let requestBody ={
            query: `
                query{
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

        if(!this.state.isLogin){
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput:{email:"${email}", password: "${password}"}){
                            _id
                            email
                        }
                    }
                `
            };
        }

      
        fetch('/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if ( res.status !== 200 && res.status !== 201){
                this.setState({
                    message:'Invalid Email/Password'
                })
                throw new Error('Failed!');
                
            } 
            return res.json();
        }).then(resData => {

            if(resData.data.login.token){
                this.context.login(
                    resData.data.login.token, 
                    resData.data.login.userId, 
                    resData.data.login.tokenExpiration)
            }

            $('.modal-backdrop').remove();
            $(document.body).removeClass("modal-open");
        })
        .catch(err => {
            console.log(err);
        })
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    render(){
        return(
          <div className='auth-page'>
            <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" ref={this.emailEl}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" ref={this.passwordEl}/>
            </div>
            <small id="message" className="message">{this.state.message}</small>
            <button type="submit" className="btn">LOG IN</button>

          </form>
          </div>
        );
    }
}

export default LoginForm;