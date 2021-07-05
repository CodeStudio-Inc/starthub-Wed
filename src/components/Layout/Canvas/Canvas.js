import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import { DragDropContext } from 'react-beautiful-dnd'
import CanvasList from './CanvasList';
import CanvasList2 from './CanvasList2';


import './Canvas.css'
const Canvas = (props) => {

    const loading = useSelector(state => state.requests.loading)
    const cards = useSelector(state => state.requests.canvas_cards)
    const lists = useSelector(state => state.requests.canvas_lists)
    console.log(lists)
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id

    const problem = lists.find(el => el.name === 'Problem')
    const solution = lists.find(el => el.name === 'Solution')
    const metrics = lists.find(el => el.name === 'Key Metrics')
    const proposition = lists.find(el => el.name === 'Unique Value Proposition')
    const advantage = lists.find(el => el.name === 'Unfair Advantage')
    const channels = lists.find(el => el.name === 'Channels')
    const segments = lists.find(el => el.name === 'Customer Segments')
    const revenue = lists.find(el => el.name === 'Revenue Streams')
    const cost = lists.find(el => el.name === 'Cost Structure')
    // console.log(props, 'ff')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getListsOnBoard(boardId, () => { }))
    }, [])

    const onDragEnd = (result) => {
        console.log("dragging")
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
            
     }



    return (
        <div className="main-container">
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <div className="edit-row">
                        <h5 onClick={() => props.history.goBack()}>Go Back</h5>
                            {/*   */}
                            {/* <div className="separator" /> */}
                            {/* <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} /> */}
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="canvas-main">
                        
                        <div className="canvas-main-row">
                            <CanvasList
                                key={problem && problem._id}
                                listId={problem && problem._id}
                                title={problem && problem.name}
                                cards={problem && problem.cards}
                                boardId={boardId}
                            />
                            <div className="canvas-list-list">
                                <CanvasList
                                key={solution && solution._id}
                                listId={solution && solution._id}
                                title={solution && solution.name}
                                cards={solution && solution.cards}
                                boardId={boardId}
                            />
                                <CanvasList
                                key={metrics && metrics._id}
                                listId={metrics && metrics._id}
                                title={metrics && metrics.name}
                                cards={metrics && metrics.cards}
                                boardId={boardId}
                            />
                            </div>
                            <CanvasList
                                key={proposition && proposition._id}
                                listId={proposition && proposition._id}
                                title={proposition && proposition.name}
                                cards={proposition && proposition.cards}
                                boardId={boardId}
                            />
                            <div className="canvas-list-list">
                                <CanvasList
                                key={advantage && advantage._id}
                                listId={advantage && advantage._id}
                                title={advantage && advantage.name}
                                cards={advantage && advantage.cards}
                                boardId={boardId}
                            />
                                <CanvasList
                                key={channels && channels._id}
                                listId={channels && channels._id}
                                title={channels && channels.name}
                                cards={channels && channels.cards}
                                boardId={boardId}
                            />
                            </div>
                            <CanvasList
                                key={segments && segments._id}
                                listId={segments && segments._id}
                                title={segments && segments.name}
                                cards={segments && segments.cards}
                                boardId={boardId}
                            />
                        </div>
                
                
                        <div className="canvas-main-row">
                            <CanvasList2
                                key={revenue && revenue._id}
                                listId={revenue && revenue._id}
                                title={revenue && revenue.name}
                                cards={revenue && revenue.cards}
                                boardId={boardId}
                            />
                            <CanvasList2
                                key={cost && cost._id}
                                listId={cost && cost._id}
                                title={cost && cost.name}
                                cards={cost && cost.cards}
                                boardId={boardId}
                            />
                        </div>
                    

                    </div>
                    </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default Canvas
