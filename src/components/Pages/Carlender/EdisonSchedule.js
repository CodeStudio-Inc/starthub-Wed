import React from 'react'
import { InlineWidget } from "react-calendly"

import './Carlender.css'
const EdisonSchedule = () => {


    return (
        <div className="main-container">
            <div className="right-column-carlender">
                <InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/e-niwamanya" />
            </div>
        </div>
    )
}

export default EdisonSchedule
