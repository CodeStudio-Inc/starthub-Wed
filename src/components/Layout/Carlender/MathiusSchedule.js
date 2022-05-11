import React from 'react'
import { InlineWidget } from "react-calendly"

import './Carlender.css'
const MathiusSchedule = () => {


    return (
        <div className="calendar-main">
            <div className="calendar-container">
                <InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/m-moebius" />
            </div>
        </div>
    )
}

export default MathiusSchedule
