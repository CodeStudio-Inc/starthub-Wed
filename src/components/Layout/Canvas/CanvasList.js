import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {Droppable} from 'react-beautiful-dnd'
import CanvasCard from './CanvasCard'
import * as actionCreators from '../../store/actionCreators'

const CanvasList = ({listId, title, cards,boardId}) => {

    const [cardName, setCardName] = useState('')

    const dispatch = useDispatch()

    return (
        <Droppable droppableId={String(listId)}>
            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={"canvas-list"}
                >
                    <div className={"canvas-row"}>
                        <h6>{title}</h6>
                        <MoreHorizIcon className="close" style={{ fontSize: '25px' }} />
                    </div>
                    <div className="add-card">
                            <input
                                placeholder="Type.."
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(actionCreators.createCard(boardId, listId, cardName, (res) => {
                                            if (res.success === true) {
                                                setCardName('')
                                                dispatch(actionCreators.getListsOnBoard(()=>{}))
                                            }
                                        }))
                                    }
                                }}
                            />
                    </div>
                    {cards.map((c,index) => (
                        <CanvasCard
                            key={c._id}
                            cardId={c._id}
                            text={c.name}
                            index={index}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>  
    )
}

export default CanvasList
