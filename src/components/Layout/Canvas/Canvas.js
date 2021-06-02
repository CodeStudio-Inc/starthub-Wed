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
const Canvas = () => {

    const loading = useSelector(state => state.requests.loading)
    const cards = useSelector(state => state.requests.canvas_cards)
    const boardName = useSelector(state => state.requests.canvas_board_name)
    const boardId = useSelector(state => state.requests.canvas_board_id)
    const lists = useSelector(state => state.requests.canvas_lists)

    const problem = lists.find(el => el.name === 'Problem')
    const solution = lists.find(el => el.name === 'Solution')
    const metrics = lists.find(el => el.name === 'Key Metrics')
    const proposition = lists.find(el => el.name === 'Unique Value Proposition')
    const advantage = lists.find(el => el.name === 'Unfair Advantage')
    const channels = lists.find(el => el.name === 'Channels')
    const segments = lists.find(el => el.name === 'Customer Segments')
    const revenue = lists.find(el => el.name === 'Revenue Streams')
    const cost = lists.find(el => el.name === 'Cost Structure')
    console.log(lists, 'ff')

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
                                    />
                                    <CanvasCard
                                        key={solution && solution._id}
                                        list={solution && solution}
                                        cards={cards}
                                    />
                                    <CanvasCard
                                        key={metrics && metrics._id}
                                        list={metrics && metrics}
                                        cards={cards}
                                    />
                                    <CanvasCard
                                        key={proposition && proposition._id}
                                        list={proposition && proposition}
                                        cards={cards}
                                    />
                                    <CanvasCard
                                        key={advantage && advantage._id}
                                        list={advantage && advantage}
                                        cards={cards}
                                    />
                                    <CanvasCard
                                        key={channels && channels._id}
                                        list={channels && channels}
                                        cards={cards}
                                    />
                                    <CanvasCard
                                        key={segments && segments._id}
                                        list={segments && segments}
                                        cards={cards}
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
                                    /><CanvasCard
                                        key={revenue && revenue._id}
                                        list={revenue && revenue}
                                        cards={cards}
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
