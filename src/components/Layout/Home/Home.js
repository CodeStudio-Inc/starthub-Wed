import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Sidebar from '../../Navigation/Sidebar'
import CloseIcon from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Card } from '@material-ui/core'
import ModalUI from '../../ModalUI'

import './Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)

    const Boards = useSelector(state => state.requests.boards)
    console.log(Boards)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getCanvasBoard())
        dispatch(actionCreators.getMilestonesBoard())
        dispatch(actionCreators.getBoards())
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

    return (
        <div className="main-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="create-board-column">
                    <div className="close-row">
                        <p>Create Board</p>
                        <CloseIcon onClick={() => setOpen(false)} className="close" style={{ fontSize: '20px' }} />
                    </div>
                    <div className="create-board-row">
                        <input
                            type="text"
                            value={name}
                            placeholder="Board Name"
                            onChange={(e) => setBoardName(e.target.value)}

                        />
                        <button onClick={createBoard}>Create Board</button>
                    </div>
                </div>
            </ModalUI> : null}
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="boards-right-column">
                <div className="boards-right-column-content">
                    <div className="boards-header">
                        <h2>Todos</h2>
                        <div className="edit-row">
                            <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search"
                                />
                                <Search style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.1)' }} />
                            </div>
                            <div className="separator" />
                            <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} />
                        </div>
                    </div>
                    {/* <Cards /> */}
                    <div className="boards-row">
                        {Boards.map((board, index) => (
                            <Card
                                key={index}
                                style={{ backgroundColor: '#f5f5f5', width: '25%' }}
                                className="board-card"
                                onClick={() => dispatch(actionCreators.getListsOnBoard(board._id, (res) => {
                                    if (res.success === true) {
                                        props.history.push('/cards', { data: board })
                                    }
                                }))}
                            >
                                <h3>{board.name}</h3>

                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
