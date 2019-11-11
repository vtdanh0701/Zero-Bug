import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';

export default class Navbar extends Component {
  constructor(props){
    super(props)
  }
  
    render() {
        return (
            <div className='wrapper'>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* <!-- Left navbar links --> */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
      </li>
    </ul>

    {/* <!-- Right navbar links --> */}
    <ul className="navbar-nav ml-auto">
      {/* <!-- Messages Dropdown Menu --> */}
      

      
      <li className="nav-item dropdown user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
          
          <i  className="far fa-user"></i>
          <span id='navbar__user-name' className="d-none d-md-inline">{this.props.user.firstName} {this.props.user.lastName}</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          {/* <!-- User image --> */}
          <li className="user-header bg-primary">
            <img src="../../dist/img/Avatar160x160.png" className="img-circle elevation-2" alt="User Image"/>

            <p>
            {this.props.user.firstName} {this.props.user.lastName} - Web Developer
              {/* <small>Member since Nov. 2012</small> */}
            </p>
          </li>
          {/* <!-- Menu Body --> */}
          
          {/* <!-- Menu Footer--> */}
          <li className="user-footer">

            <a onClick={this.props.logout} id="signout_btn" className="btn btn-default btn-flat">Sign out</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  </div>

        )
    }
}
