import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import {DragDropContext} from 'react-beautiful-dnd'
import TodoList from './TodoList'
import ModalUI from '../../../ModalUI'
import Loader from '../../../ModalUI/Loader'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const Milestones = (props) => {
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [listName, setListName] = useState('')


    // const loading = useSelector(state => state.requests.loading)
    
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id
    const creator = props.location.state.data.creator

    const lists = useSelector(state => state.admin.lists)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const admin = useSelector(state => state.auth.admin)
    const dragdropLoading = useSelector(state => state.requests.loading)
    // console.log(dragdropLoading)

    lists.filter(el => el.creator === creator || el.creator === '610da0a97a707c2bacf695d3' || el.creator === '610d180215fa3323e44593a9' || el.creator === '60d477d35fbd800004c84f7c' || el.creator === '611e1c76e1c6042cb8c5d4fa')
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

    const statements = lists.filter(el => el.name.includes('Statement'))
    const Milestones = lists.filter(el => el.name.includes('Milestone'))
    // console.log("object", Milestones)

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
                <div className="boards-header">
                    <h2>{boardName}</h2>
                    {/* <div className="edit-row" onClick={() => props.history.goBack()}>
                        <h5>Boards</h5>
                    </div> */}
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
            {lists && lists.map(l => (
                <TodoList
                    key={l._id}
                    listId={l._id}
                    title={l.name}
                    cards={l.cards}
                    boardId={boardId}
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
