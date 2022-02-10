import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { Spin } from 'antd'

const Repayments = ({state,rowdata,closeRowModal,setState,addLoanPayment,error}) =>  {

    const loading = useSelector(state => state.admin.loading)
    const loans = useSelector(state => state.admin.loans)
    // console.log(rowdata)

    const repaymentsArray = rowdata.payments
    let repaymenttotal = Array.from(repaymentsArray,({amount}) => parseInt(amount)).reduce((a,b) => a + b, 0)
    const totalLoans = loans.filter(el => el.startup === rowdata.startup).length
    // console.log(totalLoans,'amount')

  return (
      <div className="row-container">
            <div className="row-header">
                <h4>{rowdata.startup}</h4>
                <CloseIcon 
                    className="register-form-container-icon"
                    style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)'}}
                    onClick={closeRowModal}
                />
            </div>
            <div className="row-main">
                <div className="row-left">
                    <div className="inner-row-left-title">
                        <h2>Loan</h2>
                        <h4>{rowdata.comment}</h4>
                    </div>
                    <div className="loans-separator"/>
                    <div className="inner-row-left">
                        <h3>Amount </h3>
                        <h4>{rowdata.amount}</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Expected Payment </h3>
                        <h4>{rowdata.expected_payment}</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Disbursement date </h3>
                        <h4>{rowdata.date}</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Interest Rate </h3>
                        <h4>{rowdata.interestRate}</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Grace period </h3>
                        <h4>{rowdata.grace_period}</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Loan Duration </h3>
                        <h4>{rowdata.duration} months</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Repayments made </h3>
                        <h4>{repaymenttotal}</h4>
                    </div>
                    <div className="inner-row-left">
                        <h3>Number Of Loans </h3>
                        <h4>{totalLoans}</h4>
                    </div>
                    <div className="loans-separator"/>
                </div>
                <div className="row-right">
                    <div className="inner-row-left-title">
                        <h2>Repay Loan</h2>
                    </div>
                    <div className="loan-separator"/>
                    <div className="amount-row">
                        <input 
                        type="text" 
                        placeholder="Amount"
                        required
                        value={state.p_amount}
                        onChange={(e) => setState({ ...state, p_amount: e.target.value}) }
                        />
                        <h3>Shs</h3>
                    </div>
                    <div className="amount-row">
                        <input 
                        type="date"
                        required
                        value={state.p_date}
                        onChange={(e) => setState({ ...state, p_date: e.target.value}) }
                        />
                    </div>
                    <select
                        value={state.p_startup}
                        required
                        onChange={(e) => setState({ ...state, p_startup: e.target.value}) }
                    >
                        <option value="" disabled selected>Select Startup</option>
                        <option value={rowdata.startup}>{rowdata.startup}</option>
                    </select>
                    <textarea
                        placeholder='Comment'
                        value={state.p_comment}
                        onChange={(e) => setState({ ...state, p_comment: e.target.value}) }
                    />
                        {error ? <p>{error}</p> : null}
                    <div className="loader-row">
                        <button onClick={addLoanPayment}>Make Payment</button>
                        {loading ? <Spin tip="Loading..."/> : null}
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Repayments
