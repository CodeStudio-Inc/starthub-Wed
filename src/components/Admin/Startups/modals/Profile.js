import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const Profile = ({ data, setEdit, setVisible }) => {
	const handleOnclick = () => {
		setEdit(true);
		setVisible(false);
	};

	return (
		<div className="profile-container">
			<div className="profile-modal-container">
				<div className="profile-modal-header" />
				<div className="profile-modal-avatar">
					<h1>{data.username.substring(0, 1)}</h1>
				</div>
				<div className="profile-modal-main">
					<h3>{data.username}</h3>
					<h4>{data.email}</h4>
				</div>
				<EditIcon className="profile-modal-icon" style={{ fontSize: '20px' }} onClick={handleOnclick} />
			</div>
			<div className="profile-modal-overlay" onClick={() => setVisible(false)} />
		</div>
	);
};
export default Profile;
