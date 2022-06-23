import { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Image } from 'antd';

const FileUpload = ({ blog, setBlog }) => {
	const [ image, setImage ] = useState('');
	const [ preview, setPreview ] = useState({
		previewing: ''
	});
	const [ uploadLoader, setUploadLoader ] = useState('');
	const [ error, setError ] = useState('');
	const [ upload, setUpload ] = useState(false);

	// console.log(uploadLoader);

	const uploadFiles = () => {
		setError('');
		document.getElementById('selectFile').click();
	};

	const handleChange = (e) => {
		setImage(e.target.files[0]);
		setPreview({
			previewing: URL.createObjectURL(e.target.files[0])
		});
	};

	const uploadImage = async () => {
		if (!image) return setError('Add image please');
		setUpload(true);
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'starthub_preset');
		await axios
			.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
			.then((res) => {
				setBlog({ ...blog, featuredimageLink: res.data.url });
				setUploadLoader('Image Uploaded Successfully');
				setUpload(false);
				setPreview({
					previewing: ''
				});
				setError('');
				// console.log(res.data.url);
			})
			.catch((error) => {
				setUploadLoader('Trouble Uploading Image, Try again');
				console.log(error);
			});
	};

	return (
		<div className="file-upload">
			{blog.featuredimageLink ? null : (
				<div className="preview">
					{!preview.previewing ? null : <Image className="img" src={preview.previewing} />}
					<button onClick={uploadFiles.bind()}>
						<p>+</p>
						<p>Add Featured Image</p>
					</button>
				</div>
			)}
			<input id="selectFile" type="file" onChange={handleChange} />
			{blog.featuredimageLink ? (
				<h4>{uploadLoader}</h4>
			) : (
				<div className="upload" onClick={uploadImage}>
					<p>{upload ? 'Uploading...' : 'Upload Featured Image'}</p>
					<CloudUploadIcon style={{ fontSize: '30px', color: '#fff', marginLeft: '0.5rem' }} />
				</div>
			)}
			{error ? <h4>{error}</h4> : null}
		</div>
	);
};

export default FileUpload;
