import React, { Component } from 'react'
import './Sidebar.css';
import { NavLink} from 'react-router-dom';


export default class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state={
            toggle: false,
            rotate: false,
            selector: [] ,
            newSelector: '',
            url: this.props.location.pathname
        }
    }
    
    
    toggle = (e) =>{
      let newSelector = e.currentTarget.dataset.id
      let selector = this.state.selector
      let remove = this.state.selector.indexOf(newSelector)
      if(selector.includes(newSelector)){
        this.setState({
          selector: this.state.selector.filter((_, i) => i != remove)
        }, () => {console.log(this.state.selector)})
      } else {
        this.setState({
          selector: [...this.state.selector, newSelector]
        }, ()=>{console.log(this.state.selector)})
      }
    }
    render() {
        var url = this.props.location.pathname
        var selector = this.state.selector
        
        return (
          <aside className="main-sidebar sidebar-light-primary elevation-4">

    <a href="#" className="brand-link">
      <i 
           alt="AdminLTE Logo"
           className="brand-image img-circle ion ion-bug "
           style={{opacity: ".8"}}></i>
      <span className="brand-text font-weight-light">Zero Bug</span>
    </a>


    <div  className="sidebar">

      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget='treeview' data-accordion='false'  role="menu" >
          
          <li className="nav-item">
            <NavLink to='/' exact className="nav-link" activeClassName='active'>
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </NavLink>
          </li>
          
          
          <li className="nav-item" >
            
            <a  data-id="project"
                onClick={this.toggle.bind(this)}
                className= {url.includes('project') ? "nav-link active" : "nav-link" }>
              
              <i className="nav-icon ion ion-clipboard"></i>
              <p>
                Projects
                <i className={selector.includes('project') ? "right fas fa-angle-left rotate" : "right fas fa-angle-left"}></i>

              </p>
            </a>
            
            <ul className={ selector.includes('project') ? "nav show" : "nav  hidden"} >
              <li className="nav-item">
                <NavLink to='/project' exact className="nav-link" activeClassName='active'>
                  <i className="far fa-circle nav-icon"></i>
                  <p>All Projects</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/project/create' exact className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Project</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/project/edit' exact className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Edit Project</p>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a  data-id="issue"
                onClick={this.toggle.bind(this)}
                className={url.includes('issue') ? "nav-link active" : "nav-link"}>
              <i className="nav-icon ion ion-bug"></i>
              <p>
                Issues
                <i className= {selector.includes('issue') ? "right fas fa-angle-left rotate" : "right fas fa-angle-left"}></i>
              </p>
            </a>
            <ul className={ selector.includes('issue') ? "nav show" : "nav hidden"}>
              <li className="nav-item">
                <NavLink to='/issue' exact className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>All Issues</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/issue/create' className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Issues</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/issue/edit' className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Edit Issues</p>
                </NavLink>
              </li>
            </ul>
          </li>
          
          <li className="nav-item">
            <a data-id='user'
                onClick={this.toggle.bind(this)}
               className={url.includes('user') ? "nav-link active" : "nav-link"}>
              <i className="nav-icon fas fa-user"></i>
              <p>
                Users
                <i className={selector.includes('user') ? "right fas fa-angle-left rotate" : "right fas fa-angle-left"}></i>
              </p>
            </a>
            <ul className={ selector.includes('user') ? "nav show" : "nav hidden"}>
              <li className="nav-item">
                <NavLink to='/user' exact className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>All Users</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/user/create' className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Users</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/user/edit' className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Edit Users</p>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    </div>

  </aside>
        )
    }
}
