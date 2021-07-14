import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../ModalUI'

import '../Home/Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('Milestones')
    const [open, setOpen] = useState(false)
    const [boardId, setBoardId] = useState('')

    const Boards = useSelector(state => state.requests.boards)

    const loading = useSelector(state => state.requests.loading)

    const filtereBoards = Boards.filter(el => el.name === 'Milestones')
    // console.log(filtereBoards)
    
    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getBoards())
    }, [])

    const createBoard = () => {
        dispatch(actionCreators.createMilestoneBoard( (res) => {
            if (res.success === true) {
                setOpen(false)
                setBoardName('')
                setTimeout(() => {
                    dispatch(actionCreators.getBoards())
                }, 2000)
            }
        }))
    }


    const board_length = filtereBoards.length === 1

    let empty_array = null

    if (filtereBoards.length === 0) {
        empty_array = (
            <h2>Create new Board</h2>
        )
    }

    return (
        <div className="main-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="create-board-column">
                    <div className="close-row">
                        <p>New Lean Canvas</p>
                        <CloseIcon onClick={() => setOpen(false)} className="close" style={{ fontSize: '20px' }} />
                    </div>
                    <div className="create-board-row">
                        <input
                            type="text"
                            value={name}
                            placeholder="Board Name"
                            onChange={(e) => setBoardName(e.target.value)}

                        />
                        <button onClick={createBoard}>Create</button>
                    </div>
                </div>
            </ModalUI> : null}
            <div className="boards-right-column">
                <div className="boards-right-column-content">
                    <div className="boards-header">
                        <h2>Strategies</h2>
                        <div className="edit-row">
                            {/* <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search"
                                />
                                <Search style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.1)' }} />
                            </div> */}
                            
                            {board_length ? null : <div className="separator" />}
                            {board_length ? null : <button onClick={() => setOpen(true)}>New Milestones</button>}
                        </div>
                    </div>
                    {loading ? <h3>Loading...</h3> :
                        <div className="boards-row">
                            {empty_array}
                            {filtereBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                        if (res.success === true) {
                                            props.history.push('/strategies', { data: board })
                                        }
                                    }))}
                                >
                                    <h3>{board.name}</h3>

                                </div>
                            ))}
                            {filtereBoards.length === 1 ? null : <input
                                className="add-list"
                                placeholder="+ Add New Board"
                                value={name}
                                onChange={(e) => setBoardName(e.target.value)}
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
                            />}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
