import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import * as actionCreators from '../../store/ActionCreators'

import './Styles.css'
const AirTable = () => {

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

    return (
        <div className="main-container">
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column">
                <table>
                    <tbody>
                        <tr className="table-row">
                            {headers.map(header => <td>{header.label}</td>)}
                        </tr>
                        {/* {data.map(row => (
                            <tr>
                                <td>{row.fields.Name}</td>
                                <td>{row.fields.Channels}</td>
                                <td>{row.fields.Creator.name}</td>
                                <td>{row.fields.Headline}</td>
                                <td>{row.fields.Status}</td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AirTable
