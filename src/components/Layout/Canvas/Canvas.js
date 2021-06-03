import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Sidebar from '../../Navigation/Sidebar'
import Search from '@material-ui/icons/Search';
import ModalUI from '../../ModalUI'
import EditIcon from '@material-ui/icons/Edit';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'
import CanvasCard from './CanvasCard'

import './Canvas.css'
const Canvas = (props) => {

    const loading = useSelector(state => state.requests.loading)
    const cards = useSelector(state => state.requests.canvas_cards)
    const lists = useSelector(state => state.requests.canvas_lists)

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
        dispatch(actionCreators.getCardsOnBoard(boardId))
    }, [])



    return (
        <div className="main-container">
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <div className="edit-row">
                            {/*   */}
                            {/* <div className="separator" /> */}
                            {/* <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} /> */}
                        </div>
                    </div>
                    <div className="canvas-main">
                        {
                            loading ? <h3>Loading...</h3> :
                                <div className="canvas-main-row">

                                    <CanvasCard
                                        key={problem && problem._id}
                                        list={problem && problem}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                    <CanvasCard
                                        key={solution && solution._id}
                                        list={solution && solution}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                    <CanvasCard
                                        key={metrics && metrics._id}
                                        list={metrics && metrics}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                    <CanvasCard
                                        key={proposition && proposition._id}
                                        list={proposition && proposition}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                    <CanvasCard
                                        key={advantage && advantage._id}
                                        list={advantage && advantage}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                    <CanvasCard
                                        key={channels && channels._id}
                                        list={channels && channels}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                    <CanvasCard
                                        key={segments && segments._id}
                                        list={segments && segments}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                </div>
                        }
                        {
                            loading ? <h3>Wait..</h3> :
                                <div className="canvas-main-row">
                                    <CanvasCard
                                        key={cost && cost._id}
                                        list={cost && cost}
                                        cards={cards}
                                        boardId={boardId}
                                    /><CanvasCard
                                        key={revenue && revenue._id}
                                        list={revenue && revenue}
                                        cards={cards}
                                        boardId={boardId}
                                    />
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Canvas
