import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import CloseIcon from '@material-ui/icons/Close'
import Search from '@material-ui/icons/Search'
import { Card } from '@material-ui/core'
import ModalUI from '../../ModalUI'

import '../Home/Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)

    const Boards = useSelector(state => state.requests.boards)


    const filtereBoards = Boards.filter(el => el.name === 'Lean Canvas')
    console.log(filtereBoards)

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
                            <button onClick={() => setOpen(true)}>New Lean Canvas</button>
                        </div>
                    </div>
                    {/* <Cards /> */}
                    <div className="boards-row">
                        {filtereBoards.map((board, index) => (
                            <Card
                                key={index}
                                style={{ backgroundColor: '#fff', width: '25%' }}
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
