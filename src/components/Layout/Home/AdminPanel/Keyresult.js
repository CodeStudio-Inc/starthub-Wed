import React,{useState} from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'

const Keyresult = ({ k, dispatch, actionCreators, svg, loading, startupId}) => {

    // console.log(state)

    const [editkeyResult, seteditkeyResult] = useState(false)
    const [activekeyResult, setactiveKeyresult] = useState('')
    const [state, setState] = useState({
        keyresult: k.description,
        measureOfSuccess: '',
    })
    const [progress, setProgress] = useState(false)
    const [message, setMessage] = useState(false)

    // console.log(activekeyResult,k.objId, loading)

    return (
        <div style={{width:'100%'}}>
            <div key={k.objId} className="objective-row">
                <p>Key Result</p>
                <div className="objective-card">
                    {editkeyResult && activekeyResult === k.objId ? null : <p>{k.description}</p>}
                    {editkeyResult && activekeyResult === k.objId ?
                        <div style={{width:'100%'}}>
                            <textarea
                                type="text"
                                placeholder="Enter Key result"
                                value={state.keyresult}
                                onChange={(e) => setState({ ...state, keyresult: e.target.value })}
                                onFocus={() => setMessage('Press enter to save')}
                                onKeyUp={(e) => {
                                        if (e.key === 'Enter' && state.keyresult) {
                                            dispatch(actionCreators.editAdminkeyResult(state.keyresult, state.measureOfSuccess, k.dateCreated, k.objId, startupId, (res) => {
                                                if(res.success) {
                                                    seteditkeyResult(false)
                                                    setMessage('')
                                                    setactiveKeyresult(k.objId)
                                                    setState({
                                                        keyresult:'',
                                                        measureOfSuccess:''
                                                    })
                                                }
                                            }))
                                            }
                                        }}
                            /> 
                            {loading && activekeyResult === k.objId ? <p style={{color:'#dfa126'}}>Saving please wait...</p>  : <p style={{color:'#dfa126'}}>{message}</p>}
                        </div>
                    : null}
                    {editkeyResult && activekeyResult === k.objId ? null :
                        <EditIcon 
                        className="edit-stmt-icon" 
                        style={{ fontSize: '20px'}} 
                        onClick={() => {
                            setactiveKeyresult(k.objId)
                            seteditkeyResult(true)
                        }} 
                    />}
                    {editkeyResult && activekeyResult === k.objId ?
                        <CancelIcon 
                        className="edit-stmt-icon" 
                        style={{ fontSize: '20px'}} 
                        onClick={() => seteditkeyResult(false)}
                        /> : null}
                </div>
                <div className="slider-column">
                    <div className="objective-slider-row">
                    <Box sx={{ width: 150 }}>
                    <Slider
                        defaultValue={k.measureOfSuccess}
                        valueLabelDisplay="auto"
                        size='small'
                        onChange={(e) => {
                            setState({ ...state, measureOfSuccess: e.target.value })
                            setactiveKeyresult(k.objId)
                            setProgress(true)
                        }}
                    />
                    </Box>
                    {progress && activekeyResult === k.objId ? null : <h4>{k.measureOfSuccess}%</h4>}
                    {progress && activekeyResult === k.objId ?  <h4>{state.measureOfSuccess}%</h4> : null}
                    <button
                        onClick={() => {
                                dispatch(actionCreators.deleteAdminKeyResult(k.objId, k._id, startupId))
                        }}
                    >Delete</button>
                    </div>
                    {progress && activekeyResult === k.objId  ? 
                    <button 
                        onClick={() => {
                                dispatch(actionCreators.editAdminkeyResult(state.keyresult, state.measureOfSuccess.toString(), k.dateCreated, k.objId, startupId, (res) => {
                            if(res.success) {
                                setProgress(false)
                                setactiveKeyresult(k.objId)
                                setState({
                                    keyresult:'',
                                    measureOfSuccess:''
                                })
                            }
                        }))
                    }}
                    >
                    {loading && activekeyResult === k.objId ? 'Saving' : 'save progress' }
                    </button> 
                    : null}
                </div>
                {/* {loading && activekeyResult === k.objId  ? <img src={svg} style={{ width:"30px", height:"30px"}} /> : null} */}
            </div>
        </div>
    )
}

export default Keyresult
