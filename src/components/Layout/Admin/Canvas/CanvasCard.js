import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'
import * as actionCreators from '../../../store/actionCreators'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'

export const CanvasCard = ({cardId, text, index,listId,cardIndex,callback, setActiveCard}) => {

    const [cardName, setCardName] = useState('')
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 0.5,
        // margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "rgba(0,0,0,0.4)" : "",
        // height: 30,
        width:'100%',
        // styles we need to apply on draggables
        ...draggableStyle
    });

    return (
        // <Draggable draggableId={String(cardId)} index={index}>
        //     {(provided, snapshot) => (
        //         <div 
        //             {...provided.draggableProps}
        //             {...provided.dragHandleProps}
        //             ref={provided.innerRef}
        //             // style={{width:'100%'}}
        //             style={getItemStyle(
        //                 snapshot.isDragging,
        //                 provided.draggableProps.style
        //             )}
        //         >
                    <div className="canvas-admin-draggable">
                        {visible ? null : <p>{text}</p>}
                        {visible ?
                            <div className="edit-card-row2">
                                <input
                                    placeholder="Enter Card Title"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter' && cardName) {
                                            dispatch(actionCreators.updateCard(listId,cardIndex,cardName,()=>{
                                            dispatch(actionCreators.getListsOnBoard(()=>{
                                                setVisible(false)
                                            }))
                                        } ))
                                        }
                                    }}
                                />
                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                                <DeleteIcon 
                                className="close" style={{ fontSize: '20px' }}
                                onClick={() => dispatch(actionCreators.deleteCard(listId,cardIndex,(res) => 
                                { 
                                    callback() 
                                    if(res.success) 
                                    {
                                        setVisible(false)
                                    }
                                    }))
                                }  />
                            </div>
                            : null}
                        {visible ? null : <div className="icon-row">
                            <EditIcon onClick={() => setVisible(true)}  className="edit-icon" fontSize="small" />
                        </div>}
                    </div>
        //         </div>
        //     )}
        // </Draggable>
    )
}

export default CanvasCard
