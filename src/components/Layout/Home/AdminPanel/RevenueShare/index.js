import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Table } from 'antd'

import '../Loans/Loans.css'
const RevenueShare = () => {

    const [state, setState] = React.useState({
        amount:'',
        date:'',
        startup:'',
        comment:''
    })

    const users = useSelector(state => state.admin.users)

    const catalyzer = users.filter(user => user.category === 'catalyzer')
    const username = Array.from(catalyzer, ({username}) => username)
    // console.log(state)

    const columns = [
        {
            title: 'Startup Name',
            dataIndex:'startup',
            key:'startup',
            align:'left'
        },
        {
            title: 'Total Loan amount(UGX)',
            dataIndex:'email',
            key:'email',
            align:'left'
        },
        {
            title: 'Of Loans',
            dataIndex:'date',
            key:'date',
            align:'left'
        },
        {
            title: 'Total Repayments',
            dataIndex:'date',
            key:'date',
            align:'left'
        },
        {
            title: 'Outstanding Repayments',
            dataIndex:'date',
            key:'date',
            align:'left'
        },
        ,
        {
            title: 'comment',
            dataIndex:'date',
            key:'date',
            align:'left'
        }
    ]

    return(
        <div className="loans-main">
            <div className="loans-container">
                <div className="loans-form">
                    <div className="loans-row">
                        <div className="loan-form">
                            <h2>Add Revenue Share</h2>
                            <div className="loan-separator"/>
                            <div className="amount-row">
                                <input 
                                type="text" 
                                required="required"
                                placeholder="Amount"
                                value={state.amount}
                                onChange={(e) => setState({ ...state, amount: e.target.value}) }
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
                        <div className="loan-overview">
                            <h2>Loans Overview</h2>
                            <div className="loan-separator"/>
                                <Table
                                    columns={columns}
                                    pagination={false}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RevenueShare
