import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Tabs } from 'antd'
import Flatrate from './Flatrate'
import RevenueShare from './RevenueShare'
import ReducingBalance from './ReducingBalance'
import ModalUI from '../../../../ModalUI'
import * as actionCreators from '../../../../store/actionCreators'

const { TabPane } = Tabs

const Loans = (props) => {

    const [expireTime, setexpireTime] = useState(false)

    const expire = useSelector(state => state.auth.tokenExpiration)
    const loans = useSelector(state => state.admin.loans)
    console.log(loans,'ll')
    const dispatch = useDispatch()

    const current_date = Date.now()

    const getLoans = () => dispatch(actionCreators.getLoans())
    const getRevShares = () => dispatch(actionCreators.getRevenueShares())

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    useEffect(() => {
        if(current_date >= expire) {
           return setexpireTime(true)
        }
        getLoans()
        getRevShares()
    },[])

  return (
            <Tabs 
                style={{width:'95%',position:'relative', left:'15%', overflowY:'scroll', height:'100vh'}}
                defaultActiveKey="1" 
                centered 
                tabBarStyle={{ color:'#dfa126'}}
            >
                {expireTime ? 
                    <ModalUI>
                        <div className="edit-card">
                            <h5>Session timeout please login again</h5>
                            <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                        </div>
                    </ModalUI>
                : null}
                <TabPane tab="Flate Rate" key="1">
                    <Flatrate/>
                </TabPane>
                <TabPane tab="Reducing Balance" key="2">
                    <ReducingBalance/>
                </TabPane>
                <TabPane tab="Revenue Share" key="3">
                    <RevenueShare/>
                </TabPane>
            </Tabs>
  )
}

export default Loans