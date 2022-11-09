import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, GAEventsTracker, logo, svg } from '../../Paths';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import './AuthStyles.css';
const Login = () => {
	const [ visible, setVisible ] = React.useState(false);
	const [ type, setType ] = React.useState('password');
	const [ error, setError ] = React.useState(false);
	const [ state, setState ] = React.useState({
		email: '',
		password: ''
	});

	const { loading } = useSelector((state) => state.auth);

	const UseGAEventsTracker = GAEventsTracker('User Activity');

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(actionCreators.removeUser());
	}, []);

	const handleLogin = () => {
		setError(false);
		UseGAEventsTracker('loggedIn', new Date());
		dispatch(
			actionCreators.login(state.email, state.password, (res) => {
				if (res.success === false) return setError(true);
			})
		);
	};

	const makeVisible = () => {
		setType('text');
		setVisible(true);
	};

	const makeInvisible = () => {
		setType('password');
		setVisible(false);
	};

	return (
		<div className="login-container">
			<div className="login-main">
				<div className="login-main-left">
					<div className="login-main-left-backdrop">
						<div className="text-container">
							<h1>StartHub Catalyzer</h1>
							<h2>World-class venture building for innovators in Uganda.</h2>
							<h4>
								Have weekly sessions with expert venture associates for 2 years. Get Investor
								connections of upto 4M UGX in cash, and access to StartHub loans.
							</h4>
						</div>
					</div>
				</div>
				<div className="login-main-right">
					<img src={logo} alt="logo" />
					<h1>Sign in to Platform</h1>
					<div className="login-form">
						<h5>Email</h5>
						<input
							type="email"
							placeholder="@email.com"
							value={state.email}
							onChange={(e) => setState({ ...state, email: e.target.value })}
						/>
						<h5>Password</h5>
						<div className="login-form-row">
							<input
								type={type}
								placeholder="password"
								value={state.password}
								onChange={(e) => setState({ ...state, password: e.target.value })}
							/>
							{!visible ? (
								<VisibilityIcon
									onClick={makeVisible}
									className="visible-icon"
									style={{ color: 'rgba(0,0,0,0.3)', fontSize: '30px', marginRight: '0.5rem' }}
								/>
							) : null}
							{visible ? (
								<VisibilityOffIcon
									onClick={makeInvisible}
									className="visible-icon"
									style={{ color: 'rgba(0,0,0,0.3)', fontSize: '30px', marginRight: '0.5rem' }}
								/>
							) : null}
						</div>
					</div>
					<button onClick={handleLogin}>
						{loading ? <img src={svg} style={{ width: '30px', height: '30px' }} /> : 'Sign in'}
					</button>
					{error ? (
						<div className="error-message">
							<WarningAmberIcon style={{ color: '#37561b', fontSize: '20px', marginRight: '0.5rem' }} />
							<h4>Error logging in, Please try again</h4>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
export default Login;
