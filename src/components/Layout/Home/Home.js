import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../ModalUI'
import svg from '../../../assets/images/spinner.svg'

import './Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)
    const [boardName, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [boardId, setBoardId] = useState('')

    const Boards = useSelector(state => state.requests.boards)
    const admin = useSelector(state => state.auth.admin)
    const users = useSelector(state => state.admin.users)
    const loading = useSelector(state => state.requests.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const username = useSelector(state => state.auth.username)

    const filtereBoards = Boards.filter(el => el.name !== 'Lean Canvas' && el.name !== 'Milestones' && el.startup === username)
    const filtereUsers = users.filter(el => el.admin === false)
    // console.log(filtereBoards)
    
    
    const dispatch = useDispatch()
    
    const current_date = Date.now()
    // console.log(current_date)

    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
        dispatch(actionCreators.getBoards())
        dispatch(actionCreators.getUsers())
    }, [])
    

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }



    let empty_array = null

    if (filtereBoards.length === 0) {
        empty_array = (
            <h2>Create new Board</h2>
        )
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
                {admin ? 
                <div className="boards-right-column-content">
                    {/* <div className="boards-header">
                        <h2>StartUps</h2>
                    </div> */}
                    {loading ? <img src={svg} style={{width:'30px',height:'30px'}}/> :
                        <div className="boards-row">
                            {filtereUsers.map((user, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getAdminBoard(user._id, (res) => {
                                        if (res.success === true) {
                                            props.history.push('/admin/boards', { data: user })
                                        }
                                    }))}
                                >
                                        <h3>{user.username}</h3>

                                </div>
                            ))}
                        </div>
                    }
                </div> : 
                <div className="boards-right-column-content">
                    <div className="boards-header">
                        <h2>Todos</h2>
                    </div>
                    {loading ? <img src={svg} style={{width:'30px',height:'30px'}}/> :
                        <div className="boards-row">
                            {filtereBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="board1-card"
                                >
                                    <div className="boards-inner-row">
                                        {visible && boardId === board._id ? null : 
                                        <h3
                                        onClick={() => dispatch(actionCreators.getListsOnBoard( (res) => {
                                        if (res.success === true) {
                                            props.history.push('/cards', { data: board })
                                        }
                                        }))} >
                                            {board.name}
                                        </h3>
                                        }
                                        {visible && boardId === board._id ?
                                            <div className="edit-card-row2">
                                                <input
                                                    placeholder="Enter Card Title"
                                                    value={boardName}
                                                    onChange={(e) => setName(e.target.value)}
                                                    onKeyUp={(e) => {
                                                        if (e.key === 'Enter') {
                                                        dispatch(actionCreators.updateBoard(board._id, boardName, (res) => {
                                                        if(res.success) {
                                                            dispatch(actionCreators.getBoards())
                                                            setVisible(false)
                                                            setName('')
                                                        }
                                                    }))
                                                        }
                                                    }}
                                                />
                                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                                            </div>
                                            : null}
                                        {visible && boardId === board._id ? null : 
                                        <EditIcon 
                                            className="edit-icon" fontSize="small" 
                                            onClick={() => {
                                                setBoardId(board._id)
                                                setVisible(true)
                                            }}/>}
                                    </div>     
                                    {board.mentor ? <h6>Created by {board.mentor}</h6> : null}
                                </div>
                            ))}
                            <input
                                className="add-list"
                                placeholder="+ Add New Board"
                                value={name}
                                onChange={(e) => setBoardName(e.target.value)}
                                onKeyUp={(e) => {
                                            if (e.key === 'Enter' && name) {
                                                dispatch(actionCreators.createBoard( name, username, (res) => {
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
                    }
                </div>    
            }
            </div>
        </div>
    )
}

export default Home