import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Draggable} from 'react-beautiful-dnd'
import CloseIcon from '@material-ui/icons/Close'
import * as actionCreators from '../../../store/actionCreators'

export const KanbanCard = ({cardId, text, index,cardIndex, setActiveCard, listId}) => {

    const [cardName, setCardName] = useState('')
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    // console.log(object,'my object')

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
                    <div className="canvas-draggable" draggable="false">
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
                            </div>
                            : null}
                        {visible ? null : <div className="icon-row">
                            {/* <EditIcon onClick={() => setVisible(true)}  className="edit-icon" fontSize="small" /> */}
                        </div>}
                    </div>
        //         </div>
        //     )}
        // </Draggable>
    )
}

export default KanbanCard
