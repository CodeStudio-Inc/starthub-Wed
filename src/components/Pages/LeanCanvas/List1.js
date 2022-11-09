import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Droppable } from 'react-beautiful-dnd';
import { Card, actionCreators } from '../../Paths';

const List1 = ({ listId, title, listNumber, cards, boardId, callback, open }) => {
	const [ cardName, setCardName ] = useState('');
	const admin = useSelector((state) => state.auth.admin);
	const dispatch = useDispatch();

	return (
		<Droppable droppableId={String(listId)}>
			{(provided) => (
				<div {...provided.droppableProps} ref={provided.innerRef} className={'canvas-list'}>
					<div className={'canvas1-row'}>
						<h6>{title}</h6>
						<h5>{listNumber}</h5>
						<MoreHorizIcon
							onClick={() => alert('Still Under Development')}
							className="close"
							style={{ fontSize: '25px', visibility: 'hidden' }}
						/>
					</div>
					<div className="canvas-add-card">
						{admin ? null : (
							<div className="canvas-list-column">
								<textarea
									placeholder="Type.."
									value={cardName}
									onChange={(e) => setCardName(e.target.value)}
								/>
								{cards.length === 0 ? (
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
						{cards &&
							cards.map((c, index) => (
								<Card
									key={c.dateCreated}
									cardId={c.dateCreated}
									text={c.name}
									cardIndex={c.cardIndex}
									listId={listId}
									index={index}
									card={c}
									open={open}
									callback={callback}
								/>
							))}
					</div>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default List1;
