import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../store/ActionCreators'
import ModalUI from '../../ModalUI/index'
import CloseIcon from '@material-ui/icons/Close'

import './Styles.css'
const Dashboard = (props) => {

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    const data = useSelector(state => state.requests.data)
    console.log(data, 'jj')

    const headers = [
        { label: 'Name' },
        { label: 'Channels' },
        { label: 'Creator' },
        { label: 'Headline' },
        { label: 'Sub-Headline' },
        { label: 'Status' },
    ]

    useEffect(() => {
        dispatch(actionCreators.getAirTableData())
    }, [])

    const handleAirtableNavigate = () => {
        props.history.push('/air-table')
    }

    return (
        <div className="main-container">
            {open ? <ModalUI setOpen={setOpen}>
                <div className="modal-row">
                    <CloseIcon onClick={() => setOpen(false)} className="close-icon" style={{ fontSize: '30px' }} />
                </div>
                <iframe class="airtable-embed" src="https://airtable.com/embed/shrS6aSAZIgqjP1g0?backgroundColor=green" frameborder="0" onmousewheel="" width="100%" height="95%" ></iframe>
            </ModalUI> : null}
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column">
                {/* <table>
                    <tbody>
                        <tr className="table-row">
                            {headers.map(header => <td>{header.label}</td>)}
                        </tr>
                        {data.map(row => (
                            <tr>
                                <td>{row.fields.Name}</td>
                                <td>{row.fields.Channels}</td>
                                <td>{row.fields.Creator.name}</td>
                                <td>{row.fields.Headline}</td>
                                <td>{row.fields.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <div className="header-row">
                    <button onClick={() => setOpen(true)}>Form</button>
                    <button onClick={handleAirtableNavigate}>Edit</button>
                </div>
                <div className="air-table">
                    <iframe class="airtable-embed" src="https://airtable.com/embed/shr8yQb2R2ss8I9VE?backgroundColor=green" frameborder="0" onmousewheel="" style={{ width: '100%', height: '90vh' }} ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
