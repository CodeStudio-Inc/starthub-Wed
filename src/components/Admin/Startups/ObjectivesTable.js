import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { Table } from 'antd';
import moment from 'moment';
import { actionCreators, ModalUI, svg } from '../../Paths';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import NewObjective from './modals/NewObjective';
import './StartupStyles.css';
const ObjectivesTable = ({ location, history }) => {
	const { TabPane } = Tabs;

	const [ open, setOpen ] = React.useState(false);
	const [ loader, setLoader ] = React.useState(false);
	const [ rowId, setRowId ] = React.useState('');
	const [ message, setMessage ] = React.useState(false);
	const [ state, setState ] = React.useState({
		description: '',
		quarter: '',
		keyresult: '',
		measureOfSuccess: 0
	});
	const [ dates, setDates ] = React.useState({
		startDate: '',
		endDate: ''
	});

	const { objectives, loading, boards } = useSelector((state) => state.admin);
	const board_id = boards && boards.at(-1)._id;

	const data = location.state.data;

	const dispatch = useDispatch();

	const getObjectives = () => dispatch(actionCreators.getAdminObjectives(data._id));
	const filterAdminObjectives = () =>
		dispatch(actionCreators.filterAdminObjectives(dates.startDate, dates.endDate, data._id));

	React.useEffect(() => {
		getObjectives();
	}, []);

	const addObjective = () => {
		if (!state.description || !state.quarter) return setMessage('Invalid Entries');
		dispatch(
			actionCreators.addAdminObjectives(data._id, board_id, state.description, state.quarter, (res) => {
				setState({
					description: '',
					quarter: ''
				});
				if (res.success) return setMessage('Objective Added');
				if (!res.success) return setMessage('Error while adding objective');
			})
		);
	};
	const addKeyresult = () => {
		if (!state.keyresult || !rowId) return alert('Invalid Entries');
		setLoader(true);
		dispatch(
			actionCreators.addAdminkeyResult(data._id, state.keyresult, state.measureOfSuccess, rowId, (res) => {
				setLoader(false);
				setState({
					keyresult: '',
					measureOfSuccess: 0
				});
				if (!res.success) return alert('Error while adding objective');
			})
		);
	};

	const quarter1 = objectives.filter((e) => e.quarter === 1);
	const quarter2 = objectives.filter((e) => e.quarter === 2);
	const quarter3 = objectives.filter((e) => e.quarter === 3);
	const quarter4 = objectives.filter((e) => e.quarter === 4);

	const columns = [
		{
			title: 'Objective',
			dataIndex: 'description',
			key: 'description',
			align: 'left',
			render: (r) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						background: '#36561b56',
						padding: '5px',
						borderRadius: '5px'
					}}
				>
					<p style={{ color: '#37561b', margin: '0' }}>{r}</p>
				</div>
			)
		},
		{
			title: 'Keyresults',
			dataIndex: 'keyresults',
			key: 'keyresults',
			align: 'left',
			render: (r) => <div>{r.map((k) => k.description).join(',\n')}</div>
		},
		{
			title: 'Percentage Covered',
			dataIndex: 'objPercentage',
			key: 'objPercentage',
			align: 'center',
			render: (r) => (
				<div style={{ height: '40px' }}>
					{/* <p style={{ color: r === 100 ? '#37561b' : '#dfa126' }}>{Math.round(r)}%</p> */}
					<Box sx={{ position: 'relative', display: 'inline-flex' }}>
						<CircularProgress variant="determinate" value={r} color="success" />
						<Box
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<p style={{ color: '#dfa126', margin: '0' }}>{`${Math.round(r)}%`}</p>
						</Box>
					</Box>
				</div>
			)
		},
		{
			title: 'Date Created',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'left'
		},
		{
			title: 'Action',
			dataIndex: '_id',
			key: '_id',
			align: 'center',
			render: (r) => (
				<div>
					{rowId === r ? (
						<div className="table-column">
							<textarea
								placeholder="Enter keyresult"
								value={state.keyresult}
								onChange={(e) => setState({ ...state, keyresult: e.target.value })}
							/>
							<input
								type="number"
								placeholder="%"
								value={state.measureOfSuccess}
								onChange={(e) => setState({ ...state, measureOfSuccess: e.target.value })}
							/>
							<button disabled={loader ? true : false} className="table-btn" onClick={addKeyresult}>
								{loader ? 'saving' : 'save'}
							</button>
							<button className="table-btn" onClick={() => setRowId('')}>
								cancel
							</button>
						</div>
					) : (
						<button className="table-btn" onClick={() => setRowId(r)}>
							Add keyresult
						</button>
					)}
				</div>
			)
		}
	];
	return (
		<div className="table-tab">
			{open ? (
				<ModalUI>
					<NewObjective
						state={state}
						setState={setState}
						setOpen={setOpen}
						loading={loader}
						svg={svg}
						addObjective={addObjective}
						message={message}
					/>
				</ModalUI>
			) : null}
			<div className="lean-canvas-header">
				<div className="icon-row" onClick={() => history.goBack()}>
					<KeyboardBackspaceIcon style={{ fontSize: '20px', color: '#37561b', marginRight: '0.3rem' }} />
					<h4>Back</h4>
				</div>
				<h3>OKRs</h3>
			</div>
			<div className="objective-table-row">
				<h2>Objective Keyresults</h2>
				<div className="admin-filter-row">
					<div className="admin-filter-input-row">
						<h4>start date</h4>
						<input
							type="date"
							value={dates.startDate}
							onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
						/>
					</div>
					<div className="admin-filter-input-row">
						<h4>end date</h4>
						<input
							type="date"
							value={dates.endDate}
							onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
						/>
					</div>
					{loading ? (
						<img style={{ height: '20px', width: '20px' }} src={svg} />
					) : (
						<button onClick={filterAdminObjectives}>Filter</button>
					)}
				</div>
				<div
					className="objective-add-startup-button"
					onClick={() => {
						setOpen(true);
						setMessage('');
					}}
				>
					<ControlPointIcon style={{ fontSize: '20px', color: '#fff', marginRight: '0.5rem' }} />
					<p>New Objective</p>
				</div>
			</div>
			<Tabs style={{ width: '100%' }} defaultActiveKey="1" centered tabBarStyle={{ color: '#37561b' }}>
				<TabPane tab="Quarter 1" key="1" className="graph-tab-content">
					<Table
						columns={columns}
						dataSource={[
							...quarter1.map((r) => ({
								...r,
								key: r._id,
								createdAt: moment(r.createdAt).format('LL')
							}))
						]}
						style={{ width: '100%' }}
						pagination={{
							defaultPageSize: 5,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</TabPane>
				<TabPane tab="Quarter 2" key="2" className="graph-tab-content">
					<Table
						columns={columns}
						dataSource={[
							...quarter2.map((r) => ({
								...r,
								key: r._id,
								createdAt: moment(r.createdAt).format('LL')
							}))
						]}
						style={{ width: '100%' }}
						pagination={{
							defaultPageSize: 5,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</TabPane>
				<TabPane tab="Quarter 3" key="3" className="graph-tab-content">
					<Table
						columns={columns}
						dataSource={[
							...quarter3.map((r) => ({
								...r,
								key: r._id,
								createdAt: moment(r.createdAt).format('LL')
							}))
						]}
						style={{ width: '100%' }}
						pagination={{
							defaultPageSize: 5,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</TabPane>
				<TabPane tab="Quarter 4" key="4" className="graph-tab-content">
					<Table
						columns={columns}
						dataSource={[
							...quarter4.map((r) => ({
								...r,
								key: r._id,
								createdAt: moment(r.createdAt).format('LL')
							}))
						]}
						style={{ width: '100%' }}
						pagination={{
							defaultPageSize: 5,
							showSizeChanger: true,
							pageSizeOptions: [ '10', '20', '30' ]
						}}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
};

export default ObjectivesTable;
