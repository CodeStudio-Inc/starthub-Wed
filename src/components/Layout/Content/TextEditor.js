import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileUpload from './FileUpload';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import * as actionCreators from '../../store/actionCreators';

const TextEditor = () => {
	const [ state, setState ] = useState({
		editorState: EditorState.createEmpty(),
		article: ''
	});
	const [ img, setImg ] = useState('');
	const [ profile, setPhoto ] = useState({
		photo: ''
	});

	const [ author, setAuthor ] = useState({
		name: '',
		imageLink: '',
		bio: ''
	});

	const [ blog, setBlog ] = useState({
		category: '',
		title: '',
		article: '',
		featuredimageLink: ''
	});

	const [ error, setError ] = useState('');

	const [ profileModal, setProfileModal ] = useState(false);
	const [ dropdown, setDropdown ] = useState(false);
	const [ message, setMessage ] = useState('');
	const { authors } = useSelector((state) => state.admin);
	const { loading } = useSelector((state) => state.requests);

	const dispatch = useDispatch();

	const getAuthors = () => dispatch(actionCreators.getAuthors());

	// console.log(loading);

	useEffect(() => {
		getAuthors();
	}, []);

	const onEditorStateChange = (e) => {
		setState({ editorState: e });
	};

	const postBlog = () => {
		if (!blog.title || !author.name || !blog.category || !blog.featuredimageLink)
			return setError('Enter all fields');
		dispatch(
			actionCreators.postBlog(
				blog.title,
				author.name,
				author.imageLink,
				author.bio,
				blog.category,
				blog.featuredimageLink,
				draftToHtml(convertToRaw(state.editorState.getCurrentContent())),
				(res) => {
					if (res.success === true) {
						setError(' ');
						setAuthor({
							name: '',
							imageLink: '',
							bio: ''
						});
						setBlog({
							category: '',
							title: '',
							article: ''
						});
						setState({
							editorState: EditorState.createEmpty()
						});
					}
				}
			)
		);
	};

	const uploadProfile = () => {
		document.getElementById('selectphoto').click();
	};

	const handleChange = (e) => {
		setImg(e.target.files[0]);
		setPhoto({
			photo: URL.createObjectURL(e.target.files[0])
		});
	};

	const addAuthor = async () => {
		setMessage('Adding author profile...');
		const data = new FormData();
		data.append('file', img);
		data.append('upload_preset', 'starthub_preset');
		await axios
			.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
			.then((res) => {
				setMessage('Finishing up...');
				// console.log(res);

				dispatch(
					actionCreators.addAuthor(author.name, res.data.url, author.bio, (res) => {
						if (res.success) {
							setMessage('Nice, Thank you!');
						}
					})
				);
			})
			.catch((error) => {
				setMessage('Trouble Uploading Image, Try again');
				console.log(error);
			});
	};

	// console.log(draftToHtml(convertToRaw(state.editorState.getCurrentContent())));

	return (
		<div className="text-editor-container">
			<div className="text-editor-container-left" onClick={() => setDropdown(false)}>
				<Editor
					editorState={state.editorState}
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					onEditorStateChange={onEditorStateChange}
					placeholder="Type blog here..."
				/>
			</div>
			<div className="text-editor-container-right">
				<div className="add-author">
					{!profileModal ? (
						<button
							onClick={() => {
								setDropdown(false);
								setProfileModal(true);
							}}
						>
							Add author
						</button>
					) : null}
					{profileModal ? <button onClick={() => setProfileModal(false)}>Cancel</button> : null}
					{profileModal ? (
						<div className="add-author-modal">
							<div className="profile-upload" onClick={uploadProfile.bind()}>
								{!profile.photo ? (
									<PhotoCameraIcon style={{ fontSize: '30px', color: '#fff' }} />
								) : null}
								{profile.photo ? <img src={profile.photo} /> : null}
							</div>
							<input
								type="text"
								placeholder="Name"
								value={author.name}
								onChange={(e) => setAuthor({ ...author, name: e.target.value })}
							/>
							<input className="file-input" id="selectphoto" type="file" onChange={handleChange} />
							<textarea
								placeholder="bio or skills i.e writer | researcher | trainer "
								value={author.bio}
								onChange={(e) => setAuthor({ ...author, bio: e.target.value })}
							/>
							<button disabled={message ? true : false} onClick={addAuthor}>
								{message ? message : 'save'}
							</button>
						</div>
					) : null}
				</div>
				{!profileModal ? (
					<div className="author-select" onClick={() => setDropdown(true)}>
						{author.name ? <p>{author.name}</p> : <p>-select author-</p>}
						<KeyboardArrowDownIcon style={{ fontSize: '18px' }} onClick={() => setDropdown(true)} />
					</div>
				) : null}
				{dropdown ? (
					<div className="author-select-drop-down">
						{authors.length !== 0 ? (
							authors.map((a) => (
								<div
									className="author-select-drop-down-row"
									onClick={() => {
										setAuthor({
											...author,
											name: a.name,
											imageLink: a.imageLink,
											bio: a.bio
										});
										setDropdown(false);
									}}
								>
									<img src={a.imageLink} />
									<div>
										<h4>{a.name}</h4>
										<h5>{a.bio}</h5>
									</div>
								</div>
							))
						) : (
							<button
								onClick={() => {
									setDropdown(false);
									setProfileModal(true);
								}}
							>
								Add author
							</button>
						)}
					</div>
				) : null}
				<FileUpload blog={blog} setBlog={setBlog} />
				<input
					type="text"
					value={blog.title}
					placeholder="Add Blog Title"
					onChange={(e) => setBlog({ ...blog, title: e.target.value })}
				/>
				<select onChange={(e) => setBlog({ ...blog, category: e.target.value })}>
					<option disabled selected>
						-select category-
					</option>publishLoader
					<option value="Newsletters">Newsletters</option>
					<option value="Legal & Admin">Legal & Admin</option>
					<option value="Business Modelling">Business Modelling</option>
					<option value="Journey & strategy">Journey & strategy</option>
					<option value="Building Product">Building Product</option>
					<option value="Admin, Operations, and Management">Admin, Operations, and Management</option>
					<option value="Design and user interaction">Design and user interaction</option>
					<option value="Team, Culture, and organization">Team, Culture, and organization</option>
					<option value="Growth, Marketing, and Sales">Growth, Marketing, and Sales</option>
					<option value="Financing and Investment">Financing and Investment</option>
					<option value="Psychology, Habits, and Behaviour">Psychology, Habits, and Behaviour</option>
				</select>
				<button disabled={loading ? true : false} onClick={postBlog}>
					{loading ? 'Publishing...' : 'Publish'}
				</button>
				<h5>{error}</h5>
			</div>
		</div>
	);
};

export default TextEditor;
