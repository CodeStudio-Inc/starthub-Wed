import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actionCreators from '../../store/actionCreators'
import CloseIcon from '@material-ui/icons/Close'
import KanbanList from './dnd/KanbanList'
import EditIcon from '@material-ui/icons/Edit'
import ModalUI from '../../ModalUI'
import Loader from '../../ModalUI/Loader'
import { DragDropContext} from 'react-beautiful-dnd'
import svg from '../../../assets/images/spinner.svg'

import moment from 'moment'

import './Home.css'
 const Cards = ({ todoLists,archivedtodoLists, boardId, history, getLists,archive,setArchive}) => {
     
     const [cardName, setCardName] = useState('')
     const [cardDescription, setCardDescription] = useState('')
     const [listName, setListName] = useState('')
     const [open, setOpen] = useState(false)
     const [visible, setVisible] = useState(false)
     const [activeCard, setActiveCard] = useState({})
    //  console.log(activeCard.object,'ll')

    const expire = useSelector(state => state.auth.tokenExpiration)
    const dragdropLoading = useSelector(state => state.requests.loading)

    //  const description = activeCard.object.description
    //  const date = activeCard.object.dateCreated

     const admin = useSelector(state => state.auth.admin)

    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
    }, [])

    const openEditModal = () => setOpen(true)

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            history.push('/')
    }


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
        <DragDropContext onDragEnd={onDragEnd}>
        <div className="milestone-row">
            {dragdropLoading ? <Loader/> : null}
            {open ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            {todoLists && todoLists.map(l => (
                <KanbanList
                    key={l._id}
                    listId={l._id}
                    title={l.name}
                    cards={l.cards}
                    boardId={boardId}
                    callback={getLists}
                    open={openEditModal}
                    setActiveCard={setActiveCard}
                    archivedtodoLists={archivedtodoLists}
                    setArchive={setArchive}
                    archive={archive}
                />
            ))}
            {admin ? null : <input
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
            />}
        </div>
        </DragDropContext>
    )
}

export default withRouter(Cards)


