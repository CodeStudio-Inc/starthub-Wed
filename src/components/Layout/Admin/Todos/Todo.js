import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import {DragDropContext} from 'react-beautiful-dnd'
import TodoList from './TodoList'
import ModalUI from '../../../ModalUI'
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

    const todoLists = lists.filter(el => el.creator === creator)
    console.log(boardId,'gg')

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

    const getLists = () => dispatch(actionCreators.getListsOnBoard( () => { }))

    const statements = todoLists.filter(el => el.name.includes('Statement'))
    const Milestones = todoLists.filter(el => el.name.includes('Milestone'))
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

                const newDestList = todoLists.find(el => el._id === destination.droppableId)
                const newSrcList = todoLists.find(el => el._id === source.droppableId)

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
