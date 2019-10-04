import React, { Component } from 'react'
import './Sidebar.css';
import { NavLink} from 'react-router-dom';
import logo from '../../../assets/img/logo.png'

export default class Sidebar extends Component {
    constructor(props){
        super(props)
        this.state={
            toggle: false,
            rotate: false
        }
    }
    toggle = () =>{
        this.setState(prevState => ({
          toggle : !prevState.toggle,
          rotate: !prevState.rotate
        }))
        console.log("click" + this.state.toggle)
    }
    render() {
        let content
        if(this.state.toggle){
          content= 
            <ul className="nav">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>All Projects</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Project</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Edit Project</p>
                </a>
              </li>
            </ul>
          
        }
        
        return (
          <aside className="main-sidebar sidebar-dark-primary elevation-4">

    <a href="#" className="brand-link">
      <img src={logo}
           alt="AdminLTE Logo"
           className="brand-image img-circle "
           style={{opacity: ".8"}}/>
      <span className="brand-text font-weight-light">Zero Bug</span>
    </a>


    <div className="sidebar">

      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-item">
            <NavLink to='/dashboard' className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </NavLink>
          </li>
          
          
          <li className="nav-item" >
            <a href="#" onClick={this.toggle} className="nav-link">
              <i className="nav-icon fas fa-copy"></i>
              <p>
                Projects
                <i className={this.state.rotate ? "fas fa-angle-left right rotate" : "fas fa-angle-left right"}></i>
                <span className="badge badge-info right">6</span>
              </p>
            </a>
            {content}
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-chart-pie"></i>
              <p>
                Issues
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>All Issues</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Issues</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Edit Issues</p>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-tree"></i>
              <p>
                Users
                <i className="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>All Users</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Create Users</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Edit Users</p>
                </a>
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
