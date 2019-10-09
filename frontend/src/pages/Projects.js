import React, { Component} from 'react';



import AuthContext from '../context/auth-context';


import './Events.css'


class ProjectsPage extends Component {
    state = {
        creating: false,
        projects: []
    }

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.nameElRef = React.createRef();
        this.startDateElRef = React.createRef();
        this.endDateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    componentDidMount(){
        this.fetchProjects();
    }

    startCreateProjectHandler = () =>{
        this.setState({creating: true});
    }

    modalConfirmHandler = () => {
        this.setState({creating: false})
        const name = this.nameElRef.current.value;
        const startDate = this.startDateElRef.current.value;
        const endDate = this.endDateElRef.current.value;
        const description = this.descriptionElRef.current.value;

        if(
            name.trim().length === 0 ||
            startDate.trim().length === 0 ||
            endDate.trim().length === 0 ||
            description.trim().length === 0 
        ){
            return;
        }

        const project = {name, startDate, endDate, description}
        console.log(project);

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

        fetch('http://localhost:8000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            this.fetchProjects();
            if ( res.status !== 200 && res.status !== 201){
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            // this.fetchProjects();
            console.log(resData)
        }).catch(err => {
            console.log(err);
        })
    }

    modalCancelHandler = () => {
        this.setState({creating: false})
    };

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

    render(){
        const projectList = this.state.projects.map(project => {
            return (
                <li key={project._id} className='events__list-item'>
                    {project.name}
                </li>
            )
        })
        return(
            <>
            

            {/* {this.state.creating && 
                <Modal 
                    title='Add Event' 
                    canCancel 
                    canConfirm 
                    onCancel={this.modalCancelHandler} 
                    onConfirm={this.modalConfirmHandler}
                >
                    <p>Modal Content</p>
                    <form>
                        <div className='form-control'>
                            <label htmlFor='title'>Name</label>
                            <input type='text' id='title' ref={this.nameElRef}></input>
                        </div>
                       
                        <div className='form-control'>
                            <label htmlFor='date'>Start Date</label>
                            <input type='datetime-local' id='date' ref={this.startDateElRef}></input>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='date'>End Date</label>
                            <input type='datetime-local' id='date' ref={this.endDateElRef}></input>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='description'>Description</label>
                            <textarea type='description' rows='4' ref={this.descriptionElRef}/>
                        </div>
                    </form>
                </Modal>} */}
            
            {this.context.token && (<div className='events-control'>
                <p>Share your own Projects !</p>
                <button className='btn' onClick={this.startCreateProjectHandler}>Create Project</button>
            </div>)}
            <ul className='events__list'>
                {projectList}

            </ul>
            </>
        );
    }
}


export default ProjectsPage;
