import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Droppable } from 'react-beautiful-dnd';
import { Card, actionCreators } from '../../Paths';

const CanvasList2 = ({ listId, listNumber, title, cards, boardId, callback, open, setActiveCard }) => {
	const [ cardName, setCardName ] = useState('');
	const admin = useSelector((state) => state.auth.admin);
	const dispatch = useDispatch();

	return (
		<Droppable droppableId={String(listId)}>
			{(provided) => (
				<div {...provided.droppableProps} ref={provided.innerRef} className={'canvas-list-list3'}>
					<div className={'canvas1-row'}>
						<h6>{title}</h6>
						<h6>{listNumber}</h6>
					</div>
					<div className="canvas-add-card">
						{admin ? null : (
							<div className="canvas-list-column">
								{!cards || typeof cards.at(-1) === 'undefined' ? (
									<textarea
										placeholder="Type.."
										value={cardName}
										onChange={(e) => setCardName(e.target.value)}
									/>
								) : null}
								{!cards || typeof cards.at(-1) === 'undefined' ? (
									<p
										onClick={() => {
											if (cardName) {
												dispatch(
													actionCreators.createCard(listId, cardName, (res) => {
														setCardName('');
														if (res.success) callback();
													})
												);
											}
										}}
									>
										save
									</p>
								) : null}
							</div>
						)}
					</div>
					<div className="canvas-scroll">
						{!cards || typeof cards.at(-1) !== 'undefined' ? (
							<Card
								key={!cards ? null : cards.at(-1).dateCreated}
								text={!cards ? null : cards.at(-1).name}
								cardIndex={!cards ? null : cards.at(-1).cardIndex}
								listId={listId}
								callback={callback}
							/>
						) : null}
					</div>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default CanvasList2;
