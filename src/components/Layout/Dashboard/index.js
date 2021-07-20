import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import moment from 'moment'
import Airtable from 'airtable'
import { Line } from 'react-chartjs-2'
import * as actionCreators from '../../store/actionCreators'


import './Dashboard.css'

const Dashboard = (props) => {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [metricsData, setMetricsData] = useState([])

    const baseId = useSelector(state => state.auth.base_key)
    const expire = useSelector(state => state.auth.tokenExpiration)

    const current_date = Date.now()

    useEffect(() => {

        if(current_date >= expire) {
           return setOpen(true)
        }

        const key = process.env.REACT_APP_API_KEY
        var base = new Airtable({apiKey: key}).base(baseId)

        base('Metrics').select({
        maxRecords: 20
        }).eachPage(function page(records, fetchNextPage) {
            setMetricsData(records)
            fetchNextPage();

        }, function done(err) {
        if (err) { console.error(err); return }
        })
    }, [])
    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }
    
    const dispatch = useDispatch()

    const metricsFilter = metricsData && metricsData.map(el => el.fields )

    const date = moment(new Date().toISOString()).format("YYYY-DD-MM")

    // const filterKeys = () => {

    //     const singleObject = metricsFilter.find(e => e.Month <= date)
        // return  setkeysArrayFilter(Object.keys(singleObject))
    // }

    const no_object= {"No Graph": 1}


    // console.log(Object.keys(null ? no_object : metricsFilter[0]),'Keys')
    
    // const graph1 = metricsFilter.map(el => el.fields[keysArray[0]] )
    // const graph2 = metricsFilter.map(el => el.fields[keysArray[1]] )
    // const graph3 = metricsFilter.map(el => el.fields[keysArray[2]] )
    // const graph4 = metricsFilter.map(el => el.fields[keysArray[3]] )
    // const graph5 = metricsFilter.map(el => el.fields[keysArray[4]] )
    // const graph6 = metricsFilter.map(el => el.fields[keysArray[5]] )
    // const graph7 = metricsFilter.map(el => el.fields[keysArray[6]] )
    // const graph8 = metricsFilter.map(el => el.fields[keysArray[7]] )
    
    // console.log(graph6,'Values')
        

    // console.log(revenuemay, 'hhh')


    // const revenue = {
    //     labels: months,
    //     datasets: [
    //         {
    //             label: keysArray[2],
    //             backgroundColor: '#dfa126',
    //             borderColor: '#222323',
    //             borderWidth: 1,
    //             data:revenu
    //         }
    //     ]
    // };

    // const soccer = {
    //     labels: months,
    //     datasets: [
    //         {
    //             label: keysArray[1],
    //             backgroundColor: '#dfa126',
    //             borderColor: '#222323',
    //             borderWidth: 1,
    //             data: players
    //         }
    //     ]
    // };

    // const meet = {
    //     labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
    //     datasets: [
    //         {
    //             label: 'Meetings with sponsors this month',
    //             backgroundColor: '#dfa126',
    //             borderColor: '#222323',
    //             borderWidth: 1,
    //             data: meetings
    //         }
    //     ]
    // };






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
                    <h1>Still building content, try again later</h1>
                    {/* <div className="graph-row">
                    <div className="revenue">
                        <div className="overview-header">
                            <h2>Weekly Finacials Submission</h2>
                        </div>
                        <Line
                            data={revenue}
                            width={100}
                            height={20}
                        />
                    </div>

                    <div className="revenue">
                        <div className="overview-header">
                            <h2>Monthly Revenue</h2>
                        </div>
                        <Line
                            data={revenue}
                            width={100}
                            height={20}
                        
                        />
                    </div>
                    </div> */}

                    {/* <div className="graph-row">
                    <div className="revenue">
                        <div className="overview-header">
                            <h2>New Players Who paid</h2>
                        </div>
                        <Line
                            data={soccer}
                            width={100}
                            height={20}
                        />
                    </div>

                    <div className="revenue">
                        <div className="overview-header">
                            <h2>Meetings with sponsers this month</h2>
                        </div>
                        <Line
                            data={meet}
                            width={100}
                            height={20}
                        />
                    </div>
                    </div> */}


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