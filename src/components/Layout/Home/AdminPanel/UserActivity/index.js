import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../../store/actionCreators'
import moment from 'moment'
import { Table } from 'antd'

import './Activity.css'
const UserActivity = () => {

    const users_activity = useSelector(state => state.auth.user_activity)
    // console.log(users_activity)

    const dispatch = useDispatch()

    useEffect(() => {
        getUserActivity()
    },[])

    const getUserActivity = () => dispatch(actionCreators.getUserActivity())

  const columns = [
    {
      title: 'Startup',
      dataIndex: 'startup',
      key: 'startup',
      align: 'left'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left'
    },
    {
      title: 'Last loggedIn',
      dataIndex: 'loginDate',
      key: 'loginDate',
      align: 'left'
    }
    ,
    {
      title: 'Last Revenue Payment',
      dataIndex: 'revenueDate',
      key: 'revenueDate',
      align: 'left'
    }
    ,
    {
      title: 'Last Revenue Submission',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      align: 'left'
    }
  ]

  return (
    <div className="activity-main">
      <div className="activity">
        <Table
          columns={columns}
          dataSource={[...users_activity.map(r =>
          ({
            ...r,
            key: r._id,
            startup: r.username,
            email: r.email,
            loginDate: moment(r.date).format('DD.MM.YYYY, h:mm:ss a'),
            revenueDate: r.revenuePayment ? moment(r.revenuePayment).format('DD.MM.YYYY, h:mm:ss a') : 'No payment made yet',
            submissionDate: r.revenueSubmission ? moment(r.revenueSubmission).format('DD.MM.YYYY, h:mm:ss a') : 'No revenue submitted yet',
          })
          )]}
          style={{ width: '75%' }}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default UserActivity
