import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import svg from '../../../../assets/images/spinner.svg'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ModalUI from '../../../ModalUI'
import moment from 'moment'
import Graph from './Graph'

import './Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)

    const boards = useSelector(state => state.admin.boards)
    const loading = useSelector(state => state.admin.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const metrics = useSelector(state => state.admin.metrics)

    const userId = props.location.state.data._id
    const username = props.location.state.data.username
    const base_key = props.location.state.data.base_key
    // console.log(metrics,'metrics')

    const filteredBoards = boards.filter(el => el.name !== 'Lean Canvas' && el.name !== 'Milestones')

    // console.log(userId,'rf')

    const dispatch = useDispatch()

    const current_date = Date.now()


    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
        dispatch(actionCreators.getAdminBoard(userId,()=>{}))
        dispatch(actionCreators.getAdminMetricsData(base_key))
    }, [])

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    let canvas_array = []
    let milestone_array = []
    
    boards.forEach(element => {
        if(element.name === 'Lean Canvas') canvas_array.push(element)
    });

    boards.forEach(element => {
        if(element.name === 'Milestones') milestone_array.push(element)
    });

    let empty_array = null

    if (filteredBoards.length === 0) {
        empty_array = (
            <h4 style={{color:'#69191b', fontWeight:'500'}}>{username} has no Todo Boards</h4>
        )
    }

    let empty_canvas_array = null

    if (canvas_array.length === 0) {
        empty_canvas_array = (
            <h4 style={{color:'#69191b', fontWeight:'500'}}>{username} has no Canvas Board</h4>
        )
    }

    let empty_milestone_array = null

    if (canvas_array.length === 0) {
        empty_milestone_array = (
            <h4 style={{color:'#69191b', fontWeight:'500'}}>{username} has no Milestone Board</h4>
        )
    }



    const metricsFilter = metrics && metrics.map(el => el.fields)

    let sortedMetrics = []


    metrics.forEach(element => {
        if(moment(element.fields['A-Month']).format('MMM') === 'Jan')  sortedMetrics.push({...element, monthIndex: 1})
        if(moment(element.fields['A-Month']).format('MMM') === 'Feb')  sortedMetrics.push({...element, monthIndex: 2})
        if(moment(element.fields['A-Month']).format('MMM') === 'Mar')  sortedMetrics.push({...element, monthIndex: 3})
        if(moment(element.fields['A-Month']).format('MMM') === 'Apr')  sortedMetrics.push({...element, monthIndex: 4})
        if(moment(element.fields['A-Month']).format('MMM') === 'May')  sortedMetrics.push({...element, monthIndex: 5})
        if(moment(element.fields['A-Month']).format('MMM') === 'Jun')  sortedMetrics.push({...element, monthIndex: 6})
        if(moment(element.fields['A-Month']).format('MMM') === 'Jul')  sortedMetrics.push({...element, monthIndex: 7})
        if(moment(element.fields['A-Month']).format('MMM') === 'Aug')  sortedMetrics.push({...element, monthIndex: 8})
        if(moment(element.fields['A-Month']).format('MMM') === 'Sep')  sortedMetrics.push({...element, monthIndex: 9})
        if(moment(element.fields['A-Month']).format('MMM') === 'Oct')  sortedMetrics.push({...element, monthIndex: 10})
        if(moment(element.fields['A-Month']).format('MMM') === 'Nov')  sortedMetrics.push({...element, monthIndex: 11})
        if(moment(element.fields['A-Month']).format('MMM') === 'Dec')  sortedMetrics.push({...element, monthIndex: 12})
    });
    
     sortedMetrics.sort((a,b) => a.monthIndex-b.monthIndex)


    let keysArray = []

    keysArray = Object.keys(metricsFilter[0] || []).sort()     
     
    const graph1 = sortedMetrics.map(el => el.fields[keysArray && keysArray[0]] )
    const graph2 = sortedMetrics.map(el => el.fields[keysArray && keysArray[1]] )
    const graph3 = sortedMetrics.map(el => el.fields[keysArray && keysArray[2]] )
    const graph4 = sortedMetrics.map(el => el.fields[keysArray && keysArray[3]] )
    const graph5 = sortedMetrics.map(el => el.fields[keysArray && keysArray[4]] )
    const graph6 = sortedMetrics.map(el => el.fields[keysArray && keysArray[5]] )
    const graph7 = sortedMetrics.map(el => el.fields[keysArray && keysArray[6]] )
    const graph8 = sortedMetrics.map(el => el.fields[keysArray && keysArray[7]] )


    let months = []

    for(let month of graph1) {
        months.push(moment(month).format("MMM"))
    }


    

    const line_graph1 = {
        labels: months,
        datasets: [
            {
                label: keysArray[1] && keysArray[1].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph2
            }
        ]
    }

    const line_graph2 = {
        labels: months,
        datasets: [
            {
                label: keysArray[2] && keysArray[2].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph3,
                options: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                        label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                        }
                        }
                    }
                }
            }
        ]
    }

    const line_graph3 = {
        labels: months,
        datasets: [
            {
                label: keysArray[3] && keysArray[3].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph4,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        ]
    }

    const line_graph4 = {
        labels: months,
        datasets: [
            {
                label: keysArray[4] && keysArray[4].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph5,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
        ]
    }

    const line_graph5 = {
        labels: months,
        datasets: [
            {
                label: keysArray[5] && keysArray[5].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph6
            }
        ]
    }

    const line_graph6 = {
        labels: months,
        datasets: [
            {
                label: keysArray[6] && keysArray[6].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph7
            }
        ]
    }

    const line_graph7 = {
        labels: months,
        datasets: [
            {
                label: keysArray[7] && keysArray[7].split('-').splice(1),
                backgroundColor: '#dfa126',
                borderColor: '#222323',
                borderWidth: 1,
                data:graph8
            }
        ]
    }


    return (
        <div className="main-container">
            {open ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            <div className="boards-right-column">
                <div className="boards-right-column-content">
                    <div className="admin-home-header">
                        {/* <h4 onClick={() => props.history.goBack()}>Back</h4> */}
                        <ArrowBackIcon className="back-icon"  style={{ fontSize: '20px', color:'#dfa126' }} onClick={() => props.history.goBack()} />
                    </div>
                    {loading ? <img src={svg} style={{width:'30px',height:'30px'}}/> :
                        <div className="boards">
                            <div className="boards-column">
                                <div className="boards-name">
                                <h2>{username} Todos</h2>
                            </div>
                            <div className="boards-row">
                            {empty_array}
                            {filteredBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="admin-board-card"
                                    onClick={() => dispatch(actionCreators.getAdminLists(userId,board._id, (res) => {
                                        if (res.success === true) {
                                            props.history.push('/admin/todo', { data: board })
                                        }
                                    }))}
                                >
                                    <h3>{board.name}</h3>

                                </div>
                            ))}
                            <input
                                className="admin-add-list"
                                placeholder="+ Add New Board"
                                value={name}
                                onChange={(e) => setBoardName(e.target.value)}
                                onKeyUp={(e) => {
                                            if (e.key === 'Enter' && name) {
                                                dispatch(actionCreators.createBoard( name, (res) => {
                                                if (res.success === true) {
                                                    setBoardName('')
                                                    setTimeout(() => {
                                                        dispatch(actionCreators.getBoards())
                                                    }, 2000)
                                                }
                                            }))
                                            }
                                        }}
                            />
                            </div>
                        <div className="boards-name">
                                <h2>{username} Lean Canvas</h2>
                            </div>
                        <div className="boards-row">
                            {empty_canvas_array}
                            {canvas_array.map((canvas, index) => (
                            <div
                                key={index}
                                className="admin-board-card"
                                onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                    if (res.success === true) {
                                        props.history.push('/admin/canvas', { data: canvas })
                                    }
                                }))}
                            >
                                    <h3>{ canvas.name}</h3>

                        </div>
                        ))}
                        </div>
                        <div className="boards-name">
                                <h2>{username} Milestones</h2>
                            </div>
                        <div className="boards-row">
                            {empty_milestone_array}
                            {milestone_array.map((milestone, index) => (
                            <div
                                key={index}
                                className="admin-board-card"
                                onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                    if (res.success === true) {
                                        props.history.push('/admin/milestones', { data: milestone })
                                    }
                                }))}
                            >
                                    <h3>{ milestone.name}</h3>

                        </div>
                        ))}
                        </div>
                            </div>
                            <div className="boards-separator"/>
                            <div className="metrics-column">
                                <div className="metrics-header">
                                    <h3>{username} Metrics Statistics</h3>
                                </div>
                                <div className="dashboard">
                                    <Graph graph={line_graph2} object_key={keysArray[2]}/>
                                    <Graph graph={line_graph3} object_key={keysArray[3]}/>
                                    <Graph graph={line_graph4} object_key={keysArray[4]}/>
                                    <Graph graph={line_graph5} object_key={keysArray[5]}/>
                                    <Graph graph={line_graph6} object_key={keysArray[6]}/>
                                    <Graph graph={line_graph7} object_key={keysArray[7]}/>
                                </div>
                                {/* <Dashboard metrics={metrics} /> */}
                                {/* <h3 onClick={() => props.history.push('/admin/dashboard',{data: base_key})}>See metric</h3> */}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home