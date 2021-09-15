import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import {DragDropContext} from 'react-beautiful-dnd'
import TodoList from './TodoList'
import ModalUI from '../../../ModalUI'
import Loader from '../../../ModalUI/Loader'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import moment from 'moment'

const Milestones = (props) => {
    const [cardName, setCardName] = useState('')
    const [archive, setArchive] = useState(false)
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [listName, setListName] = useState('')
    
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id
    const creator = props.location.state.data.creator

    const lists = useSelector(state => state.admin.lists)
    const userId = useSelector(state => state.auth.userId)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const admin = useSelector(state => state.auth.admin)
    const dragdropLoading = useSelector(state => state.requests.loading)
    

    const todoLists = lists && lists.filter(el => el.boardId === boardId && el.archive === false)
    const archivedtodoLists = lists && lists.filter(el => el.boardId === boardId && el.archive === true)
    // console.log(lists,'gg')

    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
        getLists()
    }, [])

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    const openEditModal = () => setOpen(true)

    const getLists = () => dispatch(actionCreators.getAdminLists(creator,boardId,()=>{}))


    const onDragEnd = (result) => {
            const { destination, source, draggableId } = result
            if(!destination){
                return
            }
            
                dispatch(actionCreators.dragCardWithInList(
                    source.droppableId,
                    destination.droppableId,
                    source.index,
                    destination.index,
                    draggableId
                ))

                const newDestList = lists.find(el => el._id === destination.droppableId)
                const newSrcList = lists.find(el => el._id === source.droppableId)

                dispatch(actionCreators.cardIndexUpdate(source.droppableId, destination.droppableId,newSrcList, newDestList, () => {
                    getLists()
                } ))
     }

    return (
            // <div className="right-column-content">
        <DragDropContext onDragEnd={onDragEnd}>
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
                                        onClick={() => dispatch(actionCreators.unarchiveAdminList(list._id,creator,boardId, (res) => {
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
                <div className="boards-header">
                    <h2>{boardName}</h2>
                    {archivedtodoLists.length > 0 ?
                            <div className="icon-header"  onClick={() => setArchive(true)}>
                                 <ArchiveIcon onClick={() => setArchive(true)} className="close" style={{ fontSize: '25px' }} />
                                 <p>Archive</p>
                            </div>
                        : null}
                        <ArrowBackIcon className="back-icon"  style={{ fontSize: '20px', color:'#dfa126' }} onClick={() => props.history.goBack()} />
                </div>
                <div className="todo-row">
                    {dragdropLoading ? <Loader/> : null}
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            {todoLists && todoLists.map(l => (
                <TodoList
                    key={l._id}
                    listId={l._id}
                    title={l.name}
                    cards={l.cards}
                    boardId={boardId}
                    userId={creator}
                    callback={getLists}
                    open={openEditModal}
                    setActiveCard={setActiveCard}
                />
            ))}
            <input
                className="add-list"
                placeholder="+ Add New list"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                dispatch(actionCreators.createList( boardId, listName,(res)=>{
                                    setListName('')
                                    if(res.success) getLists()
                                }))
                            }
                        }}
            />
        </div>

        </DragDropContext>
            // </div>
    )
}

export default Milestones
