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
    // console.log(cards, 'ff')

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
                        {loading ? <h3>loading...</h3> :
                            <div className="milestone-row">
                                {lists.map(list => (
                                    <CanvasCard
                                        key={list._id}
                                        list={list}
                                        cards={cards}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                    {/* <div className="milestone-row">
                        {lists.map((list, index) => (
                            <div className="list-card" key={list._id}>
                                <div className="list-header">
                                    <h3>{list.name}</h3>

                                </div>
                                {cards.map(card => {
                                    if (list._id === card.listId)
                                        return (
                                            <div className="card-column" key={card._id}>
                                                <h5>{card.name}</h5>
                                            </div>
                                        )
                                })}
                                {show && activeListId === list._id ? <div className="add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        dispatch(actionCreators.createCard(boardId, list._id, cardName, (res) => {
                                            if (res.success === true) {
                                                setTimeout(() => {
                                                    dispatch(actionCreators.getCardsOnBoard(boardId))
                                                }, 2000)
                                            }
                                        }))
                                        setCardName('')
                                    }}>Add</button>
                                </div> : null}
                                { activeListId !== list._id ? <button onClick={() => {
                                    setShow(true)
                                    setActiveListId(list._id)
                                }}>Add Card</button> : <button onClick={() => setShow(false)}>Close</button>}
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Canvas
