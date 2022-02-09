import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Table } from 'antd'
import * as actionCreators from '../../../../store/actionCreators'
import ModalUI from '../../../../ModalUI'
import Repayments from './Repayments'

import './Loans.css'
const ReducingBalance = () => {

    const [state, setState] = React.useState({
        amount:'',
        date:'',
        startup:'',
        comment:'',
        interestRate:'',
        duration: '',
        grace_period:'',
        expected_payment: '',
        p_amount:'',
        p_date:'',
        p_startup:'',
        p_comment:''
    })

    const [makePayment, setMakePayment] = React.useState(false)
    const [showReceipt, setShowReceipt] = React.useState(false)
    const [rowModal, setRowModal] = React.useState(false)
    const [rowdata, setRowData] = React.useState(false)
    const [error, setError] = React.useState('')

    const users = useSelector(state => state.admin.users)
    const loans = useSelector(state => state.admin.loans)

    const catalyzer = users.filter(user => user.category === 'catalyzer')
    const username = Array.from(catalyzer, ({username}) => username)
    // console.log(rowdata, 'loan')
    // console.log(state, 'state')
 
    // console.log(state.expected_payment,'flatrate')

    const dispatch = useDispatch()

    React.useEffect(() => {
        getLoans()
    },[])

    let flatrate, new_loans 
    
    const checkDurationValue = ({target: {value: duration}}) => {
        flatrate = parseInt(state.amount) + (parseInt(state.amount) * 0.01 * duration) 
        if(duration <= 12) {
            setState(r => ({ 
                ...r, 
                duration,
                interestRate: '1%',
                grace_period: '3 months',
                expected_payment: flatrate
            }))
            setShowReceipt(true)
        }
    }

    const getLoans = () => dispatch(actionCreators.getLoans())


    const addLoan = () => {
        if(!state.amount && !state.duration && ! state.startup && !state.date) return setError('All Fields are required')
        dispatch(actionCreators.addLoan(
            state.amount,
            state.date,
            state.duration,
            state.startup,
            state.comment,
            state.interestRate,
            state.grace_period,
            state.expected_payment
            ))
            setError('')
    }

    const openRowModal = () => setRowModal(true)
    const closeRowModal = () => setRowModal(false)

    const addLoanPayment = () => dispatch(actionCreators.addLoanPayment(state.amount,state.date,state.startup,state.comment,))

    const columns = [
        {
            title: 'Startup Name',
            dataIndex:'startup',
            key:'startup',
            align:'left'
        },
        {
            title: 'Loan amount(UGX)',
            dataIndex:'amount',
            key:'amount',
            align:'left'
        },
        {
            title: 'Duration(Months)',
            dataIndex:'duration',
            key:'duration',
            align:'left'
        },
        // {
        //     title: 'Number of Loans',
        //     dataIndex:'loanstotal',
        //     key:'loanstotal',
        //     align:'left'
        // },
        // {
        //     title: 'Total Repayments',
        //     dataIndex:'repaymenttotal',
        //     key:'repaymenttotal',
        //     align:'left'
        // },
        {
            title: 'Outstanding Balance',
            dataIndex:'expected_payment',
            key:'expected_payment',
            align:'left'
        },
        {
            title: 'comment',
            dataIndex:'comment',
            key:'comment',
            align:'left'
        },
        {
            title: 'Date',
            dataIndex:'date',
            key:'date',
            align:'left'
        },
    ]

    return (
        <div className="loans-main">
            {rowModal ? 
            <ModalUI>
                <Repayments 
                state={state}
                setState={setState}
                username={username}
                rowdata={rowdata}
                closeRowModal={closeRowModal}
                />
            </ModalUI>
            : null
            }
                <div className="loans-form">
                        <div className="loan-form">
                            <h2>LongTerm Loan</h2>
                            {/* <div className="loan-separator"/>
                            <div className="loans-row">
                                <div className="row-child">
                                    <div className="amount-row">
                                    <input 
                                    type="text" 
                                    required="required"
                                    placeholder="Amount"
                                    value={state.amount}
                                    onChange={(e) => setState({ ...state, amount: e.target.value}) }
                                    />
                                    <h4>Shs</h4>
                                    </div>
                                    <div className="amount-row">
                                        <input 
                                        type="date"
                                        value={state.date}
                                        onChange={(e) => setState({ ...state, date: e.target.value}) }
                                        />
                                    </div>
                                    <div className="amount-row">
                                        <input
                                        type="number"
                                        min="0"
                                        required="required"
                                        placeholder="Duration"
                                        value={state.duration}
                                        onChange={checkDurationValue}
                                        />
                                        <h4>Months</h4>
                                    </div>
                                </div>
                                <div className="row-child">
                                    <select
                                        value={state.startup}
                                        onChange={(e) => setState({ ...state, startup: e.target.value}) }
                                    >
                                        <option value="" disabled selected>Select Startup</option>
                                        <option value={username[0]}>Qiribu</option>
                                        <option value={username[1]}>Inove Labs</option>
                                        <option value={username[2]}>Isharc</option>
                                        <option value={username[3]}>Social Clark</option>
                                        <option value={username[4]}>Figurines</option>
                                        <option value={username[5]}>Rada Safaris</option>
                                        <option value={username[6]}>Zetu Africa</option>
                                        <option value={username[7]}>OMNI Gym</option>
                                        <option value={username[8]}>Economic Misfit</option>
                                        <option value={username[9]}>Solfix</option>
                                        <option value={username[10]}>Grab Gas</option>
                                        <option value={username[11]}>OnScore Africa</option>
                                        <option value={username[12]}>WAGE Spices</option>
                                        <option value={username[13]}>Divine Renewable Energy</option>
                                    </select>
                                    <textarea
                                        placeholder='Comment'
                                        value={state.comment}
                                        onChange={(e) => setState({ ...state, comment: e.target.value}) }
                                    />
                                </div>
                            </div>
                            {error ? <p>{error}</p> : null}
                            {showReceipt ? 
                                <div className="receipt">
                                <h3>Flat Rate</h3>
                                <div className="loan-separator"/>
                                    <div className="receipt-row">
                                        <h3>Interest Rate :</h3>
                                        <h4>{state.interestRate}</h4>
                                    </div>
                                    <div className="receipt-row">
                                        <h3>Grace Period :</h3>
                                        <h4>{state.grace_period}</h4>
                                    </div>
                                    <div className="receipt-row">
                                        <h3>Expected Payment :</h3>
                                        <h4>{state.expected_payment}</h4>
                                    </div>
                                <div className="loan-separator"/>
                                </div>
                                : null
                            }
                             <button onClick={addLoan}>Add Loan</button> */}
                        </div>
                        <div className="loan-overview">
                            {/* <h2>Loans Table</h2>
                            <div className="loan-separator"/>
                                <Table
                                    style={{width:'100%'}}
                                    columns={columns}
                                    dataSource={[...loans.map(r => 
                                        ({...r,
                                            key: r._id,
                                            startup: r && r.startup,
                                            amount: r.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                            duration: r.duration,
                                            expected_payment: r.expected_payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                            comment: r.comment,
                                            date: r.date
                                        })
                                        )]}
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: () => {
                                                openRowModal()
                                                setRowData(record)
                                        }       
                                        }
                                    }}
                                    pagination={false}
                                /> */}
                        </div>
                </div> 
        </div>
    )
}

export default ReducingBalance
