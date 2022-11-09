import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Box from '@mui/material/Box';
const Diagnostics = ({ last_value }) => {
	return (
		<div className="diagnostics">
			<h3>Diagnostics</h3>
			<div className="underline" />
			<div className="value-row">
				<div className="value-row-left">
					<h3>Teams</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.teams}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
			<div className="value-row">
				<div className="value-row-left">
					<h3>Vision</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.vision}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
			<div className="value-row">
				<div className="value-row-left">
					<h3>Proposition</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.proposition}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
			<div className="value-row">
				<div className="value-row-left">
					<h3>Product</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.product}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
			<div className="value-row">
				<div className="value-row-left">
					<h3>Market</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.market}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
			<div className="value-row">
				<div className="value-row-left">
					<h3>Business</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.business}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
			<div className="value-row">
				<div className="value-row-left">
					<h3>Investment</h3>
				</div>
				<div className="value-row-right">
					<Box sx={{ width: '90%' }}>
						<ProgressBar
							completed={last_value && last_value.investment}
							bgColor="#37561b"
							borderRadius="5px"
							labelAlignment="center"
							labelSize="10px"
							height="15px"
						/>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default Diagnostics;
