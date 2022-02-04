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

    const loading = useSelector(state => state.requests.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const metrics = useSelector(state => state.requests.metrics)
    const category = useSelector(state => state.auth.category)
    const link = useSelector(state => state.auth.link)

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


    const metricsFilter = metrics.map(el => el.fields)

    let sortedMetrics = []


    metrics.forEach(element => {
        if(moment(element.fields['A-Month']).format('MMM') === 'Jan')  sortedMetrics.push({...element, monthIndex: 1})
        if(moment(element.fields['A-Month']).format('MMM') === 'Feb')  sortedMetrics.push({...element, monthIndex: 2})
        if(moment(element.fields['A-Month']).format('MMM') === 'Mar')  sortedMetrics.push({...element, monthIndex: 3})
        if(moment(element.fields['A-Month']).format('MMM') === 'Apr')  sortedMetrics.push({...element, monthIndex: 4})
        if(moment(element.fields['A-Month']).format('MMM') === 'May')  sortedMetrics.push({...element, monthIndex: 5})
        if(moment(element.fields['A-Month']).format('MMM') === 'Jun')  sortedMetrics.push({...element, monthIndex: 6})
        if(moment(element.fields['A-Month']).format('MMM') === 'Jul')  sortedMetrics.push({...element, monthIndex: 7})
        if(moment(element.fields['A-Month']).format('MMM') === 'Aug')  sortedMetrics.push({...element, monthIndex: 8})
        if(moment(element.fields['A-Month']).format('MMM') === 'Sep')  sortedMetrics.push({...element, monthIndex: 9})
        if(moment(element.fields['A-Month']).format('MMM') === 'Oct')  sortedMetrics.push({...element, monthIndex: 10})
        if(moment(element.fields['A-Month']).format('MMM') === 'Nov')  sortedMetrics.push({...element, monthIndex: 11})
        if(moment(element.fields['A-Month']).format('MMM') === 'Dec')  sortedMetrics.push({...element, monthIndex: 12})
        
    });
    
     sortedMetrics.sort((a,b) => a.monthIndex-b.monthIndex)
     
     let keysArray = []

     keysArray = Object.keys(metricsFilter[0] || []).sort()  
     
     
    const graph1 = sortedMetrics.map(el => el.fields[keysArray[0]] )
    const graph2 = sortedMetrics.map(el => el.fields[keysArray[1]] )
    const graph3 = sortedMetrics.map(el => el.fields[keysArray[2]] )
    const graph4 = sortedMetrics.map(el => el.fields[keysArray[3]] )
    const graph5 = sortedMetrics.map(el => el.fields[keysArray[4]] )
    const graph6 = sortedMetrics.map(el => el.fields[keysArray[5]] )
    const graph7 = sortedMetrics.map(el => el.fields[keysArray[6]] )
    const graph8 = sortedMetrics.map(el => el.fields[keysArray[7]] )
    
    
    let months = []

    for(let month of graph1) {
        months.push(moment(month).format("MMM"))
    }

    

    const line_graph1 = {
        labels: months,
        datasets: [
            {
                label: keysArray[1] && keysArray[1].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph2
            }
        ]
    }

    const line_graph2 = {
        labels: months,
        datasets: [
            {
                label: keysArray[2] && keysArray[2].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph3
            }
        ]
    }

    const line_graph3 = {
        labels: months,
        datasets: [
            {
                label: keysArray[3] && keysArray[3].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph4
            }
        ]
    }

    const line_graph4 = {
        labels: months,
        datasets: [
            {
                label: keysArray[4] && keysArray[4].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph5
            }
        ]
    }

    const line_graph5 = {
        labels: months,
        datasets: [
            {
                label: keysArray[5] && keysArray[5].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph6
            }
        ]
    }

    const line_graph6 = {
        labels: months,
        datasets: [
            {
                label: keysArray[6] && keysArray[6].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph7
            }
        ]
    }

    const line_graph7 = {
        labels: months,
        datasets: [
            {
                label: keysArray[7] && keysArray[7].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph8
            }
        ]
    }

    // console.log(link)

    return (
        <div className="dash-container">
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            {/* {open ? <ModalUI setOpen={setOpen}>
                <div className="modal-row">
                    <CloseIcon onClick={() => setOpen(false)} className="close-icon" style={{ fontSize: '30px' }} />
                </div>
                <iframe class="airtable-embed" src="https://airtable.com/embed/shrS6aSAZIgqjP1g0?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="95%" ></iframe>
            </ModalUI> : null} */}
            {category === 'academy' || category === 'internal' ? 
            <div className="dash-menu">
                <h1>You have no Metrics data registered</h1>
            </div> 
            : 
            <div className="dash-menu">
                <div className="revenue-row">
                    <iframe src={link} frameborder="0" onmousewheel="" width="100%" height="533"></iframe>
                    <div className="graph-row">
                    {line_graph1.datasets[0].data[0] === undefined ? null :
                    <div className="revenue">
                        <h3>{keysArray[1] && keysArray[1].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph1}
                            width={100}
                            height={30}
                        />
                    </div>}

                    {line_graph2.datasets[0].data[0] === undefined ? null :
                    <div className="revenue">
                        <h3>{keysArray[2] && keysArray[2].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph2}
                            width={100}
                            height={30}
                        />
                    </div>}
                    </div>

                    <div className="graph-row">
                    {line_graph3.datasets[0].data[0] === undefined ? null :
                    <div className="revenue">
                        <h3>{keysArray[3] && keysArray[3].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph3}
                            width={100}
                            height={30}
                        />
                    </div>}

                    {line_graph4.datasets[0].data[0] === undefined ? null :
                    <div className="revenue">
                        <h3>{keysArray[4] && keysArray[4].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph4}
                            width={100}
                            height={30}
                        />
                    </div>}
                    </div>

                    <div className="graph-row">
                    {line_graph5.datasets[0].data[0] === undefined ? null :
                    <div className="revenue">
                        <h3>{keysArray[5] && keysArray[5].split('-').splice(1)}</h3>
                         <Line
                            data={line_graph5}
                            width={100}
                            height={30}
                        />
                    </div>}

                    {line_graph6.datasets[0].data[0] === undefined ? null : 
                    <div className="revenue">
                        <h3>{keysArray[6] && keysArray[6].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph6}
                            width={100}
                            height={30}
                        
                        />
                    </div>}
                    </div>

                    <div className="graph-row">
                    {line_graph7.datasets[0].data[0] === undefined ? null : 
                    <div className="revenue">
                        <h3>{keysArray[7] && keysArray[7].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph7}
                            width={100}
                            height={30}
                        />
                    </div>}

                    <div className="revenue" style={{visibility:'hidden'}}>
                        <Line
                            data={line_graph6}
                            width={100}
                            height={30}
                        
                        />
                    </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Dashboard

// options={{
//     maintainAspectRatio: false,
//     responsive: true

// }}