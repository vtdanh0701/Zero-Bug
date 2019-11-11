import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';




export default class ProjectEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: {},
            startDate: '',
            endDate: '',
            description: ''
        }
        this.nameElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.startDateElRef = React.createRef();
        this.endDateElRef = React.createRef();
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    static contextType = AuthContext;
    
    componentDidMount(){
        this.fetchSingleProject()
    }
    handleNameChange(e){
        this.setState({
            project:{name: e.target.value}
        })
    }
    handleDescriptionChange = e => { 
        this.setState({
            description: e.target.value
        })
    }
    fetchSingleProject(){
        const projectId = this.props.match.params.id
        console.log("project id " + projectId)
        const requestBody = {
            query: `
                query{
                    singleProject(projectId:"${projectId}"){
                        name
                        description
                        startDate
                        endDate
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
            const project = resData.data.singleProject;
            const startDate = resData.data.singleProject.startDate.substring(0,10);
            const endDate = resData.data.singleProject.endDate.substring(0,10)
            const description = project.description

            this.setState({
                project: project,
                startDate,
                endDate,
                description
            })
        }).catch(err => {
            console.log(err);
        })
    }

    modalConfirmHandler = (e) => {
        e.preventDefault()
        const projectId = this.props.match.params.id
        const name = this.nameElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const startDate = this.startDateElRef.current.value;
        const endDate = this.endDateElRef.current.value;

        if(
            name.trim().length === 0 ||
            description.trim().length === 0 ||
            startDate.trim().length === 0 ||
            endDate.trim().length === 0
        ){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    editProject(
                        projectId:"${projectId}"
                        projectInput:{name:"${name}", 
                                    description: "${description}", 
                                    startDate:"${startDate}",
                                    endDate:"${endDate}"}){
                                        name
                                    }
                }
           `
        };

        
        const token = this.context.token;
        console.log(token)

        fetch('/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            this.props.history.push('/project')
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {

        return (
            <div className='content-wrapper'>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Edit Project</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to='/project'>Project</Link></li>
                            <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <div className='card card-primary'>
                    

                    <div className='card-body' >
                        <div className='form-group'>
                            <label htmlFor='inputName'>Project Name</label>
                            <input className='form-control' id='inputName' type='text' ref={this.nameElRef} value={this.state.project.name} onChange={this.handleNameChange}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputDescription'>Project Description</label>
                            <textarea 
                            className='form-control' 
                            id='inputDescription' 
                            type='text' 
                            ref={this.descriptionElRef} 
                            onChange={this.handleDescriptionChange}
                            value={this.state.description}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='startDate'>Start Date</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <i className="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input type="date" className="form-control" ref={this.startDateElRef} value={this.state.startDate}></input> 
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor='endDate'>End Date</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <i className="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input type="date" className="form-control" ref={this.endDateElRef} value={this.state.endDate}></input> 
                            </div>
                        </div>
                        <Link to='/project' className='btn btn-info'>Cancel</Link>
                        <input type="submit" value="Save" className="btn btn-success float-right" onClick={this.modalConfirmHandler}></input>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
