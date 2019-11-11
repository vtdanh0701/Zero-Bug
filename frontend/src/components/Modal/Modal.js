import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Modal extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='modal-container'>
                <ul >
                    <li>
                    <Link to={this.props.url} className="edit_link"  >
                        View
                    </Link>
                    </li>
                    <li>
                    <Link to={this.props.url} className="edit_link" >
                        Edit
                    </Link>
                    </li>
                    <li>
                        <a className="edit_link" data-dismiss='modal' value={this.props.projectId}        onClick={this.props.deleteProject.bind(this, this.props.projectId)}>
                            Delete
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}
