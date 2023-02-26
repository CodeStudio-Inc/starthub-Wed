import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { actionCreators, svg } from '../../../Paths';
const EditProfile = ({ setEdit, data }) => {
	const [ state, setState ] = React.useState({
		username: '',
		email: '',
		contractDate: '',
		additionalMetrics: '',
		message: ''
	});
	const [ error, setError ] = React.useState('');

	const { loading } = useSelector((state) => state.admin);

	const dispatch = useDispatch();

	const updateStartup = () => {
		if (state.email && !validateEmail(state.email)) return setError('The email address you entered is not valid');
		if (!state.username && !state.email && !state.contractDate && !state.additionalMetrics)
			return setState({ ...state, message: 'Invalid Entries' });
		dispatch(
			actionCreators.updateStartup(
				data._id,
				state.username,
				state.email,
				state.contractDate,
				parseInt(state.additionalMetrics)
			)
		);
		setState({
			username: '',
			email: '',
			contractDate: '',
			additionalMetrics: '',
			message: ''
		});
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const handleEmailChange = (e) => {
		setState({ ...state, email: e.target.value });
		validateEmail(state.email);
		if (validateEmail(state.email)) setError('');
		if (!validateEmail(state.email)) setError('Enter valid email');
	};

	return (
		<div className="add-objective-modal-container">
			<div className="edit-profile-modal-header">
				<div className="profile-lable-row">
					<div className="table-avatar">
						<h3>{data.username.substring(0, 1)}</h3>
					</div>
					<h2>{data.username}</h2>
				</div>
				<CloseIcon
					style={{ fontSize: '20px' }}
					className="add-objective-modal-header-icon"
					onClick={() => setEdit(false)}
				/>
			</div>
			<div className="edit-profile-modal-content">
				<h4>Username</h4>
				<input value={state.username} onChange={(e) => setState({ ...state, username: e.target.value })} />
				{error ? <h5 style={{ color: 'red' }}>{error}</h5> : <h4>Email</h4>}
				<input value={state.email} onChange={handleEmailChange} placeholder="@example.com" type="email" />
				<h4>Contract Date</h4>
				<input
					type="date"
					value={state.contractDate}
					onChange={(e) => setState({ ...state, contractDate: e.target.value })}
				/>
				<h4>Additional Metrics</h4>
				<input
					value={state.additionalMetrics}
					onChange={(e) => setState({ ...state, additionalMetrics: e.target.value })}
				/>
			</div>
			<button onClick={updateStartup}>
				{loading ? <img src={svg} style={{ height: '20px', width: '20px' }} /> : 'Save'}
			</button>
			<p>{state.message}</p>
		</div>
	);
};
export default EditProfile;
