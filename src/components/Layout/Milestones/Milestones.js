import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import {DragDropContext} from 'react-beautiful-dnd'
import KanbanList from '../Home/dnd/KanbanList'


const Milestones = (props) => {
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [activeListId, setActiveListId] = useState(null)

    const loading = useSelector(state => state.requests.loading)
    
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id

    const lists = useSelector(state => state.requests.milestone_lists)

    const todoLists = lists.filter(el => el.boardId === boardId)
    // console.log(todoLists)

    const dispatch = useDispatch()

    useEffect(() => {
        getLists()
    }, [])

    const getLists = () => dispatch(actionCreators.getListsOnBoard( () => { }))

    const statements = todoLists.filter(el => el.name.includes('Statement'))
    const Milestones = todoLists.filter(el => el.name.includes('Milestone'))
    // console.log("object", Milestones)

    const onDragEnd = (result) => {
            // const { destination, source, draggableId } = result
            // if(!destination){
            //     return
            // }
            
            //     dispatch(actionCreators.dragCardWithInList(
            //         source.droppableId,
            //         destination.droppableId,
            //         source.index,
            //         destination.index,
            //         draggableId
            //     ))

            //     const newDestList = todoLists.find(el => el._id === destination.droppableId)
            //     const newSrcList = todoLists.find(el => el._id === source.droppableId)

            //     dispatch(actionCreators.cardIndexUpdate(source.droppableId, destination.droppableId,newSrcList, newDestList, () => {
            //         getLists()
            //     } ))
     }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="main-container">
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <div className="edit-row">
                            <h5 onClick={() => props.history.goBack()}>Go Back</h5>
                            {/* <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} /> */}
                        </div>
                    </div>
                        <div className="statement-row">
                           {statements.map(l => (
                                <KanbanList
                                    key={l._id}
                                    listId={l._id}
                                    title={l.name}
                                    cards={l.cards}
                                    callback={getLists}
                                />
                            ))}
                        </div>
                    
                    <div className="milestones-row">
                        {Milestones.map(l => (
                                <KanbanList
                                    key={l._id}
                                    listId={l._id}
                                    title={l.name}
                                    cards={l.cards}
                                    callback={getLists}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
        </DragDropContext>
    )
}

export default Milestones
