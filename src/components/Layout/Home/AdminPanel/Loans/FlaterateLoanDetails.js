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

    const [rowModal, setRowModal] = useState(false)
    const [rowdata, setRowData] = useState(false)
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')

    const users = useSelector(state => state.admin.users)
    const loading = useSelector(state => state.admin.loading)
    const loan = props.location.state.loan

    const catalyzer = users.filter(user => user.category === 'catalyzer')
    const username = Array.from(catalyzer, ({username}) => username)
    console.log(props.location.state)
    // console.log(state, 'state')
 
    // console.log(state.expected_payment,'flatrate')


    const dispatch = useDispatch()

    useEffect(() => {
        // getLoans()
    },[])


    // const getLoans = () => dispatch(actionCreators.getFlate())

    const emptyFieldsCheck = state.p_amount !== '' && state.p_startup !== '' && state.p_date !== ''

    const openRowModal = () => setRowModal(true)
    const closeRowModal = () => setRowModal(false)

    const addLoanPayment = () => {
        dispatch(actionCreators.addFlateratePayment(
            state.p_amount,
            state.p_date,
            state.p_startup,
            state.p_comment,
            rowdata._id
            ))
            setError2('')
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
            align: 'left'
        },
        {
            title: 'Grace Period(Months)',
            dataIndex: 'grace_period',
            key: 'grace_period',
            align: 'left'
        },
        {
            title: 'Interest Rate',
            dataIndex: 'interest_rate',
            key: 'interest_rate',
            align: 'left'
        },
        {
            title: 'Expected Payment',
            dataIndex: 'expected_payment',
            key: 'expected_payment',
            align: 'left'
        },
        {
            title: 'comment',
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
    ]

    return (
        <div className="flatrate-menu">
            {rowModal ? 
            <ModalUI>
                <Repayments 
                state={state}
                setState={setState}
                rowdata={rowdata}
                closeRowModal={closeRowModal}
                addLoanPayment={addLoanPayment}
                error={error2}
                />
            </ModalUI>
            : null
            }
            <div className="flatrate-content">
                    <div className="loans-form">
                        <div className="loan-form">
                            <h2>Pay Loan</h2>
                            <div className="loan-separator" />
                            <div className="loans-row">
                                <div className="row-child">
                                    <div className="amount-row">
                                        <input
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
                                            type="date"
                                            value={state.p_date}
                                            onChange={(e) => setState({ ...state, p_date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row-child">
                                    <select
                                        value={state.p_startup}
                                        onChange={(e) => setState({ ...state, p_startup: e.target.value })}
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
                            {/* <h2>{loan.startup} ShortTerm Loans</h2> */}
                            <div className="loan-separator" />
                            <Table
                                style={{ width: '100%' }}
                                columns={columns}
                                // dataSource={[...loans.map(r => 
                                //     ({...r,
                                //         key:  r._id,
                                //         startup: r.startup,
                                //         loanType: r.loanType,
                                //         loans: r.loans.length,
                                //         payments: r.payments.length,
                                //         date: moment(r.dateCreated).format('DD-MM-YYYY')
                                //     })
                                //     )]}
                                // onRow={(record, rowIndex) => {
                                //     return {
                                //         onClick: () => {
                                //             openRowModal()
                                //             setRowData(record)
                                //     }       
                                //     }
                                // }}
                                pagination={false}
                            />
                        </div>
                    </div> 
                </div>
        </div>
    )
}

export default FlatrateLoanDetails
