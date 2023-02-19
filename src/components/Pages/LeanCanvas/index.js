import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';
import { List1, List2, actionCreators, Loader, Menu, ModalUI, svg } from '../../Paths';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import './LeanCanvasStyles.css';
const LeanCanvas = () => {
	const [ boardId, setBoardId ] = React.useState('');
	const [ open, setOpen ] = React.useState(false);
	const [ state, setState ] = React.useState({
		name: '',
		message: ''
	});

	const { boards, canvas_lists, loading } = useSelector((state) => state.requests);

	const page = 'Lean Canvas';

	const canvas_board = boards.filter((el) => el.boardType === page && el.archive === false);
	let lst,
		problem,
		solution,
		metrics,
		proposition,
		advantage,
		channels,
		segments,
		revenue,
		cost,
		alternatives,
		concept,
		adoptors;

	const [ canvasBoardId, setCanvasBoardId ] = React.useState(
		canvas_board && canvas_board.length === 0 ? null : canvas_board && canvas_board.at(-1)._id
	);
	lst = canvas_lists && canvas_lists.filter((el) => el.boardId === canvasBoardId);

	problem = lst.find((el) => el.name === 'Problem');
	solution = lst.find((el) => el.name === 'Solution');
	metrics = lst.find((el) => el.name === 'Key Metrics');
	proposition = lst.find((el) => el.name === 'Unique Value Proposition');
	advantage = lst.find((el) => el.name === 'Unfair Advantage');
	channels = lst.find((el) => el.name === 'Channels');
	segments = lst.find((el) => el.name === 'Customer Segments');
	revenue = lst.find((el) => el.name === 'Revenue Streams');
	cost = lst.find((el) => el.name === 'Cost Structure');
	alternatives = lst.find((el) => el.name === 'Existing Alternatives');
	concept = lst.find((el) => el.name === 'High-Level Concept');
	adoptors = lst.find((el) => el.name === 'Early Adopters');

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(actionCreators.getBoards());
		getLists();
		ReactGA.pageview(window.location.pathname);
	}, []);

	const getLists = () => dispatch(actionCreators.getListsOnBoard(() => {}));

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}

		dispatch(
			actionCreators.dragCardWithInList(
				source.droppableId,
				destination.droppableId,
				source.index,
				destination.index,
				draggableId
			)
		);

		const newDestList = canvas_lists.find((el) => el._id === destination.droppableId);
		const newSrcList = canvas_lists.find((el) => el._id === source.droppableId);

		dispatch(
			actionCreators.cardIndexUpdate(source.droppableId, destination.droppableId, newSrcList, newDestList, () => {
				getLists();
			})
		);
	};

	return (
		<div className="canvas-container">
			<Helmet>
				<title>Lean Canvas</title>
			</Helmet>
			<div className="canvas-header">
				{canvas_board && canvas_board.length !== 0 ? (
					<div
						className="canvas-header-btn"
						onClick={() => dispatch(actionCreators.archiveBoard(canvasBoardId))}
					>
						<DeleteOutlinedIcon style={{ fontSize: '20px', color: '#fff' }} />
						{loading ? <img src={svg} style={{ height: '30px', width: '30px' }} /> : <p>Remove canvas</p>}
					</div>
				) : null}
			</div>
			{open ? (
				<ModalUI>
					<div className="canvas-modal">
						<DeveloperBoardIcon className="canvas-modal-icon" style={{ fontSize: '70px' }} />
						<input
							placeholder="Enter canvas name"
							value={state.name}
							onChange={(e) => setState({ ...state, name: e.target.value })}
						/>
						<div className="canvas-modal-btns">
							<button
								onClick={() => {
									setOpen(false);
									setState({ name: '' });
								}}
							>
								Close
							</button>
							<button
								onClick={() =>
									dispatch(
										actionCreators.addLeanCanvas(state.name, (res) => {
											if (res.success) {
												setState({
													name: ''
												});
											}
											setOpen(false);
										})
									)}
							>
								{loading ? <img src={svg} style={{ height: '30px', width: '30px' }} /> : 'Save'}
							</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			{canvas_board && canvas_board.length === 0 ? (
				<div className="canvas-header-btn" onClick={() => setOpen(true)}>
					<AddCircleOutlineIcon style={{ fontSize: '20px', color: '#fff' }} />
					<p>Add canvas</p>
				</div>
			) : (
				<DragDropContext onDragEnd={onDragEnd}>
					{canvas_board && canvas_board.length === 0 ? null : (
						<Menu boards={canvas_board} setCanvasBoardId={setCanvasBoardId} setOpen={setOpen} />
					)}
					<div className="canvas-main">
						{loading ? <Loader /> : null}
						<div className="canvas-main-row">
							<div className="canvas-list-list">
								<List1
									key={problem && problem._id}
									listId={problem && problem._id}
									listNumber={problem && problem.listNumber}
									title={problem && problem.name}
									cards={problem && problem.cards}
									boardId={boardId}
									callback={getLists}
								/>
								<List1
									key={alternatives && alternatives._id}
									listId={alternatives && alternatives._id}
									title={alternatives && alternatives.name}
									cards={alternatives && alternatives.cards}
									boardId={boardId}
									callback={getLists}
								/>
							</div>
							<div className="canvas-list-list">
								<List1
									key={solution && solution._id}
									listId={solution && solution._id}
									listNumber={solution && solution.listNumber}
									title={solution && solution.name}
									cards={solution && solution.cards}
									boardId={boardId}
									callback={getLists}
								/>
								<div className="canvas-separator" />
								<List1
									key={metrics && metrics._id}
									listId={metrics && metrics._id}
									listNumber={metrics && metrics.listNumber}
									title={metrics && metrics.name}
									cards={metrics && metrics.cards}
									boardId={boardId}
									callback={getLists}
								/>
							</div>
							<div className="canvas-list-list">
								<List1
									key={proposition && proposition._id}
									listId={proposition && proposition._id}
									listNumber={proposition && proposition.listNumber}
									title={proposition && proposition.name}
									cards={proposition && proposition.cards}
									boardId={boardId}
									callback={getLists}
								/>
								<List1
									key={concept && concept._id}
									listId={concept && concept._id}
									title={concept && concept.name}
									cards={concept && concept.cards}
									boardId={boardId}
									callback={getLists}
								/>
							</div>
							<div className="canvas-list-list">
								<List1
									key={advantage && advantage._id}
									listId={advantage && advantage._id}
									listNumber={advantage && advantage.listNumber}
									title={advantage && advantage.name}
									cards={advantage && advantage.cards}
									boardId={boardId}
									callback={getLists}
								/>
								<div className="canvas-separator" />
								<List1
									key={channels && channels._id}
									listId={channels && channels._id}
									listNumber={channels && channels.listNumber}
									title={channels && channels.name}
									cards={channels && channels.cards}
									boardId={boardId}
									callback={getLists}
								/>
							</div>
							<div className="canvas-list-list">
								<List1
									key={segments && segments._id}
									listId={segments && segments._id}
									listNumber={segments && segments.listNumber}
									title={segments && segments.name}
									cards={segments && segments.cards}
									boardId={boardId}
									callback={getLists}
								/>
								<List1
									key={adoptors && adoptors._id}
									listId={adoptors && adoptors._id}
									title={adoptors && adoptors.name}
									cards={adoptors && adoptors.cards}
									boardId={boardId}
									callback={getLists}
								/>
							</div>
						</div>

						<div className="canvas-main-row">
							<List2
								key={cost && cost._id}
								listId={cost && cost._id}
								listNumber={cost && cost.listNumber}
								title={cost && cost.name}
								cards={cost && cost.cards}
								boardId={boardId}
								callback={getLists}
							/>
							<List2
								key={revenue && revenue._id}
								listId={revenue && revenue._id}
								listNumber={revenue && revenue.listNumber}
								title={revenue && revenue.name}
								cards={revenue && revenue.cards}
								boardId={boardId}
								callback={getLists}
							/>
						</div>
					</div>
				</DragDropContext>
			)}
		</div>
	);
};

export default withRouter(LeanCanvas);
