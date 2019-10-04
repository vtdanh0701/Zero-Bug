import React, { Component } from 'react'


export default class MainFooter extends Component {
    render() {
        return (
            <footer className='main-footer'>
                    <strong>Copyright &copy; 2019 <a href="#">Zero Bug</a>.</strong>
                    All rights reserved.
                    <div className="float-right d-none d-sm-inline-block">
                    <b>Powered by AdminLTE</b>
                    </div>
            </footer>
        )
    }
}
