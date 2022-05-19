import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@material-ui/icons/Delete'
import * as actionCreators from '../../../store/actionCreators'
import Keyresult from './Keyresult'
import Addkeyresult from './Addkeyresult'

const AdminObjective = ({ objectives, svg, startupId}) =>  {

    const [addkeyResult,setaddkeyResult] = useState(false)
    const [editObjective, seteditObjetive] = useState(false)
    const [activeObj,setactiveObj] = useState('')
    const [currentobjEdit,setcurrentobjEdit] = useState('')

    const loading = useSelector(state => state.requests.loading)

    const [state, setState] = useState({
        keyresult:'',
        measureOfSuccess: 0
    })

    const [objstate, setObjstate] = useState({
        objective: '' 
    })

    const dispatch = useDispatch()

    // console.log(objectives)

    return (
        <div  className="objective-bg">
            {objectives && objectives.map((obj, index) => (
                <div key={index} className="objective">
                    <div className="objective-header">
                        <p>Objective {index >= 0 ? index + 1 : null}</p>
                        {loading && obj._id === activeObj ?
                            <img src={svg} style={{ width: "30px", height: "30px" }} /> :
                            <ArchiveIcon
                                className="edit-stmt-icon"
                                style={{ fontSize: '20px', color: '#28282be3' }}
                                onClick={() => {
                                    setactiveObj(obj._id)
                                    dispatch(actionCreators.archiveAdminObjective(obj._id, startupId,() => {}))
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
                                    onFocus={() => setObjstate({ objective: obj.description })}
                                    onChange={(e) => setObjstate({ ...objstate, objective: e.target.value })}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter' && objstate.objective) {
                                            dispatch(actionCreators.editAdminObjective(obj._id, objstate.objective, startupId, (res) => {
                                                if (res.success) {
                                                    seteditObjetive(false)
                                                    setObjstate({
                                                        objective: ''
                                                    })
                                                }
                                            }))
                                        }
                                    }}
                                /> : null}
                            {editObjective && obj._id === activeObj ? null : <h2>{obj.description}</h2>}
                            {editObjective ? null :
                                <EditIcon
                                    className="edit-stmt-icon" style={{ fontSize: '20px', color:'#28282be3' }}
                                    onClick={() => {
                                        setactiveObj(obj._id)
                                        seteditObjetive(true)
                                    }}
                                />}
                            {editObjective && obj._id === activeObj ? 
                            <p 
                            style={{marginRight:'5px' }}
                            onClick={() => {
                                if (objstate.objective) {
                                    dispatch(actionCreators.editAdminObjective(obj._id, objstate.objective, startupId, (res) => {
                                        if (res.success) {
                                            seteditObjetive(false)
                                            setObjstate({
                                                objective: ''
                                            })
                                        }
                                    }))
                                }
                            }}
                            >save</p> : null}
                            {editObjective && obj._id === activeObj ? <CancelIcon onClick={() => seteditObjetive(false)} className="edit-stmt-icon" style={{ fontSize: '20px' }} /> : null}
                            {loading && obj._id === activeObj ? <p style={{ color: '#dfa126' }}>updating...</p> : null}
                        </div>    
                        <div className="objective-description-row">
                            <h4>{!obj.objPercentage ? 0 : Math.round(obj.objPercentage)}%</h4>
                            <p>covered</p>
                        </div>
                        </div>
                        {obj && obj.keyresults.map(k => (
                            <Keyresult 
                                k={k}
                                svg={svg}
                                loading={loading}
                                state={state}
                                setState={setState}
                                dispatch={dispatch}
                                actionCreators={actionCreators}
                                startupId={startupId}
                            />
                        ))}
                        {/* {keyresults && keyresults.map(k => (
                            <Keyresult keyresults={k} objId={obj._id}/>
                        ))} */}
                    {addkeyResult && obj._id === activeObj ? 
                    <Addkeyresult
                        obj={obj}
                        state={state}
                        dispatch={dispatch}
                        actionCreators={actionCreators}
                        setState={setState}
                        setaddkeyResult={setaddkeyResult}
                        startupId={startupId}
                    />
                     : null }
                    {addkeyResult ? null : 
                    <button 
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

export default AdminObjective
