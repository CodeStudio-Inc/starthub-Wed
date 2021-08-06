import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import svg from '../../../../assets/images/spinner.svg'
import Dashboard from './Dashboard'
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
    console.log(metrics,'metrics')

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


    let keysArray = []

    keysArray = Object.keys(metricsFilter[0] || []).sort()     
     
    const graph1 = metrics.map(el => el.fields[keysArray && keysArray[0]] )
    const graph2 = metrics.map(el => el.fields[keysArray && keysArray[1]] )
    const graph3 = metrics.map(el => el.fields[keysArray && keysArray[2]] )
    const graph4 = metrics.map(el => el.fields[keysArray && keysArray[3]] )
    const graph5 = metrics.map(el => el.fields[keysArray && keysArray[4]] )
    const graph6 = metrics.map(el => el.fields[keysArray && keysArray[5]] )
    const graph7 = metrics.map(el => el.fields[keysArray && keysArray[6]] )
    const graph8 = metrics.map(el => el.fields[keysArray && keysArray[7]] )

    const mon = metrics.map(el => el.fields['A-Month'] )


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
                data:graph3
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
                data:graph4
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
                data:graph5
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
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getAdminLists(userId,board._id, (res) => {
                                        if (res.success === true) {
                                            props.history.push('/admin/todo', { data: board })
                                        }
                                    }))}
                                >
                                    <h3>{board.name}</h3>

                                </div>
                            ))}
                            </div>
                        <div className="boards-name">
                                <h2>{username} Lean Canvas</h2>
                            </div>
                        <div className="boards-row">
                            {empty_canvas_array}
                            {canvas_array.map((canvas, index) => (
                            <div
                                key={index}
                                className="board-card"
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
                                className="board-card"
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
                                    <Graph graph={line_graph2} key={keysArray[1]}/>
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