import React from 'react';
import { useDispatch } from 'react-redux';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import * as actionCreators from '../../store/actionCreators';

const ContentColumn = React.forwardRef((props, ref) => {
	const dispatch = useDispatch();

	const scroll = (scrollOffset) => {
		ref.current.scrollLeft += scrollOffset;
		if ((ref.current.scrollLeft += scrollOffset) >= 300) props.setVisible(true);
		if ((ref.current.scrollLeft += scrollOffset) <= 10) props.setVisible(false);
	};

	return (
		<div className={props.category.length > 0 ? 'scroll-column' : 'content-menu-inactive'}>
			<div className="scroll-row">
				{!props.visible ? null : (
					<ArrowCircleLeftIcon
						onClick={() => scroll(-50)}
						className="scroll-icons"
						style={{ color: '#333', fontSize: '30px' }}
					/>
				)}
				<div className="scroll-container" ref={ref}>
					{props.category.map((r) => (
						<div
							key={r._id}
							className="scroll-content"
							onClick={() => {
								dispatch(actionCreators.postView(r._id));
								props.setBlogData({
									blog: r,
									modal: true
								});
							}}
						>
							<img src={r.featuredimageLink} alt="logo" />
							<span>
								<p>{r.category}</p>
							</span>
							<div className="scroll-content-header">
								<h2>{r.title}</h2>
							</div>
							<div className="content-row">
								<div className="content-inner-row">
									<img src={r.author.imageLink} />
									<p>{r.author.name}</p>
								</div>
								<div className="content-row-separator" />
								<div className="content-inner-row">
									<CalendarMonthIcon
										style={{ fontSize: '14px', color: 'rgba(0,0,0,0.3)', marginRight: '0.2rem' }}
									/>
									<p>{moment(r.date).format('MMMM Do YYYY')}</p>
								</div>
								<div className="content-row-separator" />
								<div className="content-inner-row">
									<VisibilityIcon
										style={{ fontSize: '14px', color: 'rgba(0,0,0,0.3)', marginRight: '0.2rem' }}
									/>
									<p>Views {r.views}</p>
								</div>
							</div>
						</div>
					))}
				</div>
				{!props.visible && props.category.length > 0 ? (
					<ArrowCircleRightIcon
						onClick={() => scroll(50)}
						className="scroll-icons"
						style={{ color: '#333', fontSize: '30px' }}
					/>
				) : null}
			</div>
		</div>
	);
});

export default ContentColumn;
