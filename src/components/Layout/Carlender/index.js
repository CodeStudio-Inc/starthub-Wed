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


    return (
        <div className="main-container">
            <div className="right-column-carlender">
                <h2>Schedule Meetings with Mentors</h2>
                <h3>You can also schedule meetings with the entire Team</h3>
                <div className="schedule-card-row" >
                    <div className="schedule-card" onClick={handleAndrewNavigation}>
                        <img src="https://res.cloudinary.com/dwa3soopc/image/upload/v1615551884/AndrewTugume2.jpg" />
                        <div className="card-txt">
                            <h3>Andrew Tugume</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleAndrewNavigation}>Schedule Meeting</button>
                        </div>
                    </div>
                    <div className="schedule-card" onClick={handleMathiusNavigation}>
                        <img src="https://changemakerxchange.org/wp-content/uploads/2020/02/matthias-mocc88bius-profile-picture-scaled-800x800.jpg" />
                        <div className="card-txt">
                            <h3>Mathius Mobius</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleMathiusNavigation}>Schedule Meeting</button>
                        </div>
                    </div>
                    {/* <div className="schedule-card" onClick={handleYusufuNavigation}>
                        <img src="https://res.cloudinary.com/dwa3soopc/image/upload/v1617797017/rsz_2yusuf_vl96o4.jpg" />
                        <div className="card-txt">
                            <h3>Yusufu Mutamba</h3>
                            <p>StartHub Africa Catalyzer Mentor</p>
                            <button onClick={handleYusufuNavigation}>Schedule Meeting</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default index
