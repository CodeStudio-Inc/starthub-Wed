import React,{useState, useEffect} from 'react'
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
        message:''
    })
    const [progress, setProgress] = useState(false)
    const [message, setMessage] = useState(false)
    const [visible, setVisible] = useState(false)
    const [btn, setBtn] = useState(false)

    useEffect(() => {
        setState({
            message:''
        })
    },[])

    // console.log(state.message,'ll')

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
                                onFocus={() => {
                                    setBtn(true)
                                    setState({
                                        keyresult: k.description
                                    })
                                }}
                                // onKeyUp={(e) => {
                                //         if (e.key === 'Enter' && state.keyresult) {
                                //             dispatch(actionCreators.editAdminkeyResult(state.keyresult, state.measureOfSuccess, k.dateCreated, k.objId, startupId, (res) => {
                                //                 if(res.success) {
                                //                     seteditkeyResult(false)
                                //                     setMessage('')
                                //                     setactiveKeyresult(k.objId)
                                //                     setState({
                                //                         keyresult:'',
                                //                         measureOfSuccess:''
                                //                     })
                                //                 }
                                //             }))
                                //             }
                                //         }}
                            /> 
                            {btn ?
                                <button
                                    onClick={() => {
                                        if (state.keyresult) {
                                            setBtn(false)
                                            dispatch(actionCreators.editAdminkeyResult(state.keyresult, state.measureOfSuccess, k.dateCreated, k.objId, startupId,  (res) => {
                                                if (res.success) {
                                                    seteditkeyResult(false)
                                                    setactiveKeyresult(k.objId)
                                                    setState({
                                                        keyresult: '',
                                                        measureOfSuccess: ''
                                                    })
                                                }
                                            }))
                                        }
                                    }}
                                >
                                    Save
                                </button> : null
                            }
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
                    {!visible && !state.message ? <button
                        onClick={() => {
                                setactiveKeyresult(k._id)
                                dispatch(actionCreators.deleteAdminKeyResult(k.objId, k._id, startupId, (res) => {
                                    if(res.success === false){
                                        setState({ message: 'Not Authorised to delete'})
                                    }
                                }))
                        }}
                        >{activekeyResult === k._id && loading ? 'Deleting' : 'Delete'}
                    </button> : null}
                    <p style={{marginLeft:'5px',marginTop:'0',marginBottom:'0'}}>{state.message}</p>
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
