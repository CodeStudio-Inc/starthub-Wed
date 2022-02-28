import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { Table } from 'antd'
import moment from 'moment'

const Repayments = ({ closeRowModal, payments, startup, paidLoanId}) =>  {

    const payments_filter = payments.filter(el => el.paidLoanId === paidLoanId)
    // console.log(payments_filter)

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'left'
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
        }
    ]

  return (
      <div className="row-container">
            <div className="row-header">
                <h4>{startup} loan repayments</h4>
                <CloseIcon 
                    className="register-form-container-icon"
                    style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)'}}
                    onClick={closeRowModal}
                />
            </div>
            <div className="row-main">
              <Table
                  style={{ width: '100%' }}
                  columns={columns}
                  dataSource={[...payments_filter.map(r =>
                  ({
                      ...r,
                      key: r._id,
                      amount: r.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                      comment: r.comment,
                      date: moment(r.dateCreated).format('DD-MM-YYYY')
                  })
                  )]}
                  pagination={false}
              />
            </div>
        </div>
  );
}

export default Repayments
