import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { GAEventsTracker } from '../../../Paths';

const Addkeyresult = ({ obj, dispatch, actionCreators, setaddkeyResult, userId }) => {
	const loading = useSelector((state) => state.requests.loading);

	const [ state, setState ] = React.useState({
		keyresult: '',
		measureOfSuccess: 0
	});

	const UseGAEventsTracker = GAEventsTracker('Keyresults');

	return (
		<div key={obj._id} className="objective-row">
			<div className="objective-column">
				<h3>KeyResult</h3>
				<p>
					<span style={{ color: 'red' }}>*</span>Required
				</p>
				<textarea
					type="text"
					placeholder="Enter Key result"
					value={state.keyresult}
					onChange={(e) => setState({ ...state, keyresult: e.target.value })}
				/>
			</div>
			<div className="objective-column">
				<h3>Measure of success</h3>
				<p>
					<span style={{ color: 'red' }}>*</span>Required
				</p>
				<div className="objective-slider-row">
					<Box sx={{ width: 200 }}>
						<Slider
							size="small"
							value={state.measureOfSuccess}
							onChange={(e) => setState({ ...state, measureOfSuccess: e.target.value })}
							valueLabelDisplay="auto"
						/>
					</Box>
					<h4>{state.measureOfSuccess}%</h4>
				</div>
			</div>
			<button
				onClick={() => {
					if (!state.keyresult) return alert('Enter keyresult');
					dispatch(
						actionCreators.addAdminkeyResult(
							userId,
							state.keyresult,
							state.measureOfSuccess.toString(),
							obj._id,
							(res) => {
								UseGAEventsTracker('addKeyresult', state.keyresult);
								if (res.success) {
									setaddkeyResult(false);
									setState({
										keyresult: '',
										measureOfSuccess: 0
									});
								}
							}
						)
					);
				}}
			>
				{loading ? 'Saving' : 'Save'}
			</button>
		</div>
	);
};

export default Addkeyresult;
