import React, { Component } from 'react'

import './SplashScreen.css'

export default class SplashScreen extends Component {
    render() {
        return (
            <div className='splash-screen'>
                <div className='splash-screen__container animated myAnimation'>
                    <i className='ion ion-bug'></i>
                    <h1>Zero Bug</h1>
                </div>
            </div>
        )
    }
}
