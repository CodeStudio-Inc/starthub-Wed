import React from 'react'
import Sidebar from '../../Navigation/Sidebar'

import './Carlender.css'
const index = (props) => {


    const handleAndrewNavigation = () => {
        props.history.push('/andrew-schedule')
    }

    const handleMathiusNavigation = () => {
        props.history.push('/mathius-schedule')
    }

    const handleTimothyNavigation = () => {
        props.history.push('/timothy-schedule')
    }

    const handleEdisonNavigation = () => {
        props.history.push('/edison-schedule')
    }


    return (
        <div className="main-container">
            <div className="right-column-carlender">
                <h2>Schedule Meetings with Mentors</h2>
                <h3>You can also schedule meetings with the entire Team</h3>
                <div className="schedule-card-row" >
                    <div className="schedule-card" onClick={handleMathiusNavigation}>
                        <img src="https://res.cloudinary.com/dwa3soopc/image/upload/v1627298292/Starthub/Mathias_dsrylz.jpg" />
                        <div className="card-txt">
                            <h3>Mathius Mobius</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleMathiusNavigation}>Schedule Meeting</button>
                        </div>
                    </div>
                    <div className="schedule-card" onClick={handleTimothyNavigation}>
                        <img src="https://res.cloudinary.com/dwa3soopc/image/upload/v1627289244/Starthub/Timmothy_f5wvi2.jpg" />
                        <div className="card-txt">
                            <h3>Timothy Maenda</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleTimothyNavigation}>Schedule Meeting</button>
                        </div>
                    </div>
                    <div className="schedule-card" onClick={handleEdisonNavigation}>
                        <img src="https://res.cloudinary.com/dwa3soopc/image/upload/v1627298255/Starthub/Edison_h7ok8f.jpg" />
                        <div className="card-txt">
                            <h3>Edison Niwamanya</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleEdisonNavigation}>Schedule Meeting</button>
                        </div>
                    </div>
                    <div className="schedule-card" onClick={handleAndrewNavigation}>
                        <img src="https://res.cloudinary.com/dwa3soopc/image/upload/v1615551884/AndrewTugume2.jpg" />
                        <div className="card-txt">
                            <h3>Andrew Tugume</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleAndrewNavigation}>Schedule Meeting</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
