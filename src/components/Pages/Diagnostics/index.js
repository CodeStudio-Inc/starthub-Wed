import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import MultipleStepForm from './MultipleStepForm';
import { FormStep } from './MultipleStepForm';
import { teams, vision, proposition, product, market, business, investment } from './Steps';
import { actionCreators, svg } from '../../Paths';
import ReactGA from 'react-ga';

import './Diagnostics.css';
import { message } from 'antd';
const Diagnostics = () => {
	const userId = useSelector((state) => state.auth.userId);
	const _value = useSelector((state) => state.requests.values);
	const loading = useSelector((state) => state.requests.loading);

	const filter_value = _value && _value.filter((e) => e.creator === userId);
	const last_value = filter_value && filter_value.slice(-1).pop();
	//   console.log(_value)

	const [ teamsValue, setTeamsValue ] = useState(last_value && last_value.teams);
	const [ visionValue, setVisionValue ] = useState(last_value && last_value.vision);
	const [ propositionValue, setPropositionValue ] = useState(last_value && last_value.proposition);
	const [ productValue, setProductValue ] = useState(last_value && last_value.product);
	const [ marketValue, setMarketValue ] = useState(last_value && last_value.market);
	const [ businessValue, setBusinessValue ] = useState(last_value && last_value.business);
	const [ investmentValue, setInvestmentValue ] = useState(last_value && last_value.investment);

	const [ teamsHeader, setTeamsHeader ] = useState('');
	const [ teamsDesc, setTeamsDesc ] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionCreators.getValues());
		ReactGA.pageview(window.location.pathname);
	}, []);

	const handleTeamsOnChange = (e) => {
		setTeamsValue(e.target.value);
		dispatch(actionCreators.setTeamsValue(teamsValue));

		// if (teamsValue === 10) {
		// 	setTeamsHeader('How sure are you that your team members are commited');
		// 	setTeamsDesc('Your Team players are commited if');
		// }
		// if (teamsValue === 20) {
		// 	setTeamsHeader('Teams Level 2 Header');
		// 	setTeamsDesc('Teams Level 2 Description');
		// }
		// if (teamsValue === 30) {
		// 	setTeamsHeader('Teams Level 3 Header');
		// 	setTeamsDesc('Teams Level 3 Description');
		// }
	};

	const handleVisionOnChange = (e) => {
		setVisionValue(e.target.value);
		dispatch(actionCreators.setVisionValue(visionValue));
	};

	const handlePropositionOnChange = (e) => {
		setPropositionValue(e.target.value);
		dispatch(actionCreators.setPropositionValue(propositionValue));
	};

	const handleProductOnChange = (e) => {
		setProductValue(e.target.value);
		dispatch(actionCreators.setProductValue(productValue));
	};

	const handleMarketOnChange = (e) => {
		setMarketValue(e.target.value);
		dispatch(actionCreators.setMarketValue(marketValue));
	};

	const handleBusinessOnChange = (e) => {
		setBusinessValue(e.target.value);
		dispatch(actionCreators.setBusinessValue(businessValue));
	};

	const handleInvestmentOnChange = (e) => {
		setInvestmentValue(e.target.value);
		dispatch(actionCreators.setInvestmentValue(investmentValue));
	};

	const handleStepsSubmit = () => {
		dispatch(
			actionCreators.addValues(
				teamsValue,
				visionValue,
				propositionValue,
				productValue,
				marketValue,
				businessValue,
				investmentValue,
				(res) => {
					if (res.success) {
						dispatch(actionCreators.getValues());
						message.info('Thank you, You have done a Great Job, Cheers!!');
					}
				}
			)
		);
	};

	return (
		<div className="diagnostics-container">
			<div className="steps">
				<h2>Business Diagnostics</h2>
				<MultipleStepForm
					initialValues={{
						teams: teams,
						vision: vision,
						proposition: proposition,
						product: product,
						market: market,
						business: business,
						investment: investment
					}}
					onSubmit={handleStepsSubmit}
				>
					<FormStep stepName="Team" onSubmit={() => console.log('Step 1 submit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={teamsValue > 0 ? teamsValue : last_value && last_value.teams}
									marks={teams}
									onChange={handleTeamsOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
					<FormStep stepName="Problem & Vision" onSubmit={() => console.log('Step 1 submit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={visionValue > 0 ? visionValue : last_value && last_value.vision}
									marks={vision}
									onChange={handleVisionOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
					<FormStep stepName="Value Proposition" onSubmit={() => console.log('Step 1 subit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={
										propositionValue > 0 ? propositionValue : last_value && last_value.proposition
									}
									marks={proposition}
									onChange={handlePropositionOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
					<FormStep stepName="Product" onSubmit={() => console.log('Step 1 submit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={productValue > 0 ? productValue : last_value && last_value.product}
									marks={product}
									onChange={handleProductOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
					<FormStep stepName="Market" onSubmit={() => console.log('Step 1 subit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={marketValue > 0 ? marketValue : last_value && last_value.market}
									marks={market}
									onChange={handleMarketOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
					<FormStep stepName="Business Model" onSubmit={() => console.log('Step 1 subit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={businessValue > 0 ? businessValue : last_value && last_value.business}
									marks={business}
									onChange={handleBusinessOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
					<FormStep stepName="Investment and exit" onSubmit={() => console.log('Step 1 subit')}>
						<div className="step">
							<Stack sx={{ height: 300 }} spacing={1} direction="row">
								<Slider
									orientation="vertical"
									defaultValue={
										investmentValue > 0 ? investmentValue : last_value && last_value.investment
									}
									marks={investment}
									onChange={handleInvestmentOnChange}
								/>
							</Stack>
						</div>
					</FormStep>
				</MultipleStepForm>
				{loading ? (
					<span>
						<img src={svg} style={{ width: '30px', height: '30px' }} />
					</span>
				) : null}
			</div>
		</div>
	);
};

export default Diagnostics;
