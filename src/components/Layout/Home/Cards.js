import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as actionCreators from '../../store/actionCreators'
import CloseIcon from '@material-ui/icons/Close'
import KanbanList from './dnd/KanbanList'
import EditIcon from '@material-ui/icons/Edit'
import ModalUI from '../../ModalUI'
import { DragDropContext} from 'react-beautiful-dnd'
import svg from '../../../assets/images/spinner.svg'

import moment from 'moment'

import './Home.css'
 const Cards = ({ todoLists, boardId, history, getLists}) => {
     
     const [cardName, setCardName] = useState('')
     const [cardDescription, setCardDescription] = useState('')
     const [listName, setListName] = useState('')
     const [open, setOpen] = useState(false)
     const [onFocus, setOnFocus] = useState(false)
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
            {dragdropLoading ? 
                <div>
                    <img src={svg} style={{width:'30px',height:'30px'}}/>
                </div> : null}
            {open ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            {/* {open ? <ModalUI>
                <div className="edit-card">
                    <div className="edit-card-row">
                        <p>Create Board</p>
                        <CloseIcon onClick={() => setOpen(false)}  className="close" style={{ fontSize: '20px', color:'rgba(0,0,0,0.7)' }} />
                    </div>
                    <div className="edit-card-detail">
                        {!visible ? 
                            <div className="edit-card-row2">
                                <h3>{activeCard && activeCard.object.name}</h3>
                                <EditIcon className="edit-card-icon" style={{ fontSize: '20px' }} onClick={() => setVisible(true)} />
                            </div>
                            : null
                        }
                        {visible ?
                            <div className="edit-card-row2">
                                <input
                                    placeholder="Text"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                                <button onClick={updateCardName} >save</button>
                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                            </div>
                            : null}
                            <h5>Description</h5>
                             <textarea
                                placeholder="Add a more detailed description"
                                onChange={(e) => setCardDescription(e.target.value)}
                                onFocus={() => setOnFocus(true)}
                            />
                        {onFocus ? 
                            <div className="edit-description">
                                <button onClick={updateCardDescription}>Save</button>
                                <button onClick={() => setOnFocus(false)}>Cancel</button>
                            </div>
                            : null
                        }
                        <div className="edit-description">
                            <h4>Created:</h4>
                            <h5>{moment(date).fromNow()}</h5>
                        </div>
                    </div>
                </div>
            </ModalUI> : null} */}
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


