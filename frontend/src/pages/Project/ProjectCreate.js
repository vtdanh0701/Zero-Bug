import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth-context';

export default class ProjectCreate extends Component {
    constructor(props){
        super(props);
        this.nameElRef = React.createRef();
        this.descriptionElRef = React.createRef();
        this.startDateElRef = React.createRef();
        this.endDateElRef = React.createRef();
    }
    static contextType = AuthContext;
    modalConfirmHandler = () => {
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
                    createProject(
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
            console.log('Created')
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
                            <h1>Create Project</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><Link to='/project'>Project</Link></li>
                            <li className="breadcrumb-item active">Create</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </section>
                <div className='card card-primary'>
                    

                    <div className='card-body' >
                        <div className='form-group'>
                            <label htmlFor='inputName'>Project Name</label>
                            <input className='form-control' id='inputName' type='text' ref={this.nameElRef}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='inputDescription'>Project Description</label>
                            <textarea className='form-control' id='inputDescription' type='text' ref={this.descriptionElRef}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor='startDate'>Start Date</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                      <i className="far fa-calendar-alt"></i>
                                  </span>
                                </div>
                                <input type="date" className="form-control" ref={this.startDateElRef}></input> 
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
                                <input type="date" className="form-control" ref={this.endDateElRef} ></input> 
                            </div>
                        </div>
                        <Link to='/project' className='btn btn-info'>Cancel</Link>
                        <input type="submit" value="Create new Project" className="btn btn-success float-right" onClick={this.modalConfirmHandler}></input>
                    </div>
                    
                </div>
            </div>
           
        )
    }
}
