import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

const Blog = (props) => {

    return (
        <div className="blog">
            <img src={props.blog.imageUrl} />
            <div className="blog-details">
                <p>{moment(props.blog.createdAt).calendar()}</p>
                <h2>{props.blog.blogTitle}</h2>
                <h4>{props.blog.subTitle}</h4>
                <div className="blog-btn-row">
                    <div className="blog-btn" onClick={() => props.history.push('/blog-details', { data: props.blog })}>
                        <h5>Read More</h5>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withRouter(Blog)
