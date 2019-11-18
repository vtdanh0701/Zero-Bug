import React, { Component } from 'react'


import LoginForm from '../components/LoginForm/LoginForm'
import './NewLandingPage.css'
import Slide from '../components/Slide/Slide'

export default class NewLandingPage extends Component {
    render() {
        return (
            <div className='landing-page'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                           <Slide/>
                        </div>
                        <div className="modal-body">
                            <LoginForm/>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
