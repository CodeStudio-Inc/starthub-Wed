import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Statements, QuarterTabs, ModalUI, actionCreators, svg } from '../../Paths';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReactGA from 'react-ga';
import GAEventsTracker from '../../Hooks/GAEventsTracker';
import { Helmet } from 'react-helmet';

import NewObjective from './NewObjective';
import NewStatement from './NewStatement';
import Archive from './Archive';
import './OKRStyles.css';
const OKRs = () => {
	const [ archive, setArchive ] = React.useState(false);
	const [ statement, setStatement ] = React.useState(false);
	const [ objective, setObjective ] = React.useState(false);
	const [ activeRow, setActiveRow ] = React.useState(0);

	const UseGAEventsTracker = GAEventsTracker('Objectives');
	const UseGAEventsTracker2 = GAEventsTracker('Vision & Mission Statements');

	const [ state, setState ] = React.useState({
		vision: '',
		mission: '',
		objective: '',
		quarter: ''
	});

	const [ dates, setDates ] = React.useState({
		year: ''
	});

	const { lists, boards, statements, objectives, loading } = useSelector((state) => state.requests);
	const { userId, username, email, category } = useSelector((state) => state.auth);

	React.useEffect(() => {
		if (category === 'catalyzer') {
			userActivity();
		}
		getBoards();
		getLists();
		getStatements();
		getObjectives();
		getUsers();
		getRevenue();
		getValues();
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	const dispatch = useDispatch();

	const getBoards = () => dispatch(actionCreators.getBoards());
	const getLists = () => dispatch(actionCreators.getListsOnBoard());
	const getStatements = () => dispatch(actionCreators.getStatement());
	const getObjectives = () => dispatch(actionCreators.getObjective());
	const getUsers = () => dispatch(actionCreators.getUsers());
	const userActivity = () => dispatch(actionCreators.userActivity(email, username, userId));
	const getValues = () => dispatch(actionCreators.getValues());
	const getRevenue = () => dispatch(actionCreators.getStartupRevenue());
	const filterOKRsByDate = () => dispatch(actionCreators.filterOkrs(dates.year));

	const _boards = boards && boards.filter((el) => el.creator === userId && el.boardType !== 'Lean Canvas');
	const current_board = _boards && _boards.slice(-1).pop();
	const current_boardID = current_board && current_board._id;
	const filteredStatements = statements && statements.filter((el) => el.boardId === current_boardID);
	const quarter1 =
		objectives &&
		objectives.filter((el) => el.boardId === current_boardID && el.quarter === 1 && el.archive === false);
	const quarter2 =
		objectives &&
		objectives.filter((el) => el.boardId === current_boardID && el.quarter === 2 && el.archive === false);
	const quarter3 =
		objectives &&
		objectives.filter((el) => el.boardId === current_boardID && el.quarter === 3 && el.archive === false);
	const quarter4 =
		objectives &&
		objectives.filter((el) => el.boardId === current_boardID && el.quarter === 4 && el.archive === false);

	const archived = objectives && objectives.filter((el) => el.boardId === current_boardID && el.archive === true);

	const todoLists = lists && lists.filter((el) => el.boardId === current_boardID && el.archive === false);

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

		const newDestList = todoLists.find((el) => el._id === destination.droppableId);
		const newSrcList = todoLists.find((el) => el._id === source.droppableId);

		dispatch(
			actionCreators.cardIndexUpdate(
				source.droppableId,
				destination.droppableId,
				newSrcList,
				newDestList,
				(res) => {
					if (res.succes) getLists();
				}
			)
		);
	};

	const addStatement = () => {
		dispatch(
			actionCreators.addStatement(current_board._id, state.vision, state.mission, (res) => {
				UseGAEventsTracker2('addStatements', state.vision);
				if (res.success) {
					setStatement(false);
					setState({
						vision: '',
						mission: ''
					});
				}
			})
		);
	};

	const checkInput = state.objective !== '' && state.quarter;

	const addObjective = () => {
		dispatch(
			actionCreators.addObjective(current_board._id, state.objective, state.quarter, (res) => {
				UseGAEventsTracker('addObjective', state.objective);
				if (res.success) {
					setObjective(false);
					setState({
						objective: '',
						quarter: ''
					});
				}
			})
		);
	};

	const columns = [
		{
			title: 'Objective',
			dataIndex: 'objective',
			key: 'objective',
			align: 'left'
		},
		{
			title: 'Quarter',
			dataIndex: 'quarter',
			key: 'quarter',
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
			dataIndex: '_id',
			key: '_id',
			align: 'center',
			render: (r) => (
				<button
					className="restore-btn"
					onClick={() => {
						setActiveRow(r);
						dispatch(actionCreators.archiveObjective(r, () => {}));
					}}
				>
					{loading && activeRow === r ? 'restoring' : 'restore'}
				</button>
			)
		}
	];

	return (
		<div className="okr-container">
			<Helmet>
				<title>OKRs</title>
			</Helmet>
			{objective ? (
				<ModalUI setClose={setObjective}>
					<NewObjective
						state={state}
						setState={setState}
						setObjective={setObjective}
						loading={loading}
						svg={svg}
						checkInput={checkInput}
						addObjective={addObjective}
					/>
				</ModalUI>
			) : null}
			{statement ? (
				<ModalUI setClose={setStatement}>
					<NewStatement
						state={state}
						setState={setState}
						setStatement={setStatement}
						loading={loading}
						svg={svg}
						addStatement={addStatement}
					/>
				</ModalUI>
			) : null}
			{archive ? (
				<ModalUI setClose={setArchive}>
					<Archive columns={columns} archived={archived} setArchive={setArchive} />
				</ModalUI>
			) : null}
			<div className="okr-container-header">
				<h3>Vision and Mission Statements</h3>
			</div>
			<div className="underline" />
			<div className="statments-content">
				{filteredStatements && filteredStatements.length > 0 ? (
					<Statements svg={svg} statements={filteredStatements} />
				) : (
					<div className="vision-mission">
						<button className="vision-btn" onClick={() => setStatement(true)}>
							Add vision and Mission Statements
						</button>
					</div>
				)}
			</div>
			<div className="underline" />
			<div className="quarter-tab-header">
				<h3>Quarterly Objective Key Results</h3>
				<div className="filter-row">
					<div className="filter-input-row">
						{/* <h4></h4> */}
						<input
							placeholder="enter year"
							type="text"
							value={dates.year}
							onChange={(e) => setDates({ ...dates, year: e.target.value })}
						/>
					</div>
					{loading ? (
						<img style={{ height: '20px', width: '20px' }} src={svg} />
					) : (
						<button onClick={filterOKRsByDate}>search</button>
					)}
				</div>
			</div>
			<QuarterTabs
				todoLists={todoLists}
				current_board={current_board}
				onDragEnd={onDragEnd}
				getLists={getLists}
				listLoader={loading}
				quarter1={quarter1}
				quarter2={quarter2}
				quarter3={quarter3}
				quarter4={quarter4}
				svg={svg}
				setObjective={setObjective}
			/>
			{archived && archived.length > 0 ? (
				<div onClick={() => setArchive(true)} className="archive-btn">
					<ArchiveIcon onClick={() => setArchive(true)} style={{ marginRight: '5px' }} />
					<h3>Archive</h3>
				</div>
			) : null}
		</div>
	);
};
export default withRouter(OKRs);
