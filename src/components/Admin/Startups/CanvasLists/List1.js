import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, actionCreators } from '../../../Paths';

const List1 = ({ listId, title, listNumber, cards, callback }) => {
	const [ cardName, setCardName ] = useState('');

	const { admin } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	return (
		<div className={'canvas-list'}>
			<div className={'canvas1-row'}>
				<h6>{title}</h6>
				<h5>{listNumber}</h5>
			</div>
			<div className="canvas-add-card">
				{admin ? null : (
					<div className="canvas-list-column">
						{!cards || typeof cards.at(-1) === 'undefined' ? (
							<textarea
								placeholder="Type.."
								value={cardName}
								onChange={(e) => setCardName(e.target.value)}
								rows="20"
								cols="50"
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
		</div>
	);
};

export default List1;
