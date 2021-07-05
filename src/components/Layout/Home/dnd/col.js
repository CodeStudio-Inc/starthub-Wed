import React from 'react'
const col = ({ isOver, children}) => {

    const className = isOver ? 'highlighted-region' : ''

    // const className = highlighted ? 'highlighted' : ''

    return (
        <div className={`col${className}`}>
            {children}
        </div>
    )
}

export default col