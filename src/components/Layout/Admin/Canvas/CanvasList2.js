import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {Droppable} from 'react-beautiful-dnd'
import CanvasCard from './CanvasCard'
import * as actionCreators from '../../../store/actionCreators'


const CanvasList2 = ({listId,listNumber, title, cards,boardId,callback, open, setActiveCard}) => {

    const [cardName, setCardName] = useState('')

    const dispatch = useDispatch()

    return (
        <Droppable droppableId={String(listId)}>
            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={"canvas-list-list3"}
                >
                    <div className={"canvas1-row"}>
                        <h6>{title}</h6>
                        <h6>{listNumber}</h6>
                        <MoreHorizIcon className="close" style={{ fontSize: '25px', visibility:'hidden' }} />
                    </div>
                    <div className="add-card">
                            <input
                                placeholder="Type.."
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(actionCreators.createAdminCard( listId, cardName,(res)=>{
                                            setCardName('')
                                            if(res.success) callback()
                                        }))
                                    }
                                }}
                            />
                    </div>
                    {cards && cards.map((c,index) => (
                        <CanvasCard
                            key={c.dateCreated}
                            cardId={c.dateCreated}
                            text={c.name}
                            index={index}
                            object={c}
                            open={open}
                            setActiveCard={setActiveCard}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>  
    )
}

export default CanvasList2
