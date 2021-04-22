import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import Search from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import * as actionCreators from '../../store/ActionCreators'

const BusinessModal = () => {

    const lists = useSelector(state => state.requests.lists)
    const lists = useSelector(state => state.requests.lists)
    console.log('object', lists)

    const [activeListId, setActiveListId] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getLists('603767d54f4c30035ee7120a'))
    }, [])

    return (
        <div className="main-container">
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column">
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
                            <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} />
                        </div>
                    </div>
                    <div className="milestone-row">
                        {lists.map(list => (
                            <div className="list-card">
                                <div className="list-header">
                                    <h3>{list.name}</h3>
                                    {/* <p>2 cards</p> */}
                                </div>
                                {cards.map(card => {
                                    if (list.id === card.idList)
                                        return (
                                            <div className="card-column">
                                                <h5>{card.name}</h5>
                                            </div>
                                        )
                                })}
                                {show && activeListId === list.id ? <div className="add-card">
                                    <input
                                        placeholder="Enter Card Title"
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        dispatch(actionCreators.createCard(list.id, cardName, (res) => {
                                            if (res.success === true) {
                                                setTimeout(() => {
                                                    dispatch(actionCreators.getBoardCards(boardId))
                                                }, 2000)
                                            }
                                        }))
                                        setCardName('')
                                    }}>Add</button>
                                </div> : null}
                                { activeListId !== list.id ? <button onClick={() => {
                                    setShow(true)
                                    setActiveListId(list.id)
                                }}>+ Add Card</button> : <button onClick={() => setShow(false)}>Close</button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusinessModal
