import React from 'react';

import './Styles.css';
const BlogModal = (props) => {
	return (
		<div className="blog-modal-container">
			<div className="blog-modal-inner-container">{props.children}</div>
		</div>
	);
};

export default BlogModal;
