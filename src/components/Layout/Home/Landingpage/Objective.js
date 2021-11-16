import React,{useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import * as actionCreators from '../../../store/actionCreators'
import Keyresult from './Keyresult'
import Addkeyresult from './Addkeyresult'

const Objective = ({objectives, svg, keyresults}) =>  {

    const [addkeyResult,setaddkeyResult] = useState(false)
    const [editObjective, seteditObjetive] = useState(false)
    const [activeObj,setactiveObj] = useState('')

    const loading = useSelector(state => state.requests.loading)

    const [state, setState] = useState({
        keyresult:'',
        measureOfSuccess: 0,
        objective:''
    })

    const dispatch = useDispatch()

    // console.log(state.measureOfSuccess)


    return (
        <div  className="objective-bg">
            {objectives && objectives.map((obj, index) => (
                <div key={index} className="objective">
                    <div className="objective-header">
                        <p>Objective {index >= 0 ? index + 1 : null}</p>
                    </div>
                        <div className="objective-description">
                            {editObjective && obj._id === activeObj ? 
                            <input
                                type="text"
                                placeholder="Enter new Objective"
                                value={state.objective}
                                onChange={(e) => setState({ ...state, objective: e.target.value })}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter' && state.objective) {
                                        dispatch(actionCreators.editObjective(obj._id, state.objective, (res) => {
                                            if(res.success) {
                                                seteditObjetive(false)
                                                setState({
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
                                    seteditObjetive(true)
                                }} 
                            />}
                            {editObjective && obj._id === activeObj ? <CancelIcon onClick={() => seteditObjetive(false)} className="edit-stmt-icon" style={{ fontSize: '20px'}} /> : null}
                            {loading && obj._id === activeObj ? <img src={svg} style={{ width:"30px", height:"30px"}}/> : null}
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
