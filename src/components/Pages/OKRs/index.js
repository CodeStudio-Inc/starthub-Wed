import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Statements, QuarterTabs, Diagnostics, ModalUI, actionCreators, svg } from '../../Paths';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import { Table } from 'antd';
import ReactGA from 'react-ga';
import GAEventsTracker from '../../Hooks/GAEventsTracker';
import CloseIcon from '@material-ui/icons/Close';
import { Helmet } from 'react-helmet';

import './OKRStyles.css';
const OKRs = () => {
	const [ archive, setArchive ] = React.useState(false);
	const [ modal, setModal ] = React.useState(false);
	const [ quarter1Obj, setQuarter1Obj ] = React.useState(false);
	const [ quarter2Obj, setQuarter2Obj ] = React.useState(false);
	const [ quarter3Obj, setQuarter3Obj ] = React.useState(false);
	const [ quarter4Obj, setQuarter4Obj ] = React.useState(false);
	const [ activeRow, setActiveRow ] = React.useState(0);

	const UseGAEventsTracker = GAEventsTracker('Objectives');
	const UseGAEventsTracker2 = GAEventsTracker('Vision & Mission Statements');

	const [ state, setState ] = React.useState({
		vision: '',
		mission: '',
		objective: '',
		quarter: ''
	});

	const { lists, boards, statements, objectives } = useSelector((state) => state.requests);
	const _value = useSelector((state) => state.requests.values);
	const { loading } = useSelector((state) => state.requests);
	const { userId, username, email, category, mentor } = useSelector((state) => state.auth);
	const { revenue } = useSelector((state) => state.admin);

	const total_revenue = Array.from(revenue, ({ month_revenue }) => month_revenue).reduce((a, b) => a + b, 0);
	const total_expense = Array.from(revenue, ({ month_expense }) => month_expense).reduce((a, b) => a + b, 0);

	const filter_value = _value && _value.filter((e) => e.creator === userId);

	const last_value = filter_value && filter_value.slice(-1).pop();

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
	const getObjectives = () => dispatch(actionCreators.getObjective(mentor));
	const getUsers = () => dispatch(actionCreators.getUsers());
	const userActivity = () => dispatch(actionCreators.userActivity(email, username, userId));
	const getValues = () => dispatch(actionCreators.getValues());
	const getRevenue = () => dispatch(actionCreators.getStartupRevenue());

	const openModal = () => setModal(true);

	const _boards = boards.filter((el) => el.creator === userId && el.boardType !== 'Lean Canvas');
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
					setModal(false);
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
					setQuarter1Obj(false);
					setQuarter2Obj(false);
					setQuarter3Obj(false);
					setQuarter4Obj(false);
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
			{archive ? (
				<ModalUI>
					<div className="archive-modal">
						<div className="create-header">
							<h3>Archive</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => setArchive(false)}
							/>
						</div>
						<Table
							columns={columns}
							dataSource={[
								...archived.map((r) => ({
									...r,
									key: r._id,
									objective: r.description,
									quarter: r.quarter,
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
				</ModalUI>
			) : null}
			{quarter1Obj ? (
				<ModalUI>
					<div className="create-modal">
						<div className="create-header">
							<h3>Create Quarter 1 Objective</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => {
									setQuarter1Obj(false);
									setState({
										objective: '',
										quarter: ''
									});
								}}
							/>
						</div>
						<div className="create-form">
							<input
								type="text"
								placeholder="Enter objective name"
								value={state.objective}
								onChange={(e) => setState({ ...state, objective: e.target.value })}
								onFocus={() => {
									setState({
										quarter: 1
									});
								}}
							/>
							<button
								onClick={addObjective}
								style={{
									border: checkInput ? '1px solid #37561b' : '1px solid rgba(0,0,0,0.2)',
									color: checkInput ? '#37561b' : 'rgba(0,0,0,0.4)'
								}}
								disabled={checkInput ? false : true}
							>
								{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Save'}
							</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			{quarter2Obj ? (
				<ModalUI>
					<div className="create-modal">
						<div className="create-header">
							<h3>Create Quarter 2 Objective</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => {
									setQuarter2Obj(false);
									setState({
										objective: '',
										quarter: ''
									});
								}}
							/>
						</div>
						<div className="create-form">
							<input
								type="text"
								placeholder="Enter objective name"
								value={state.objective}
								onChange={(e) => setState({ ...state, objective: e.target.value })}
								onFocus={() => {
									setState({
										quarter: 2
									});
								}}
							/>
							<button
								onClick={addObjective}
								style={{
									border: checkInput ? '1px solid #37561b' : '1px solid rgba(0,0,0,0.2)',
									color: checkInput ? '#37561b' : 'rgba(0,0,0,0.4)'
								}}
								disabled={checkInput ? false : true}
							>
								{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Save'}
							</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			{quarter3Obj ? (
				<ModalUI>
					<div className="create-modal">
						<div className="create-header">
							<h3>Create Quarter 3 Objective</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => {
									setQuarter3Obj(false);
									setState({
										objective: '',
										quarter: ''
									});
								}}
							/>
						</div>
						<div className="create-form">
							<input
								type="text"
								placeholder="Enter objective name"
								value={state.objective}
								onChange={(e) => setState({ ...state, objective: e.target.value })}
								onFocus={() => {
									setState({
										quarter: 3
									});
								}}
							/>
							<button
								onClick={addObjective}
								style={{
									border: checkInput ? '1px solid #37561b' : '1px solid rgba(0,0,0,0.2)',
									color: checkInput ? '#37561b' : 'rgba(0,0,0,0.4)'
								}}
								disabled={checkInput ? false : true}
							>
								{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Save'}
							</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			{quarter4Obj ? (
				<ModalUI>
					<div className="create-modal">
						<div className="create-header">
							<h3>Create Quarter 4 Objective</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => {
									setQuarter4Obj(false);
									setState({
										objective: '',
										quarter: ''
									});
								}}
							/>
						</div>
						<div className="create-form">
							<input
								type="text"
								placeholder="Enter objective name"
								value={state.objective}
								onChange={(e) => setState({ ...state, objective: e.target.value })}
								onFocus={() => {
									setState({
										quarter: 4
									});
								}}
							/>
							<button
								onClick={addObjective}
								style={{
									border: checkInput ? '1px solid #37561b' : '1px solid rgba(0,0,0,0.2)',
									color: checkInput ? '#37561b' : 'rgba(0,0,0,0.4)'
								}}
								disabled={checkInput ? false : true}
							>
								{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Save'}
							</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			{modal ? (
				<ModalUI>
					<div className="create-modal">
						<div className="create-header">
							<h3>Create Statements</h3>
							<CloseIcon
								className="create-icon"
								style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
								onClick={() => setModal(false)}
							/>
						</div>
						<div className="create-form">
							<input
								type="text"
								placeholder="Vision Statement"
								value={state.vision}
								onChange={(e) => setState({ ...state, vision: e.target.value })}
							/>
							<input
								placeholder="Mission Statement"
								type="text"
								value={state.mission}
								onChange={(e) => setState({ ...state, mission: e.target.value })}
							/>
							<button onClick={addStatement}>
								{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Save'}
							</button>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="objectives-content">
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
					openQuarter1Obj={() => setQuarter1Obj(true)}
					openQuarter2Obj={() => setQuarter2Obj(true)}
					openQuarter3Obj={() => setQuarter3Obj(true)}
					openQuarter4Obj={() => setQuarter4Obj(true)}
				/>
				{archived.length > 0 ? (
					<div onClick={() => setArchive(true)} className="archive-btn">
						<ArchiveIcon onClick={() => setArchive(true)} style={{ marginRight: '5px' }} />
						<h3>Archive</h3>
					</div>
				) : null}
			</div>
			<div className="statments-content">
				{filteredStatements && filteredStatements.length > 0 ? (
					<Statements svg={svg} statements={filteredStatements} />
				) : (
					<div className="vision-mission">
						<h3>Have you set a Vision and Mission Statement yet?</h3>
						<button className="vision-btn" onClick={openModal}>
							Click here to create one
						</button>
					</div>
				)}
				<Diagnostics last_value={last_value && last_value} />
			</div>
		</div>
	);
};
export default withRouter(OKRs);
