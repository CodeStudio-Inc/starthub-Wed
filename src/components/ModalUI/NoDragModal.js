import React from 'react'

import './Styles.css'
const NoDragModal = (props) => {
    return (
        <div className="nodrag-container">
            {props.children}
        </div>
    )
}

export default NoDragModal
