import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../assets/images/logo.png';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ReactGA from 'react-ga';

import './Content.css';
const Content = () => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);

	const data = [
		{
			id: 1,
			image: 'https://commonwealthtca.com/wp-content/uploads/2020/09/legal.jpg',
			header: 'Short notes on IP and patents for startups',
			author: 'Mathias',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		},
		{
			id: 2,
			image:
				'https://moneyinc.com/wp-content/uploads/2019/05/What-is-the-difference-between-revenue-and-profit-04-min2-1024x569-750x417.png',
			header: 'Become Rolex-profitable! ',
			author: 'Mathias',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		},
		{
			id: 3,
			image: 'https://www.erp-information.com/wp-content/uploads/2021/01/Priority-control-new.jpg',
			header: 'What is Prioritization',
			author: 'Andrew',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		},
		{
			id: 4,
			image:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Business_Model_Canvas.png/1200px-Business_Model_Canvas.png',
			header: 'What is a business model?',
			author: 'Bonita',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		},
		{
			id: 5,
			image: 'https://myfunkytravel.com/wp-content/uploads/2017/05/vietnam-bargaining.jpg',
			header: 'THE ART OF BARGAINING AND NEGOTIATING ',
			author: 'Timm',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		},
		{
			id: 6,
			image: 'https://myfunkytravel.com/wp-content/uploads/2017/05/vietnam-bargaining.jpg',
			header: 'THE ART OF BARGAINING AND NEGOTIATING ',
			author: 'Timm',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		},
		{
			id: 7,
			image: 'https://myfunkytravel.com/wp-content/uploads/2017/05/vietnam-bargaining.jpg',
			header: 'THE ART OF BARGAINING AND NEGOTIATING ',
			author: 'Timm',
			link: 'http://192.168.8.102/index.php/2022/03/16/patents/'
		}
	];

	const [ visible1, setVisible1 ] = useState(false);
	const [ visible2, setVisible2 ] = useState(false);
	const [ visible3, setVisible3 ] = useState(false);
	const [ visible4, setVisible4 ] = useState(false);
	const [ visible5, setVisible5 ] = useState(false);

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);
	const ref5 = useRef(null);

	const scroll1 = (scrollOffset) => {
		ref1.current.scrollLeft += scrollOffset;
		if ((ref1.current.scrollLeft += scrollOffset) >= 300) setVisible1(true);
		if ((ref1.current.scrollLeft += scrollOffset) <= 10) setVisible1(false);
	};

	const scroll2 = (scrollOffset) => {
		ref2.current.scrollLeft += scrollOffset;
		if ((ref2.current.scrollLeft += scrollOffset) >= 300) setVisible2(true);
		if ((ref2.current.scrollLeft += scrollOffset) <= 10) setVisible2(false);
	};

	const scroll3 = (scrollOffset) => {
		ref3.current.scrollLeft += scrollOffset;
		if ((ref3.current.scrollLeft += scrollOffset) >= 300) setVisible3(true);
		if ((ref3.current.scrollLeft += scrollOffset) <= 10) setVisible3(false);
	};

	const scroll4 = (scrollOffset) => {
		ref4.current.scrollLeft += scrollOffset;
		if ((ref4.current.scrollLeft += scrollOffset) >= 300) setVisible4(true);
		if ((ref4.current.scrollLeft += scrollOffset) <= 10) setVisible4(false);
	};

	const scroll5 = (scrollOffset) => {
		ref5.current.scrollLeft += scrollOffset;
		if ((ref5.current.scrollLeft += scrollOffset) >= 300) setVisible5(true);
		if ((ref5.current.scrollLeft += scrollOffset) <= 10) setVisible5(false);
	};

	return (
		<div id="div" className="content-container">
			<div className="content-menu">
				<div className="scroll-column">
					{/* <h2>Legal and Admin</h2> */}
					<div className="scroll-row">
						{!visible1 ? null : (
							<ArrowCircleLeftIcon
								onClick={() => scroll1(-50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						)}
						<div className="scroll-container" ref={ref1}>
							{data.map((r) => (
								<div className="scroll-content">
									<img src={r.image} alt="logo" />
									<span>
										<p>Legal and Admin</p>
									</span>
									<div className="scroll-content-header">
										<h2>{r.header}</h2>
									</div>
									<div className="content-row">
										<p>author</p>
										<div className="content-row-separator" />
										<p>02 December 2021</p>
										<div className="content-row-separator" />
										<p>2 min read</p>
									</div>
									<a href={r.link} target="_blank">
										More
									</a>
								</div>
							))}
						</div>
						{!visible1 ? (
							<ArrowCircleRightIcon
								onClick={() => scroll1(50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						) : null}
					</div>
				</div>
				<div className="scroll-column">
					{/* <h2>Business Modeling</h2> */}
					<div className="scroll-row">
						{!visible2 ? null : (
							<ArrowCircleLeftIcon
								onClick={() => scroll2(-50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						)}
						<div className="scroll-container" ref={ref2}>
							{data.map((r) => (
								<div className="scroll-content" onClick={() => console.log(r)}>
									<img src={r.image} alt="logo" />
									<span>
										<p>Business Modeling</p>
									</span>
									<div className="scroll-content-header">
										<h2>{r.header}</h2>
									</div>
									<div className="content-row">
										<p>author</p>
										<div className="content-row-separator" />
										<p>02 December 2021</p>
										<div className="content-row-separator" />
										<p>2 min read</p>
									</div>
									<a href={r.link} target="_blank">
										More
									</a>
								</div>
							))}
						</div>
						{!visible2 ? (
							<ArrowCircleRightIcon
								onClick={() => scroll2(50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						) : null}
					</div>
				</div>
				<div className="scroll-column">
					{/* <h2>Financing and Investment</h2> */}
					<div className="scroll-row">
						{!visible3 ? null : (
							<ArrowCircleLeftIcon
								onClick={() => scroll3(-50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						)}
						<div className="scroll-container" ref={ref3}>
							{data.map((r) => (
								<div className="scroll-content">
									<img src={r.image} alt="logo" />
									<span>
										<p>Financing and Investment</p>
									</span>
									<div className="scroll-content-header">
										<h2>{r.header}</h2>
									</div>
									<div className="content-row">
										<p>author</p>
										<div className="content-row-separator" />
										<p>02 December 2021</p>
										<div className="content-row-separator" />
										<p>2 min read</p>
									</div>
									<a href={r.link} target="_blank">
										More
									</a>
								</div>
							))}
						</div>
						{!visible3 ? (
							<ArrowCircleRightIcon
								onClick={() => scroll3(50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						) : null}
					</div>
				</div>
				<div className="scroll-column">
					{/* <h2>Journey and Strategy</h2> */}
					<div className="scroll-row">
						{!visible4 ? null : (
							<ArrowCircleLeftIcon
								onClick={() => scroll4(-50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						)}
						<div className="scroll-container" ref={ref4}>
							{data.map((r) => (
								<div className="scroll-content">
									<img src={r.image} alt="logo" />
									<span>
										<p>Journey and Strategy</p>
									</span>
									<div className="scroll-content-header">
										<h2>{r.header}</h2>
									</div>
									<div className="content-row">
										<p>author</p>
										<div className="content-row-separator" />
										<p>02 December 2021</p>
										<div className="content-row-separator" />
										<p>2 min read</p>
									</div>
									<a href={r.link} target="_blank">
										More
									</a>
								</div>
							))}
						</div>
						{!visible4 ? (
							<ArrowCircleRightIcon
								onClick={() => scroll4(50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						) : null}
					</div>
				</div>
				<div className="scroll-column">
					{/* <h2>Journey and Strategy</h2> */}
					<div className="scroll-row">
						{!visible5 ? null : (
							<ArrowCircleLeftIcon
								onClick={() => scroll5(-50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						)}
						<div className="scroll-container" ref={ref5}>
							{data.map((r) => (
								<div className="scroll-content">
									<img src={r.image} alt="logo" />
									<span>
										<p>Journey and Strategy</p>
									</span>
									<div className="scroll-content-header">
										<h2>{r.header}</h2>
									</div>
									<div className="content-row">
										<p>author</p>
										<div className="content-row-separator" />
										<p>02 December 2021</p>
										<div className="content-row-separator" />
										<p>2 min read</p>
									</div>
									<a href={r.link} target="_blank">
										More
									</a>
								</div>
							))}
						</div>
						{!visible5 ? (
							<ArrowCircleRightIcon
								onClick={() => scroll5(50)}
								className="scroll-icons"
								style={{ color: '#333', fontSize: '30px' }}
							/>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Content;
