import React, { useEffect } from 'react'
import { InlineWidget } from "react-calendly"

import './Carlender.css'
const AndrewSchedule = () => {

    return (
        <div className="calendar-main">
            <div className="calendar-container">
                <InlineWidget styles={{ width: '90%', height: '90vh' }} url="https://calendly.com/bonyta" />
            </div>
        </div>
    )
}

export default AndrewSchedule
