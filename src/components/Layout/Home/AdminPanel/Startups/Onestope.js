import React from 'react'
import { Progress } from 'antd'

const Onestope = ({ 
    overrall, 
    Q1, 
    Q2, 
    Q3, 
    Q4, 
    username,
    Q1update,
    Q2update,
    Q3update,
    Q4update
 }) => {
    return (
        <div className="overview-card">
            <div className="card-header">
                <h2>{username} OKR Overview</h2>
            </div>
            <div className="overall-row">
                <h4>Overall Progress</h4>
                <div className="progress">
                    <Progress
                        type="line"
                        strokeWidth={10}
                        strokeColor="#4c6439"
                        trailColor='rgba(0, 0, 0, 0.1)'
                        showInfo={false}
                        percent={Math.round(overrall)}
                    />
                </div>
                <h2>{Math.round(!overrall ? 0 : overrall)}%</h2>
            </div>
            <div className="overall-row">
                <div className="quarter-card">
                    <h3>Quarter one</h3>
                    <Progress
                        type="dashboard"
                        strokeWidth='10'
                        gapDegree='130'
                        strokeLinecap='square'
                        trailColor='rgba(0, 0, 0, 0.1)'
                        strokeColor="#4c6439"
                        percent={Math.round(Q1)}
                        format={percent => percent < 100 ? `${percent}% covered` : `Done`}
                    />
                    {Q1update === 0 ? null : <p>{Q1update === 1 ? `${Q1update} change made` : `${Q1update} changes made`}</p>}
                </div>
                <div className="quarter-separator" />
                <div className="quarter-card">
                    <h3>Quarter Two</h3>
                    <Progress
                        type="dashboard"
                        strokeWidth='10'
                        strokeLinecap='square'
                        trailColor='rgba(0, 0, 0, 0.1)'
                        gapDegree='130'
                        strokeColor="#4c6439"
                        percent={Math.round(Q2)}
                        format={percent => percent < 100 ? `${percent}% covered` : `Done`}
                    />
                    {Q2update === 0 ? null : <p>{Q2update === 1 ? `${Q2update} change made` : `${Q2update} changes made`}</p>}
                </div>
                <div className="quarter-separator" />
                <div className="quarter-card">
                    <h3>Quarter Three</h3>
                    <Progress
                        type="dashboard"
                        strokeWidth='10'
                        strokeLinecap='square'
                        trailColor='rgba(0, 0, 0, 0.1)'
                        gapDegree='130'
                        strokeColor="#4c6439"
                        percent={Math.round(Q3)}
                        format={percent => percent < 100 ? `${percent}% covered` : `Done`}
                    />
                    {Q3update === 0 ? null : <p>{Q3update === 1 ? `${Q3update} change made` : `${Q3update} changes made`}</p>}
                </div>
                <div className="quarter-separator" />
                <div className="quarter-card">
                    <h3>Quarter Four</h3>
                    <Progress
                        type="dashboard"
                        strokeLinecap='square'
                        trailColor='rgba(0, 0, 0, 0.1)'
                        strokeWidth='10'
                        gapDegree='130'
                        strokeColor="#4c6439"
                        percent={Math.round(Q4)}
                        format={percent => percent < 100 ? `${percent}% covered` : `Done`}
                    />
                    {Q4update === 0 ? null : <p>{Q4update === 1 ? `${Q4update} change made` : `${Q4update} changes made`}</p>}
                </div>
            </div>
        </div>
    )
}

export default Onestope