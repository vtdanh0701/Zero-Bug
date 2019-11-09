import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Select from 'react-select';


export default class BugCreate extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedUser: null,
            selectedProject: null,
            selectedStatus: null,
            selectedLevel: null,
            projects: [],
            users: [],
        }
        this.nameElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.dueDateElRef = React.createRef();

    }
    static contextType = AuthContext;

    handleProjectChange = selectedProject => {
        this.setState(
          { selectedProject });
      };
    handleUserChange = selectedUser => {
      this.setState(
        { selectedUser });
    };
    handleStatusChange = e => {
        this.setState({
            selectedStatus: e.target.value
        })
    }
    handleLevelChange = e => {
        this.setState({
            selectedLevel: e.target.value
        })
    }


    componentDidMount(){
        this.fetchData()
        
    }

    fetchData(){
        const requestBody = {
            query: `
                query{
                    projects{
                        _id
                        name
                    }
                    users{
                        _id
                        firstName
                        lastName
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
            const projects = resData.data.projects;
            const users = resData.data.users;
            this.setState({
                projects,
                users
            })
        }).catch(err => {
            console.log(err);
        })
    }
    modalConfirmHandler = () => {
        const name = this.nameElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const dueDate = this.dueDateElRef.current.value;
        const projectId = this.state.selectedProject.value;
        const assigneeId = this.state.selectedUser.value;
        let status = this.state.selectedStatus;
        let level = this.state.selectedLevel;

        if(status === null){
            status = 'Open'
        }
        if(level === null){
            level = 'None'
        }
        if(
            name.trim().length === 0 ||
            description.trim().length === 0 ||
            dueDate.trim().length === 0

        ){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createBug(
                        projectId: "${projectId}",
                        assigneeId: "${assigneeId}"
                        bugInput:{name:"${name}", 
                                    description: "${description}",
                                    level: "${level}",
                                    status: "${status}",
                                    dueDate:"${dueDate}"
                                    }){
                                        name
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
            this.props.history.push('/issue')
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        const projectListOptions = [];
        this.state.projects.map((project,i) => {
            projectListOptions.push({ value: project._id, label: project.name })
        })
        const userListOptions = [];
        this.state.users.map((user) => {
            userListOptions.push({value: user._id,label: user.firstName})
        })
        
        const { selectedProject } = this.state
        const { selectedUser } = this.state

        return (
            <div className='content-wrapper'>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Create Issue</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to='/issue'>Issue</Link></li>
                            <li className="breadcrumb-item active">Create</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <div className='card card-primary'>
                    

                    <div className='card-body' >
                        <div className='form-group'>
                            <label htmlFor='inputName'>Name</label>
                            <input className='form-control' id='inputName' type='text' ref={this.nameElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputDescription'>Description</label>
                            <textarea className='form-control' id='inputDescription' type='text' ref={this.descriptionElRef}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputProject'>Project</label>
                            <Select
                            value={selectedProject}
                            onChange={this.handleProjectChange}
                            options={projectListOptions}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='startDate'>Due Date</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <i className="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input type="date" className="form-control" ref={this.dueDateElRef}></input> 
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputProject'>Assignee</label>
                            <Select
                            value={selectedUser}
                            onChange={this.handleUserChange}
                            options={userListOptions}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputProject'>Status</label>
                            <select onChange={this.handleStatusChange} className="form-control select2bs4" style={{width: "100%"}}>
                                <option value='Open'>Open</option>
                                <option value='Closed'>Closed</option>
                                <option value='InProgress'>InProgress</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputProject'>Level</label>
                            <select onChange={this.handleLevelChange} className="form-control select2bs4" style={{width: "100%"}}>
                                <option value='None'>None</option>
                                <option value='Critical'>Critical</option>
                                <option value='Major'>Major</option>
                                <option value='Minor'>Minor</option>
                            </select>
                        </div>
                        <Link to='/issue' className='btn btn-info'>Cancel</Link>
                        <input type="submit" value="Create new Issue" className="btn btn-success float-right" onClick={this.modalConfirmHandler}></input>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
