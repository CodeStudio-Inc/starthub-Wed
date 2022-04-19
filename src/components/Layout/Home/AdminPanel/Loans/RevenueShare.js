import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { isInteger } from 'formik'
import { Table } from 'antd'
import * as actionCreators from '../../../../store/actionCreators'
import { Spin } from 'antd'

import './Loans.css'
const RevenueShare = () => {

    const [state, setState] = useState({
        amount:'',
        date:'',
        startup:'',
        comment:''
    })
    const [error, setError] = useState('')

    const users = useSelector(state => state.admin.users)
    const revShares = useSelector(state => state.admin.revShares)
    const loading = useSelector(state => state.admin.loader)

    const catalyzer = users.filter(user => user.category === 'catalyzer')
    const username = Array.from(catalyzer, ({username}) => username)
    // console.log(revShares,'revShares')

    const _revShares = revShares && revShares

    const dispatch = useDispatch()

    const getRevShares = () => dispatch(actionCreators.getRevenueShares())

    const addRevShare = () => {
        dispatch(actionCreators.addRevenueShare(state.amount, state.startup, state.date, state.comment,(res) => {
            if (res.success) dispatch(actionCreators.addLatestRevenuePayment(state.startup))
        }))
        setState({
            amount: '',
            date: '',
            startup: '',
            comment: ''
        })
    }

    const emptyFieldsCheck = state.amount !== ''  && state.startup !== '' && state.date !== ''

    useEffect(() => {
        getRevShares()
    },[])

    const columns = [
        {
            title: 'Startup Name',
            dataIndex:'startup',
            key:'startup',
            align:'left'
        },
        {
            title: 'Amount(UGX)',
            dataIndex:'amount',
            key:'amount',
            align:'left'
        },
        {
            title: 'Date',
            dataIndex:'date',
            key:'date',
            align:'left'
        },
        {
            title: 'Comment',
            dataIndex:'comment',
            key:'comment',
            align:'left'
        }
    ]

    return(
        <div className="loans-main">
                <div className="loans-form">
                    <div className="loan-form">
                        <h2>Revenue Share</h2>
                        <div className="loan-separator"/>
                    <div className="loans-row">
                        <div className="row-child">
                            <div className="amount-row">
                            <input 
                                type="text" 
                                required="required"
                                placeholder="Amount"
                                value={state.amount}
                                onChange={(e) => {
                                    if (!isInteger(state.amount)) setError('Enter amount in UGX shillings')
                                    if (isInteger(state.amount)) setError('')
                                    setState({ ...state, amount: e.target.value })
                                }}
                            />
                            <h2>Shs</h2>
                            </div>
                            <div className="amount-row">
                                <input 
                                    type="date"
                                    value={state.date}
                                    onChange={(e) => setState({ ...state, date: e.target.value}) }
                                />
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
                        <div className="loader-row"><button
                                style={{
                                    background: emptyFieldsCheck ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
                                    color: emptyFieldsCheck ? '#fff' : 'rgba(0,0,0,0.4)'
                                }}
                                onClick={addRevShare}
                                disabled={emptyFieldsCheck ? false : true}
                            >
                                Add Revenue
                            </button>
                            {loading ? <Spin tip="Loading..."/> : null}
                        </div>
                        </div>
                    </div>
                    {error ? <p>{error}</p> : null}
                    </div>
                    <div className="loan-overview">
                        <h2>Loans Overview</h2>
                        <div className="loan-separator"/>
                            <Table
                                style={{width:'100%'}}
                                columns={columns}
                                dataSource={[..._revShares.map(r => 
                                        ({...r,
                                            key: r._id,
                                            startup: r.startup,
                                            amount: r.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                                            date: r.date,
                                            comment: r.comment,
                                        })
                                        )]}
                                pagination={false}
                            />
                    </div>   
                </div>
        </div>
    )
}

export default RevenueShare
