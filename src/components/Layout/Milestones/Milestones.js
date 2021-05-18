import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Sidebar from '../../Navigation/Sidebar'
import Search from '@material-ui/icons/Search';

const Milestones = () => {
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [activeListId, setActiveListId] = useState(null)

    const boardId = useSelector(state => state.requests.milestone_board_id)
    const boardName = useSelector(state => state.requests.milestone_board_name)
    const lists = useSelector(state => state.requests.lists)
    const cards = useSelector(state => state.requests.cards)
    // console.log(cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getListsOnBoard(boardId, () => { }))
        dispatch(actionCreators.getCardsOnBoard(boardId))
    }, [])

    const statements = lists.filter(el => el.name.includes('Statement'))
    const Milestone = lists.filter(el => el.name.includes('Milestone'))
    // console.log("object", statements)

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
                            <div className="search">
                                <input
                                    type="text"
                                    placeholder="Search"
                                />
                                <Search style={{ fontSize: '20px', color: 'rgba(0, 0, 0, 0.1)' }} />
                            </div>
                            <div className="separator" />
                            {/* <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} /> */}
                        </div>
                    </div>
                    <div className="statement-row">
                        {statements.map((vision, index) => (
                            <div className="list-card" key={vision._id}>
                                <div className="list-header">
                                    <h3>{vision.name}</h3>

                                </div>
                                {cards.map(card => {
                                    if (vision._id === card.listId)
                                        return (
                                            <div className="card-column" key={card._id}>
                                                <div className="card-text">
                                                    <h5>{card.name}</h5>
                                                </div>
                                                <button onClick={() => dispatch(actionCreators.deleteCard(card._id))}>remove</button>
                                            </div>
                                        )
                                })}
                                {show && activeListId === vision._id ? <div className="add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        dispatch(actionCreators.createCard(boardId, vision._id, cardName, (res) => {
                                            if (res.success === true) {
                                                setTimeout(() => {
                                                    dispatch(actionCreators.getCardsOnBoard(boardId))
                                                }, 2000)
                                            }
                                        }))
                                        setCardName('')
                                    }}>Add</button>
                                </div> : null}
                                { activeListId !== vision._id ? <button onClick={() => {
                                    setShow(true)
                                    setActiveListId(vision._id)
                                }}>+ Add Card</button> : <button onClick={() => setShow(false)}>Close</button>}
                            </div>
                        ))}
                    </div>
                    <div className="milestones-row">
                        {Milestone.map((mission, index) => (
                            <div className="list-card" key={mission._id}>
                                <div className="list-header">
                                    <h3>{mission.name}</h3>

                                </div>
                                {cards.map(card => {
                                    if (mission._id === card.listId)
                                        return (
                                            <div className="card-column" key={card._id}>
                                                <div className="card-text">
                                                    <h5>{card.name}</h5>
                                                </div>
                                                <button onClick={() => dispatch(actionCreators.deleteCard(card._id))}>remove</button>
                                            </div>
                                        )
                                })}
                                {show && activeListId === mission._id ? <div className="add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        dispatch(actionCreators.createCard(boardId, mission._id, cardName, (res) => {
                                            if (res.success === true) {
                                                setTimeout(() => {
                                                    dispatch(actionCreators.getCardsOnBoard(boardId))
                                                }, 2000)
                                            }
                                        }))
                                        setCardName('')
                                    }}>Add</button>
                                </div> : null}
                                { activeListId !== mission._id ? <button onClick={() => {
                                    setShow(true)
                                    setActiveListId(mission._id)
                                }}>+ Add Card</button> : <button onClick={() => setShow(false)}>Close</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Milestones
