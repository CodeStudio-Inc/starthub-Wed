import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import {Droppable} from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../../../ModalUI/Loader'
import * as actionCreators from '../../../store/actionCreators'

const KanbanList = ({listId, title, cards,boardId, callback, open, setActiveCard}) => {

    const [cardName, setCardName] = useState('')
    const [listName, setListName] = useState('')
    const [visible, setVisible] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const admin = useSelector(state => state.auth.admin)
    const dispatch = useDispatch()

    console.log(cardName)

    return (
        <div className="list-container">
             {deleteModal ?
                <Loader>
                    <div className="caution-container">
                        <p>Deleting List will delete cards on the list as well, Are you sure you want to delete the list?</p>
                        <div className="caution-btn">
                            <button onClick={() => {
                                setDeleteModal(false)
                                setVisible(false)
                            }}>No</button>
                            <button onClick={() => dispatch(actionCreators.deleteList(listId, (res) => {
                                setDeleteModal(false)
                                if(res.success) callback()
                            }))}>Yes</button>
                        </div>
                    </div>
                </Loader>
                : null
            }
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
                                            dispatch(actionCreators.updateList(listId,listName,()=>{
                                            dispatch(actionCreators.getListsOnBoard(()=>{
                                                setVisible(false)
                                            }))
                                        } ))
                                        }
                                    }}
                                />
                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '20px' }} />
                                <DeleteIcon onClick={() => setDeleteModal(true)} className="close" style={{ fontSize: '20px' }} />
                            </div>
                            : null}
                        {/* {visible? null : <EditIcon onClick={() => setVisible(true)} className="close" style={{ fontSize: '20px' }} />} */}
                    </div>
                    <div className="add-card">
                            {admin ? null : <input
                                placeholder="Type.."
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' && cardName) {
                                        dispatch(actionCreators.createCard( listId, cardName,(res)=>{
                                            setCardName('')
                                            if(res.success) callback()
                                        }))
                                    }
                                }}
                            />}
                    </div>
                    {cards && cards.map((c,index) => (
                        <TodoCard
                            key={c.dateCreated}
                            cardId={c.dateCreated}
                            text={c.name}
                            cardIndex={c.cardIndex}
                            listId={listId}
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
