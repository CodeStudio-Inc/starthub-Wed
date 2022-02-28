import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Table } from 'antd'
import * as actionCreators from '../../../../store/actionCreators'
import ModalUI from '../../../../ModalUI'
import Repayments from './Repayments'
import { Spin } from 'antd'
import { isInteger } from 'formik'
import moment from 'moment'

import './Loans.css'

const FlatrateLoanDetails = (props) => {

    const [state, setState] = useState({
        p_amount:'',
        p_date:'',
        p_startup:'',
        p_comment:''
    })

    const [paymentsModal, setPaymentsModal] = useState(false)
    const [enableInput, setEnableInput] = useState(false)
    const [paidLoanId, setPaidLoanId] = useState('')
    const [error, setError] = useState('')

    const users = useSelector(state => state.admin.users)
    const loading = useSelector(state => state.admin.loading)
    const loans = useSelector(state => state.admin.loans)
    const loanId = props.location.state.loan._id
    const startup = props.location.state.loan.startup

    const catalyzer = users.filter(user => user.category === 'catalyzer')
    const username = Array.from(catalyzer, ({username}) => username)

    const startupLoans = loans && loans.filter(el => el._id === loanId)[0].loans
    const startupLoansPayments = loans && loans.filter(el => el._id === loanId)[0].payments
    // console.log(startupLoans)


    const dispatch = useDispatch()

    useEffect(() => {
        getLoans()
    },[])


    const getLoans = () => dispatch(actionCreators.getFlate())

    const emptyFieldsCheck = state.p_amount !== ''

   
    const closeRowModal = () => setPaymentsModal(false)

    const addLoanPayment = () => {
        dispatch(actionCreators.addFlateratePayment(
            state.p_amount,
            state.p_date,
            state.p_startup,
            state.p_comment,
            loanId,
            paidLoanId
            ))
            setState({
                p_amount:'',
                p_date:'',
                p_startup:'',
                p_comment:''
            })
    }

    const columns = [
        {
            title: 'Amount(UGX)',
            dataIndex: 'amount',
            key: 'amount',
            align: 'left'
        },
        {
            title: 'Duration(Months)',
            dataIndex: 'duration',
            key: 'duration',
            align: 'left',
            width: '100px'
        },
        {
            title: 'Grace Period(Months)',
            dataIndex: 'grace_period',
            key: 'grace_period',
            align: 'left',
            width:'100px'
        },
        {
            title: 'Expected Payment',
            dataIndex: 'expected_payment',
            key: 'expected_payment',
            align: 'left',
            width: '100px'
        },
        {
            title: 'Outstanding Balance',
            dataIndex: 'outstanding',
            key: 'outstanding',
            align: 'left',
            width: '100px'
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            align: 'left'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            align: 'left'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'left',
            render: (r) => (
                <div
                    style={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        background: r === 'paid off' ? '#b7eb8f' : '#ffbb96',
                        padding: '5px',
                        borderRadius: '5px'
                    }}
                >
                    <p style={{ color: r === 'paid off' ? '#008050' : '#d4380d', margin:'0' }}>{r}</p>
                </div>
            )
        },
        {
            title: 'Payments',
            render: (r) => (
                <button 
                    className="payments-button" 
                    onClick={() => {
                        setPaidLoanId(r._id)
                        setPaymentsModal(true)
                    }}
                    >
                    payments
                </button>
            )
        }
    ]

    return (
        <div className="flatrate-menu">
            {paymentsModal && paidLoanId ?
                <ModalUI>
                <Repayments 
                    payments={startupLoansPayments}
                    paidLoanId={paidLoanId}
                    closeRowModal={closeRowModal}
                    startup={startup}
                />
            </ModalUI>: null
            }
            <div className="flatrate-content">
                <div className="loans-form">
                <div className="loan-form">
                    <div className="loan-header">
                        <h2>Pay Loan</h2>
                    </div>
                    <div className="loan-separator" />
                    <div className="loans-row">
                    <div className="row-child">
                        <div className="amount-row">
                            <input
                                disabled={enableInput ? false : true}
                                type="text"
                                required="required"
                                placeholder="Amount"
                                value={state.p_amount}
                                onChange={(e) => {
                                    if (!isInteger(state.p_amount)) setError('Enter amount in UGX shillings')
                                    if (isInteger(state.p_amount)) setError('')
                                    setState({ ...state, p_amount: e.target.value })
                                }}
                            />
                            <h4>Shs</h4>
                        </div>
                        <div className="amount-row">
                            <input
                                disabled={enableInput ? false : true}
                                type="date"
                                value={state.p_date}
                                onChange={(e) => setState({ ...state, p_date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="row-child">
                        <select
                            disabled={enableInput ? false : true}
                            value={state.p_startup}
                            onChange={(e) => setState({ ...state, p_startup: e.target.value })}
                        >
                            <option value="" disabled selected>Select Startup</option>
                            <option value={startup}>{startup}</option>
                        </select>
                        <textarea
                            disabled={enableInput ? false : true}
                            placeholder='Comment'
                            value={state.p_comment}
                            onChange={(e) => setState({ ...state, p_comment: e.target.value })}
                        />
                    </div>
                    </div>
                    {error ? <p>{error}</p> : null}
                    <div className="loader-row">
                        <button
                            style={{
                                background: emptyFieldsCheck ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
                                color: emptyFieldsCheck ? '#fff' : 'rgba(0,0,0,0.4)'
                            }}
                            onClick={addLoanPayment}
                            disabled={emptyFieldsCheck ? false : true}
                        >
                            Pay Loan
                        </button>
                        {loading ? <Spin tip="Loading..." /> : null}
                    </div>
                </div>
                <div className="loan-overview">
                    <h2>{startup} Loans</h2>
                    <div className="loan-separator" />
                    <Table
                        style={{ width: '100%' }}
                        columns={columns}
                        dataSource={[...startupLoans.map(r => 
                            ({...r,
                                key:  r._id,
                                amount: r.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                duration: r.duration,
                                grace_period: r.grace_period,
                                expected_payment: r.expected_payment.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                outstanding: r.outstandingbalance.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                comment: r.comment,
                                date: moment(r.dateCreated).format('DD-MM-YYYY'),
                                status: r.status
                            })
                            )]}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    if (record.status === 'paid off') return
                                    setEnableInput(true)
                                    setPaidLoanId(record._id)
                                    setState({
                                        p_amount: '',
                                        p_startup: startup,
                                        p_date: moment(Date.now()).format('YYYY-MM-DD')
                                    })
                            }       
                            }
                        }}
                        pagination={false}
                    />
                </div>
                </div> 
            </div>
        </div>
    )
}

export default FlatrateLoanDetails
