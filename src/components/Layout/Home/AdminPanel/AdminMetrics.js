import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspace'
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

    const rev = sortedMetrics.map(el => el.fields['B-Revenue (UGX)'])
    const expense = sortedMetrics.map(el => el.fields['C-Monthly Expenses (UGX)'])

    // console.log(sortedMetrics)

    keysArray = Object.keys(metricsFilter[0] || []).sort()     
     
    const graph1 = sortedMetrics.map(el => el.fields[keysArray && keysArray[0]] )


    let months = []

    for(let month of graph1) {
        months.push(moment(month).format("MMM"))
    }

    const Revenue = {
        labels: months,
        datasets: [
            {
                label: 'Revenue (UGX)',
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data: rev
            }
        ]
    }

    const Expense = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Expenses (UGX)',
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data: expense
            }
        ]
    }
 


    return (
        <div className="admin-main">
                <div className="admin-navbar">
                    <h2>{username.toUpperCase()}</h2>
                    <div className="admin-navbar-links">
                        <p onClick={() => props.history.push('/admin-canvas',{userId: startupId, user: username,key: base_key })}>Lean canvas</p>
                        <p onClick={() => props.history.push('/')}>Startups</p>
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
                {Revenue.datasets[0].data[0] === undefined ? <h1>User has no Metrics Data Recorded</h1> : null}
                <div className="rev-row"> 
                    <div className="revenue">
                        <h3>Revenue</h3>
                        <Line
                            data={Revenue}
                            width={100}
                            height={30}
                        />
                    </div>
                    <div className="revenue">
                        <h3>Expense</h3>
                        <Line
                            data={Expense}
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
