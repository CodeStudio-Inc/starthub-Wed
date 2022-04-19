import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import * as actionCreators from '../../store/actionCreators'

import './Dashboard.css'
const Dashboard = (props) => {

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [metricsData, setMetricsData] = useState([])
    const [startMonth, setStartMonth] = useState(0)

    const loading = useSelector(state => state.requests.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const metrics = useSelector(state => state.requests.metrics)
    const category = useSelector(state => state.auth.category)
    const link = useSelector(state => state.auth.link)

    
    const current_date = Date.now()
    const current_year = new Date().getFullYear()
    const previous_year = new Date().getFullYear() - 1
    
    let current_month, previous_month
    
    current_month = new Date().getMonth() + 1
    previous_month = (new Date().getMonth() + 1) - 1
    const month_revenue = metrics.filter(e => moment(e.fields['A-Month']).format('MM') === current_month.toString() )
    // console.log(metrics)
    
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
        if (moment(element.fields['A-Month']).format('MM') === '02' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 14, month: `Feb${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '03' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 15, month: `Mar${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '04' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 16, month: `Apr${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '05' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 17, month: `May${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '06' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 18, month: `Jun${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '07' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 19, month: `Jul${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '08' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 20, month: `Aug${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '09' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 21, month: `Sep${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '10' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 22, month: `Oct${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '11' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 23, month: `Nov${current_year.toString()}` })
        if (moment(element.fields['A-Month']).format('MM') === '12' && moment(element.fields['A-Month']).format('YYYY') === current_year.toString()) new_metrics.push({...element, index: 24, month: `Dec${current_year.toString()}` })
    })

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

    
    new_metrics.sort((a,b) => a.index-b.index)
     
    const rev = new_metrics.map(el => el.fields['B-Monthly Revenue (UGX)'])
     const expense = new_metrics.map(el => el.fields['C-Monthly Expenses (UGX)'])


    const month = Array.from(new_metrics, ({ month }) => month )

    // console.log(kept,'month')
    const Revenue = {
        labels: month,
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
                        <iframe src={link} frameborder="0" width="100%" height="1100">
                            <button>submit</button>
                        </iframe>
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