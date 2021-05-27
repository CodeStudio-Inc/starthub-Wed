import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import Blog from './Blog'
import CreateIcon from '@material-ui/icons/Create'
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close'
// import { storage } from '../../store/Firebase'
import PostBlog from './PostBlog'
import firebase from 'firebase'
import * as actionCreators from '../../store/actionCreators'

import './Blog.css'
const Blogs = () => {

    const [open, setOpen] = useState(false)
    const [blogTitle, setBlogTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [quote, setQuote] = useState('')
    const [description, setDesc] = useState('')
    const [imageUrl, setImage] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [category, setCategory] = useState('')
    const [conclusion, setConclusion] = useState('')
    const [author, setAuthor] = useState('')
    const [progress, setProgress] = useState(0)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getBlogs())
    }, [])

    const blogs = useSelector(state => state.requests.blogs)
    // console.log(state)

    const featuredImageUploadHandler = async (event) => {
        if (event.target.files[0]) {
            const name = event.target.files[0].name;
            try {
                const uploadImage = firebase.storage().ref();
                const _ref = uploadImage.child(`blog/${name}`);
                _ref.put(event.target.files[0]).on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                        setProgress(progress < 100 ? progress : 0);
                        // console.log(progress);
                    },
                    (error) => {
                        console.log('An error occured', error);
                    },
                    async () => {
                        const url = await _ref.getDownloadURL();
                        setImage(url)
                    }
                );
            } catch (error) {
                console.log('Error uploading', error);
            }
        }
    };

    const blogImageUploadHandler = async (event) => {
        if (event.target.files[0]) {
            const name = event.target.files[0].name;
            try {
                const uploadImage = firebase.storage().ref();
                const _ref = uploadImage.child(`images/${name}`);
                _ref.put(event.target.files[0]).on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                        setProgress(progress < 100 ? progress : 0);
                        // console.log(progress);
                    },
                    (error) => {
                        console.log('An error occured', error);
                    },
                    async () => {
                        const url = await _ref.getDownloadURL();
                        setBlogImage(url)
                    }
                );
            } catch (error) {
                console.log('Error uploading', error);
            }
        }
    };

    const handlePostBlog = () => {
        dispatch(actionCreators.postBlog(
            blogTitle,
            subTitle,
            quote,
            description,
            imageUrl,
            blogImage,
            videoUrl,
            category,
            conclusion,
            author,
            (res) => {
                if (res.success === true) {
                    setOpen(false)
                    dispatch(actionCreators.getBlogs())
                }
            }))
    }

    return (
        <div className="blog-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="write-blog">
                    <div className="write-blog-header">
                        <h3>Write Blog</h3>
                        <CloseIcon className="close-icon" onClick={() => setOpen(false)} style={{ fontSize: '30px', color: 'rgba(0,0,0,0.1)', marginRight: '0.5rem' }} />
                    </div>
                    <div className="write-blog-row">
                        <PostBlog />
                    </div>
                </div>
            </ModalUI> : null}
            <div className="blog-column">
                <div className="right-column-blog-content">
                    <div className="blog-header">
                        <h1>Grow Your Startup with the Content at the right time</h1>
                        <p>Catalyzer Blogs</p>
                        <h5>The best entrepreneurial tips are just a click away</h5>
                        <div className="write-blog-btn" onClick={() => setOpen(true)}>
                            <CreateIcon style={{ fontSize: '20px', color: '#fff' }} />
                            <button>Write Blog</button>
                        </div>
                    </div>
                    <div className="blogs-row">
                        {blogs.map((blog, index) => (
                            <Blog
                                key={index}
                                blog={blog}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs
