import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'

import './Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)

    const boards = useSelector(state => state.admin.boards)
    const loading = useSelector(state => state.admin.loading)
    const userId = props.location.state.data._id
    const username = props.location.state.data.username

    const filteredBoards = boards.filter(el => el.name !== 'Lean Canvas' && el.name !== 'Milestones')

    // console.log(canvas,'rf')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getAdminBoard(userId,()=>{}))
        // dispatch(actionCreators.getUsers())
    }, [])

    const createBoard = () => {
        dispatch(actionCreators.createBoard(name, (res) => {
            if (res.success === true) {
                setOpen(false)
                setBoardName('')
                setTimeout(() => {
                    dispatch(actionCreators.getBoards())
                }, 2000)
            }
        }))
    }

    let canvas_array = []
    let milestone_array = []
    console.log(canvas_array,'rf')
    
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



    return (
        <div className="main-container">
            <div className="boards-right-column">
                <div className="boards-right-column-content">
                    {loading ? <h3>Loading...</h3> :
                        <div className="boards">
                            <div className="boards-name">
                                <h2>{username} Todos</h2>
                            </div>
                            <div className="boards-row">
                            {empty_array}
                            {filteredBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                        if (res.success === true) {
                                            props.history.push('/cards', { data: board })
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
                                        props.history.push('/canvas', { data: canvas })
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
                                        props.history.push('/milestones', { data: milestone })
                                    }
                                }))}
                            >
                                    <h3>{ milestone.name}</h3>

                        </div>
                        ))}
                        </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home