import React, { Component } from 'react'
import './Dashboard.css';
import Charts from './Chart/Charts';
export default class Dashboard extends Component {
    state = {
        projects: [],
        users: [],
        bugs: []
    }
    componentDidMount(){
        this.fetchInfo();
    }
    fetchInfo(){
        const requestBody = {
            query: `
                query {
                    users{
                        _id
                    }
                    projects{
                        _id
                    }
                    bugs{
                        _id
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
            const users = resData.data.users;
            const projects = resData.data.projects;
            const bugs = resData.data.bugs;
            this.setState({
                users,
                projects,
                bugs
            })
        }).catch(err => {
            throw err
        })
    }
    render() {
        return (
           
                
            
            <div className='content-wrapper'>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Dashboard {this.props.userId}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a >Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
                <section className='content'>
                    <div className='row'>
                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.state.projects.length}</h3>

                                <p>Projects</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-clipboard"></i>
                            </div>
                            <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.state.bugs.length}</h3>

                                <p>Issues</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bug"></i>
                            </div>
                            <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.state.users.length}</h3>

                                <p>Users</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">

                            <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>150</h3>

                                <p>Message</p>
                            </div>
                            <div className="icon">
                                <i className="far fa-envelope"></i>
                            </div>
                            <a  className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <Charts/>
                    </div>
                   
                </section>
                
            </div>
           
        )
    }
}


