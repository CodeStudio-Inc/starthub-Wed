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
    const [startMonth,setStartMonth] = useState(0)

    const loading = useSelector(state => state.requests.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const metrics = useSelector(state => state.requests.metrics)
    const category = useSelector(state => state.auth.category)
    const link = useSelector(state => state.auth.link)

    const current_date = Date.now()
    const current_year = new Date().getFullYear()
    const previous_year = new Date().getFullYear() - 1

    let current_month
    // result = 10

    current_month = new Date().getMonth()
    
    const checkMonth = (month) => {
        let result = month - 6
        if(result < 0) {
            result = 12 - Math.abs(result)
        }
        setStartMonth(result)
    }
    

    let metricsOfCurrentYr = metrics.filter(el => moment(el.fields['A-Month']).format('YYYY') === current_year.toString())
    const metricsOfPreviousYr = metrics.filter(el => moment(el.fields['A-Month']).format('YYYY') === previous_year.toString())

    metricsOfPreviousYr.forEach(element => {
        if (moment(new Date()).format('MM') === '07') return
        if (moment(new Date()).format('MM') ==='01' ){
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
    // console.log(sixMonthsMetrics)
    // console.log(moment('2021-10-31').format('DD MM YYYY'))

    useEffect(() => {
        checkMonth(current_month)
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


    let sortedMetrics = []


    sixMonthsMetrics.forEach(element => {
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
     
    const rev = sortedMetrics.map(el => el.fields['B-Monthly Revenue (UGX)'])
     const expense = sortedMetrics.map(el => el.fields['C-Monthly Expenses (UGX)'])  
     
    const metricsFilter = metrics.map(el => el.fields)

    let keysArray = []

    keysArray = Object.keys(metricsFilter[0] || []).sort()
    const graph1 = sortedMetrics.map(el => el.fields[keysArray[0]])
    
    let months = []

    for(let month of graph1) {
        months.push(moment(month).format("MMM"))
    }


    const Revenue = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Revenue (UGX)',
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
        <div className="dash-container">
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            {category === 'academy' || category === 'internal' ? 
            <div className="dash-menu">
                <h1>You have no Metrics data registered</h1>
            </div> 
            : 
            <div className="dash-menu">
                <div className="revenue-row">
                    <div className="graph-row">
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

                        <iframe src={link} frameborder="0" onmousewheel="" width="100%" height="533"></iframe>
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