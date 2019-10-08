import React, { Component } from 'react'
import './Project.css'

export default class Project extends Component {
    constructor(props){
        super(props);
        this.state={
            projects: []
        }
    }

    componentDidMount(){
        this.fetchProjects();
    }

    fetchProjects(){
        const requestBody = {
            query: `
                query {
                    projects{
                        _id
                        name
                        description
                        startDate
                        endDate
                        creator{
                            email
                            firstName
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
            const projects = resData.data.projects;
            this.setState({
                projects: projects
            })
        }).catch(err => {
            console.log(err);
        })
    } 
    render() {
        const projectList = this.state.projects.map(project => {
            return (
                <tr key={project.id}>
                                    <td>
                                        #
                                    </td>
                                    <td>
                                        <a>
                                            {project.name}
                                        </a>
                                        <br/>
                                        <small>
                                            Created by {project.creator.firstName}
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
                                        <a className="btn btn-primary btn-sm" href="#">
                                            <i className="fas fa-folder">
                                            </i>
                                            View
                                        </a>
                                        <a className="btn btn-info btn-sm" href="#">
                                            <i className="fas fa-pencil-alt">
                                            </i>
                                            Edit
                                        </a>
                                        <a className="btn btn-danger btn-sm" href="#">
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
                            <h1>Projects</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Projects</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>

                <section className='content'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className="card-title">Projects</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                                <i className="fas fa-minus"></i></button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                                <i className="fas fa-times"></i></button>
                            </div>
                        </div>

                        <div className='card-body p-0'>
                            <table className="table table-striped projects">
                                <thead>
                                <tr key='projectHead'>
                                    <th style={{width: "1%"}}>
                                          #
                                    </th>
                                    <th style={{width: "20%"}}>
                                        Project Name
                                    </th>
                                    <th style={{width: "30%"}}>
                                        Team Members
                                    </th>
                                    <th>
                                        Project Progress
                                    </th>
                                    <th style={{width: "8%"}} className="text-center">
                                        Status
                                    </th>
                                    <th style={{width: "20%"}}>
                                    </th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                    {projectList}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}
