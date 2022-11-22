import React from 'react';

const ObjectivesTable = ({
	Tabs,
	TabPane,
	Table,
	moment,
	quarter1,
	quarter2,
	quarter3,
	quarter4,
	columns,
	setActiveRow
}) => {
	return (
		<Tabs style={{ width: '100%' }} defaultActiveKey="1" centered tabBarStyle={{ color: '#37561b' }}>
			<TabPane tab="Quarter 1" key="1" className="graph-tab-content">
				<Table
					columns={columns}
					dataSource={[
						...quarter1.map((r) => ({
							...r,
							key: r._id,
							createdAt: moment(r.createdAt).format('LL')
						}))
					]}
					style={{ width: '100%' }}
					pagination={{
						defaultPageSize: 5,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</TabPane>
			<TabPane tab="Quarter 2" key="2" className="graph-tab-content">
				<Table
					columns={columns}
					dataSource={[
						...quarter2.map((r) => ({
							...r,
							key: r._id,
							createdAt: moment(r.createdAt).format('LL')
						}))
					]}
					style={{ width: '100%' }}
					pagination={{
						defaultPageSize: 5,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</TabPane>
			<TabPane tab="Quarter 3" key="3" className="graph-tab-content">
				<Table
					columns={columns}
					dataSource={[
						...quarter3.map((r) => ({
							...r,
							key: r._id,
							createdAt: moment(r.createdAt).format('LL')
						}))
					]}
					style={{ width: '100%' }}
					pagination={{
						defaultPageSize: 5,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</TabPane>
			<TabPane tab="Quarter 4" key="4" className="graph-tab-content">
				<Table
					columns={columns}
					dataSource={[
						...quarter4.map((r) => ({
							...r,
							key: r._id,
							createdAt: moment(r.createdAt).format('LL')
						}))
					]}
					style={{ width: '100%' }}
					pagination={{
						defaultPageSize: 5,
						showSizeChanger: true,
						pageSizeOptions: [ '10', '20', '30' ]
					}}
				/>
			</TabPane>
		</Tabs>
	);
};

export default ObjectivesTable;
