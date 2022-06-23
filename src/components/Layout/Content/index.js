import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import ModalUI from '../../ModalUI/BlogModal';
import moment from 'moment';
import {
	FacebookShareButton,
	FacebookIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon
} from 'react-share';
import * as actionCreators from '../../store/actionCreators';
import ContentColumn from './ContentColumn';

import './Content.css';
const Content = (props) => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
		getBlogs();
	}, []);

	const { blogs } = useSelector((state) => state.requests);
	const [ blogData, setBlogData ] = useState({
		blog: {},
		modal: false
	});
	const [ visible1, setVisible1 ] = useState(false);
	const [ visible2, setVisible2 ] = useState(false);
	const [ visible3, setVisible3 ] = useState(false);
	const [ visible4, setVisible4 ] = useState(false);
	const [ visible5, setVisible5 ] = useState(false);
	const [ visible6, setVisible6 ] = useState(false);
	const [ visible7, setVisible7 ] = useState(false);
	const [ visible8, setVisible8 ] = useState(false);
	const [ visible9, setVisible9 ] = useState(false);
	const [ visible10, setVisible10 ] = useState(false);

	const Legal = blogs && blogs.filter((e) => e.category === 'Legal & Admin');
	const Business = blogs && blogs.filter((e) => e.category === 'Business Modelling');
	const strategy = blogs && blogs.filter((e) => e.category === 'Journey & strategy');
	const Product = blogs && blogs.filter((e) => e.category === 'Building Product');
	const Investment = blogs && blogs.filter((e) => e.category === 'Financing and Investment');
	const Marketing = blogs && blogs.filter((e) => e.category === 'Growth, Marketing, and Sales');
	const Management = blogs && blogs.filter((e) => e.category === 'Admin, Operations, and Management');
	const organization = blogs && blogs.filter((e) => e.category === 'Team, Culture, and organization');
	const Design = blogs && blogs.filter((e) => e.category === 'Design and user interaction');
	const Psychology = blogs && blogs.filter((e) => e.category === 'Psychology, Habits, and Behaviour');

	const related_blogs = blogs && blogs.filter((e) => e.category === blogData.blog.category);

	const dispatch = useDispatch();

	function createMarkup() {
		return { __html: blogData.blog.article };
	}

	const getBlogs = () => dispatch(actionCreators.getBlogs());

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);
	const ref5 = useRef(null);
	const ref6 = useRef(null);
	const ref7 = useRef(null);
	const ref8 = useRef(null);
	const ref9 = useRef(null);
	const ref10 = useRef(null);

	return (
		<div id="div" className="content-container">
			{blogData.modal ? (
				<ModalUI>
					<div className="blog-container">
						<div className="blog-header">
							<p onClick={() => setBlogData({ ...blogData, modal: false })}>close</p>
						</div>
						<div className="blog-main">
							<div className="blog-content">
								<img className="imgfeaturedimageLink" src={blogData.blog.featuredimageLink} />
								<div className="social-content-container">
									<div className="author-content">
										<img src={blogData.blog.author.imageLink} />
										<div className="author-details">
											<h4>{blogData.blog.author.name}</h4>
											<h5>{moment(blogData.blog.date).format('MMMM Do YYYY')}</h5>
										</div>
									</div>
									<div className="social-media">
										<FacebookShareButton url="https://www.starthubafrica.com/content">
											<FacebookIcon logofillcolor="white" size={30} round={true} />
										</FacebookShareButton>
										<TwitterShareButton url="https://www.starthubafrica.com/content">
											<TwitterIcon logofillcolor="white" size={30} round={true} />
										</TwitterShareButton>
										<LinkedinShareButton url="https://www.starthubafrica.com/content">
											<LinkedinIcon logofillcolor="white" size={30} round={true} />
										</LinkedinShareButton>
										<WhatsappShareButton url="https://www.starthubafrica.com/content">
											<WhatsappIcon logofillcolor="white" size={30} round={true} />
										</WhatsappShareButton>
									</div>
								</div>
								<h1>{blogData.blog.title}</h1>
								<div className="html" dangerouslySetInnerHTML={createMarkup()} />
							</div>
							<div className="blog-sidebar">
								<div className="blog-sidebar-main">
									<img src={blogData.blog.author.imageLink} />
									<h3>{blogData.blog.author.name}</h3>
									<h5>{blogData.blog.author.bio}</h5>
									<h4>More from {blogData.blog.category}</h4>
									{related_blogs &&
										related_blogs.map((rb) => (
											<div
												key={rb._id}
												className="sidebar-row"
												onClick={() => {
													setBlogData({
														...blogData,
														blog: rb
													});
												}}
											>
												<div className="sidebar-author">
													<div className="sidebar-author-row">
														<img src={rb.author.imageLink} />
														<p>{rb.author.name}</p>
													</div>
													<h3>{rb.title}</h3>
												</div>
												<img src={rb.featuredimageLink} />
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="content-menu">
				<ContentColumn
					category={Legal}
					ref={ref1}
					visible={visible1}
					setVisible={setVisible1}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Business}
					ref={ref2}
					visible={visible2}
					setVisible={setVisible2}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={strategy}
					ref={ref3}
					visible={visible3}
					setVisible={setVisible3}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Product}
					ref={ref4}
					visible={visible4}
					setVisible={setVisible4}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Investment}
					ref={ref5}
					visible={visible5}
					setVisible={setVisible5}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Marketing}
					ref={ref6}
					visible={visible6}
					setVisible={setVisible6}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Management}
					ref={ref7}
					visible={visible7}
					setVisible={setVisible7}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={organization}
					ref={ref8}
					visible={visible8}
					setVisible={setVisible8}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Design}
					ref={ref9}
					visible={visible9}
					setVisible={setVisible9}
					setBlogData={setBlogData}
				/>
				<ContentColumn
					category={Psychology}
					ref={ref10}
					visible={visible10}
					setVisible={setVisible10}
					setBlogData={setBlogData}
				/>
			</div>
		</div>
	);
};

export default Content;
