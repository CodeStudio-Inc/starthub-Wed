import React from 'react'

import './Styles.css'
const index = (props) => {
    return (
        <div className="modal-container">
            {props.children}
        </div>
    )
}

export default index
