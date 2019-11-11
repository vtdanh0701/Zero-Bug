import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Select from 'react-select';


export default class BugEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedUser: null,
            selectedStatus: null,
            selectedLevel: null,
            users: [],
            bug: {},
            dueDate: '',
            description: '',
            project: '',
        }
        this.nameElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.dueDateElRef = React.createRef();

    }
    static contextType = AuthContext;

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
    handleDescriptionChange = e => { 
        this.setState({
            description: e.target.value
        })
    }


    componentDidMount(){
        this.fetchData()
        
    }

    fetchData(){
        const bugId = this.props.match.params.id
        const requestBody = {
            query: `
                query{
                   singleBug(bugId: "${bugId}"){
                        name
                        description
                        dueDate
                        status
                        level
                        assignee{
                          firstName
                          lastName
                          _id
                        }
                        project{
                          name
                        }     
                   }
                   users{
                       firstName
                       lastName
                       _id
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

            const users = resData.data.users;
            const bug = resData.data.singleBug;
            const project = bug.project.name;
            const dueDate = bug.dueDate.substring(0,10);
            const description = bug.description.toString();
            let selectedUser;
            if(!bug.assignee){
                selectedUser = null
            } else {
                selectedUser = { value: bug.assignee._id, label: bug.assignee.firstName }
            }

            this.setState({
                project,
                users,
                bug,
                dueDate,
                description,
                selectedUser: selectedUser,
                selectedStatus: bug.status,
                selectedLevel: bug.level,
            })
        }).catch(err => {
            console.log(err);
        })
    }
    modalConfirmHandler = () => {
        const name = this.nameElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const dueDate = this.dueDateElRef.current.value;
        const assigneeId = this.state.selectedUser.value;
        const bugId = this.props.match.params.id
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
                    editBug(
                        bugId: "${bugId}",
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

        const userListOptions = [];
        this.state.users.map((user) => {
            return userListOptions.push({value: user._id,label: user.firstName})
        })
        
        const { selectedUser } = this.state
        const bug = this.state.bug

        return (
            <div className='content-wrapper'>
               <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Edit Issue</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to='/issue'>Issue</Link></li>
                            <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <div className='card card-primary'>
                    

                    <div className='card-body' >
                        <div className='form-group'>
                            <label htmlFor='inputName'>Name</label>
                            <input defaultValue={bug.name} className='form-control' id='inputName' type='text' ref={this.nameElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputDescription'>Description</label>
                            <textarea
                            type='text'
                            value={this.state.description} 
                            className='form-control' 
                            id='inputDescription' 
                            ref={this.descriptionElRef} 
                            onChange={this.handleDescriptionChange.bind(this)}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputProject'>Project</label>
                            <input className='form-control'
                            value={this.state.project} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='dueDate'>Due Date</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <i className="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input defaultValue={this.state.dueDate} type="date" className="form-control" ref={this.dueDateElRef}></input> 
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
                            <select value={this.state.selectedStatus} onChange={this.handleStatusChange} className="form-control select2bs4" style={{width: "100%"}}>
                                <option value='Open'>Open</option>
                                <option value='Closed'>Closed</option>
                                <option value='InProgress'>InProgress</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputProject'>Level</label>
                            <select value={this.state.selectedLevel} onChange={this.handleLevelChange} className="form-control select2bs4" style={{width: "100%"}}>
                                <option value='None'>None</option>
                                <option value='Critical'>Critical</option>
                                <option value='Major'>Major</option>
                                <option value='Minor'>Minor</option>
                            </select>
                        </div>
                        <Link to='/issue' className='btn btn-info'>Cancel</Link>
                        <input type="submit" value="Save" className="btn btn-success float-right" onClick={this.modalConfirmHandler}></input>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
