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
    const [show6, setShow6] = useState(false)
    const [show7, setShow7] = useState(false)
    const [show8, setShow8] = useState(false)
    const [show9, setShow9] = useState(false)


    const cards = useSelector(state => state.requests.cards)
    // const boardName = useSelector(state => state.requests.canvas_board_name)
    // const lists = useSelector(state => state.requests.lists)
    // const cards = useSelector(state => state.requests.cards)
    console.log(cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
    }, [])


    return (
        <div className="main-container">
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>Lean Canvas</h2>
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
                                    <h3>Problem</h3>
                                </div>
                                {cards.map(card => {
                                    if (card.listId === '609a7901503e390004168f70')
                                        return (
                                            <div className="canvas-list-card" key={card._id}>
                                                <div className="canvas-list-card-row">
                                                    <div className="canvas-list-card-row">
                                                        <p>{card.name}</p>
                                                        <button>update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                })}
                                {show1 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '609a7901503e390004168f70', cardName, (res) => {
                                        if (res.success === true) {
                                            setCardName('')
                                            dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                        }
                                    }))} >Add Card</button>
                                </div> : null}
                                {show1 ? <button onClick={() => setShow1(false)}>close</button> : <button onClick={() => setShow1(true)}>Edit Card</button>}
                            </div>
                            <div className="canvas-list">
                                <div className="canvas-list-list">
                                    <div className="canvas-header">
                                        <h3>Solution</h3>
                                    </div>
                                    {cards.map(card => {
                                        if (card.listId === '609a790d503e390004168f71')
                                            return (
                                                <div className="canvas-list-card" key={card._id}>
                                                    <div className="canvas-list-card-row">
                                                        <p>{card.name}</p>
                                                        <button>update</button>
                                                    </div>
                                                </div>
                                            )
                                    })}
                                    {show2 ? <div className="canvas-add-card">
                                        <input
                                            placeholder="Enter Card Title"
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                        <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '609a790d503e390004168f71', cardName, (res) => {
                                            if (res.success === true) {
                                                setCardName('')
                                                dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                            }
                                        }))} >Add Card</button>
                                    </div> : null}
                                    {show2 ? <button onClick={() => setShow2(false)}>close</button> : <button onClick={() => setShow2(true)}>Edit Card</button>}
                                </div>
                                <div className="canvas-list-list">
                                    <div className="canvas-header">
                                        <h3>Key Metrics</h3>
                                    </div>
                                    {cards.map(card => {
                                        if (card.listId === '609a791f503e390004168f72')
                                            return (
                                                <div className="canvas-list-card" key={card._id}>
                                                    <div className="canvas-list-card-row">
                                                        <p>{card.name}</p>
                                                        <button>update</button>
                                                    </div>
                                                </div>
                                            )
                                    })}
                                    {show9 ? <div className="canvas-add-card">
                                        <input
                                            placeholder="Enter Card Title"
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                        <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '609a791f503e390004168f72', cardName, (res) => {
                                            if (res.success === true) {
                                                setCardName('')
                                                dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                            }
                                        }))} >Add Card</button>
                                    </div> : null}
                                    {show9 ? <button onClick={() => setShow9(false)}>close</button> : <button onClick={() => setShow9(true)}>Edit Card</button>}
                                </div>
                            </div>
                            <div className="canvas-list">
                                <div className="canvas-header">
                                    <h3>Unique Value Proposition</h3>
                                </div>
                                {cards.map(card => {
                                    if (card.listId === '608831c513defb3410ea1f3b')
                                        return (
                                            <div className="canvas-list-card" key={card._id}>
                                                <div className="canvas-list-card-row">
                                                    <p>{card.name}</p>
                                                    <button>update</button>
                                                </div>
                                            </div>
                                        )
                                })}
                                {show3 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '608831c513defb3410ea1f3b', cardName, (res) => {
                                        if (res.success === true) {
                                            setCardName('')
                                            dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                        }
                                    }))} >Add Card</button>
                                </div> : null}
                                {show3 ? <button onClick={() => setShow3(false)}>close</button> : <button onClick={() => setShow3(true)}>Edit Card</button>}
                            </div>
                            <div className="canvas-list">
                                <div className="canvas-list-list">
                                    <div className="canvas-header">
                                        <h3>Unfair Advantage</h3>
                                    </div>
                                    {cards.map(card => {
                                        if (card.listId === '608831c513defb3410ea1f3c')
                                            return (
                                                <div className="canvas-list-card" key={card._id}>
                                                    <div className="canvas-list-card-row">
                                                        <p>{card.name}</p>
                                                        <button>update</button>
                                                    </div>
                                                </div>
                                            )
                                    })}
                                    {show4 ? <div className="canvas-add-card">
                                        <input
                                            placeholder="Enter Card Title"
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                        <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '608831c513defb3410ea1f3c', cardName, (res) => {
                                            if (res.success === true) {
                                                setCardName('')
                                                dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                            }
                                        }))} >Add Card</button>
                                    </div> : null}
                                    {show4 ? <button onClick={() => setShow4(false)}>close</button> : <button onClick={() => setShow4(true)}>Edit Card</button>}
                                </div>
                                <div className="canvas-list-list">
                                    <div className="canvas-header">
                                        <h3>Channels</h3>
                                    </div>
                                    {cards.map(card => {
                                        if (card.listId === '608831c513defb3410ea1f3e')
                                            return (
                                                <div className="canvas-list-card" key={card._id}>
                                                    <div className="canvas-list-card-row">
                                                        <p>{card.name}</p>
                                                        <button>update</button>
                                                    </div>
                                                </div>
                                            )
                                    })}
                                    {show5 ? <div className="canvas-add-card">
                                        <input
                                            placeholder="Enter Card Title"
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                        />
                                        <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '608831c513defb3410ea1f3e', cardName, (res) => {
                                            if (res.success === true) {
                                                setCardName('')
                                                dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                            }
                                        }))} >Add Card</button>
                                    </div> : null}
                                    {show5 ? <button onClick={() => setShow5(false)}>close</button> : <button onClick={() => setShow5(true)}>Edit Card</button>}
                                </div>
                            </div>
                            <div className="canvas-list">
                                <div className="canvas-header">
                                    <h3>Customer Segments</h3>
                                </div>
                                {cards.map(card => {
                                    if (card.listId === '608831c513defb3410ea1f3d')
                                        return (
                                            <div className="canvas-list-card" key={card._id}>
                                                <div className="canvas-list-card-row">
                                                    <p>{card.name}</p>
                                                    <button>update</button>
                                                </div>
                                            </div>
                                        )
                                })}
                                {show6 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '608831c513defb3410ea1f3d', cardName, (res) => {
                                        if (res.success === true) {
                                            setCardName('')
                                            dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                        }
                                    }))} >Add Card</button>
                                </div> : null}
                                {show6 ? <button onClick={() => setShow6(false)}>close</button> : <button onClick={() => setShow6(true)}>Edit Card</button>}
                            </div>
                        </div>
                        <div className="canvas-row">
                            <div className="canvas-list-list3">
                                <div className="canvas-header">
                                    <h3>Cost Structure</h3>
                                </div>
                                {cards.map(card => {
                                    if (card.listId === '609a793e503e390004168f73')
                                        return (
                                            <div className="canvas-list-card" key={card._id}>
                                                <div className="canvas-list-card-row">
                                                    <p>{card.name}</p>
                                                    <button>update</button>
                                                </div>
                                            </div>
                                        )
                                })}
                                {show7 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '609a793e503e390004168f73', cardName, (res) => {
                                        if (res.success === true) {
                                            setCardName('')
                                            dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                        }
                                    }))} >Add Card</button>
                                </div> : null}
                                {show7 ? <button onClick={() => setShow7(false)}>close</button> : <button onClick={() => setShow7(true)}>Edit Card</button>}
                            </div>
                            <div className="canvas-list-list3">
                                <div className="canvas-header">
                                    <h3>Revenue Streams</h3>
                                </div>
                                {cards.map(card => {
                                    if (card.listId === '608831c513defb3410ea1f3f')
                                        return (
                                            <div className="canvas-list-card" key={card._id}>
                                                <div className="canvas-list-card-row">
                                                    <p>{card.name}</p>
                                                    <button>update</button>
                                                </div>
                                            </div>
                                        )
                                })}
                                {show8 ? <div className="canvas-add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => dispatch(actionCreators.createCard('608831c413defb3410ea1f3a', '608831c513defb3410ea1f3f', cardName, (res) => {
                                        if (res.success === true) {
                                            setCardName('')
                                            dispatch(actionCreators.getCardsOnBoard('608831c413defb3410ea1f3a'))
                                        }
                                    }))} >Add Card</button>
                                </div> : null}
                                {show8 ? <button onClick={() => setShow8(false)}>close</button> : <button onClick={() => setShow8(true)}>Edit Card</button>}
                            </div>
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
