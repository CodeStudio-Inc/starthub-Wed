import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import ArchiveIcon from '@mui/icons-material/Archive'
import * as actionCreators from '../../../store/actionCreators'
import Keyresult from './Keyresult'
import Addkeyresult from './Addkeyresult'
import GAEventsTracker from '../../../Hooks/GAEventsTracker'

const Objective = ({objectives, svg}) =>  {

    const [addkeyResult,setaddkeyResult] = useState(false)
    const [editObjective, setEditObjective] = useState(false)
    const [activeObj,setactiveObj] = useState('')
    const [currentobjEdit,setcurrentobjEdit] = useState('')

    const loading = useSelector(state => state.requests.loading)

    const UseGAEventsTracker = GAEventsTracker("Objectives")


    const [objstate, setObjstate] = useState({
        objective: '' 
    })

    const dispatch = useDispatch()

    // console.log(objstate)

    return (
        <div  className="objective-bg">
            {objectives && objectives.map((obj, index) => (
                <div key={obj._id} className="objective">
                    <div className="objective-header">
                        <p>Objective {index >= 0 ? index + 1 : null}</p>
                        {loading && obj._id === activeObj ? 
                        <img src={svg} style={{ width:"30px", height:"30px"}}/> :
                            <ArchiveIcon  
                            className="edit-stmt-icon" 
                                style={{ fontSize: '20px', color:'#28282be3'}} 
                            onClick={() => {
                                setactiveObj(obj._id)
                                dispatch(actionCreators.archiveObjective(obj._id))
                            }}
                        />
                        }
                    </div>
                        <div className="objective-description">
                        <div className="objective-description-row">
                            {editObjective && obj._id === activeObj ? 
                            <input
                                type="text"
                                placeholder="Enter new Objective"
                                value={objstate.objective}
                                onFocus={() => setObjstate({objective: obj.description})}
                                onChange={(e) => setObjstate({ ...objstate, objective: e.target.value })}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' && objstate.objective) {
                                        dispatch(actionCreators.editObjective(obj._id, objstate.objective, (res) => {
                                            UseGAEventsTracker("edit objective",objstate.objective)
                                            if(res.success) {
                                                setEditObjective(false)
                                                setObjstate({
                                                    objective:''
                                                })
                                            }
                                        }))
                                        }
                                    }}
                            /> : null}
                            {editObjective && obj._id === activeObj ? null : <h2>{obj.description}</h2>}
                            {editObjective ? null : <EditIcon 
                                className="edit-stmt-icon" style={{ fontSize: '20px'}} 
                                onClick={() => {
                                    setactiveObj(obj._id)
                                    setEditObjective(true)
                                }} 
                            />}
                            {editObjective && obj._id === activeObj ? 
                                <p
                                    style={{ marginRight: '5px' }}
                                    onClick={() => {
                                        if (objstate.objective) {
                                            dispatch(actionCreators.editObjective(obj._id, objstate.objective, (res) => {
                                                UseGAEventsTracker("edit objective", objstate.objective)
                                                if (res.success) {
                                                    setEditObjective(false)
                                                    setObjstate({
                                                        objective: ''
                                                    })
                                                }
                                            }))
                                        }
                                    }}
                                >save</p> : null}
                            {editObjective && obj._id === activeObj ? <CancelIcon onClick={() => setEditObjective(false)} className="edit-stmt-icon" style={{ fontSize: '20px' }} /> : null}
                            {loading && obj._id === activeObj ? <p style={{ color: '#dfa126' }}>updating...</p> : null}
                            </div>
                        <div className="objective-description-row">
                            <h4>{!obj.objPercentage ? 0 : Math.round(obj.objPercentage)}%</h4>
                            <h5>covered</h5>
                        </div>
                        </div>
                        {obj && obj.keyresults.map(k => (
                            <Keyresult 
                                k={k}
                                svg={svg}
                                loading={loading}
                                dispatch={dispatch}
                                actionCreators={actionCreators}
                            />
                        ))}
                    {addkeyResult && obj._id === activeObj ? 
                    <Addkeyresult
                        obj={obj}
                        dispatch={dispatch}
                        actionCreators={actionCreators}
                        setaddkeyResult={setaddkeyResult}
                    />
                     : null }
                    {addkeyResult ? null : <button 
                    onClick={() => {
                        setactiveObj(obj._id)
                        setaddkeyResult(true)
                    }}
                    >Add keyresult</button>}
                    {addkeyResult && obj._id === activeObj ? <button onClick={() => setaddkeyResult(false)}>Cancel</button> : null}
                </div>
            ) )}
        </div>
    )
}

export default Objective
