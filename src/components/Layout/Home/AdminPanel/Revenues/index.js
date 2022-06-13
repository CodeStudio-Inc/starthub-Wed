import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Table } from 'antd';
import Airtable from 'airtable';
import * as actionCreators from '../../../../store/actionCreators';

import './revenues.css';
const Revenues = () => {
	const [ record1, setRecord1 ] = useState([]);
	const [ record2, setRecord2 ] = useState([]);
	const [ record3, setRecord3 ] = useState([]);
	const [ record4, setRecord4 ] = useState([]);
	const [ record5, setRecord5 ] = useState([]);
	const [ record6, setRecord6 ] = useState([]);
	const [ record7, setRecord7 ] = useState([]);
	const [ record8, setRecord8 ] = useState([]);
	const [ record9, setRecord9 ] = useState([]);
	const [ record10, setRecord10 ] = useState([]);
	const [ record11, setRecord11 ] = useState([]);
	const [ record12, setRecord12 ] = useState([]);
	const [ record13, setRecord13 ] = useState([]);
	const [ record14, setRecord14 ] = useState([]);
	const [ record15, setRecord15 ] = useState([]);
	const [ record16, setRecord16 ] = useState([]);

	// const metrics = useSelector(state => state.admin.metrics)
	const users = useSelector((state) => state.admin.users);

	const startups = users.filter((e) => e.category === 'catalyzer');
	const base_keys = Array.from(startups, ({ base_key, username }) => ({ base_key: base_key, username: username }));
	// console.log(base_keys)

	const dispatch = useDispatch();

	const fetchMetrics = () => {
		const key = process.env.REACT_APP_API_KEY;
		var base0 = new Airtable({ apiKey: key }).base(base_keys[0].base_key);
		var base1 = new Airtable({ apiKey: key }).base(base_keys[1].base_key);
		var base2 = new Airtable({ apiKey: key }).base(base_keys[2].base_key);
		var base3 = new Airtable({ apiKey: key }).base(base_keys[3].base_key);
		var base4 = new Airtable({ apiKey: key }).base(base_keys[4].base_key);
		var base5 = new Airtable({ apiKey: key }).base(base_keys[5].base_key);
		var base6 = new Airtable({ apiKey: key }).base(base_keys[6].base_key);
		var base7 = new Airtable({ apiKey: key }).base(base_keys[7].base_key);
		var base8 = new Airtable({ apiKey: key }).base(base_keys[8].base_key);
		var base9 = new Airtable({ apiKey: key }).base(base_keys[9].base_key);
		var base10 = new Airtable({ apiKey: key }).base(base_keys[10].base_key);
		var base11 = new Airtable({ apiKey: key }).base(base_keys[11].base_key);
		var base12 = new Airtable({ apiKey: key }).base(base_keys[12].base_key);
		var base13 = new Airtable({ apiKey: key }).base(base_keys[13].base_key);
		var base14 = new Airtable({ apiKey: key }).base(base_keys[14].base_key);
		var base15 = new Airtable({ apiKey: key }).base(base_keys[15].base_key);

		base0('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord1(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base1('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord2(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base2('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord3(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base3('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord4(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base4('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord5(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base5('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord6(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base6('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord7(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base7('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord8(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);
		base8('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord9(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base9('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord10(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base10('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord11(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base11('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord12(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base12('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord13(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base13('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord14(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base14('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord15(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);

		base15('Metrics')
			.select({
				maxRecords: 100
			})
			.eachPage(
				function page(records, fetchNextPage) {
					setRecord16(records);
					fetchNextPage();
				},
				function done(err) {
					if (err) {
						console.error(err);
						return;
					}
				}
			);
	};

	const record1Fields = Array.from(record1, ({ fields }) => fields);
	const record2Fields = Array.from(record2, ({ fields }) => fields);
	const record3Fields = Array.from(record3, ({ fields }) => fields);
	const record4Fields = Array.from(record4, ({ fields }) => fields);
	const record5Fields = Array.from(record5, ({ fields }) => fields);
	const record6Fields = Array.from(record6, ({ fields }) => fields);
	const record7Fields = Array.from(record7, ({ fields }) => fields);
	const record8Fields = Array.from(record8, ({ fields }) => fields);
	const record9Fields = Array.from(record9, ({ fields }) => fields);
	const record10Fields = Array.from(record10, ({ fields }) => fields);
	const record11Fields = Array.from(record11, ({ fields }) => fields);
	const record12Fields = Array.from(record12, ({ fields }) => fields);
	const record13Fields = Array.from(record13, ({ fields }) => fields);
	const record14Fields = Array.from(record14, ({ fields }) => fields);
	const record15Fields = Array.from(record15, ({ fields }) => fields);
	const record16Fields = Array.from(record16, ({ fields }) => fields);
	console.log(Math.random());
	let metrics = [];

	record1Fields.forEach((element) => {
		metrics.push({
			startup: 'Qiribu',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record2Fields.forEach((element) => {
		metrics.push({
			startup: 'Inove Labs',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record3Fields.forEach((element) => {
		metrics.push({
			startup: 'Isharc',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record4Fields.forEach((element) => {
		metrics.push({
			startup: 'Social Clark',
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record5Fields.forEach((element) => {
		metrics.push({
			startup: 'Figurines',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record6Fields.forEach((element) => {
		metrics.push({
			startup: 'Rada Safaris',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record7Fields.forEach((element) => {
		metrics.push({
			startup: 'Zetu Africa',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record8Fields.forEach((element) => {
		metrics.push({
			startup: 'OMNI Gym',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record9Fields.forEach((element) => {
		metrics.push({
			startup: 'Economic Misfit',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record10Fields.forEach((element) => {
		metrics.push({
			startup: 'Solfix',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record11Fields.forEach((element) => {
		metrics.push({
			startup: 'Grab Gas',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record12Fields.forEach((element) => {
		metrics.push({
			startup: 'OnScore Africa',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record13Fields.forEach((element) => {
		metrics.push({
			startup: 'WAGE Spices',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record14Fields.forEach((element) => {
		metrics.push({
			startup: 'Devine Renewable Energy',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record15Fields.forEach((element) => {
		metrics.push({
			startup: 'Onestope',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	record16Fields.forEach((element) => {
		metrics.push({
			startup: 'Fastmere',
			id: Math.random(),
			jan: moment(element['A-Month']).format('MM') === '01',
			feb: moment(element['A-Month']).format('MM') === '02',
			mar: moment(element['A-Month']).format('MM') === '03',
			apr: moment(element['A-Month']).format('MM') === '04',
			may: moment(element['A-Month']).format('MM') === '05',
			jun: moment(element['A-Month']).format('MM') === '06',
			jul: moment(element['A-Month']).format('MM') === '07',
			aug: moment(element['A-Month']).format('MM') === '08',
			sep: moment(element['A-Month']).format('MM') === '09',
			oct: moment(element['A-Month']).format('MM') === '10',
			nov: moment(element['A-Month']).format('MM') === '11',
			dec: moment(element['A-Month']).format('MM') === '12'
		});
	});

	useEffect(() => {
		dispatch(actionCreators.getUsers());
		fetchMetrics();
	}, []);

	const columns = [
		{
			title: 'Startup',
			dataIndex: 'startup',
			key: 'startup',
			align: 'left'
		},
		{
			title: 'Jan',
			dataIndex: 'jan',
			key: 'jan',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Feb',
			dataIndex: 'feb',
			key: 'feb',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Mar',
			dataIndex: 'mar',
			key: 'mar',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Apr',
			dataIndex: 'apr',
			key: 'apr',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'May',
			dataIndex: 'may',
			key: 'may',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Jun',
			dataIndex: 'jun',
			key: 'jun',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Jul',
			dataIndex: 'jul',
			key: 'jul',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Aug',
			dataIndex: 'aug',
			key: 'aug',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Sep',
			dataIndex: 'sep',
			key: 'sep',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Oct',
			dataIndex: 'oct',
			key: 'oct',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Nov',
			dataIndex: 'nov',
			key: 'nov',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		},
		{
			title: 'Dec',
			dataIndex: 'dec',
			key: 'dec',
			align: 'center',
			render: (r) => (
				<span
					style={{
						background: r === false ? '#ef1c03' : '#78f401',
						padding: '10px'
					}}
				>
					<text style={{ padding: '15px' }}>{r}</text>
				</span>
			)
		}
	];

	return (
		<div className="rev-main">
			<div className="rev">
				<Table
					columns={columns}
					dataSource={[
						...metrics.map((r) => ({
							...r,
							key: r.id,
							startup: r.startup,
							jan: r.jun,
							feb: r.feb,
							mar: r.mar,
							apr: r.apr,
							may: r.may,
							jun: r.jun,
							jul: r.jul,
							aug: r.aug,
							sep: r.sep,
							oct: r.oct,
							nov: r.nov,
							sep: r.sep
						}))
					]}
					style={{ width: '85%' }}
					pagination={false}
				/>
			</div>
		</div>
	);
};

export default Revenues;
