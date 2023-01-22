import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { actionCreators } from '../../Paths';
import { Helmet } from 'react-helmet';

import './OKROverviewStyles.css';
const OKROverview = () => {
	const { users } = useSelector((state) => state.admin);
	const { all_objectives } = useSelector((state) => state.admin);

	const dispatch = useDispatch();

	const objectives = () => dispatch(actionCreators.getAllObjectives());

	React.useEffect(() => {
		objectives();
	}, []);

	const catalyzer = users.filter((e) => e.category === 'catalyzer');

	const qiribu = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[0]._id);
	const inoveLabs = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[1]._id);
	const isharc = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[2]._id);
	const socialClark = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[3]._id);
	const figurines = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[4]._id);
	const radaSafaris = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[5]._id);
	const zetuAfrica = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[6]._id);
	const omniGym = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[7]._id);
	const solfix = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[9]._id);
	const grabGas = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[10]._id);
	const devine = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[13]._id);
	const onetope = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[14]._id);
	const fastMere = all_objectives && all_objectives.filter((e) => e.creator === catalyzer[15]._id);

	// console.log(qiribu)

	//Qiribu overview data filter
	const qiribuOverrallPercentage =
		qiribu &&
		qiribu.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / qiribu.length;

	const QiribuQ1 = qiribu.filter((e) => e.quarter === 1);
	const QiribuQ1Percentage =
		QiribuQ1 &&
		QiribuQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ1.length;

	const QiribuQ2 = qiribu.filter((e) => e.quarter === 2);
	const QiribuQ2Percentage =
		QiribuQ2 &&
		QiribuQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ2.length;

	const QiribuQ3 = qiribu.filter((e) => e.quarter === 3);
	const QiribuQ3Percentage =
		QiribuQ3 &&
		QiribuQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ3.length;

	const QiribuQ4 = qiribu.filter((e) => e.quarter === 4);
	const QiribuQ4Percentage =
		QiribuQ4 &&
		QiribuQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / QiribuQ4.length;

	//InoveLabs overview data filter
	const inoveLabsOverrallPercentage =
		inoveLabs &&
		inoveLabs.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / inoveLabs.length;

	const inoveLabsQ1 = inoveLabs.filter((e) => e.quarter === 1);
	const inoveLabsQ1Percentage =
		inoveLabsQ1 &&
		inoveLabsQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			inoveLabsQ1.length;

	const inoveLabsQ2 = inoveLabs.filter((e) => e.quarter === 2);
	const inoveLabsQ2Percentage =
		inoveLabsQ2 &&
		inoveLabsQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			inoveLabsQ2.length;

	const inoveLabsQ3 = inoveLabs.filter((e) => e.quarter === 3);
	const inoveLabsQ3Percentage =
		inoveLabsQ3 &&
		inoveLabsQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			inoveLabsQ3.length;

	const inoveLabsQ4 = inoveLabs.filter((e) => e.quarter === 4);
	const inoveLabsQ4Percentage =
		inoveLabsQ4 &&
		inoveLabsQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			inoveLabsQ4.length;

	// Isharc overview data filter
	const isharcOverrallPercentage =
		isharc &&
		isharc.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / isharc.length;

	const isharcQ1 = isharc.filter((e) => e.quarter === 1);
	const isharcQ1Percentage =
		isharcQ1 &&
		isharcQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / isharcQ1.length;

	const isharcQ2 = isharc.filter((e) => e.quarter === 2);
	const isharcQ2Percentage =
		isharcQ2 &&
		isharcQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / isharcQ2.length;

	const isharcQ3 = isharc.filter((e) => e.quarter === 3);
	const isharcQ3Percentage =
		isharcQ3 &&
		isharcQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / isharcQ3.length;

	const isharcQ4 = isharc.filter((e) => e.quarter === 4);
	const isharcQ4Percentage =
		isharcQ4 &&
		isharcQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / isharcQ4.length;

	// SocialClark overview data filter
	const socialClarkOverrallPercentage =
		socialClark &&
		socialClark.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			socialClark.length;

	const socialClarkQ1 = socialClark.filter((e) => e.quarter === 1);
	const socialClarkQ1Percentage =
		socialClarkQ1 &&
		socialClarkQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			socialClarkQ1.length;

	const socialClarkQ2 = socialClark.filter((e) => e.quarter === 2);
	const socialClarkQ2Percentage =
		socialClarkQ2 &&
		socialClarkQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			socialClarkQ2.length;

	const socialClarkQ3 = socialClark.filter((e) => e.quarter === 3);
	const socialClarkQ3Percentage =
		socialClarkQ3 &&
		socialClarkQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			socialClarkQ3.length;

	const socialClarkQ4 = socialClark.filter((e) => e.quarter === 4);
	const socialClarkQ4Percentage =
		socialClarkQ4 &&
		socialClarkQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			socialClarkQ4.length;

	// Figurines overview data filter
	const figurinesOverrallPercentage =
		figurines &&
		figurines.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / figurines.length;

	const figurinesQ1 = figurines.filter((e) => e.quarter === 1);
	const figurinesQ1Percentage =
		figurinesQ1 &&
		figurinesQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			figurinesQ1.length;

	const figurinesQ2 = figurines.filter((e) => e.quarter === 2);
	const figurinesQ2Percentage =
		figurinesQ2 &&
		figurinesQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			figurinesQ2.length;

	const figurinesQ3 = figurines.filter((e) => e.quarter === 3);
	const figurinesQ3Percentage =
		figurinesQ3 &&
		figurinesQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			figurinesQ3.length;

	const figurinesQ4 = figurines.filter((e) => e.quarter === 4);
	const figurinesQ4Percentage =
		figurinesQ4 &&
		figurinesQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			figurinesQ4.length;

	// RadaSafaris overview data filter
	const radaSafarisOverrallPercentage =
		radaSafaris &&
		radaSafaris.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			radaSafaris.length;

	const radaSafarisQ1 = radaSafaris.filter((e) => e.quarter === 1);
	const radaSafarisQ1Percentage =
		radaSafarisQ1 &&
		radaSafarisQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			radaSafarisQ1.length;

	const radaSafarisQ2 = radaSafaris.filter((e) => e.quarter === 2);
	const radaSafarisQ2Percentage =
		radaSafarisQ2 &&
		radaSafarisQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			radaSafarisQ2.length;

	const radaSafarisQ3 = radaSafaris.filter((e) => e.quarter === 3);
	const radaSafarisQ3Percentage =
		radaSafarisQ3 &&
		radaSafarisQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			radaSafarisQ3.length;

	const radaSafarisQ4 = radaSafaris.filter((e) => e.quarter === 4);
	const radaSafarisQ4Percentage =
		radaSafarisQ4 &&
		radaSafarisQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			radaSafarisQ4.length;

	// ZetuAfrica overview data filter
	const zetuAfricaOverrallPercentage =
		zetuAfrica &&
		zetuAfrica.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / zetuAfrica.length;

	const zetuAfricaQ1 = zetuAfrica.filter((e) => e.quarter === 1);
	const zetuAfricaQ1Percentage =
		zetuAfricaQ1 &&
		zetuAfricaQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			zetuAfricaQ1.length;

	const zetuAfricaQ2 = zetuAfrica.filter((e) => e.quarter === 2);
	const zetuAfricaQ2Percentage =
		zetuAfricaQ2 &&
		zetuAfricaQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			zetuAfricaQ2.length;

	const zetuAfricaQ3 = zetuAfrica.filter((e) => e.quarter === 3);
	const zetuAfricaQ3Percentage =
		zetuAfricaQ3 &&
		zetuAfricaQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			zetuAfricaQ3.length;

	const zetuAfricaQ4 = zetuAfrica.filter((e) => e.quarter === 4);
	const zetuAfricaQ4Percentage =
		zetuAfricaQ4 &&
		zetuAfricaQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) /
			zetuAfricaQ4.length;

	// OmniGym overview data filter
	const omniGymOverrallPercentage =
		omniGym &&
		omniGym.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / omniGym.length;

	const omniGymQ1 = omniGym.filter((e) => e.quarter === 1);
	const omniGymQ1Percentage =
		omniGymQ1 &&
		omniGymQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ1.length;

	const omniGymQ2 = omniGym.filter((e) => e.quarter === 2);
	const omniGymQ2Percentage =
		omniGymQ2 &&
		omniGymQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ2.length;

	const omniGymQ3 = omniGym.filter((e) => e.quarter === 3);
	const omniGymQ3Percentage =
		omniGymQ3 &&
		omniGymQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ3.length;

	const omniGymQ4 = omniGym.filter((e) => e.quarter === 4);
	const omniGymQ4Percentage =
		omniGymQ4 &&
		omniGymQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / omniGymQ4.length;

	// Solfix overview data filter
	const solfixOverrallPercentage =
		solfix &&
		solfix.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / solfix.length;

	const solfixQ1 = solfix.filter((e) => e.quarter === 1);
	const solfixQ1Percentage =
		solfixQ1 &&
		solfixQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / solfixQ1.length;

	const solfixQ2 = solfix.filter((e) => e.quarter === 2);
	const solfixQ2Percentage =
		solfixQ2 &&
		solfixQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / solfixQ2.length;

	const solfixQ3 = solfix.filter((e) => e.quarter === 3);
	const solfixQ3Percentage =
		solfixQ3 &&
		solfixQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / solfixQ3.length;

	const solfixQ4 = solfix.filter((e) => e.quarter === 4);
	const solfixQ4Percentage =
		solfixQ4 &&
		solfixQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / solfixQ4.length;

	// GrabGas overview data filter
	const grabGasOverrallPercentage =
		grabGas &&
		grabGas.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / grabGas.length;

	const grabGasQ1 = grabGas.filter((e) => e.quarter === 1);
	const grabGasQ1Percentage =
		grabGasQ1 &&
		grabGasQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ1.length;

	const grabGasQ2 = grabGas.filter((e) => e.quarter === 2);
	const grabGasQ2Percentage =
		grabGasQ2 &&
		grabGasQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ2.length;

	const grabGasQ3 = grabGas.filter((e) => e.quarter === 3);
	const grabGasQ3Percentage =
		grabGasQ3 &&
		grabGasQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ3.length;

	const grabGasQ4 = grabGas.filter((e) => e.quarter === 4);
	const grabGasQ4Percentage =
		grabGasQ4 &&
		grabGasQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / grabGasQ4.length;

	// Devine overview data filter
	const devineOverrallPercentage =
		devine &&
		devine.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / devine.length;

	const devineQ1 = devine.filter((e) => e.quarter === 1);
	const devineQ1Percentage =
		devineQ1 &&
		devineQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / devineQ1.length;

	const devineQ2 = devine.filter((e) => e.quarter === 2);
	const devineQ2Percentage =
		devineQ2 &&
		devineQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / devineQ2.length;

	const devineQ3 = devine.filter((e) => e.quarter === 3);
	const devineQ3Percentage =
		devineQ3 &&
		devineQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / devineQ3.length;

	const devineQ4 = devine.filter((e) => e.quarter === 4);
	const devineQ4Percentage =
		devineQ4 &&
		devineQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / devineQ4.length;

	// Onetope overview data filter
	const onetopeOverrallPercentage =
		onetope &&
		onetope.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / onetope.length;

	const onetopeQ1 = onetope.filter((e) => e.quarter === 1);
	const onetopeQ1Percentage =
		onetopeQ1 &&
		onetopeQ1.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ1.length;

	const onetopeQ2 = onetope.filter((e) => e.quarter === 2);
	const onetopeQ2Percentage =
		onetopeQ2 &&
		onetopeQ2.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ2.length;

	const onetopeQ3 = onetope.filter((e) => e.quarter === 3);
	const onetopeQ3Percentage =
		onetopeQ3 &&
		onetopeQ3.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ3.length;

	const onetopeQ4 = onetope.filter((e) => e.quarter === 4);
	const onetopeQ4Percentage =
		onetopeQ4 &&
		onetopeQ4.map((e) => (!e.objPercentage ? 0 : e.objPercentage)).reduce((a, b) => a + b, 0) / onetopeQ4.length;

	const table_data = [
		{
			id: catalyzer[0]._id,
			username: catalyzer[0].username,
			overrall: qiribuOverrallPercentage,
			q1Percentage: QiribuQ1Percentage,
			q2Percentage: QiribuQ2Percentage,
			q3Percentage: QiribuQ3Percentage,
			q4Percentage: QiribuQ4Percentage,
			Q1update: !QiribuQ1Percentage ? 0 : QiribuQ1Percentage,
			Q2update: !QiribuQ2Percentage ? 0 : QiribuQ2Percentage,
			Q3update: !QiribuQ3Percentage ? 0 : QiribuQ3Percentage,
			Q4update: !QiribuQ4Percentage ? 0 : QiribuQ4Percentage
		},
		{
			id: catalyzer[1]._id,
			username: catalyzer[1].username,
			overrall: inoveLabsOverrallPercentage,
			q1Percentage: inoveLabsQ1Percentage,
			q2Percentage: inoveLabsQ2Percentage,
			q3Percentage: inoveLabsQ3Percentage,
			q4Percentage: inoveLabsQ4Percentage,
			Q1update: !inoveLabsQ1Percentage ? 0 : inoveLabsQ1Percentage,
			Q2update: !inoveLabsQ2Percentage ? 0 : inoveLabsQ2Percentage,
			Q3update: !inoveLabsQ3Percentage ? 0 : inoveLabsQ3Percentage,
			Q4update: !inoveLabsQ4Percentage ? 0 : inoveLabsQ4Percentage
		},
		{
			id: catalyzer[2]._id,
			username: catalyzer[2].username,
			overrall: isharcOverrallPercentage,
			q1Percentage: isharcQ1Percentage,
			q2Percentage: isharcQ2Percentage,
			q3Percentage: isharcQ3Percentage,
			q4Percentage: isharcQ4Percentage,
			Q1update: !isharcQ1Percentage ? 0 : isharcQ1Percentage,
			Q2update: !isharcQ2Percentage ? 0 : isharcQ2Percentage,
			Q3update: !isharcQ3Percentage ? 0 : isharcQ3Percentage,
			Q4update: !isharcQ4Percentage ? 0 : isharcQ4Percentage
		},
		{
			id: catalyzer[3]._id,
			username: catalyzer[3].username,
			overrall: socialClarkOverrallPercentage,
			q1Percentage: socialClarkQ1Percentage,
			q2Percentage: socialClarkQ2Percentage,
			q3Percentage: socialClarkQ3Percentage,
			q4Percentage: socialClarkQ4Percentage,
			Q1update: !socialClarkQ1Percentage ? 0 : socialClarkQ1Percentage,
			Q2update: !socialClarkQ2Percentage ? 0 : socialClarkQ2Percentage,
			Q3update: !socialClarkQ3Percentage ? 0 : socialClarkQ3Percentage,
			Q4update: !socialClarkQ4Percentage ? 0 : socialClarkQ4Percentage
		},
		{
			id: catalyzer[4]._id,
			username: catalyzer[4].username,
			overrall: figurinesOverrallPercentage,
			q1Percentage: figurinesQ1Percentage,
			q2Percentage: figurinesQ2Percentage,
			q3Percentage: figurinesQ3Percentage,
			q4Percentage: figurinesQ4Percentage,
			Q1update: !figurinesQ1Percentage ? 0 : figurinesQ1Percentage,
			Q2update: !figurinesQ2Percentage ? 0 : figurinesQ2Percentage,
			Q3update: !figurinesQ3Percentage ? 0 : figurinesQ3Percentage,
			Q4update: !figurinesQ4Percentage ? 0 : figurinesQ4Percentage
		},
		{
			id: catalyzer[5]._id,
			username: catalyzer[5].username,
			overrall: radaSafarisOverrallPercentage,
			q1Percentage: radaSafarisQ1Percentage,
			q2Percentage: radaSafarisQ2Percentage,
			q3Percentage: radaSafarisQ3Percentage,
			q4Percentage: radaSafarisQ4Percentage,
			Q1update: !radaSafarisQ1Percentage ? 0 : radaSafarisQ1Percentage,
			Q2update: !radaSafarisQ2Percentage ? 0 : radaSafarisQ2Percentage,
			Q3update: !radaSafarisQ3Percentage ? 0 : radaSafarisQ3Percentage,
			Q4update: !radaSafarisQ4Percentage ? 0 : radaSafarisQ4Percentage
		},
		{
			id: catalyzer[6]._id,
			username: catalyzer[6].username,
			overrall: zetuAfricaOverrallPercentage,
			q1Percentage: zetuAfricaQ1Percentage,
			q2Percentage: zetuAfricaQ2Percentage,
			q3Percentage: zetuAfricaQ3Percentage,
			q4Percentage: zetuAfricaQ4Percentage,
			Q1update: !zetuAfricaQ1Percentage ? 0 : zetuAfricaQ1Percentage,
			Q2update: !zetuAfricaQ2Percentage ? 0 : zetuAfricaQ2Percentage,
			Q3update: !zetuAfricaQ3Percentage ? 0 : zetuAfricaQ3Percentage,
			Q4update: !zetuAfricaQ4Percentage ? 0 : zetuAfricaQ4Percentage
		},
		{
			id: catalyzer[7]._id,
			username: catalyzer[7].username,
			overrall: omniGymOverrallPercentage,
			q1Percentage: omniGymQ1Percentage,
			q2Percentage: omniGymQ2Percentage,
			q3Percentage: omniGymQ3Percentage,
			q4Percentage: omniGymQ4Percentage,
			Q1update: !omniGymQ1Percentage ? 0 : omniGymQ1Percentage,
			Q2update: !omniGymQ2Percentage ? 0 : omniGymQ2Percentage,
			Q3update: !omniGymQ3Percentage ? 0 : omniGymQ3Percentage,
			Q4update: !omniGymQ4Percentage ? 0 : omniGymQ4Percentage
		},
		{
			id: catalyzer[9]._id,
			username: catalyzer[9].username,
			overrall: solfixOverrallPercentage,
			q1Percentage: solfixQ1Percentage,
			q2Percentage: solfixQ2Percentage,
			q3Percentage: solfixQ3Percentage,
			q4Percentage: solfixQ4Percentage,
			Q1update: !solfixQ1Percentage ? 0 : solfixQ1Percentage,
			Q2update: !solfixQ2Percentage ? 0 : solfixQ2Percentage,
			Q3update: !solfixQ3Percentage ? 0 : solfixQ3Percentage,
			Q4update: !solfixQ4Percentage ? 0 : solfixQ4Percentage
		},
		{
			id: catalyzer[10]._id,
			username: catalyzer[10].username,
			overrall: grabGasOverrallPercentage,
			q1Percentage: grabGasQ1Percentage,
			q2Percentage: grabGasQ2Percentage,
			q3Percentage: grabGasQ3Percentage,
			q4Percentage: grabGasQ4Percentage,
			Q1update: !grabGasQ1Percentage ? 0 : grabGasQ1Percentage,
			Q2update: !grabGasQ2Percentage ? 0 : grabGasQ2Percentage,
			Q3update: !grabGasQ3Percentage ? 0 : grabGasQ3Percentage,
			Q4update: !grabGasQ4Percentage ? 0 : grabGasQ4Percentage
		},
		{
			id: catalyzer[13]._id,
			username: catalyzer[13].username,
			overrall: devineOverrallPercentage,
			q1Percentage: devineQ1Percentage,
			q2Percentage: devineQ2Percentage,
			q3Percentage: devineQ3Percentage,
			q4Percentage: devineQ4Percentage,
			Q1update: !devineQ1Percentage ? 0 : devineQ1Percentage,
			Q2update: !devineQ2Percentage ? 0 : devineQ2Percentage,
			Q3update: !devineQ3Percentage ? 0 : devineQ3Percentage,
			Q4update: !devineQ4Percentage ? 0 : devineQ4Percentage
		},
		{
			id: catalyzer[14]._id,
			username: catalyzer[14].username,
			overrall: onetopeOverrallPercentage,
			q1Percentage: onetopeQ1Percentage,
			q2Percentage: onetopeQ2Percentage,
			q3Percentage: onetopeQ3Percentage,
			q4Percentage: onetopeQ4Percentage,
			Q1update: !onetopeQ1Percentage ? 0 : onetopeQ1Percentage,
			Q2update: !onetopeQ2Percentage ? 0 : onetopeQ2Percentage,
			Q3update: !onetopeQ3Percentage ? 0 : onetopeQ3Percentage,
			Q4update: !onetopeQ4Percentage ? 0 : onetopeQ4Percentage
		}
	];

	const Text = ({ text }) => {
		return (
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: 'rgba(232, 15, 15, 0.431)',
					padding: '5px',
					borderRadius: '5px'
				}}
			>
				<p style={{ color: 'red', margin: '0' }}>{text}</p>
			</span>
		);
	};

	const Text2 = ({ r, text1, text2 }) => {
		return (
			<span
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: r > 0 && r < 100 ? 'rgba(248, 215, 3, 0.488)' : 'rgba(51, 202, 51, 0.437)',
					padding: '5px',
					borderRadius: '5px'
				}}
			>
				<p style={{ color: r > 0 && r < 100 ? 'orange' : 'green', margin: '0' }}>
					{r > 0 && r < 100 ? text1 : text2}
				</p>
			</span>
		);
	};

	const table_columns = [
		{
			title: 'Startup',
			dataIndex: 'username',
			key: 'username',
			align: 'left'
		},
		{
			title: 'Overall Progress %',
			dataIndex: 'overrall',
			key: 'overrall',
			align: 'left'
		},
		{
			title: 'Q1 Overall %',
			dataIndex: 'q1Percentage',
			key: 'q1Percentage',
			align: 'left'
		},
		{
			title: 'Q2 Overall %',
			dataIndex: 'q2Percentage',
			key: 'q2Percentage',
			align: 'left'
		},
		{
			title: 'Q3 Overall %',
			dataIndex: 'q3Percentage',
			key: 'q3Percentage',
			align: 'left'
		},
		{
			title: 'Q4 Overall %',
			dataIndex: 'q4Percentage',
			key: 'q4Percentage',
			align: 'left'
		},
		{
			title: 'Q1 Status',
			dataIndex: 'Q1update',
			key: 'Q1update',
			align: 'left',
			render: (r) => {
				if (r === 0) return <Text text="inactive" />;
				if (r > 0 && r <= 100) return <Text2 r={r} text1="active" text2="complete" />;
			}
		},
		{
			title: 'Q2 Status',
			dataIndex: 'Q2update',
			key: 'Q2update',
			align: 'left',
			render: (r) => {
				console.log(r, 'll');
				if (r === 0) return <Text text="inactive" />;
				if (r > 0 && r <= 100) return <Text2 r={r} text1="active" text2="complete" />;
			}
		},
		{
			title: 'Q3 Status',
			dataIndex: 'Q3update',
			key: 'Q3update',
			align: 'left',
			render: (r) => {
				if (r === 0) return <Text text="inactive" />;
				if (r > 0 && r <= 100) return <Text2 r={r} text1="active" text2="complete" />;
			}
		},
		{
			title: 'Q4 Status',
			dataIndex: 'Q4update',
			key: 'Q4update',
			align: 'left',
			render: (r) => {
				if (r === 0) return <Text text="inactive" />;
				if (r > 0 && r <= 100) return <Text2 r={r} text1="active" text2="complete" />;
			}
		}
	];

	return (
		<div className="okroverview-container">
			<Helmet>
				<title>OKR Overview</title>
			</Helmet>
			<Table
				columns={table_columns}
				dataSource={[
					...table_data.map((r) => ({
						...r,
						key: r._id,
						username: r.username,
						overrall: !r.overrall ? '0' : Math.round(r.overrall),
						q1Percentage: !r.q1Percentage ? '0' : Math.round(r.q1Percentage),
						q2Percentage: !r.q2Percentage ? '0' : Math.round(r.q2Percentage),
						q3Percentage: !r.q3Percentage ? '0' : Math.round(r.q3Percentage),
						q4Percentage: !r.q4Percentage ? '0' : Math.round(r.q4Percentage),
						Q1update: Math.round(r.Q1update),
						Q2update: Math.round(r.Q2update),
						Q3update: Math.round(r.Q3update),
						Q4update: Math.round(r.Q4update)
					}))
				]}
				style={{ width: '90%', marginTop: '1rem', marginTop: '2rem' }}
				pagination={{
					defaultPageSize: 10,
					showSizeChanger: true,
					pageSizeOptions: [ '10', '20', '30' ]
				}}
			/>
		</div>
	);
};
export default withRouter(OKROverview);
