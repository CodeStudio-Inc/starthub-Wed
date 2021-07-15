import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'

import '../Home/Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)
    const [boardId, setBoardId] = useState('')

    const Boards = useSelector(state => state.requests.boards)
    const cards = useSelector(state => state.requests.canvas_cards)
    const lists = useSelector(state => state.requests.canvas_lists)

    const loading = useSelector(state => state.requests.loading)

    const filtereBoards = Boards.filter(el => el.name === 'Lean Canvas')
    // console.log(filtereBoards)

    const problem = lists.find(el => el.name === 'Problem')
    const solution = lists.find(el => el.name === 'Solution')
    const metrics = lists.find(el => el.name === 'Key Metrics')
    const proposition = lists.find(el => el.name === 'Unique Value Proposition')
    const advantage = lists.find(el => el.name === 'Unfair Advantage')
    const channels = lists.find(el => el.name === 'Channels')
    const segments = lists.find(el => el.name === 'Customer Segments')
    const revenue = lists.find(el => el.name === 'Revenue Streams')
    const cost = lists.find(el => el.name === 'Cost Structure')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getBoards())
    }, [])

    const board_length = filtereBoards.length === 1

    let empty_array = null

    if (filtereBoards.length === 0) {
        empty_array = (
            <input
                className="add-canvas"
                placeholder="+ Add New Board"
                value={name}
                onChange={(e) => setBoardName(e.target.value)}
                onFocus={() => setOpen(true)}
                onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                dispatch(actionCreators.createBoard( name, (res) => {
                                if (res.success === true) {
                                    setOpen(false)
                                    setBoardName('')
                                    setTimeout(() => {
                                        dispatch(actionCreators.getBoards())
                                    }, 2000)
                                }
                            }))
                            }
                        }}
            />
        )
    }

    return (
        <div className="main-container">
            <div className="boards-right-column">
                <div className="boards-right-column-content">
                    <div className="boards-header">
                        <h2>Lean Canvas</h2>
                        <div className="edit-row">
                            {/* <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search"
                                />
                                <Search style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.1)' }} />
                            </div> */}
                        </div>
                    </div>
                    <div className="boards-row">
                    {loading ? <h3>Loading...</h3> :
                        <div className="boards-row">
                            {empty_array}
                            {filtereBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                        if (res.success === true) {
                                            props.history.push('/canvas', { data: board })
                                        }
                                    }))}
                                >
                                    <h3>{board.name}</h3>

                                </div>
                            ))}
                            {open ? 
                                <div className="caution">
                                    <p style={{color:'red'}}><strong>Note: </strong>Board Name can only be "Lean canvas", and user can only have 1 Lean Canvas Board</p>
                                </div>
                             : null}
                        </div>
                    }
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default Home
