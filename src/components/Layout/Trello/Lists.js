import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Sidebar from '../../Navigation/Sidebar'
import { TRELLO_KEY, TRELLO_TOKEN } from '../../store/Config'

import './Styles.css'
const Lists = () => {

    const lists = useSelector(state => state.requests.lists)
    console.log(lists, 'ff')


    return (
        <div className="main-container">
            <div className="left-column">
                <Sidebar />
            </div>
            <div className="right-column">
                <div className="milestone-row">
                    {lists.map(list => (
                        <div className="list-card">
                            <h3>{list.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Lists
