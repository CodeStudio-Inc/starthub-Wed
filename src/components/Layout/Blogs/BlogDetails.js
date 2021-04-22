import React from 'react'
import Sidebar from '../../Navigation/Sidebar'
import moment from 'moment'

import './Styles.css'
const BlogDetails = (props) => {

    const blog = props.location.state.data

    console.log(blog)
    return (
        <div className="blog-container">
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="blog-column-detail">
                <div className="right-column-blog-detail-content">
                    {/* <div className="blog-header">
                        <h1>{blog.blogTitle}</h1>
                        <p>Catalyzer Blogs</p>
                        <h5>{blog.subTitle}</h5>
                    </div> */}
                    <img className="blog-img" src={blog.imageUrl} />
                    <div className="blogs-details-container">
                        <h1>{blog.blogTitle}</h1>
                        <h3>{blog.subTitle}</h3>
                        {/* <h6>{blog.description}</h6> */}
                        <div className="line">
                            <h4>{blog.author}</h4>
                            <h6>{moment(blog.createdAt).calendar()}</h6>
                        </div>
                        <div class="shareaholic-canvas" data-app="share_buttons" data-app-id="29071973"></div>
                        <div className="quote">
                            <h4>"{blog.quote}"</h4>
                        </div>
                        <img className="blogImage" src={blog.blogImage} />
                        <div className="desc">
                            <h5>{blog.description}</h5>
                        </div>
                        <iframe width="600" height="315"
                            src={blog.videoUrl}>
                        </iframe>
                        <p>{blog.conclusion}</p>
                        <iframe width="700" height="515"
                            src="https://forms.gle/XkECP4nexJYtvqWE6">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails
