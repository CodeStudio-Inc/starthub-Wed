import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

const LoanApplication = ({ setOpen }) => {
	const [ state, setState ] = React.useState({
		amount: '',
		loanType: '',
		duration: '',
		interest: 0,
		expectedPayment: 0,
		mentor: ''
	});
	const [ calculate, setCalculate ] = React.useState({
		amount: '',
		loanType: '',
		duration: '',
		interest: 0,
		expectedPayment: 0
	});

	const calc = () => {
		if (calculate.loanType === 'short-term')
			return setCalculate({
				...calculate,
				interest: parseInt(calculate.amount) * 0.01 * parseInt(calculate.duration),
				expectedPayment:
					parseInt(calculate.amount) + parseInt(calculate.amount) * 0.01 * parseInt(calculate.duration)
			});
		if (calculate.loanType === 'long-term')
			return setCalculate({
				...calculate,
				interest: parseInt(calculate.amount) * 0.015,
				expectedPayment: parseInt(calculate.amount) + parseInt(calculate.amount) * 0.015
			});
	};

	return (
		<div className="loan-modal-container">
			<div className="loan-modal-container-overlay">
				<div className="loan-modal-header">
					<h3>Loan Application Form</h3>
				</div>
				<h3>Loan Calculator</h3>
				<div className="loan-calculator">
					<input
						placeholder="Loan Amount"
						value={calculate.amount}
						onChange={(e) => setCalculate({ ...calculate, amount: e.target.value })}
					/>
					<select
						value={calculate.loanType}
						onChange={(e) => setCalculate({ ...calculate, loanType: e.target.value })}
					>
						<option value="" disabled selected>
							-select loan type-
						</option>
						<option value="short-term">Short-Term</option>
						<option value="long-term">Long-Term</option>
					</select>
					<input
						placeholder="Duration"
						type="number"
						value={calculate.duration}
						onChange={(e) => setCalculate({ ...calculate, duration: e.target.value })}
					/>
					<button onClick={calc}>Calculate</button>
				</div>
				{calculate.interest || calculate.expectedPayment ? (
					<div className="loan-calculator">
						<div className="loan-calculator-row">
							<h3>Interest: </h3>
							<h1>{calculate.interest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Shs</h1>
						</div>
						<div className="loan-calculator-row">
							<h3>Expected Payment:</h3>
							<h1>{calculate.expectedPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Shs</h1>
						</div>
					</div>
				) : null}
				<div className="loan-modal-content">
					<p>
						Please fill in all the needed information in the loan application form to request a loan from
						Starthub Africa
					</p>
					<h4>Desired Loan Amount</h4>
					<input />
					<h4>Loan Type</h4>
					<select>
						<option value="" disabled selected>
							-select-
						</option>
						<option value="Short-Term">Short-Term</option>
						<option value="Long-Term">Long-Term</option>
					</select>
					<h4>What will the loan be used for?</h4>
					<textarea />
				</div>
				<div className="loan-btn-row">
					<button onClick={() => setOpen(false)}>Cancel</button>
					<button onClick={() => alert('In Development')}>Apply</button>
				</div>
			</div>
		</div>
	);
};
export default LoanApplication;
