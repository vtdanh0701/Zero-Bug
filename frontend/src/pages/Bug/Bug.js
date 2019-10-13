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


    render() {
        const bugList = this.state.bugs.map((bug,i) => {
            var url = `project/${bug._id}/edit`
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
                                            <li className="list-inline-item">
                                                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar.png"/>
                                            </li>
                                            <li className="list-inline-item">
                                                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar2.png"/>
                                            </li>
                                            <li className="list-inline-item">
                                                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar3.png"/>
                                            </li>
                                            <li className="list-inline-item">
                                                <img alt="Avatar" className="table-avatar" src="../../dist/img/avatar04.png"/>
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="project_progress">
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-green" role="progressbar" aria-volumenow="57" aria-volumemin="0" aria-volumemax="100" style={{width: "57%"}}>
                                            </div>
                                        </div>
                                        <small>
                                            57% Complete
                                        </small>
                                    </td>
                                    <td className="project-state">
                                        <span className="badge badge-success">Success</span>
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
                                        <a className="btn btn-danger btn-sm" value={bug._id} >
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
                                <th style={{width: "30%"}}>
                                    Team Members
                                </th>
                                <th>
                                    Issue Progress
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
