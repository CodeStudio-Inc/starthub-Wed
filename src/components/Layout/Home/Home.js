import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../ModalUI'
import svg from '../../../assets/images/spinner.svg'
import DeleteIcon from '@material-ui/icons/Delete'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import moment from 'moment'

import './Home.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [open, setOpen] = useState(false)
    const [archive, setArchive] = useState(false)
    const [boardName, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [boardId, setBoardId] = useState('')
    const [deleteError, setDeleteError] = useState('')

    const Boards = useSelector(state => state.requests.boards)
    const admin = useSelector(state => state.auth.admin)
    const userId = useSelector(state => state.auth.userId)
    const lists = useSelector(state => state.requests.lists)
    const users = useSelector(state => state.admin.users)
    const loading = useSelector(state => state.requests.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const username = useSelector(state => state.auth.username)

    const page = 'Todo'

    const filtereBoards = Boards.filter(el => el.boardType === page  && el.startup === username && el.archive === false)
    const archivedBoards = Boards.filter(el => el.boardType === page && el.startup === username && el.archive === true)
    const filtereUsers = users.filter(el => el.admin === false)
    // console.log(userId)
    
    
    const dispatch = useDispatch()
    
    const current_date = Date.now()
    // console.log(current_date)

    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
        dispatch(actionCreators.getBoards())
        dispatch(actionCreators.getUsers())
        dispatch(actionCreators.getListsOnBoard(()=>{}))
        setDeleteError()
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
            {archive ? 
                <ModalUI>
                     <div className="archive">
                            <div className="archive-header">
                                {deleteError ? <h3>{deleteError}</h3> : <h3>Archived Boards</h3>}
                            </div>
                        {archivedBoards.map(board => (
                            <div style={{width:'100%'}}>
                                <div className="archive-row">
                                    <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                        <UnarchiveIcon  className="close" style={{ fontSize: '25px' }} />
                                        <h4>{board.name}</h4>
                                    </div>
                                    <p> created {moment(board.dateCreated).fromNow()}</p>
                                    <button
                                        onClick={() => dispatch(actionCreators.unarchiveBoard(board._id, (res) => {
                                            if(res.success) setArchive(false)
                                        }))}
                                    >Restore board</button>
                                    {board.creator === userId ? 
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            let boardLists = lists && lists.filter(el => el.boardId === board._id)
                                            if(boardLists.length === 0){
                                                dispatch(actionCreators.deleteBoard(board._id,(res) => {
                                            if(res.success) {
                                                setArchive(false)
                                                setDeleteError('')
                                            }
                                            }))
                                            }
                                            if( boardLists.length > 0) setDeleteError('First delete the lists on the board please!')
                                        }}
                                    >
                                        Permanently Delete Board
                                    </button>
                                    : null}
                                </div>
                                <div className="archive-separator"/>
                            </div>
                        ))}
                        <button onClick={() => setArchive(false)}>Exit</button>
                    </div>
                </ModalUI>
            : null}
            {open ? 
            <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>
            : null}
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
                        {archivedBoards.length > 0 ?
                            <div className="icon-header"  onClick={() => setArchive(true)}>
                                 <ArchiveIcon className="close" style={{ fontSize: '25px' }} />
                                 <p>Archive</p>
                            </div>
                        : null}
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
                                                            setVisible(false)
                                                            setName('')
                                                        }
                                                    }))
                                                        }
                                                    }}
                                                />
                                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                                                <DeleteIcon 
                                                className="close" style={{ fontSize: '25px' }} 
                                                onClick={() => dispatch(actionCreators.archiveBoard(board._id,(res)=>{
                                                    if(res.success) {
                                                        setVisible(false)
                                                        setName('')
                                                    }
                                                }))}  
                                                />
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
                                                dispatch(actionCreators.createBoard( name, username,page, (res) => {
                                                if (res.success) setBoardName('')
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