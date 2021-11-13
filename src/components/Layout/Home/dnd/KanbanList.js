import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import {Droppable} from 'react-beautiful-dnd'
import KanbanCard from './KanbanCard'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import * as actionCreators from '../../../store/actionCreators'


const KanbanList = ({listId, title, cards, callback, open, setActiveCard}) => {

    const [cardName, setCardName] = useState('')
    const [listName, setListName] = useState('')
    const [visible, setVisible] = useState(false)

    const admin = useSelector(state => state.auth.admin)
    const dispatch = useDispatch()

    // console.log(cardName)

    return (
        <div className="list-container">
            <Droppable droppableId={String(listId)}>
            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={"list"}
                >
                    <div className={"canvas-row"}>
                        {visible ? null : <h6>{title}</h6>}
                        {visible ?
                            <div className="edit-card-row2">
                                <input
                                    placeholder="Enter List Title"
                                    value={listName}
                                    onChange={(e) => setListName(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter' && listName) {
                                            dispatch(actionCreators.updateList(listId,listName,(res)=>{
                                                if(res.success) setVisible(false)
                                        } ))
                                        }
                                    }}
                                />
                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '20px' }} />
                                <DeleteIcon 
                                    onClick={() => dispatch(actionCreators.archiveList(listId,(res)=>{
                                                    if(res.success) setVisible(false)
                                        } ))} 
                                    className="close" style={{ fontSize: '20px' }} 
                                />
                            </div>
                            : null}
                        {visible? null : <EditIcon onClick={() => setVisible(true)} className="close" style={{ fontSize: '20px' }} />}
                    </div>
                    <div className="add-card">
                            {admin ? null : <input
                                placeholder="Add Card"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' && cardName) {
                                        dispatch(actionCreators.createCard( listId, cardName,(res)=>{
                                            if(res.success) {
                                                callback()
                                                setCardName('')
                                            }
                                        }))
                                    }
                                }}
                            />}
                    </div>
                    {cards && cards.map((c,index) => (
                        <KanbanCard
                            key={c.dateCreated}
                            cardId={c.dateCreated}
                            text={c.name}
                            cardIndex={c.cardIndex}
                            listId={listId}
                            callback={callback}
                            index={index}
                            open={open}
                            setActiveCard={setActiveCard}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </div>  
    )
}

export default KanbanList
