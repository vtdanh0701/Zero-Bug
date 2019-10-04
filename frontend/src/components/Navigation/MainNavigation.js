import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth-context';
import logo from '../../assets/img/logo.png';
import Auth from '../../pages/Auth';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
    <nav className="navbar navbar-light navbar-expand-md ">
    <a className="navbar-brand" href="#">
        <img src={logo} className='logo'/>
        Zero Bug
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <NavLink to='/' className="nav-link" >Home </NavLink>
        </li>
        { !context.token && (
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#exampleModal">
                                    Login
                                    </a>

                                    <div className="modal fade"id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        <img src={logo} className='logo'/>
                                                     Zero Bug</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                <Auth/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )}
        
        <li className="nav-item">
            <a className="nav-link" href="#">About</a>
        </li>
        { context.token && (
                                <>
                                    <li>
                                        <a className="nav-link" onClick={context.logout}>Logout</a>
                                    </li>
                                </>
                            )} 

        </ul>

    </div>
    </nav>
            )}}
    </AuthContext.Consumer>

) 

export default mainNavigation;