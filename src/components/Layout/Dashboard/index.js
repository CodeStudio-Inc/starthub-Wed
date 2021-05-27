import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Line, Pie } from 'react-chartjs-2'

import './Dashboard.css'
const Dashboard = (props) => {

    const [open, setOpen] = useState(false)


    const dispatch = useDispatch()

    const data = useSelector(state => state.requests.data)
    const expense = useSelector(state => state.requests.expense)
    const metrics = useSelector(state => state.requests.metrics)
    console.log(metrics, 'dk')

    const array = metrics.map(el => {
        return el.fields['MonthlyRevenue(UGX)']
    })

    const players = metrics.map(el => {
        return el.fields['New players who paid']
    })

    const meetings = metrics.map(el => {
        return el.fields['Meetings with sponsors this month']
    })

    console.log(meetings, 'meetings')


    useEffect(() => {
        dispatch(actionCreators.getAirTableData())
        dispatch(actionCreators.getExpenseData())
        dispatch(actionCreators.getMetricsData())
    }, [])


    const janstartDate = '2021-01-01'
    const janendDate = '2021-01-31'
    const febstartDate = '2021-02-01'
    const febendDate = '2021-02-28'
    const marchstartDate = '2021-03-01'
    const marchendDate = '2021-03-31'
    const aprilstartDate = '2021-04-01'
    const aprilendDate = '2021-04-31'
    const maystartDate = '2021-05-01'
    const mayendDate = '2021-05-31'
    const junstartDate = '2021-06-01'
    const junendDate = '2021-06-31'

    const jan = data.filter(el => el.fields['DATE'] >= janstartDate && el.fields['DATE'] <= janendDate).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const feb = data.filter(el => el.fields['DATE'] >= febstartDate && el.fields['DATE'] <= febendDate).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const march = data.filter(el => el.fields['DATE'] >= marchstartDate && el.fields['DATE'] <= marchendDate).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const april = data.filter(el => el.fields['DATE'] >= aprilstartDate && el.fields['DATE'] <= aprilendDate).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const may = data.filter(el => el.fields['DATE'] >= maystartDate && el.fields['DATE'] <= mayendDate).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const june = data.filter(el => el.fields['DATE'] >= junstartDate && el.fields['DATE'] <= junendDate).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)

    const expensejan = expense.filter(el => el.fields['DATE '] >= janstartDate && el.fields['DATE '] <= janendDate).length
    const expensefeb = expense.filter(el => el.fields['DATE '] >= febstartDate && el.fields['DATE '] <= febendDate).length
    const expensemarch = expense.filter(el => el.fields['DATE '] >= marchstartDate && el.fields['DATE '] <= marchendDate).length
    const expenseapril = expense.filter(el => el.fields['DATE '] >= aprilstartDate && el.fields['DATE '] <= aprilendDate).length
    const expensemay = expense.filter(el => el.fields['DATE '] >= maystartDate && el.fields['DATE '] <= mayendDate).length
    const expensejune = expense.filter(el => el.fields['DATE '] >= junstartDate && el.fields['DATE '] <= junendDate).length

    const revenuejan = data.filter(el => el.fields['DATE'] >= janstartDate && el.fields['DATE'] <= janendDate).length
    const revenuefeb = data.filter(el => el.fields['DATE'] >= febstartDate && el.fields['DATE'] <= febendDate).length
    const revenuemarch = data.filter(el => el.fields['DATE'] >= marchstartDate && el.fields['DATE'] <= marchendDate).length
    const revenueapril = data.filter(el => el.fields['DATE'] >= aprilstartDate && el.fields['DATE'] <= aprilendDate).length
    const revenuemay = data.filter(el => el.fields['DATE'] >= maystartDate && el.fields['DATE'] <= mayendDate).length
    const revenuejune = data.filter(el => el.fields['DATE'] >= junstartDate && el.fields['DATE'] <= junendDate).length

    // console.log(revenuemay, 'hhh')


    const revenue = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Revenues',
                backgroundColor: '#dfa126',
                borderColor: '#69191b',
                borderWidth: 1,
                data: array
            }
        ]
    };

    const soccer = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'New players who paid',
                backgroundColor: '#dfa126',
                borderColor: '#69191b',
                borderWidth: 1,
                data: players
            }
        ]
    };

    const meet = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Meetings with sponsors this month',
                backgroundColor: '#dfa126',
                borderColor: '#69191b',
                borderWidth: 1,
                data: meetings
            }
        ]
    };


    const expenseDataEntry = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Total Monthly Expense Data Entry',
                backgroundColor: '#dfa126',
                borderColor: '#69191b',
                borderWidth: 1,
                data: [expensejan, expensefeb, expensemarch, expenseapril, expensemay, expensejune]
            },
            {
                label: 'Total Monthly Revenue Data Entry',
                backgroundColor: '#69191b',
                borderColor: '#dfa126',
                borderWidth: 1,
                data: [revenuejan, revenuefeb, revenuemarch, revenueapril, revenuemay, revenuejune]
            }
        ]
    };




    return (
        <div className="main-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="modal-row">
                    <CloseIcon onClick={() => setOpen(false)} className="close-icon" style={{ fontSize: '30px' }} />
                </div>
                <iframe class="airtable-embed" src="https://airtable.com/embed/shrS6aSAZIgqjP1g0?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="95%" ></iframe>
            </ModalUI> : null}
            <div className="right-column-overview">
                <div className="overview-header-main">
                    {/* <div className="header-right" onClick={handleAirtableNavigate}>
                        <h2>Go to overview</h2>
                        <ArrowForwardIcon className="arrow-icon" style={{ fontSize: '25px' }} />
                    </div> */}
                </div>
                <div className="revenue-row">
                    <div className="revenue">
                        <div className="overview-header">
                            <h2>Weekly Finacials Submission</h2>
                        </div>
                        <Line
                            data={expenseDataEntry}
                            width={100}
                            height={20}
                        // options={{
                        //     maintainAspectRatio: false,
                        //     responsive: true

                        // }}
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
                        // options={{
                        //     maintainAspectRatio: false,
                        //     responsive: true

                        // }}
                        />
                    </div>

                    <div className="revenue">
                        <div className="overview-header">
                            <h2>New Players Who paid</h2>
                        </div>
                        <Line
                            data={soccer}
                            width={100}
                            height={20}
                        // options={{
                        //     maintainAspectRatio: false,
                        //     responsive: true

                        // }}
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
                        // options={{
                        //     maintainAspectRatio: false,
                        //     responsive: true

                        // }}
                        />
                    </div>


                </div>

                {/* <div className="expense">
                    <div className="stats-card-chart">
                        <div className="stats-header">
                            <h3>Cost Structure</h3>
                        </div>
                        <Pie
                            data={expenseData}
                            width={100}
                            height={20}

                            options={{
                                maintainAspectRatio: false,
                                responsive: true

                            }}
                        />
                    </div>
                    <div className="stats-card-chart">
                        <div className="stats-header">
                            <h3>Revenue Streams</h3>
                        </div>
                        <Line
                            data={aquisitionData}
                            width={100}
                            height={20}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true
                            }}
                        />
                    </div>
                </div> */}

                {/* <div className="header-row">
                    <button onClick={() => setOpen(true)}>Form</button>
                    <button onClick={handleAirtableNavigate}>Edit</button>
                </div> */}
                {/* <div className="air-table">
                    <iframe class="airtable-embed" src="https://airtable.com/embed/shr8yQb2R2ss8I9VE?backgroundColor=green" frameborder="0" onmousewheel="" style={{ width: '100%', height: '90vh' }} ></iframe>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard
