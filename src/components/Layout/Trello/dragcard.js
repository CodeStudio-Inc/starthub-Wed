import React, { Component } from 'react'

import './drag.css'
export class dragcard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3>Example Card</h3>
                </div>
                <div className="card-body">
                    <p>{this.props.body}</p>
                </div>
            </div>
        );
    }
}

export default dragcard
