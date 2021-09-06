import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import {Droppable} from 'react-beautiful-dnd'
import MilestoneCard from './MilestoneCard'
import CloseIcon from '@material-ui/icons/Close'
import * as actionCreators from '../../../store/actionCreators'

const MilestoneList = ({listId, title, cards,boardId, callback, open, setActiveCard}) => {
    // console.log(title,'d')
    const [cardName, setCardName] = useState('')
    const [listName, setListName] = useState('')
    const [visible, setVisible] = useState(false)

    const admin = useSelector(state => state.auth.admin)
    const dispatch = useDispatch()

    return (
        <Droppable droppableId={String(listId)}>
            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={"list"}
                >
                    <div className={"canvas-row"}>
                         <h6>{title}</h6>
                        {visible ?
                            <div className="edit-card-row2">
                                <input
                                    placeholder="Enter List Title"
                                    value={listName}
                                    onChange={(e) => setListName(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            dispatch(actionCreators.updateList(listId,listName,()=>{
                                            dispatch(actionCreators.getListsOnBoard(()=>{
                                                setVisible(false)
                                            }))
                                        } ))
                                        }
                                    }}
                                />
                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                            </div>
                            : null}
                        {/* {visible? null : <EditIcon onClick={() => setVisible(true)} className="close" style={{ fontSize: '25px' }} />} */}
                    </div>
                    <div className="add-card">
                            <input
                                placeholder="Type.."
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' && cardName) {
                                        dispatch(actionCreators.createAdminCard( listId, cardName,(res)=>{
                                            setCardName('')
                                            if(res.success) callback()
                                        }))
                                    }
                                }}
                            />
                    </div>
                    {cards && cards.map((c,index) => (
                        <MilestoneCard
                            key={c.dateCreated}
                            cardId={c.dateCreated}
                            text={c.name}
                            cardIndex={c.cardIndex}
                            listId={listId}
                            index={index}
                            open={open}
                            callback={callback}
                            setActiveCard={setActiveCard}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>  
    )
}

export default MilestoneList
