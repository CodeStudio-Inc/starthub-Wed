import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { Droppable } from 'react-beautiful-dnd';
import { Table } from 'antd';
import KanbanCard from './KanbanCard';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import ModalUI from '../../../ModalUI';
import * as actionCreators from '../../../store/actionCreators';

const KanbanList = ({ listId, title, cards, callback, open }) => {
	const [ cardName, setCardName ] = useState('');
	const [ listName, setListName ] = useState('');
	const [ visible, setVisible ] = useState(false);
	const [ modal, setModal ] = useState(false);
	const [ activeRow, setActiveRow ] = useState(0);

	const { admin } = useSelector((state) => state.auth);
	const { loading } = useSelector((state) => state.requests);
	const dispatch = useDispatch();

	const cards_filter = cards.filter((c) => c.archived === false);
	const archived = cards.filter((c) => c.archived === true);

	// console.log(archived);

	const columns = [
		{
			title: 'Card',
			dataIndex: 'card',
			key: 'card',
			align: 'left'
		},
		{
			title: 'Created',
			dataIndex: 'created',
			key: 'created',
			align: 'left'
		},
		{
			// title: 'Created',
			dataIndex: 'cardIndex',
			key: 'cardIndex',
			align: 'center',
			render: (r) => (
				<button
					onClick={() => {
						setActiveRow(r);
						dispatch(actionCreators.archiveCard(listId, r, () => {}));
					}}
				>
					{loading && activeRow === r ? 'restoring' : 'restore'}
				</button>
			)
		}
	];

	return (
		<div className="list-container">
			{modal ? (
				<ModalUI>
					<div className="archive-modal">
						<div className="create-header">
							<h3>Archive</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => setModal(false)}
							/>
						</div>
						<div className="archive-container">
							<Table
								columns={columns}
								dataSource={[
									...archived.map((r) => ({
										...r,
										key: r.cardIndex,
										card: r.name,
										created: moment(r.dateCreated).fromNow()
									}))
								]}
								pagination={{
									defaultPageSize: 5,
									showSizeChanger: true,
									pageSizeOptions: [ '5', '10', '15', '20', '25', '30' ]
								}}
							/>
						</div>
						<div />
					</div>
				</ModalUI>
			) : null}
			<Droppable droppableId={String(listId)}>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef} className={'list'}>
						<div className="archive-span-row">
							{archived.length > 0 ? (
								<ArchiveIcon
									className="close"
									onClick={() => setModal(true)}
									style={{ fontSize: '20px', color: 'rgba(0,0,0,0.3)' }}
								/>
							) : null}
						</div>
						<div className={'canvas-row'}>
							{visible ? null : <h6>{title}</h6>}
							{visible ? (
								<div className="edit-card-row2">
									<input
										placeholder="Enter List Title"
										value={listName}
										onChange={(e) => setListName(e.target.value)}
										onKeyUp={(e) => {
											if (e.key === 'Enter' && listName) {
												dispatch(
													actionCreators.updateList(listId, listName, (res) => {
														if (res.success) setVisible(false);
													})
												);
											}
										}}
									/>
									<CloseIcon
										className="close"
										onClick={() => setVisible(false)}
										style={{ fontSize: '20px', color: '#28282be3' }}
									/>
									<DeleteIcon
										onClick={() =>
											dispatch(
												actionCreators.archiveList(listId, (res) => {
													if (res.success) setVisible(false);
												})
											)}
										className="close"
										style={{ fontSize: '20px', color: '#28282be3' }}
									/>
								</div>
							) : null}
							{visible ? null : (
								<EditIcon
									className="close"
									onClick={() => setVisible(true)}
									style={{ fontSize: '20px', color: '#28282be3' }}
								/>
							)}
						</div>
						<div className="add-card">
							{admin ? null : (
								<input
									placeholder="Add Card"
									value={cardName}
									onChange={(e) => setCardName(e.target.value)}
									onKeyUp={(e) => {
										if (e.key === 'Enter' && cardName) {
											dispatch(
												actionCreators.createCard(listId, cardName, (res) => {
													if (res.success) {
														callback();
														setCardName('');
													}
												})
											);
										}
									}}
								/>
							)}
						</div>
						{cards_filter &&
							cards_filter.map((c, index) => (
								<KanbanCard
									key={c.dateCreated}
									cardId={c.dateCreated}
									text={c.name}
									cardIndex={c.cardIndex}
									listId={listId}
									index={index}
									open={open}
								/>
							))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default KanbanList;
