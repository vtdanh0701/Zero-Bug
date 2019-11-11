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
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-comments"></i>
          <span className="badge badge-danger navbar-badge">3</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" className="dropdown-item">
            {/* <!-- Message Start --> */}
            <div className="media">
              {/* <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle"/> */}
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            {/* <!-- Message Start --> */}
            <div className="media">
              <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"/>
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  John Pierce
                  <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                </h3>
                <p className="text-sm">I got your message bro</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            {/* <!-- Message End --> */}
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            {/* <!-- Message Start --> */}
            <div className="media">
              <img src="../../dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3"/>
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Nora Silvester
                  <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                </h3>
                <p className="text-sm">The subject goes here</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            {/* <!-- Message End --> */}
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>

      
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
            <a href="#" className="btn btn-default btn-flat">Profile</a>
            <a onClick={this.props.logout} className="btn btn-default btn-flat float-right">Sign out</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  </div>

        )
    }
}
