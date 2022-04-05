import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspace'
import * as actionCreators from '.././../../store/actionCreators'

import './Admin.css'
const AdminMetrics = (props) => {

    const [startMonth, setStartMonth] = useState(0)
    
    
    const metrics = useSelector(state => state.admin.metrics)
    const base_key = props.location.state.key
    const username = props.location.state.user
    const startupId = props.location.state.userId
    const userId = props.location.state.userId


    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        checkMonth(current_month)
        dispatch(actionCreators.getAdminMetricsData(base_key))
    },[])

    const current_date = Date.now()
    const current_year = new Date().getFullYear()
    const previous_year = new Date().getFullYear() - 1

    let current_month

    current_month = new Date().getMonth()

    const checkMonth = (month) => {
        let result = month - 6
        if (result < 0) {
            result = 12 - Math.abs(result)
        }
        setStartMonth(result)
    }


    let metricsOfCurrentYr = metrics.filter(el => moment(el.fields['A-Month']).format('YYYY') === current_year.toString())
    const metricsOfPreviousYr = metrics.filter(el => moment(el.fields['A-Month']).format('YYYY') === previous_year.toString())

    metricsOfPreviousYr.forEach(element => {
        if (moment(new Date()).format('MM') === '07') return
        if (moment(new Date()).format('MM') === '01') {
            if (moment(element.fields['A-Month']).format('MM') >= '07') metricsOfCurrentYr.push(element)
        }
        if (moment(new Date()).format('MM') === '02') {
            if (moment(element.fields['A-Month']).format('MM') >= '08') metricsOfCurrentYr.push(element)
        }
        if (moment(new Date()).format('MM') === '03') {
            if (moment(element.fields['A-Month']).format('MM') >= '09') metricsOfCurrentYr.push(element)
        }
        if (moment(new Date()).format('MM') === '04') {
            if (moment(element.fields['A-Month']).format('MM') >= '10') metricsOfCurrentYr.push(element)
        }
        if (moment(new Date()).format('MM') === '05') {
            if (moment(element.fields['A-Month']).format('MM') >= '11') metricsOfCurrentYr.push(element)
        }
        if (moment(new Date()).format('MM') === '06') {
            if (moment(element.fields['A-Month']).format('MM') >= '12') metricsOfCurrentYr.push(element)
        }
    })

    const sixMonthsMetrics = metricsOfCurrentYr.filter(el => moment(el.fields['A-Month']).format('MM') >= startMonth.toString() || moment(el.fields['A-Month']).format('MM') <= current_month.toString())
    
    let new_metrics = []



    sixMonthsMetrics.forEach(element => {
        if (moment(element.fields['A-Month']).format('MM') === '01' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 1, month: `Jan${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '02' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 2, month: `Feb${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '03' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 3, month: `Mar${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '04' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 4, month: `Apr${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '05' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 5, month: `May${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '06' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 6, month: `Jun${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '07' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 7, month: `Jul${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '08' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 8, month: `Aug${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '09' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 9, month: `Sep${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '10' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 10, month: `Oct${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '11' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 11, month: `Nov${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '12' && moment(element.fields['A-Month']).format('YYYY') === previous_year.toString()) new_metrics.push({ ...element, index: 12, month: `Dec${previous_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '01' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 13, month: `Jan${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '02' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 14, month: `Feb${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '03' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 15, month: `Mar${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '04' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 16, month: `Apr${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '05' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 17, month: `May${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '06' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 18, month: `Jun${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '07' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 19, month: `Jul${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '08' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 20, month: `Aug${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '09' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 21, month: `Sep${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '10' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 22, month: `Oct${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '11' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 23, month: `Nov${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '12' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({ ...element, index: 24, month: `Dec${current_year.toString()}` })
    })

    new_metrics.sort((a, b) => a.index - b.index)

    const rev = new_metrics.map(el => el.fields['B-Monthly Revenue (UGX)'])
    const expense = new_metrics.map(el => el.fields['C-Monthly Expenses (UGX)'])


    const month = Array.from(new_metrics, ({ month }) => month)

    const Revenue = {
        labels: month,
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
        labels: month,
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
                {/* {Revenue.datasets[0].data[0] === undefined ? <h1>User has no Metrics Data Recorded</h1> : null} */}
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
