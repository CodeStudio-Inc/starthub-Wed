import React from 'react'
import {Table} from 'antd'
import SearchIcon from '@mui/icons-material/Search';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import './Styles.css'
const ResourceFiles = () => {
    const tableRef = React.useRef(null);

    const columns = [
        {
            title: 'File',
			dataIndex: 'file',
			key: 'file',
			align: 'left'
        },
         {
            title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'left'
        },
         {
            title: 'Shared With',
			dataIndex: 'shared',
			key: 'shared',
			align: 'left'
        },
         {
            title: 'Date Created',
			dataIndex: 'date',
			key: 'date',
			align: 'left'
        }
    ]

    console.log('754574564'.length);

  return (
    <div className='resource-file-container'>
        <div className='resource-file-header'>
            <div className='search-file-row'>
                <SearchIcon style={{ fontSize: '25px',color:'rgba(0,0,0,0.2)' }} className="home-link-icon" />
                <input placeholder='search files'/>
            </div>
            <div className='upload-files'>
                <FileUploadOutlinedIcon style={{ fontSize: '25px', color:'rgba(0,0,0,0.2)' }} className="home-link-icon" />
                <h4>Upload</h4>
            </div>
        </div>
        <Table
					ref={tableRef}
					columns={columns}
					style={{ width: '90%' }}
					pagination={{
						defaultPageSize: 6,
						showSizeChanger: true,
						pageSizeOptions: [ '3', '6', '9', '12' ]
					}}
				/>
    </div>
  )
}

export default ResourceFiles