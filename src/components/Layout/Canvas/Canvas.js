import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Sidebar from '../../Navigation/Sidebar'
import Search from '@material-ui/icons/Search';

import './Canvas.css'
const Canvas = () => {
    const [cardName, setCardName] = useState('')
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)
    const [activeListId, setActiveListId] = useState(null)

    const boardId = useSelector(state => state.requests.canvas_board_id)
    const boardName = useSelector(state => state.requests.canvas_board_name)
    const lists = useSelector(state => state.requests.lists)
    const cards = useSelector(state => state.requests.cards)
    // console.log(cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getListsOnBoard(boardId, () => { }))
        dispatch(actionCreators.getCardsOnBoard(boardId))
    }, [])


    return (
        <div className="main-container">
            <div className="left-column">
                <Sidebar />
            </div>
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
                        <div className="milestone-row">
                            <div className="canvas-list">
                                <div className="canvas-header">
                                    <h3>Unique Value Proposition</h3>
                                </div>
                                <div className="canvas-list-card">

                                </div>
                                {show1 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button >update</button>
                                </div> : null}
                                {show1 ? <button onClick={() => setShow1(false)}>close</button> : <button onClick={() => setShow1(true)}>+ Edit Card</button>}
                            </div>
                            <div className="canvas-list">
                                <div className="canvas-list-list">
                                    <div className="canvas-header">
                                        <h3>Unfair Advantage</h3>
                                    </div>
                                    <div className="canvas-list-card">

                                    </div>
                                    {show2 ? <div className="canvas-add-card">
                                        <input
                                            placeholder="Enter Card Title"
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                        <button >update</button>
                                    </div> : null}
                                    {show2 ? <button onClick={() => setShow2(false)}>close</button> : <button onClick={() => setShow2(true)}>+ Edit Card</button>}
                                </div>
                                <div className="canvas-list-list">
                                    <div className="canvas-header">
                                        <h3>Channels</h3>
                                    </div>
                                    <div className="canvas-list-card">

                                    </div>
                                    {show3 ? <div className="canvas-add-card">
                                        <input
                                            placeholder="Enter Card Title"
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                        <button >update</button>
                                    </div> : null}
                                    {show3 ? <button onClick={() => setShow3(false)}>close</button> : <button onClick={() => setShow3(true)}>+ Edit Card</button>}
                                </div>
                            </div>
                            <div className="canvas-list">
                                <div className="canvas-header">
                                    <h3>Customer Segments</h3>
                                </div>
                                <div className="canvas-list-card">

                                </div>
                                {show4 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button >update</button>
                                </div> : null}
                                {show4 ? <button onClick={() => setShow4(false)}>close</button> : <button onClick={() => setShow4(true)}>+ Edit Card</button>}
                            </div>
                        </div>
                        <div className="canvas-list-list3">
                            <div className="canvas-header">
                                <h3>Revenue Streams</h3>
                            </div>
                            <div className="canvas-list-card">

                            </div>
                            {show5 ? <div className="canvas-add-card">
                                <input
                                    placeholder="Enter Card Title"
                                    type="text"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                                <button >update</button>
                            </div> : null}
                            {show5 ? <button onClick={() => setShow5(false)}>close</button> : <button onClick={() => setShow5(true)}>+ Edit Card</button>}
                        </div>
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
                                }}>+ Add Card</button> : <button onClick={() => setShow(false)}>Close</button>}
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Canvas
