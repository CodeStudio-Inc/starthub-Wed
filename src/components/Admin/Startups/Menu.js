import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export default function AccountMenu() {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box className="menu-container">
				<Tooltip title="canvas files">
					<IconButton
						onClick={handleClick}
						size="small"
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 40, height: 40, background: '#37561b' }}>
							<DeveloperBoardIcon fontSize="small" style={{ color: '#fff', fontSize: '30px' }} />
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem>
					<DeveloperBoardIcon
						fontSize="small"
						style={{ color: 'rgba(0,0,0,0.2)', marginRight: '0.2rem' }}
					/>{' '}
					<p style={{ color: 'rgba(0,0,0,0.7)', margin: '0', fontSize: '16px' }}>Hello</p>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<CreateNewFolderIcon fontSize="small" />
					</ListItemIcon>
					Add new Lean Canvas
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
