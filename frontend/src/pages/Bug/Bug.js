import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';

export default class Bug extends Component {
    constructor(props){
        super(props);
        this.state={
            bugs: []
        }
    }
    static contextType = AuthContext;
    componentDidMount(){
        this.fetchBugs();
    }

    fetchBugs(){
        const requestBody = {
            query: `
                query {
                    bugs{
                        _id
                        name
                        description
                        dueDate
                        level
                        status
                        creator{
                            firstName
                        }
                        assignee{
                            firstName
                            lastName
                        }
                    }   
                }
           `
        };  

        fetch('http://localhost:8000/graphql',{
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
            const bugs = resData.data.bugs;
            this.setState({
                bugs: bugs
            })
        }).catch(err => {
            console.log(err);
        })
    } 
    deleteBug = bugId =>{

        console.log("delete ID: " + bugId)
        const requestBody = {
            query: `
                mutation{
                    deleteBug(bugId: "${bugId}") {
                        name
                    }
                }
                 `
          };
        const token = this.context.token;
        console.log("token : " + token)
        fetch('http://192.168.0.11:8000/graphql', {
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
            const updatedBugs = prevState.bugs.filter(bug => {
              return bug._id !== bugId;
            });
            return { bugs: updatedBugs };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }  


    render() {
        const bugList = this.state.bugs.map((bug,i) => {
            var url = `bug/${bug._id}/edit`
            let status = bug.status
            let level = bug.level
            if(status === 'Open'){
                status = <span className="badge badge-success">{bug.status}</span>
            }
            if(status === 'Closed'){
                status = <span className="badge badge-dark">{bug.status}</span>
            }
            if(status === 'InProgress'){
                status = <span className="badge badge-warning">{bug.status}</span>                
            }
            
            if(level === 'Critical'){
                level = <span className="badge badge-danger">{bug.level}</span>
            }
            if(level === 'Major'){
                level = <span className="badge badge-warning">{bug.level}</span>
            }
            if(level === 'Minor'){
                level = <span className="badge badge-light">{bug.level}</span>                
            }
            return (
                <tr key={bug._id}>
                                    <td>
                                        {i+1}
                                    </td>
                                    <td>
                                        <a>
                                            {bug.name}
                                        </a>
                                        <br/>
                                        <small>
                                            Created by {bug.creator.firstName}
                                        </small>
                                    </td>
                                    <td>
                                        <ul className="list-inline">
                                           {bug.assignee? bug.assignee.firstName: "None"}
                                        </ul>
                                    </td>
                                    <td className="project_progress">
                                            {level}
                                    </td>
                                    <td className="project-state">
                                        {status}
                                    </td>
                                    <td className="project-actions text-right">
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
                                        <a className="btn btn-danger btn-sm" value={bug._id}
                                        onClick={this.deleteBug.bind(this, bug._id)} >
                                            <i className="fas fa-trash">
                                            </i>
                                            Delete
                                        </a>
                                    </td>
                                </tr>
            )
        })
        return (
            <div className='content-wrapper'>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Issues </h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">Issues</li>
                        </ol>
                    </div>
                    </div>
                </div>
            </section>

            <section className='content'>
                <div className='card'>
                    

                    <div className='card-body p-0'>
                        <table className="table table-striped projects">
                            <thead>
                            <tr key='issueHead'>
                                <th style={{width: "1%"}}>
                                      #
                                </th>
                                <th style={{width: "20%"}}>
                                    Issue Name
                                </th>
                                <th style={{width: "20%"}}>
                                    Assignee
                                </th>
                                <th>
                                    Level
                                </th>
                                <th style={{width: "8%"}} className="text-center">
                                    Status
                                </th>
                                <th style={{width: "20%"}}>
                                </th>
                            </tr>
                            </thead>
                            
                            <tbody>
                                {bugList}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </div>
        )
    }
}
