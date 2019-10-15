import React, { Component } from 'react';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';

export default class UserCreate extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCredential: null
        }
        this.firstNameElRef = React.createRef();
        this.lastNameElRef = React.createRef();
        this.emailElRef = React.createRef();
        this.passwordElRef = React.createRef();
        this.addressElRef = React.createRef();
    }
    static contextType = AuthContext;

    handleCredentialChange = selectedCredential =>{
        this.setState({
            selectedCredential
        })
    }

    modalConfirmHandler = () => {
        const firstName = this.firstNameElRef.current.value;
        const lastName = this.lastNameElRef.current.value;
        const email = this.emailElRef.current.value;
        const password = this.passwordElRef.current.value;
        const address = this.addressElRef.current.value;
        const credential = this.state.selectedCredential.value
        

        if(
            firstName.trim().length === 0 ||
            lastName.trim().length === 0 ||
            email.trim().length === 0 ||
            password.trim().length === 0 ||
            address.trim().length === 0
        ){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createUser(
                        userInput:{firstName:"${firstName}", 
                                    lastName: "${lastName}", 
                                    email: "${email}",
                                    password: "${password}", 
                                    address: "${address}", 
                                    credential: "${credential}"}){
                                        _id
                                    }
                }
           `
        };

        
        const token = this.context.token;
        console.log(token)

        fetch('http://localhost:8000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            console.log('Created')
            this.props.history.push('/user')
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        const { selectedCredential } = this.state;
        const credentialOptions = [
            { value: 'Manager', label: 'Manager' },
            { value: 'Developer', label: 'Developer' },
            { value: 'Tester', label: 'Tester' },
          ];
        return (
            <div className='content-wrapper'>
                <section className='content-header'>
                    <h1>Create User</h1>
                </section>
                <div className='card card-primary'>
                    

                    <div className='card-body' >
                        <div className='form-group'>
                            <label htmlFor='inputFirstName'>First Name</label>
                            <input className='form-control' id='inputName' type='text' ref={this.firstNameElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputLastName'>Last Name</label>
                            <input className='form-control' id='inputName' type='text' ref={this.lastNameElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputEmail'>Email</label>
                            <input className='form-control' id='inputName' type='text' ref={this.emailElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputPassword'>Password</label>
                            <input className='form-control' id='inputName' type='password' ref={this.passwordElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputAddress'>Address</label>
                            <input className='form-control' id='inputName' type='text' ref={this.addressElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputCredential'>Credential</label>
                            <div className='form-group'>
                            <Select
                            value={selectedCredential}
                            onChange={this.handleCredentialChange}
                            options={credentialOptions}/>
                        </div>
                        </div>
                        <Link to='/user' className='btn btn-info'>Cancel</Link>
                        <input type="submit" value="Create New User" className="btn btn-success float-right" onClick={this.modalConfirmHandler}></input>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
