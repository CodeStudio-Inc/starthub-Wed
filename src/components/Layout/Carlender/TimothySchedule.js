import React from 'react'
import { InlineWidget } from "react-calendly"

import './Carlender.css'
const TimothySchedule = () => {


    return (
        <div className="calendar-main">
            <div className="calendar-container">
                <InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/t-maenda" />
            </div>
        </div>
    )
}

export default TimothySchedule
