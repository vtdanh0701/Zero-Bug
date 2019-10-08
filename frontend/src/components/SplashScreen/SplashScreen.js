import React, { Component } from 'react'
import logo from '../../assets/img/logo.png'
import './SplashScreen.css'

export default class SplashScreen extends Component {
    render() {
        return (
            <div className='splash-screen'>
                <div className='splash-screen__container animated myAnimation'>
                    <h1>Zero Bug</h1>
                    <img src={logo}/>
                </div>
            </div>
        )
    }
}
