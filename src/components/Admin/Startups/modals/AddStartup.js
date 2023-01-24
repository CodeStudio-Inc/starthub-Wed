import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, logo, svg } from '../../../Paths';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@material-ui/icons/Close';

const AddStartup = ({ setOpen }) => {
	const [ state, setState ] = React.useState({
		username: '',
		email: '',
		category: '',
		mentor: '',
		password: '',
		contractDate: '',
		percentageShare: 0,
		additionalMetrics: ''
	});
	const [ emailcheck, setEmailCheck ] = React.useState('');
	const [ error, setError ] = React.useState(false);
	const [ success, setSuccess ] = React.useState(false);
	const [ message, setMessage ] = React.useState('');

	const { loading } = useSelector((state) => state.auth);

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const dispatch = useDispatch();

	const handleEmailChange = (e) => {
		setState({ ...state, email: e.target.value });
		validateEmail(state.email);
		if (validateEmail(state.email)) setEmailCheck('');
		if (!validateEmail(state.email)) setEmailCheck('Enter valid email');
	};

	const register = () => {
		setError(false);
		setSuccess(false);
		setEmailCheck('');
		if (!validateEmail(state.email) || !state.email) return setEmailCheck('Enter valid email');
		if (!state.username || !state.category || !state.password || !state.percentageShare)
			return setEmailCheck('All fields are required');
		dispatch(
			actionCreators.signUp(
				state.username,
				state.email,
				state.category,
				state.mentor,
				state.password,
				state.contractDate,
				parseInt(state.additionalMetrics),
				state.percentageShare,
				(res) => {
					if (res.success) {
						setSuccess(true);
						setMessage(res.res);
					}
					if (res.error) {
						setError(true);
						setMessage(JSON.stringify(res.err.message));
					}
				}
			)
		);
		// setState({
		// 	username: '',
		// 	email: '',
		// 	category: '',
		// 	password: ''
		// });
	};

	return (
		<div className="signup-main">
			<div className="signup-left">
				<div className="signup-left-backdrop">
					<h1>World-class venture building for innovators in Uganda.</h1>
					<h3>Setup Startup Account.</h3>
					{error ? (
						<div className="error-message">
							<WarningAmberIcon style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }} />
							<h4>{message}</h4>
						</div>
					) : null}
					{success ? (
						<div className="error-message">
							<DoneIcon style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }} />
							<h4>{message}</h4>
						</div>
					) : null}
				</div>
			</div>
			<div className="signup-right">
				<div className="signup-right-container">
					<div className="close-modal-row">
						<CloseIcon
							style={{ fontSize: '25px', color: 'rgba(0,0,0,0.4)' }}
							className="close-modal-icon"
							onClick={() => {
								setState({
									username: '',
									email: '',
									category: '',
									mentor: '',
									password: '',
									contractDate: '',
									percentageShare: 0.05,
									additionalMetrics: ''
								});
								setOpen(false);
							}}
						/>
					</div>
					<img style={{ height: '90px', width: '70px' }} src={logo} alt="logo" />
					<h2>Register</h2>
					<h3>Setup Startup account</h3>
					<div className="input-row">
						<div className="input-column">
							<h4>username</h4>
							<input
								type="text"
								value={state.username}
								onChange={(e) => setState({ ...state, username: e.target.value })}
							/>
						</div>
						<div className="input-column">
							<h4>password</h4>
							<input
								value={state.password}
								onChange={(e) => setState({ ...state, password: e.target.value })}
							/>
						</div>
					</div>
					<div className="input-row">
						<div className="input-column">
							{!emailcheck ? <h4>email</h4> : null}
							{emailcheck ? <p style={{ color: 'red' }}>{emailcheck}</p> : null}
							<input
								type="email"
								placeholder="@email.com"
								value={state.email}
								onChange={handleEmailChange}
							/>
						</div>
						<div className="input-column">
							<h4>contract date</h4>
							<input
								type="date"
								value={state.contractDate}
								onChange={(e) => setState({ ...state, contractDate: e.target.value })}
							/>
						</div>
					</div>
					<div className="input-row">
						<div className="input-column">
							<h4>category</h4>
							<select
								value={state.category}
								onChange={(e) => setState({ ...state, category: e.target.value })}
							>
								<option value="" disabled selected>
									-select-
								</option>
								<option value="internal">StartHub</option>
								<option value="academy">Academy</option>
								<option value="catalyzer">Catalyzer</option>
							</select>
						</div>
						<div className="input-column">
							{state.category === 'internal' ? null : <h4>mentor</h4>}
							{state.category === 'internal' ? null : (
								<select
									value={state.mentor}
									onChange={(e) => setState({ ...state, mentor: e.target.value })}
								>
									<option value="" disabled selected>
										-select-
									</option>
									<option value="621373424a3c50000a6d2de5">Bonita</option>
									<option value="60d477d35fbd800004c84f7c">Matthias</option>
									<option value="610d180215fa3323e44593a9">Timmm</option>
								</select>
							)}
						</div>
					</div>
					<div className="input-row">
						<div className="input-column">
							<h4>Percentage Revenue Share</h4>
							<input
								placeholder="5%"
								value={state.percentageShare}
								onChange={(e) => setState({ ...state, percentageShare: e.target.value })}
							/>
						</div>
						<div className="input-column">
							<h4>Additional metrics(optional)</h4>
							<input
								value={state.additionalMetrics}
								onChange={(e) => setState({ ...state, additionalMetrics: e.target.value })}
							/>
						</div>
					</div>
					<button onClick={register}>
						{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Create Account'}
					</button>
				</div>
			</div>
			{/* <div className="login-main-left">
				<div className="login-main-left-backdrop">
					<div className="text-container">
						<h1>StartHub Catalyzer</h1>
						<h2>World-class venture building for innovators in Uganda.</h2>
					</div>
				</div>
			</div>
			<div className="login-main-right">
				<img style={{ height: '90px', width: '70px' }} src={logo} alt="logo" />
				<h1>Register New Startup</h1>
				<div className="login-form">
					<h5>Username</h5>
					<input
						type="text"
						placeholder="Enter startup name"
						value={state.username}
						onChange={(e) => setState({ ...state, username: e.target.value })}
					/>
					{!emailcheck ? <h5>Email</h5> : null}
					{emailcheck ? <p style={{ color: 'red' }}>{emailcheck}</p> : null}
					<input type="email" placeholder="@email.com" value={state.email} onChange={handleEmailChange} />
					<h5>Category</h5>
					<select value={state.category} onChange={(e) => setState({ ...state, category: e.target.value })}>
						<option value="" disabled selected>
							-select-
						</option>
						<option value="internal">StartHub</option>
						<option value="academy">Academy</option>
						<option value="catalyzer">Catalyzer</option>
					</select>
					{state.category === 'internal' ? null : <h5>Mentor</h5>}
					{state.category === 'internal' ? null : (
						<select value={state.mentor} onChange={(e) => setState({ ...state, mentor: e.target.value })}>
							<option value="" disabled selected>
								-select-
							</option>
							<option value="621373424a3c50000a6d2de5">Bonita</option>
							<option value="60d477d35fbd800004c84f7c">Matthias</option>
							<option value="610d180215fa3323e44593a9">Timmm</option>
						</select>
					)}
					<h5>Password</h5>
					<input
						placeholder="password"
						value={state.password}
						onChange={(e) => setState({ ...state, password: e.target.value })}
					/>
				</div>
				<button onClick={register}>
					{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Register'}
				</button>
				<p
					className="cancel-btn"
					onClick={() => {
						setOpen(false);
						setSuccess(false);
						setError(false);
					}}
				>
					Cancel
				</p>
				{error ? (
					<div className="error-message">
						<WarningAmberIcon style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }} />
						<h4>Error registering startup, Please try again</h4>
					</div>
				) : null}
				{success ? (
					<div className="error-message">
						<DoneIcon style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }} />
						<h4>Startup Registered Successfully</h4>
					</div>
				) : null}
			</div> */}
		</div>
	);
};
export default AddStartup;
