import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Line, Pie } from 'react-chartjs-2'

import './Dashboard.css'
import moment from 'moment'
const Dashboard = (props) => {

    const [open, setOpen] = useState(false)


    const dispatch = useDispatch()

    const data = useSelector(state => state.requests.data)
    const expense = useSelector(state => state.requests.expense)


    useEffect(() => {
        dispatch(actionCreators.getAirTableData())
        dispatch(actionCreators.getExpenseData())
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


    const expenseTotal = expense.reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    // console.log(data)


    const events = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'event costs').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const helpers = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'onscore helpers').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const transport_mgt = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'Transport mgt').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const transport_players = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'Transport players').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const airtime = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'Airtime/ Data').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const salary = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'onscore salaries').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const IT = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'IT costs').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const allawance = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'onscore allawances').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const equipment = expense.filter(el => el.fields['EXPENSE CATEGORY'] === 'club equipments').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)

    const source1 = data.filter(el => el.fields.SOURCE.includes('REGISTRATION RUKUNGIRI')).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const source2 = data.filter(el => el.fields.SOURCE.includes('TICKETING')).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const source3 = data.filter(el => el.fields.SOURCE.includes('INVESTOR')).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const source4 = data.filter(el => el.fields.SOURCE.includes('REGISTRATION KAMPALA')).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const source5 = data.filter(el => el.fields.SOURCE.includes('SPONSORS')).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    const source6 = data.filter(el => el.fields.SOURCE.includes('SPORTS PRODUCTS')).reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0)
    // console.log(source6, 'hhh')


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

    const state = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Total Cash Revenues',
                backgroundColor: '#dfa126',
                borderColor: '#fff',
                borderWidth: 1,
                data: [jan, feb, march, april, may, june]
            }
        ]
    };

    const expenseData = {
        labels: ['Event Costs', 'Onscore Helpers', 'Transport Managment', 'Transport Players', 'Airtime/Data', 'Onscore Salaries', 'IT Costs', 'Onscore Allawances', 'Club Equipments'],
        datasets: [
            {
                label: 'Total Expenditures',
                backgroundColor: '#dfa126',
                borderColor: '#fff',
                borderWidth: 1,
                data: [events, helpers, transport_mgt, transport_players, airtime, salary, IT, allawance, equipment]
            }
        ]
    };

    const aquisitionData = {
        labels: ['Registration Rukungiri', 'Ticketing', 'Investors', 'Registration Kampala', 'Sponsors', 'Sports Products'],
        datasets: [
            {
                label: 'Total Expenditures',
                backgroundColor: '#dfa126',
                borderColor: '#fff',
                borderWidth: 1,
                data: [source1, source2, source3, source4, source5, source6]
            }
        ]
    };

    const expenseDataEntry = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Total Monthly Expense Data Entry',
                backgroundColor: '#dfa126',
                borderColor: '#fff',
                borderWidth: 1,
                data: [expensejan, expensefeb, expensemarch, expenseapril, expensemay, expensejune]
            },
            {
                label: 'Total Monthly Revenue Data Entry',
                backgroundColor: '#69191b',
                borderColor: '#fff',
                borderWidth: 1,
                data: [revenuejan, revenuefeb, revenuemarch, revenueapril, revenuemay, revenuemay]
            }
        ]
    };




    const handleAirtableNavigate = () => {
        props.history.push('/air-table')
    }

    return (
        <div className="main-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="modal-row">
                    <CloseIcon onClick={() => setOpen(false)} className="close-icon" style={{ fontSize: '30px' }} />
                </div>
                <iframe class="airtable-embed" src="https://airtable.com/embed/shrS6aSAZIgqjP1g0?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="95%" ></iframe>
            </ModalUI> : null}
            <div className="left-column">
                <Sidebar />
            </div>
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
                            <h2> Six Months Revenue Development</h2>
                        </div>
                        <Line
                            data={state}
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
                </div>

                <div className="expense">
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
                </div>

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
