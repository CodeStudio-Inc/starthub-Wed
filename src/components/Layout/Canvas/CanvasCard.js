import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import CancelIcon from '@material-ui/icons/Cancel';

export const CanvasCard = ({cardId, text, index,open, object, setActiveCard}) => {

    const grid = 8;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 0.5,
        // margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "#eee" : "",
        // height: 30,
        width:'100%',
        // styles we need to apply on draggables
        ...draggableStyle
    });

    return (
        <Draggable draggableId={String(cardId)} index={index}>
            {(provided, snapshot) => (
                <div 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    // style={{width:'100%'}}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <div className="draggable" onClick={() => {
                        open()
                        setActiveCard(object)
                    }}>
                        <p>{text}</p>
                        <div className="icon-row">
                            <CancelIcon  className="edit-icon" fontSize="small" />
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default CanvasCard
