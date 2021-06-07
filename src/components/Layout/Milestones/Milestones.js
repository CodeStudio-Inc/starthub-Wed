import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import Search from '@material-ui/icons/Search'
import MilestoneCard from './MilestoneCard'

const Milestones = (props) => {
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [activeListId, setActiveListId] = useState(null)

    const loading = useSelector(state => state.requests.loading)
    
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id

    const lists = useSelector(state => state.requests.milestone_lists)
    const cards = useSelector(state => state.requests.milestone_cards)
    // console.log(cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getListsOnBoard(boardId, () => { }))
        dispatch(actionCreators.getCardsOnBoard(boardId))
    }, [])

    const statements = lists.filter(el => el.name.includes('Statement'))
    const Milestones = lists.filter(el => el.name.includes('Milestone'))
    // console.log("object", statements)

    return (
        <div className="main-container">
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
                            <h5 onClick={() => props.history.goBack()}>Go Back</h5>
                            {/* <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} /> */}
                        </div>
                    </div>
                    {loading ? <h3>loading...</h3> :
                        <div className="statement-row">
                            {statements.map(statement => (
                                <MilestoneCard
                                    key={statement._id}
                                    list={statement}
                                    data={cards}
                                    boardId={boardId}
                                />
                            ))}
                            {/* {statements.map((vision, index) => (
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
                            ))} */}
                        </div>
                    }
                    <div className="milestones-row">
                        {Milestones.map(milestone => (
                            <MilestoneCard
                                key={milestone._id}
                                list={milestone}
                                data={cards}
                                boardId={boardId}
                            />
                        ))}
                        {/* {Milestone.map((mission, index) => (
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
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Milestones
