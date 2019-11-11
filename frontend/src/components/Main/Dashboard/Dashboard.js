import React, { Component } from 'react'
import Charts from './Chart/Charts';
import {Link} from 'react-router-dom';

export default class Dashboard extends Component {
    state = {
        projects: [],
        users: [],
        bugs: [],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        monthNums: [],
        labels: [],
        data: [],
        bugData: [],
        count: []
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
                        startDate
                        endDate
                        bug{
                            _id
                        }
                    }
                    bugs{
                        _id
                        dueDate
                        status
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
            const monthNums = this.state.monthNums;
            const months = this.state.months;
            const labels = this.state.labels;
          
            function mycomparator(a,b) {
                return parseInt(a.startDate.substring(5,7), 10) - parseInt(b.startDate.substring(5,7), 10);
              }

            projects.sort(mycomparator)

            const getTotal = function(n){
                let ctn = 0
                let result = 0
                for(var i = 0; i<=n.length-2;i++){
                    if(n[i].startDate.substring(5,7) === n[i+1].startDate.substring(5,7)){
                        ctn += n[i].bug.length 
                    } else {
                        result = ctn + n[i].bug.length
                        ctn = 0;
                    }
                }
            }
            getTotal(projects)

            projects.map((project,i) => {
                if(project.startDate.substring(5,7)[0] === '0'){
                  monthNums.push(parseInt(project.startDate.substring(6,7)))
                  return monthNums.sort(function(a,b){return a-b})
                } else{
                  monthNums.push(parseInt(project.startDate.substring(5,7)))
                  return monthNums.sort(function(a,b){return a-b})
                }
              })
            monthNums.map((monthNum) => {
              return labels.push(months[monthNum-1])
            })
            var labelArr = Object.values(labels);
            var counts = {};

            labelArr.forEach(function(x) {
                counts[x] = (counts[x] || 0) + 1;
            });
            var data = Object.values(counts)
            const newLabels = labels.filter((item,i) => labels.indexOf(item) === i)
            this.setState({
                users,
                projects,
                bugs,
                labels: newLabels,
                data
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
                            <h1 className="m-0 text-dark">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                </div>
                <section className='content'>
                    <div className='row'>
                        <div className="col-sm-4">

                            <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.state.projects.length}</h3>

                                <p>Projects</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-clipboard"></i>
                            </div>
                            <Link to='/project'  className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-sm-4">

                            <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.state.bugs.length}</h3>

                                <p>Issues</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bug"></i>
                            </div>
                            <Link to='/issue'  className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        <div className="col-sm-4">

                            <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.state.users.length}</h3>

                                <p>Users</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <Link to='/user' className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                        
                    </div>
                    <div className='row'>
                        <Charts data={this.state.data} labels={this.state.labels} projects={this.state.projects} bugs={this.state.bugs}/>
                    </div>
                   
                </section>
                
            </div>
           
        )
    }
}


