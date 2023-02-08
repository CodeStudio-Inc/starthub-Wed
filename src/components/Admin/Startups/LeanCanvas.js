import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Paths';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

const LeanCanvas = ({ userId, close, svg }) => {
	const [ dropDown, setDropDown ] = React.useState(false);
	const [ listId, setListId ] = React.useState('');

	const { boards, lists, loading } = useSelector((state) => state.admin);

	const dispatch = useDispatch();

	const getBoards = () => dispatch(actionCreators.getAdminBoard(userId));
	const getLists = () => dispatch(actionCreators.getAdminLists(userId));

	const canvas_board = boards && boards.filter((el) => el.boardType === 'Lean Canvas' && el.archive === false).at(-1);
	const board_lists = lists && lists.filter((el) => el.boardId === canvas_board._id);

	React.useEffect(() => {
		getBoards();
		getLists();
	}, []);

	return (
		<div className="lean-container">
			<div className="lean-canvas-header">
				<h3>Lean Canvas</h3>
				<CloseIcon
					style={{ fontSize: '20px', color: 'rgba(0,0,0,0.5)' }}
					onClick={() => close(false)}
					className="lean-icon"
				/>
			</div>
			{loading ? (
				<img style={{ height: '40px', widith: '40px' }} src={svg} />
			) : (
				<div className="lean-canvas-row">
					{board_lists.map((l) => (
						<div className="lean-list" key={l._id}>
							<div className="lean-header" onClick={() => setListId(l._id)}>
								<h4>{l.name}</h4>
								{dropDown && listId === l._id ? (
									<ArrowDropUpIcon onClick={() => setDropDown(false)} className="list-icon" />
								) : null}
								{!dropDown ? (
									<ArrowDropDownIcon onClick={() => setDropDown(true)} className="list-icon" />
								) : null}
							</div>
							{dropDown && listId === l._id ? (
								l.cards.map((c) => (
									<div className="lean-card" key={c._id}>
										<p>{c.name}</p>
									</div>
								))
							) : null}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export default LeanCanvas;
