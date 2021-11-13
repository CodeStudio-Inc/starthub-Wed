import React,{useState} from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const Keyresult = ({k, state, setState, dispatch, actionCreators}) => {

    // console.log(state)

    const [editkeyResult, seteditkeyResult] = useState(false)

    return (
        <div style={{width:'100%'}}>
            {editkeyResult ? null :
            <div key={k.objId} className="objective-row">
                <p>Key Result</p>
                <div className="objective-card">
                    <p>{k.description}</p>
                </div>
                <div className="objective-slider-row">
                    <Box sx={{ width: 200 }}>
                    <Slider
                        defaultValue={k.measureOfSuccess}
                    />
                    </Box>
                    <h4>{k.measureOfSuccess}%</h4>
                </div>
                <button onClick={() => seteditkeyResult(true)}>edit</button>
            </div>}
            { editkeyResult ? <div className="objective-row">
                <div className="objective-column">
                    <p><span style={{color:'red'}}>*</span>Required</p>
                    <input
                        type="text"
                        placeholder="Enter Key result"
                        value={state.keyresult}
                        onChange={(e) => setState({ ...state, keyresult: e.target.value })}
                    />
                </div>
                <div className="objective-column">
                        <p><span style={{color:'red'}}>*</span>Required</p>
                    <div className="objective-slider-row">
                        <Box sx={{ width: 200 }}>
                        <Slider
                            defaultValue={state.measureOfSuccess}
                            onChange={(e) => setState({ ...state, measureOfSuccess: e.target.value })}
                        />
                        </Box>
                        <h4>{state.measureOfSuccess}%</h4>
                    </div>
                </div>
                <button 
                onClick={() => {
                    dispatch(actionCreators.editkeyResult(k.objId, state.keyresult, state.measureOfSuccess, (res) => {
                        if(res.success) {
                            seteditkeyResult(false)
                            setState({
                                keyresult:'',
                                measureOfSuccess:''
                            })
                        }
                    }))
                }}
                >save</button>
                 {editkeyResult ? <button onClick={() => seteditkeyResult(false)}>Cancel</button> : null}
            </div> : null}
        </div>
    )
}

export default Keyresult
