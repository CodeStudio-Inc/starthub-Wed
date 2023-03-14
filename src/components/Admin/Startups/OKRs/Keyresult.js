import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { GAEventsTracker } from '../../../Paths';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const Keyresult = ({ k, dispatch, actionCreators, svg, loading, userId }) => {
	// console.log(k)

	const [ editkeyResult, seteditkeyResult ] = React.useState(false);
	const [ btn, setBtn ] = React.useState(false);
	const [ activekeyResult, setactiveKeyresult ] = React.useState('');
	const [ state, setState ] = React.useState({
		keyresult: k.description,
		measureOfSuccess: '',
		message: ''
	});
	const [ progress, setProgress ] = React.useState(false);
	const [ visible, setVisible ] = React.useState(false);

	const UseGAEventsTracker = GAEventsTracker('Keyresults');

	return (
		<div className="objective-row">
			{k.measureOfSuccess === '100' ? (
				<CheckCircleIcon style={{ color: 'rgb(46, 196, 46)', fontSize: '20px' }} />
			) : (
				<WatchLaterIcon style={{ color: 'red', fontSize: '20px' }} />
			)}
			<div key={k._id} className="objective-inner-row">
				<p>Key Result</p>
				<div className="objective-card">
					{editkeyResult && activekeyResult === k.objId ? null : <p>{k.description}</p>}
					{editkeyResult && activekeyResult === k.objId ? (
						<div style={{ width: '100%' }}>
							<textarea
								type="text"
								placeholder="Enter Key result"
								value={state.keyresult}
								onChange={(e) => setState({ ...state, keyresult: e.target.value })}
								onFocus={() => setBtn(true)}
							/>
							{btn ? (
								<button
									onClick={() => {
										if (!state.keyresult) return alert('Enter keyresult');
										if (state.keyresult) {
											setBtn(false);
											dispatch(
												actionCreators.editAdminkeyResult(
													k.objId,
													state.keyresult,
													state.measureOfSuccess,
													k.dateCreated,
													userId,
													(res) => {
														UseGAEventsTracker('editKeyresultDescription', state.keyresult);
														if (res.success) {
															seteditkeyResult(false);
															setactiveKeyresult(k.objId);
															setState({
																keyresult: '',
																measureOfSuccess: ''
															});
														}
													}
												)
											);
										}
									}}
								>
									Save
								</button>
							) : null}
							{loading && activekeyResult === k.objId ? (
								<p style={{ color: '#dfa126' }}>Saving please wait...</p>
							) : null}
						</div>
					) : null}
					{editkeyResult && activekeyResult === k.objId ? null : (
						<EditIcon
							className="edit-stmt-icon"
							style={{ fontSize: '20px' }}
							onClick={() => {
								setactiveKeyresult(k.objId);
								seteditkeyResult(true);
							}}
						/>
					)}
					{editkeyResult && activekeyResult === k.objId ? (
						<CancelIcon
							className="edit-stmt-icon"
							style={{ fontSize: '20px' }}
							onClick={() => seteditkeyResult(false)}
						/>
					) : null}
				</div>
				<div className="slider-column">
					<div className="objective-slider-row">
						<Box sx={{ width: 150 }}>
							<Slider
								size="small"
								defaultValue={k.measureOfSuccess}
								valueLabelDisplay="auto"
								onChange={(e) => {
									setState({ ...state, measureOfSuccess: e.target.value });
									setactiveKeyresult(k.objId);
									setProgress(true);
								}}
							/>
						</Box>
						{progress && activekeyResult === k.objId ? null : <h4>{k.measureOfSuccess}%</h4>}
						{progress && activekeyResult === k.objId ? <h4>{state.measureOfSuccess}%</h4> : null}
						{!visible && !state.message ? (
							<button
								onClick={() => {
									setactiveKeyresult(k._id);
									UseGAEventsTracker('deleteKeyresult', k.description);
									dispatch(
										actionCreators.deleteKeyResult(k.objId, k._id, (res) => {
											if (res.success === false) {
												setState({ message: 'Not Authorised to delete' });
											}
										})
									);
								}}
							>
								{loading && activekeyResult === k._id ? 'Deleting' : 'Delete'}
							</button>
						) : null}
						<p style={{ marginLeft: '5px', marginTop: '0', marginBottom: '0' }}>{state.message}</p>
					</div>
					{progress && activekeyResult === k.objId ? (
						<button
							onClick={() => {
								dispatch(
									actionCreators.editAdminkeyResult(
										k.objId,
										state.keyresult,
										state.measureOfSuccess.toString(),
										k.dateCreated,
										userId,
										(res) => {
											UseGAEventsTracker(
												'adjustMeasureOfKeyresultSuccess',
												state.measureOfSuccess
											);
											if (res.success) {
												setProgress(false);
												setState({
													keyresult: '',
													measureOfSuccess: ''
												});
											}
										}
									)
								);
							}}
						>
							{loading && activekeyResult === k.objId ? 'Saving' : 'save progress'}
						</button>
					) : null}
				</div>
				{/* {loading && activekeyResult === k.objId  ? <img src={svg} style={{ width:"30px", height:"30px"}} /> : null} */}
			</div>
		</div>
	);
};

export default Keyresult;
