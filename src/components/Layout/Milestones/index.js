import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../ModalUI'

import '../Home/Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
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
                        <h2>Milestones</h2>
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
                    {loading ? <h3>Loading...</h3> :
                        <div className="boards-row">
                            {empty_array}
                            {filtereBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                        if (res.success === true) {
                                            props.history.push('/milestones', { data: board })
                                        }
                                    }))}
                                >
                                    <h3>{board.name}</h3>

                                </div>
                            ))}
                            {open ? 
                                <div className="caution">
                                    <p style={{color:'red'}}><strong>Note: </strong>Board Name can only be "Milestones", and user can only have 1 Milestones Board</p>
                                </div>
                             : null}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
