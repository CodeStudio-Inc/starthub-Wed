import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Line } from 'react-chartjs-2'

import './Dashboard.css'
const Dashboard = (props) => {

    const [open, setOpen] = useState(false)
    const [cashAmount, setCashAmount] = useState(0)
    const [mobileMoneyAmount, setMobileMoneyAmount] = useState(0)

    const dispatch = useDispatch()

    const data = useSelector(state => state.requests.data)
    // console.log(data, 'jj')

    useEffect(() => {
        dispatch(actionCreators.getAirTableData())
        getCashAmount()
        MobileMoneyAmount()
    }, [])

    const getCashAmount = () => {
        setCashAmount(data.filter(el => el.fields['SAVING ACCOUNT'] === 'CASH ACCOUNT').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0))
    }

    const MobileMoneyAmount = () => {
        setMobileMoneyAmount(data.filter(el => el.fields['SAVING ACCOUNT'] === 'MM ACCOUNT').reduce((acc, cv) => acc + parseInt(cv.fields.AMOUNT), 0))
    }

    const state = {
        labels: ['Cash Account', 'Mobile Money Account'],
        datasets: [
            {
                label: 'Accounts Revenue',
                backgroundColor: '#dfa126',
                borderColor: '#fff',
                borderWidth: 1,
                data: [cashAmount, mobileMoneyAmount]
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
                    <div className="header-right" onClick={handleAirtableNavigate}>
                        <h2>Go to overview</h2>
                        <ArrowForwardIcon className="arrow-icon" style={{ fontSize: '25px' }} />
                    </div>
                </div>
                <div className="revenue">
                    <div className="overview-header">
                        <h2>Revenue</h2>
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
                        <h2>Costs</h2>
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
