import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Cards from './Cards'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import moment from 'moment'
import './Home.css'
const Card = (props) => {

    const [listName, setListName] = useState('')
    const [show, setShow] = useState(false)
    const [archive, setArchive] = useState(false)
    const [open, setOpen] = useState(false)
    const [cardName, setCardName] = useState('')
    const [activeListId, setActiveListId] = useState(null)

    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id
    const userId = useSelector(state => state.auth.userId)
    const loading = useSelector(state => state.requests.loading)
    const lists = useSelector(state => state.requests.lists)
    
    const todoLists = lists && lists.filter(el => el.boardId === boardId && el.archive === false)
    const archivedtodoLists = lists && lists.filter(el => el.boardId === boardId && el.archive === true)
    const expire = useSelector(state => state.auth.tokenExpiration)


    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
            if(current_date >= expire) {
            return setShow(true)
            }
            getListsOnBoard()
    }, [])

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }
    
    const getListsOnBoard = () => dispatch(actionCreators.getListsOnBoard( () => { }))

    const createList = () => {
        dispatch(actionCreators.createList(boardId, listName, (res) => {
            if (res.success === true) {
                setOpen(false)
                setTimeout(() => {
                    dispatch(actionCreators.getListsOnBoard(boardId))
                }, 2000)
            }
        }))
    }


    return (
        <div className="main-container">
            {archive ? 
                <ModalUI>
                     <div className="archive">
                            <div className="archive-header">
                                <h3>Archived Lists</h3>
                            </div>
                        {archivedtodoLists.map(list => (
                            <div style={{width:'100%'}}>
                                <div className="archive-row">
                                    <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                        <UnarchiveIcon  className="close" style={{ fontSize: '25px' }} />
                                        <h4>{list.name}</h4>
                                    </div>
                                    <p> created {moment(list.dateCreated).fromNow()}</p>
                                    <button
                                        onClick={() => dispatch(actionCreators.unarchiveList(list._id, (res) => {
                                            if(res.success) setArchive(false)
                                        }))}
                                    >Restore list</button>
                                    {list.creator === userId ? 
                                    <button
                                        className="delete-button"
                                        onClick={() => dispatch(actionCreators.deleteList(list._id,(res) => {
                                            if(res.success) setArchive(false)
                                        }))}
                                    >
                                        Permanently Delete List
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
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            <div className="right-column-content">
                <div className="boards-header">
                    <h2>{boardName}</h2>
                    {archivedtodoLists.length > 0 ?
                            <div className="icon-header"  onClick={() => setArchive(true)}>
                                 <ArchiveIcon onClick={() => setArchive(true)} className="close" style={{ fontSize: '25px' }} />
                                 <p>Archive</p>
                            </div>
                        : null}
                    <div className="edit-row" onClick={() => props.history.goBack()}>
                        <ArrowBackIcon  style={{ fontSize: '20px', color:'#dfa126' }} />
                        <h5>Boards</h5>
                    </div>
                </div>
                <Cards
                    todoLists={todoLists}
                    archivedtodoLists={archivedtodoLists}
                    boardId={boardId}
                    getLists={getListsOnBoard}
                    setArchive={setArchive}
                    archive={archive}
                />

            </div>
        </div>
    )
}

export default Card