import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import Blog from './Blog'
import CreateIcon from '@material-ui/icons/Create';
import ModalUI from '../../ModalUI'
import CloseIcon from '@material-ui/icons/Close';
// import { storage } from '../../store/Firebase'
import firebase from 'firebase'
import * as actionCreators from '../../store/ActionCreators'

import './Styles.css'
const Blogs = () => {

    const [open, setOpen] = useState(false)
    const [blogTitle, setBlogTitle] = useState('hello')
    const [subTitle, setSubTitle] = useState('hello')
    const [quote, setQuote] = useState('hello')
    const [description, setDesc] = useState('hello')
    const [imageUrl, setImage] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/bBRAseMeAIU')
    const [category, setCategory] = useState('hello')
    const [conclusion, setConclusion] = useState('hello')
    const [author, setAuthor] = useState('hello')
    const [progress, setProgress] = useState(0)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actionCreators.getsBlogs())
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
                console.log(res)
                if (res.success === true) {
                    setOpen(false)
                    dispatch(actionCreators.getsBlogs())
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
                        <div className="right-blog-column">
                            <div className="input-column">
                                <input
                                    placeholder="Title"
                                    value={blogTitle}
                                    onChange={(e) => setBlogTitle(e.target.value)}
                                />
                                <input
                                    placeholder="SubTitle"
                                    value={subTitle}
                                    onChange={(e) => setSubTitle(e.target.value)}
                                />
                                <input
                                    placeholder="quote"
                                    value={quote}
                                    onChange={(e) => setQuote(e.target.value)}
                                />
                                <textarea
                                    placeholder="Blog Description"
                                    value={description}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </div>
                            <div>
                                <h5>Upload Featured Image<span style={{ color: 'red' }}> *required</span></h5>
                                <div className="image-upload">
                                    <input type="file" onChange={featuredImageUploadHandler} />
                                    <div className="image">
                                        {/* {!imageUrl ? <h4>Upload image</h4> : null} */}
                                        <img src={imageUrl ? imageUrl : null} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5>Upload Blog Image</h5>
                                <div className="image-upload">
                                    <input type="file" onChange={blogImageUploadHandler} />
                                    <div className="image">
                                        {/* {!imageUrl ? <h4>Upload image</h4> : null} */}
                                        <img src={blogImage ? blogImage : null} />
                                    </div>
                                </div>
                            </div>
                            <div className="youtube-link">
                                <h4>Youtube link</h4>
                                <input
                                    placeholder="Paste youtube embedded link"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </div>
                            <div className="youtube-link">
                                <h4>Conclusion</h4>
                                <input
                                    placeholder="Conclude"
                                    value={conclusion}
                                    onChange={(e) => setConclusion(e.target.value)}
                                />
                            </div>
                            <button onClick={handlePostBlog}>Post</button>
                        </div>
                        <div className="left-blog-column">
                            <div className="column">
                                <h5>Author</h5>
                                <input
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="column">
                                <h5>Topic</h5>
                                <input
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalUI> : null}
            <div className="left-column">
                <Sidebar />
            </div>
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
