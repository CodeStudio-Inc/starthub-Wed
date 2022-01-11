import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
import * as actionCreators from '.././../../store/actionCreators'

import './Admin.css'
const AdminMetrics = (props) => {
    
    
    const metrics = useSelector(state => state.admin.metrics)
    const base_key = props.location.state.key
    const username = props.location.state.user
    const startupId = props.location.state.userId
    const userId = props.location.state.userId
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        dispatch(actionCreators.getAdminMetricsData(base_key))
    },[])
    
    const metricsFilter = metrics && metrics.map(el => el.fields)

    let keysArray, sortedMetrics = []

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
    })

    sortedMetrics.sort((a,b) => a.monthIndex-b.monthIndex)

    // console.log(sortedMetrics)

    keysArray = Object.keys(metricsFilter[0] || []).sort()     
     
    const graph1 = sortedMetrics.map(el => el.fields[keysArray && keysArray[0]] )
    const graph2 = sortedMetrics.map(el => el.fields[keysArray && keysArray[1]] )
    const graph3 = sortedMetrics.map(el => el.fields[keysArray && keysArray[2]] )
    const graph4 = sortedMetrics.map(el => el.fields[keysArray && keysArray[3]] )
    const graph5 = sortedMetrics.map(el => el.fields[keysArray && keysArray[4]] )
    const graph6 = sortedMetrics.map(el => el.fields[keysArray && keysArray[5]] )
    const graph7 = sortedMetrics.map(el => el.fields[keysArray && keysArray[6]] )
    const graph8 = sortedMetrics.map(el => el.fields[keysArray && keysArray[7]] )

    const mon = metrics.map(el => el.fields['A-Month'] )


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


    return (
        <div className="admin-main">
                <div className="admin-navbar">
                    <h2>{username.toUpperCase()}</h2>
                    <div className="admin-navbar-links">
                        <p onClick={() => props.history.push('/admin-canvas',{userId: startupId, user: username,key: base_key })}>Lean canvas</p>
                        <p onClick={() => props.history.push('/')}>Dashboard</p>
                        <div className="admin-icon-row">
                            <KeyboardBackspaceRoundedIcon 
                            className="admin-navbar-icon"
                            onClick={() => props.history.goBack()} 
                            style={{ fontSize: '25px', color:'#dfa126' }} 
                            />
                            <h4 onClick={() => props.history.goBack()}>back</h4>
                        </div>
                    </div>
                </div>
            <div className="admin">
                <div className="rev-row">
                    <div className="revenue">
                        <h3>{keysArray[1] && keysArray[1].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph1}
                            width={100}
                            height={30}
                        />
                    </div>
                    <div className="revenue">
                        <h3>{keysArray[2] && keysArray[2].split('-').splice(1)}</h3>
                        <Line
                            data={line_graph2}
                            width={100}
                            height={30}
                        />
                    </div>
                </div>
   
                <div className="rev-row">
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

                <div className="rev-row">
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

                <div className="rev-row">
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
                            data={line_graph2}
                            width={100}
                            height={30}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMetrics
