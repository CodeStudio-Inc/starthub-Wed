import React from 'react'

import './Styles.css'
const Loader = (props) => {
    return (
        <div className="loader-container">
            {props.children}
        </div>
    )
}

export default Loader
