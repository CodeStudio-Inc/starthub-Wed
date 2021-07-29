import React from 'react'
import { InlineWidget } from "react-calendly"

import './Carlender.css'
const TimothySchedule = () => {


    return (
        <div className="main-container">
            <div className="right-column-carlender">
                <InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/t-maenda" />
            </div>
        </div>
    )
}

export default TimothySchedule
