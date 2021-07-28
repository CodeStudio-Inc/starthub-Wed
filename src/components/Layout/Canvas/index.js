import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import svg from '../../../assets/images/spinner.svg'

import '../Home/Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [boardId, setBoardId] = useState('')

    const Boards = useSelector(state => state.requests.boards)
    const cards = useSelector(state => state.requests.canvas_cards)
    const lists = useSelector(state => state.requests.canvas_lists)

    const loading = useSelector(state => state.requests.loading)

    const filtereBoards = Boards.filter(el => el.name === 'Lean Canvas')
    const expire = useSelector(state => state.auth.tokenExpiration)
    // console.log(filtereBoards)

    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setShow(true)
        }
        dispatch(actionCreators.getBoards())
    }, [])

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }


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
                                dispatch(actionCreators.createCanvasBoard((res) => {
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
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            <div className="boards-right-column">
                <div className="boards-right-column-content">
                    <div className="boards-header">
                        <h2>Lean Canvas</h2>
                        <div className="edit-row">
                        </div>
                    </div>
                    {loading ? <img src={svg} style={{width:'30px',height:'30px'}}/> :
                        <div className="boards-row">
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
                            {empty_array}
                            {/* {open ? 
                                <div className="caution">
                                    <p style={{color:'red'}}><strong>Note: </strong>Board Name can only be "Lean canvas", and user can only have 1 Lean Canvas Board</p>
                                </div>
                             : null} */}
                        </div>
                    }
                   
                </div>
            </div>
        </div>
    )
}

export default Home
