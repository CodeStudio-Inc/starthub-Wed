import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { GAEventsTracker, actionCreators } from '../../Paths';

const Statements = ({ statements, svg }) => {
	const [ vision, setVision ] = React.useState(false);
	const [ mission, setMission ] = React.useState(false);
	const [ state, setState ] = React.useState({
		_vision: statements[0].vision,
		_mission: statements[0].mission
	});

	const UseGAEventsTracker = GAEventsTracker('Vision & Mission Statements');

	const _statements = useSelector((state) => state.requests.statements);
	const loading = useSelector((state) => state.requests.loading);
	// console.log(_statements)
	const dispatch = useDispatch();

	return (
		<div className="vision-statements">
			<div className="vision-mission-1">
				<RemoveRedEyeIcon className="edit-stmt-icon" style={{ fontSize: '60px' }} />
				<h2>Vision</h2>
				<div className="vision-mission-card">
					{vision ? (
						<textarea
							type="text"
							placeholder="Enter new Vision"
							value={state._vision}
							onChange={(e) => setState({ ...state, _vision: e.target.value })}
							onKeyUp={(e) => {
								if (e.key === 'Enter' && state._vision) {
									dispatch(
										actionCreators.editStatement(
											_statements[0]._id,
											state._vision,
											state._mission,
											(res) => {
												UseGAEventsTracker('editVisionStatement', state._vision);
												if (res.success) setVision(false);
											}
										)
									);
								}
							}}
						/>
					) : null}
					{vision ? null : <h4>{statements[0].vision}</h4>}
					{vision ? null : <p onClick={() => setVision(true)}>edit statement</p>}
					{vision ? <p onClick={() => setVision(false)}>cancel</p> : null}
					{loading && vision ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : null}
				</div>
			</div>
			<div className="statments-separator" />
			<div className="vision-mission-1">
				<RocketLaunchIcon className="edit-stmt-icon" style={{ fontSize: '60px' }} />
				<h2>Mission</h2>
				<div className="vision-mission-card">
					{mission ? (
						<textarea
							type="text"
							placeholder="Enter new Mission"
							value={state._mission}
							onChange={(e) => setState({ ...state, _mission: e.target.value })}
							onKeyUp={(e) => {
								if (e.key === 'Enter' && state._mission) {
									dispatch(
										actionCreators.editStatement(
											_statements[0]._id,
											state._vision,
											state._mission,
											(res) => {
												UseGAEventsTracker('editMissionStatement', state._mission);
												if (res.success) setMission(false);
											}
										)
									);
								}
							}}
						/>
					) : null}
					{mission ? null : <h4>{statements[0].mission}</h4>}
					{mission ? null : <p onClick={() => setMission(true)}>edit statement</p>}
					{mission ? <p onClick={() => setMission(false)}>cancel</p> : null}
					{loading && mission ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : null}
				</div>
			</div>
		</div>
	);
};

export default Statements;
