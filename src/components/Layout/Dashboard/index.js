import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import * as actionCreators from '../../store/actionCreators'


import './Dashboard.css'

const Dashboard = (props) => {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [metricsData, setMetricsData] = useState([])

    const baseId = useSelector(state => state.auth.base_key)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const metrics = useSelector(state => state.requests.metrics)

    const current_date = Date.now()

    useEffect(() => {

        if(current_date >= expire) {
           return setOpen(true)
        }
        dispatch(actionCreators.getMetricsData())
    }, [])
    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }
    
    const dispatch = useDispatch()

    const metricsFilter = metrics.map(el => el.fields )

    const date = moment(new Date().toISOString()).format("YYYY-DD-MM")



    let keysArray = []

    keysArray = Object.keys(metricsFilter && metricsFilter[0]).sort()

    
    const graph1 = metrics.map(el => el.fields[keysArray[0]] )
    const graph2 = metrics.map(el => el.fields[keysArray[1]] )
    const graph3 = metrics.map(el => el.fields[keysArray[2]] )
    const graph4 = metrics.map(el => el.fields[keysArray[3]] )
    const graph5 = metrics.map(el => el.fields[keysArray[4]] )
    const graph6 = metrics.map(el => el.fields[keysArray[5]] )
    const graph7 = metrics.map(el => el.fields[keysArray[6]] )
    const graph8 = metrics.map(el => el.fields[keysArray[7]] )
    



    const line_graph1 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[1],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph2
            }
        ]
    }

    const line_graph2 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[2],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph3
            }
        ]
    }

    const line_graph3 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[3],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph4
            }
        ]
    }

    const line_graph4 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[4],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph5
            }
        ]
    }

    const line_graph5 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[5],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph6
            }
        ]
    }

    const line_graph6 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[6],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph7
            }
        ]
    }

    const line_graph7 = {
        labels: graph1,
        datasets: [
            {
                label: keysArray[7],
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph8
            }
        ]
    }


    return (
        <div className="main-container">
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            {open ? <ModalUI setOpen={setOpen}>
                <div className="modal-row">
                    <CloseIcon onClick={() => setOpen(false)} className="close-icon" style={{ fontSize: '30px' }} />
                </div>
                <iframe class="airtable-embed" src="https://airtable.com/embed/shrS6aSAZIgqjP1g0?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="95%" ></iframe>
            </ModalUI> : null}
            <div className="right-column-overview">
                <div className="overview-header-main">
                </div>
                <div className="revenue-row">
                    <div className="graph-row">
                    <div className="revenue">
                        <Line
                            data={line_graph1}
                            width={100}
                            height={20}
                        />
                    </div>

                    <div className="revenue">
                        <Line
                            data={line_graph2}
                            width={100}
                            height={20}
                        
                        />
                    </div>
                    </div>

                    <div className="graph-row">
                    <div className="revenue">
                        <Line
                            data={line_graph3}
                            width={100}
                            height={20}
                        />
                    </div>

                    <div className="revenue">
                        <Line
                            data={line_graph4}
                            width={100}
                            height={20}
                        />
                    </div>
                    </div>

                    <div className="graph-row">
                    <div className="revenue">
                        <Line
                            data={line_graph5}
                            width={100}
                            height={20}
                        />
                    </div>

                    <div className="revenue">
                        <Line
                            data={line_graph6}
                            width={100}
                            height={20}
                        
                        />
                    </div>
                    </div>

                    <div className="graph-row">
                    <div className="revenue">
                        <Line
                            data={line_graph7}
                            width={100}
                            height={20}
                        />
                    </div>

                    <div className="revenue" style={{visibility:'hidden'}}>
                        <Line
                            data={line_graph6}
                            width={100}
                            height={20}
                        
                        />
                    </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Dashboard

// options={{
//     maintainAspectRatio: false,
//     responsive: true

// }}