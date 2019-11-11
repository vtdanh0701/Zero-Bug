import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';


export default class User extends Component {
    constructor(props){
        super(props);
        this.state={
            users: []
        }
    }
    static contextType = AuthContext;

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers(){
        const requestBody = {
            query: `
                query {
                    users{
                        _id
                        firstName
                        lastName
                        email
                        credential
                    }
                }
           `
        };



        fetch('/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if ( res.status !== 200 && res.status !== 201){
                throw new Error('Failed')
            } 
            return res.json();
        }).then(resData => {
            const users = resData.data.users;
            this.setState({
                users: users
            })
        }).catch(err => {
            console.log(err);
        })
    } 

    deleteUser = userId =>{
        const requestBody = {
            query: `
                mutation{
                    deleteUser(userId: "${userId}") {
                        _id
                    }
                }
                 `
          };
        const token = this.context.token;
        
        fetch('graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then(resData => {
          this.setState(prevState => {
            const updatedUsers = prevState.users.filter(user => {
              return user._id !== userId;
            });
            return { users: updatedUsers };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    render() {
        console.log(this.props.user.email)
        const userList = this.state.users.map((user,i) => {
            var url = `user/${user._id}/edit`
            var editButton = '';
            if(this.props.user.credential === "Admin" && user.email !== "admin@admin.com" ){
                editButton = <div className="project-actions text-right">
                <Link to={url} className="btn btn-primary btn-sm" >
                    <i className="fas fa-folder">
                    </i>
                    View
                </Link>
                <Link to={url} className="btn btn-info btn-sm">
                    <i className="fas fa-pencil-alt">
                    </i>
                    Edit
                </Link>
                <button className="btn btn-danger btn-sm" value={user._id} onClick={this.deleteUser.bind(this, user._id)}>
                    <i className="fas fa-trash">
                    </i>
                    Delete
                </button>
            </div>
            } else {
                editButton = <td></td>
            }
            return (
                <tr key={user._id}>
                                    <td>
                                        {i+1}
                                    </td>
                                    <td>
                                        <div>
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <br/>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td className="user_credential">
                                        {user.credential}
                                    </td>
                               {editButton}
                                    
                                </tr>
            )
        })
        return (
            <div className='content-wrapper'>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Users </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Users</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>

                <section className='content'>
                    <div className='card'>
                        

                        <div className='card-body p-0'>
                            <table className="table table-striped users">
                                <thead>
                                <tr key='userHead'>
                                    <th style={{width: "1%"}}>
                                          #
                                    </th>
                                    <th style={{width: "20%"}}>
                                        Name
                                    </th>
                                    <th style={{width: "20%"}}>
                                        Email
                                    </th>
                                    <th>
                                        Credential
                                    </th>
                                    <th>
                                        
                                    </th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                    {userList}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}
