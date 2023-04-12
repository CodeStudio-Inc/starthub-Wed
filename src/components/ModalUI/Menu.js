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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchiveIcon from '@mui/icons-material/Archive';

export default function AccountMenu({
	boards,
	setCanvasBoardId,
	archiveId,
	setArchiveId,
	setOpen,
	dispatch,
	setBoardName,
	actionCreators,
	archive
}) {
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
						<p>Lean Canvas</p>
						<ExpandMoreIcon fontSize="small" style={{ color: '#fff', fontSize: '30px' }} />
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
				{boards.map((b) => (
					<MenuItem
						onClick={() => {
							setCanvasBoardId(b._id);
							setBoardName(b.name);
						}}
					>
						<DeveloperBoardIcon
							fontSize="small"
							style={{ color: 'rgba(0,0,0,0.2)', marginRight: '0.2rem' }}
						/>{' '}
						<p style={{ color: 'rgba(0,0,0,0.7)', margin: '0', fontSize: '16px' }}>{b.name}</p>
					</MenuItem>
				))}
				{archive.length > 0 ? <Divider /> : null}
				{archive.length > 0 ? (
					<p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.2)', margin: '0' }}>Archive</p>
				) : null}
				{archive.length > 0 ? <Divider /> : null}
				{archive.map((b) => (
					<MenuItem
						onClick={() => {
							setArchiveId(b._id);
							console.log(archiveId);
							setTimeout(() => dispatch(actionCreators.archiveBoard(archiveId)), 3000);
						}}
					>
						<div className="menu-row">
							<p>{b.name.length > 11 ? b.name.substring(0, 11) + '...' : b.name}</p>
							<h5>restore</h5>
						</div>
					</MenuItem>
				))}
				<Divider />
				<p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.2)', margin: '0' }}>Create</p>
				<Divider />
				<MenuItem onClick={() => setOpen(true)}>
					<ListItemIcon>
						<CreateNewFolderIcon fontSize="small" />
					</ListItemIcon>
					Add new Lean Canvas
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
