import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../store/actionCreators'
import { Doughnut } from 'react-chartjs-2'
import moment from 'moment'

import './Dashboard.css'
const AirTable = () => {

    const [revenue, setRevenue] = useState('')
    const [cashAmount, setCashAmount] = useState(0)
    const [mobileMoneyAmount, setMobileMoneyAmount] = useState(0)

    const dispatch = useDispatch()

    const data = useSelector(state => state.requests.data)
    // console.log(data, 'jj')

    const headers = [
        // { label: 'Emploment Fullname' },
        // { label: 'Name Of Customer' },
        { label: 'Saving Account' },
        { label: 'Amount' },
        // { label: 'Date' },
        // { label: 'Created' },
    ]

    useEffect(() => {
        dispatch(actionCreators.getAirTableData())
        getAmount()
        getCashAmount()
        MobileMoneyAmount()
    }, [])

    const getAmount = () => {
        setRevenue(data.reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0))
    }


    const getCashAmount = () => {
        setCashAmount(data.filter(el => el.fields['SAVING ACCOUNT'] === 'CASH ACCOUNT').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0))
    }

    const MobileMoneyAmount = () => {
        setMobileMoneyAmount(data.filter(el => el.fields['SAVING ACCOUNT'] === 'MM ACCOUNT').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0))
    }


    const state = {
        labels: ['Cash Amount', 'Mobile oney Account'],
        datasets: [
            {
                label: 'Payment Method',
                backgroundColor: '#dfa126',
                borderColor: '#fff',
                borderWidth: 1,
                data: [cashAmount, mobileMoneyAmount]
            }
        ]
    };

    // console.log(mobileMoneyAmount, 'filter')

    return (
        <div className="main-container-table">
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column-dash">
                <div className="stats-row">
                    <div className="stats-row-left">
                        <div className="stats-card-chart">
                            <div className="stats-header">
                                <h3>Revenues    </h3>
                            </div>
                            <Doughnut
                                data={state}
                                width={100}
                                height={20}

                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true

                                }}
                            />
                        </div>
                        <div className="stats-card">
                            {/* <div className="stats-header">
                                <h3>Airtable</h3>
                            </div> */}
                            <table>
                                <tbody>
                                    <tr className="table-row">
                                        {headers.map(header => <td>{header.label}</td>)}
                                    </tr>
                                    {data.map(row => (
                                        <tr className="table-detail">
                                            {/* <td>{row.fields['EMPLOYEE FULLNAME']}</td> */}
                                            {/* <td>{row.fields['NAME OF CUSTOMER']}</td> */}
                                            <td>{row.fields['SAVING ACCOUNT']}</td>
                                            <td>{row.fields.AMOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            {/* <td>{moment(row.fields.Created).format('LT')}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="stats-row-right">
                        <div className="stats-card">
                            <div className="stats-header">
                                <h3>Recent Activity</h3>
                            </div>
                            {data.map(row => (
                                <div className="event">
                                    <div className="time">
                                        <h5>{moment(row.fields.Created).calendar()}</h5>
                                    </div>
                                    <div className="event-detail">
                                        <h6>{row.fields['EMPLOYEE FULLNAME']}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="stats-card">
                            <div className="stats-header">
                                <h3>Total Revenue</h3>
                            </div>
                            <h2>UGX</h2>
                            <h1>{revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AirTable
