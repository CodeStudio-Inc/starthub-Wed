import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators, ModalUI } from '../../Paths';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import ReactGA, { set } from 'react-ga';
import { Helmet } from 'react-helmet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BalanceIcon from '@mui/icons-material/Balance';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { svg } from '../../Paths';

import ReportRevenue from './modals/ReportRevenue';
import RevenueTable from './modals/RevenueTable';
import LoanApplication from './modals/LoanApplication';
import Diagnostics from '../../Admin/Startups/Diagnostics';
import './MetricsStyles.css';
const Metrics = ({ visible }) => {
	const [ open, setOpen ] = React.useState(false);
	const [ year, setYear ] = React.useState('');
	const [ revenueTable, setRevenueTable ] = React.useState(false);
	const [ loanApplication, setLoanApplication ] = React.useState(false);
	const { revenue, loader } = useSelector((state) => state.admin);
	const {
		userId,
		token,
		category,
		totalExpectedRevenueShare,
		totalRevSharePaid,
		totalRevenue,
		totalExpense,
		loanEligibility,
		loanEligibilityMsg,
		loanApplicationDate,
		eligibilityCheck
	} = useSelector((state) => state.auth);
	const { values } = useSelector((state) => state.requests);

	const diagnostics = values && values.at(-1);

	React.useEffect(() => {
		loanEligibilityCheck();
		getRevenue();
		getUser();
		getValues();
		ReactGA.pageview(window.location.pathname);
	}, []);

	const dispatch = useDispatch();

	const getRevenue = () => dispatch(actionCreators.getStartupRevenue());
	const getUser = () => dispatch(actionCreators.getUser(userId, token));
	const getValues = () => dispatch(actionCreators.getValues());
	const loanEligibilityCheck = () => dispatch(actionCreators.loanEligibilityCheck());

	const rev = revenue.map((el) => el.month_revenue);
	const expense = revenue.map((el) => el.month_expense);
	const pay = revenue.map((el) => el.revSharepayment);
	const months = Array.from(revenue, ({ month }) => month);

	const Revenue = {
		labels: months,
		datasets: [
			{
				label: 'Monthly Revenue (UGX)',
				backgroundColor: '#dfa126',
				borderColor: '#dfa126',
				borderWidth: 1,
				data: rev
			},
			{
				label: 'Monthly Expenses (UGX)',
				backgroundColor: '#37561b',
				borderColor: '#37561b',
				borderWidth: 1,
				data: expense
			},
			{
				label: 'Revenue Share Payment (UGX)',
				backgroundColor: '#7e2527',
				borderColor: '#7e2527',
				borderWidth: 1,
				data: pay
			}
		]
	};

	const columns = [
		{
			title: 'Date',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
		},
		{
			title: 'Monthly Revenue(UGX)',
			dataIndex: 'revenue',
			key: 'revenue',
			align: 'left'
		},
		{
			title: 'Monthly Expense(UGX)',
			dataIndex: 'expense',
			key: 'expense',
			align: 'left'
		},
		{
			title: 'Expected Revenue Share Payment(UGX)',
			dataIndex: 'expectedRevsharePayment',
			key: 'expectedRevsharePayment',
			align: 'left'
		}
	];

	const card_content = [
		{
			id: 1,
			label: 'Loan Eligibility',
			amount: loanEligibility,
			icon: <CreditScoreIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			id: 2,
			label: 'Total Revenue',
			amount:
				typeof totalRevenue === 'undefined' ? 0 : totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			id: 3,
			label: 'Total Expense',
			amount:
				typeof totalExpense === 'undefined' ? 0 : totalExpense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <TrendingUpIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			id: 4,
			label: 'Total Revenue Share Payment',
			amount:
				typeof totalRevSharePaid === 'undefined'
					? 0
					: totalRevSharePaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <SavingsIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			id: 5,
			label: 'Expected Revenue Share Payment',
			amount:
				typeof totalExpectedRevenueShare === 'undefined'
					? 0
					: totalExpectedRevenueShare.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
			icon: <BalanceIcon style={{ fontSize: '25px', color: '#37561b' }} />
		},
		{
			id: 6,
			label: 'Loan Balance(includes interest)',
			amount: 0,
			icon: <BalanceIcon style={{ fontSize: '25px', color: '#37561b' }} />
		}
	];

	const Cards = () => (
		<div className="revenue-card-row">
			{card_content.map((c) => (
				<div className={visible ? 'revenue-card revenue-width' : 'revenue-card'} key={c.id}>
					<div className="revenue-card-content-column">
						{c.id === 1 ? null : <div className="revenue-card-content-row-avatar">{c.icon}</div>}
						{c.id !== 1 ? null : <h2>{c.amount}</h2>}
						{c.id === 1 ? null : <h1>{c.amount} Shs</h1>}
						<h3>{c.label}</h3>
						{c.id === 1 ? (
							<h4>
								{loanEligibilityMsg}{' '}
								{eligibilityCheck ? (
									<strong style={{ color: '#dfa126' }}>{loanApplicationDate.substring(0, 10)}</strong>
								) : null}
							</h4>
						) : null}
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className="metrics-container">
			{open ? (
				<ModalUI setClose={setOpen}>
					<ReportRevenue setOpen={setOpen} />
				</ModalUI>
			) : null}
			{revenueTable ? (
				<ModalUI setClose={setRevenueTable}>
					<RevenueTable
						revenue={revenue}
						columns={columns}
						setOpen={setRevenueTable}
						svg={svg}
						loader={loader}
						dispatch={dispatch}
						actionCreators={actionCreators}
					/>
				</ModalUI>
			) : null}
			{loanApplication ? (
				<ModalUI setClose={setLoanApplication}>
					<LoanApplication setOpen={setLoanApplication} />
				</ModalUI>
			) : null}
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Cards />
			<div className="report-revenue-btn" onClick={() => setOpen(true)}>
				<AssessmentIcon style={{ fontSize: '30px', color: '#fff', marginRight: '5px' }} />
				<h4>Report Revenue</h4>
			</div>
			<div className="metric-btn-row" />
			{category === 'internal' ? null : (
				<div className="revenue">
					<div className="graph-row">
						<button onClick={() => setRevenueTable(true)}>View Reported Revenue</button>
						<h3>Revenue Reporting Graph</h3>
						<div className="search-box-row">
							<input placeholder="year" value={year} onChange={(e) => setYear(e.target.value)} />
							<button onClick={() => dispatch(actionCreators.filterStartupRevenue(year))}>search</button>
							{loader ? <img src={svg} style={{ height: '30px', width: '30px' }} /> : null}
						</div>
					</div>
					<Line data={Revenue} width={100} height={30} />
				</div>
			)}
			<Diagnostics
				teams={typeof diagnostics === 'undefined' ? 0 : diagnostics.teams}
				vision={typeof diagnostics === 'undefined' ? 0 : diagnostics.vision}
				proposition={typeof diagnostics === 'undefined' ? 0 : diagnostics.proposition}
				product={typeof diagnostics === 'undefined' ? 0 : diagnostics.product}
				market={typeof diagnostics === 'undefined' ? 0 : diagnostics.market}
				business={typeof diagnostics === 'undefined' ? 0 : diagnostics.business}
				investment={typeof diagnostics === 'undefined' ? 0 : diagnostics.investment}
			/>
		</div>
	);
};

export default withRouter(Metrics);
