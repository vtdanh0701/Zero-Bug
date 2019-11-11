import React, { Component } from 'react';
import Select from 'react-select';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';

export default class UserEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCredential: "",
            user: {}
        }
        this.firstNameElRef = React.createRef();
        this.lastNameElRef = React.createRef();
        this.emailElRef = React.createRef();
        this.addressElRef = React.createRef();
    }
    static contextType = AuthContext;

    componentDidMount(){
        this.fetchUser()
    }

    handleCredentialChange = selectedCredential =>{
        this.setState({
            selectedCredential
        })
    }

    fetchUser = () =>{
        const userId = this.props.match.params.id
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
            const selectedCredential = { value: user.credential, label: user.credential }
            this.setState({
                user,
                selectedCredential
            },()=> console.log(this.state.selectedCredential))

        }).catch(err => console.log(err))
    }

    modalConfirmHandler = () => {
        const firstName = this.firstNameElRef.current.value;
        const lastName = this.lastNameElRef.current.value;
        const email = this.emailElRef.current.value;
        const address = this.addressElRef.current.value;
        const credential = this.state.selectedCredential.value
        const userId = this.props.match.params.id

        

        if(
            firstName.trim().length === 0 ||
            lastName.trim().length === 0 ||
            email.trim().length === 0 ||
            address.trim().length === 0
        ){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    editUser(
                        userId: "${userId}",
                        userInput:{firstName:"${firstName}", 
                                    lastName: "${lastName}", 
                                    email: "${email}", 
                                    address: "${address}", 
                                    credential: "${credential}"}){
                                        _id
                                    }
                }
           `
        };

        const token = this.context.token;

        fetch('/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
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
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Edit User </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to='/user'>User</Link></li>
                            <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <div className='card card-primary'>
                    

                    <div className='card-body' >
                        <div className='form-group'>
                            <label htmlFor='inputFirstName'>First Name</label>
                            <input className='form-control' id='inputFirstName' type='text' ref={this.firstNameElRef}
                            defaultValue={this.state.user.firstName}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputLastName'>Last Name</label>
                            <input className='form-control' id='inputLastName' type='text' 
                            defaultValue={this.state.user.lastName}
                            ref={this.lastNameElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputEmail'>Email</label>
                            <input className='form-control' id='inputEmail' type='text' 
                            defaultValue={this.state.user.email}
                            ref={this.emailElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputAddress'>Address</label>
                            <input className='form-control' id='inputAddress' type='text' 
                            defaultValue={this.state.user.address}
                            ref={this.addressElRef}></input>
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
                        <input type="submit" value="Save" className="btn btn-success float-right" onClick={this.modalConfirmHandler}></input>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
