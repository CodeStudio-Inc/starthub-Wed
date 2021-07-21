import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import svg from '../../../assets/images/spinner.svg'

import './Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)

    const Boards = useSelector(state => state.requests.boards)
    const admin = useSelector(state => state.auth.admin)
    const users = useSelector(state => state.admin.users)
    const loading = useSelector(state => state.requests.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    // console.log(expire,'ff')

    const filtereBoards = Boards.filter(el => el.name !== 'Lean Canvas' && el.name !== 'Milestones')
    const filtereUsers = users.filter(el => el.admin === false)
    
    
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
                    <div className="boards-header">
                        <h2>StartUps</h2>
                    </div>
                    {loading ? <img src={svg}/> :
                        <div className="boards-row">
                            {filtereUsers.map((user, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                    onClick={() => dispatch(actionCreators.getAdminBoard(user._id, (res) => {
                                        if (res.success === true) {
                                            props.history.push('/admin/home', { data: user })
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
                    {loading ? <img src={svg}/> :
                        <div className="boards-row">
                            {filtereBoards.map((board, index) => (
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
                            <input
                                className="add-list"
                                placeholder="+ Add New Board"
                                value={name}
                                onChange={(e) => setBoardName(e.target.value)}
                                onKeyUp={(e) => {
                                            if (e.key === 'Enter') {
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
                    }
                </div>    
            }
            </div>
        </div>
    )
}

export default Home