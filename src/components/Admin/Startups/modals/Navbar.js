import React from 'react';
import Profile from './Profile';
import EditProfile from './EditProfile';
import { ModalUI } from '../../../Paths';

const Navbar = ({ data, history }) => {
	const [ visible, setVisible ] = React.useState(false);
	const [ edit, setEdit ] = React.useState(false);

	return (
		<div className="profile-row">
			{edit ? (
				<ModalUI setClose={setEdit}>
					<EditProfile data={data} setEdit={setEdit} />
				</ModalUI>
			) : null}
			{visible ? <Profile data={data} setVisible={setVisible} setEdit={setEdit} /> : null}
			<div className="icon-row">
				{/* <KeyboardBackspaceIcon style={{ fontSize: '20px', color: '#37561b', marginRight: '0.3rem' }} />
					<h4>Back</h4> */}
				<h4 onClick={() => history.push('/')}>Dashboard</h4>
			</div>
			<div className="edit-profile-container">
				<h4 onClick={() => history.push(`/startup/${data.username}`, { data: data })}>Overview</h4>
				<h4 onClick={() => history.push(`/lean-canvas/${data.username}`, { data: data })}>Lean Canvas</h4>
				<h4 onClick={() => history.push(`/okrs/${data.username}`, { data: data })}>OKRs</h4>
				<div className="profile-lable-row" onClick={() => setVisible(true)}>
					<div className="table-avatar">
						<h3>{data.username.substring(0, 1)}</h3>
					</div>
					<h4>{data.username}</h4>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
