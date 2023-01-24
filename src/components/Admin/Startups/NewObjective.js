import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const NewObjective = ({ state, setState, loading, svg, message, setOpen, addObjective }) => {
	return (
		<div className="add-objective-modal-container">
			<div className="add-objective-modal-header">
				<CloseIcon
					style={{ fontSize: '20px' }}
					className="add-objective-modal-header-icon"
					onClick={() => setOpen(false)}
				/>
			</div>
			<div className="add-objective-modal-content">
				<input
					placeholder="Enter objective name"
					value={state.description}
					onChange={(e) => setState({ ...state, description: e.target.value })}
				/>
				<select value={state.quarter} onChange={(e) => setState({ ...state, quarter: e.target.value })}>
					<option value="" disabled selected>
						-select-quarter-
					</option>
					<option value="1">Quarter1</option>
					<option value="2">Quarter2</option>
					<option value="3">Quarter3</option>
					<option value="4">Quarter3</option>
				</select>
			</div>
			<button onClick={addObjective}>
				{loading ? <img src={svg} style={{ height: '20px', width: '20px' }} /> : 'save'}
			</button>
			{message ? <p>{message}</p> : null}
		</div>
	);
};
export default NewObjective;
