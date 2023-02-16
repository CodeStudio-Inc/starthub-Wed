import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';

const Archive = ({ columns, archived, setArchive }) => {
	return (
		<div className="archive-modal">
			<div className="create-header">
				<h3>Archive</h3>
				<CloseIcon
					className="create-icon"
					style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
					onClick={() => setArchive(false)}
				/>
			</div>
			<Table
				columns={columns}
				dataSource={[
					...archived.map((r) => ({
						...r,
						key: r._id,
						objective: r.description,
						quarter: r.quarter,
						created: moment(r.dateCreated).fromNow()
					}))
				]}
				pagination={{
					defaultPageSize: 5,
					showSizeChanger: true,
					pageSizeOptions: [ '5', '10', '15', '20', '25', '30' ]
				}}
			/>
		</div>
	);
};

export default Archive;
