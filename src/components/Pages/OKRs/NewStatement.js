import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const NewStatement = ({ state, setState, loading, svg, setStatement, addStatement }) => {
	return (
		<div className="create-modal">
			<div className="create-header">
				<h3>Create Statements</h3>
				<CloseIcon
					className="create-icon"
					style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
					onClick={() => setStatement(false)}
				/>
			</div>
			<div className="create-form">
				<textarea
					type="text"
					placeholder="Vision Statement"
					value={state.vision}
					onChange={(e) => setState({ ...state, vision: e.target.value })}
				/>
				<textarea
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
	);
};
export default NewStatement;
