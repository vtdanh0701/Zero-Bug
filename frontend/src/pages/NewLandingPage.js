import React, { Component } from 'react'

import AuthPage from './Auth'
import './NewLandingPage.css'
import logo from '../assets/img/logo.png'
import Slide from '../components/Slide/Slide'

export default class NewLandingPage extends Component {
    render() {
        return (
            <div className='landing-page'>
                <div className='intro'>
                    <h1>Zero Bug</h1>
                </div>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                           <Slide/>
                        </div>
                        <div className="modal-body">
                            <AuthPage/>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
