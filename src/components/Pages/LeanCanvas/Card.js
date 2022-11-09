import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { actionCreators } from '../../Paths';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

export const Card = ({ cardId, text, callback, index, listId, cardIndex }) => {
	const [ cardName, setCardName ] = useState(text);
	const [ visible, setVisible ] = useState(false);

	const dispatch = useDispatch();

	const grid = 8;

	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		padding: grid * 0.5,
		// margin: `0 0 ${grid}px 0`,

		// change background colour if dragging
		background: isDragging ? 'rgba(0,0,0,0.4)' : '',
		// height: 30,
		width: '100%',
		// styles we need to apply on draggables
		...draggableStyle
	});

	return (
		// <Draggable draggableId={String(cardId)} index={index}>
		// 	{(provided, snapshot) => (
		// 		<div
		// 			{...provided.draggableProps}
		// 			{...provided.dragHandleProps}
		// 			ref={provided.innerRef}
		// 			style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
		// 		>
		<div className="canvas-draggable">
			{visible ? null : <p>{text}</p>}
			{visible ? (
				<div className="edit-card-row2">
					<textarea
						placeholder="Enter Card Title"
						value={cardName}
						onChange={(e) => setCardName(e.target.value)}
					/>
					<CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
					<DeleteIcon
						className="close"
						style={{ fontSize: '20px' }}
						onClick={() =>
							dispatch(
								actionCreators.deleteCard(listId, cardIndex, (res) => {
									callback();
									if (res.success) {
										setVisible(false);
									}
								})
							)}
					/>
					<p
						onClick={() => {
							if (cardName) {
								dispatch(
									actionCreators.updateCard(listId, cardIndex, cardName, () => {
										setVisible(false);
										dispatch(actionCreators.getListsOnBoard(() => {}));
									})
								);
							}
						}}
					>
						save
					</p>
				</div>
			) : null}
			{visible ? null : (
				<div className="icon-row">
					<EditIcon onClick={() => setVisible(true)} className="edit-icon" fontSize="small" />
				</div>
			)}
		</div>
		// </div>
		// )}
		// {/* </Draggable> */}
	);
};

export default Card;
