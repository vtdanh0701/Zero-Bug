import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';


export default class Project extends Component {
    constructor(props){
        super(props);
        this.state={
            projects: []
        }
    }
    static contextType = AuthContext;

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
                        bug{
                            assignee{
                                firstName
                            }
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

    deleteProject = projectId =>{
        const requestBody = {
            query: `
                mutation{
                    deleteProject(projectId: "${projectId}") {
                        name
                    }
                }
                 `
          };
        const token = this.context.token;

        fetch('http://localhost:8000/graphql', {
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
            const updatedProjects = prevState.projects.filter(project => {
              return project._id !== projectId;
            });
            return { projects: updatedProjects };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    render() {
        
        const projectList = this.state.projects.map((project,i) => {
            var url = `project/${project._id}/edit`
            var percent = (100/(project.bug.length +1) + "%").toString();

            var memberList = project.bug.map(res => 
                <li className='list-inline-item'>{res.assignee.firstName}</li>
            )
            return (
                <tr key={project._id}>
                                    <td>
                                        {i+1}
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
                                           {memberList}
                                        </ul>
                                    </td>
                                    <td className="project_progress">
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-green" role="progressbar" aria-volumenow="57" aria-volumemin="0" aria-volumemax="100" style={{width: percent}}>
                                            </div>
                                        </div>
                                        <small>
                                            {percent} Complete
                                        </small>
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
                                        <a className="btn btn-danger btn-sm" value={project._id} onClick={this.deleteProject.bind(this, project._id)}>
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
                            <h1>Projects </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item active">Projects</li>
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
