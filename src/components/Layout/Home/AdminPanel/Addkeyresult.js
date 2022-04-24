import React,{useEffect} from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const Addkeyresult = ({obj,state, dispatch, actionCreators,setState,setaddkeyResult,startupId}) => {

    let controller = new AbortController()

    useEffect(() => {

        return () => {
            controller.abort('Aborting')
        }
    }, [])

    return (
        <div key={obj._id} className="objective-row">
            <div className="objective-column">
                <h3>KeyResult</h3>
                <p><span style={{color:'red'}}>*</span>Required</p>
                <textarea
                    type="text"
                    placeholder="Enter Key result"
                    value={state.keyresult}
                    onChange={(e) => setState({ ...state, keyresult: e.target.value })}
                />
            </div>
            <div className="objective-column">
                <h3>Measure of success</h3>
                    <p><span style={{color:'red'}}>*</span>Required</p>
                <div className="objective-slider-row">
                    <Box sx={{ width: 200 }}>
                    <Slider
                        valueLabelDisplay="auto"
                        size='small'
                        defaultValue={state.measureOfSuccess}
                        onChange={(e) => setState({ ...state, measureOfSuccess: e.target.value })}
                    />
                    </Box>
                    <h4>{state.measureOfSuccess}%</h4>
                </div>
            </div>
            <button 
            onClick={() => {
                    dispatch(actionCreators.addAdminkeyResult(state.keyresult, state.measureOfSuccess.toString(), obj._id, startupId, controller, (res) => {
                    if(res.success) {
                        setaddkeyResult(false)
                        setState({
                            keyresult:'',
                            measureOfSuccess: ''
                        })
                    }
                }))
            }}
            >save</button>
        </div>
    )
}

export default Addkeyresult
