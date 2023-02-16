import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const NewObjective = ({ state, setState, loading, svg, addObjective, checkInput, setObjective }) => {
	return (
		<div className="create-modal">
			<div className="create-header">
				<h3>Add Objective</h3>
				<CloseIcon
					className="create-icon"
					style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
					onClick={() => {
						setObjective(false);
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
				/>
				<select value={state.quarter} onChange={(e) => setState({ ...state, quarter: e.target.value })}>
					<option value="" disabled selected>
						-select-quarter-
					</option>
					<option value="1">Quarter1</option>
					<option value="2">Quarter2</option>
					<option value="3">Quarter3</option>
					<option value="4">Quarter4</option>
				</select>
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
	);
};
export default NewObjective;
