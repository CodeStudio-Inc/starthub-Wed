import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {Droppable} from 'react-beautiful-dnd'
import KanbanCard from './KanbanCard'
import * as actionCreators from '../../../store/actionCreators'

const KanbanList = ({listId, title, cards,boardId, callback}) => {

    const [cardName, setCardName] = useState('')

    const dispatch = useDispatch()

    return (
        <Droppable droppableId={String(listId)}>
            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={"container"}
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
                                        dispatch(actionCreators.createCard( listId, cardName,(res)=>{
                                            setCardName('')
                                            if(res.success) callback()
                                        }))
                                    }
                                }}
                            />
                    </div>
                    {cards && cards.map((c,index) => (
                        <KanbanCard
                            key={c.dateCreated}
                            cardId={c.dateCreated}
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

export default KanbanList
