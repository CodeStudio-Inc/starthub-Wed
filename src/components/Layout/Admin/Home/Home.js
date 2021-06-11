import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Navbar from '../../../Navigation/Navbar'
import { Table, Pagination } from 'antd'
import * as actionCreators from '../../../store/actionCreators'
import moment from 'moment'
import { Line } from 'react-chartjs-2'

import './Home.css'
const Home = () => {

    const users = useSelector(state => state.admin.users)
    const boards = useSelector(state => state.admin.boards)
    console.log(boards)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(actionCreators.getUsers())
    },[])

    const janstartDate = '2021-01-01'
    const janendDate = '2021-01-31'
    const febstartDate = '2021-02-01'
    const febendDate = '2021-02-28'
    const marchstartDate = '2021-03-01'
    const marchendDate = '2021-03-31'
    const aprilstartDate = '2021-04-01'
    const aprilendDate = '2021-04-31'
    const maystartDate = '2021-05-01'
    const mayendDate = '2021-05-31'
    const junstartDate = '2021-06-01'
    const junendDate = '2021-06-31'

    const jan = users.filter(el => el.createdAt >= janstartDate && el.createdAt <= janendDate).length
    const feb = users.filter(el => el.createdAt >= febstartDate && el.createdAt <= febendDate).length
    const march = users.filter(el => el.createdAt >= marchstartDate && el.createdAt <= marchendDate).length
    const april = users.filter(el => el.createdAt >= aprilstartDate && el.createdAt <= aprilendDate).length
    const may = users.filter(el => el.createdAt >= maystartDate && el.createdAt <= mayendDate).length
    const june = users.filter(el => el.createdAt >= junstartDate && el.createdAt <= junendDate).length
    // console.log(april,'kk')

    const revenue = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Startup Registration',
                backgroundColor: '#dfa126',
                borderColor: '#dfa126',
                borderWidth: 1,
                data: [jan,feb,march,april,may,june]
            }
        ]
    };
    // const columns = [
    //     {
    //         title: 'NAME',
    //         dataIndex: 'username',
    //     },
    //     {
    //         title: 'EMAIL',
    //         dataIndex: 'email',
    //     },
    //     {
    //         title: 'Date',
    //         dataIndex: 'admin',
    //     },
    // ];


    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '4',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //     },
    //     {
    //         key: '5',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sidney No. 1 Lake Park',
    //     },
    // ];

    return(
            <div>
                <Navbar/>
                <div className="main-container">
                <div className="home-main">
                <div className="home-row">
                        <div className="home-row-left">
                            <div className="title">
                                <h2>Registered Startups</h2>
                            </div>
                            <div className="header">
                                <div className="cell">
                                    <h3>Username</h3>
                                </div>
                                <div className="cell">
                                    <h3>Email</h3>
                                </div>
                                <div className="cell-small">
                                    <h3>Admin</h3>
                                </div>
                                <div className="cell">
                                    <h3>Created</h3>
                                </div>
                                
                            </div>
                            {users.map(user => (
                                <div className="list-row" key={user._id} onClick={
                                    () => dispatch(actionCreators.getAdminBoard(user._id))
                                }>
                                    <div className="cell">
                                        <h3>{user.username}</h3>
                                    </div>
                                    <div className="cell">
                                        <h3>{user.email}</h3>
                                    </div>
                                    <div className="cell-small">
                                        <h3>{user.admin.toString()}</h3>
                                    </div>
                                    <div className="cell">
                                        <h3>{moment(user.createdAt).fromNow()}</h3>
                                    </div>
                                </div>
                            ))}
                            <Pagination defaultCurrent={1} total={50} />
                        </div>
                        <div className="home-row-right">
                            <div className="title">
                                <h2>Statistics</h2>
                            </div>
                            <div className="title">
                                <h4>Monthly Startup SignUps</h4>
                            </div>
                            <Line
                                data={revenue}
                                width={100}
                                height={20}
                            // options={{
                            //     maintainAspectRatio: false,
                            //     responsive: true

                            // }}
                            />
                            <div className="title">
                                <h4>Monthly Startup SignIns</h4>
                            </div>
                            <Line
                                data={revenue}
                                width={100}
                                height={20}
                            // options={{
                            //     maintainAspectRatio: false,
                            //     responsive: true

                            // }}
                            />
                        </div>
                </div>
                    {/* <Table columns={columns} dataSource={users} size="middle" className="table-width" pagination={false} rowSelection={(e) => console.log(object)} />
                    <Pagination defaultCurrent={1} total={50} /> */}
                </div>
            </div>
            </div>
    )
}

export default Home

