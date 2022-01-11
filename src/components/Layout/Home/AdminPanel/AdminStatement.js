import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import * as actionCreators from '../../../store/actionCreators'

 const Statements = ({statements, svg}) => {

    const [vision,setVision] = useState(false)
    const [mission,setMission] = useState(false)
    const [state, setState] = useState({
        _vision: statements[0].vision,
        _mission: statements[0].mission
    })

    const _statements = useSelector(state => state.requests.statements)
    const loading = useSelector(state => state.requests.loading)
    // console.log(statements)
    const dispatch = useDispatch()


    return (
        <div style={{width:'100%'}}>
            <div className="vision-mission-1">
                    <h3>Vision Statement</h3>
                    {!statements[0].vision ? <p>User has no Vision Statement set</p> : 
                    <div className="vision-mission-card">
                        {vision ? <input 
                            type="text"
                            placeholder="Enter new Vision"
                            value={state._vision}
                            onChange={(e) => setState({ ...state, _vision: e.target.value })}
                            onKeyUp={(e) => {
                                        if (e.key === 'Enter' && state._vision) {
                                            dispatch(actionCreators.editStatement(_statements[0]._id, state._vision, state._mission, (res) => {
                                                if(res.success) setVision(false)
                                            }))
                                        }
                                    }}
                        /> : null}
                        {vision ? null : <h3>{statements[0].vision}</h3>}
                        {/* {vision ? null : <EditIcon onClick={() => setVision(true)} className="edit-stmt-icon" style={{ fontSize: '20px'}} />} */}
                        {vision ? <CancelIcon onClick={() => setVision(false)} className="edit-stmt-icon" style={{ fontSize: '20px'}} /> : null}
                        {loading && vision  ? <img src={svg} style={{ width:"30px", height:"30px"}}/> : null}
                    </div>}
                </div>
                <div className="vision-mission-1">
                    <h3>Mission Statement</h3>
                    {!statements[0].vision ? <p>User has no Mission Statement set</p> : 
                    <div className="vision-mission-card">
                        {mission ? <input 
                            type="text" 
                            placeholder="Enter new Mission"
                            value={state._mission}
                            onChange={(e) => setState({ ...state, _mission: e.target.value })}
                            onKeyUp={(e) => {
                                        if (e.key === 'Enter' && state._mission) {
                                            dispatch(actionCreators.editStatement(_statements[0]._id, state._vision, state._mission, (res) => {
                                                if(res.success) setMission(false)
                                            }))
                                        }
                                    }}
                        />: null}
                        {mission ? null : <h3>{statements[0].mission}</h3>}
                        {/* {mission ? null : <EditIcon onClick={() => setMission(true)} className="edit-stmt-icon" style={{ fontSize: '20px'}} />} */}
                        {mission ? <CancelIcon onClick={() => setMission(false)} className="edit-stmt-icon" style={{ fontSize: '20px'}} /> : null}
                        {loading && mission  ? <img src={svg} style={{ width:"30px", height:"30px"}}/> : null}
                    </div>}
            </div>
        </div>
    )
}

export default Statements
