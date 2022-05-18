import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import ModalUI from "../../../ModalUI"
import CloseIcon from '@material-ui/icons/Close'
import Statements from './Statements'
import Diagnostics from './Diagnostics'
import svg from '../../../../assets/images/spinner.svg'
import AdminLandingPage from './AdminLandingPage'
import { List  } from 'react-content-loader'
import QuotaTabs from './QuotaTabs'
import ReactGA from 'react-ga'
import GAEventsTracker from '../../../Hooks/GAEventsTracker'
import ArchiveIcon from '@mui/icons-material/Archive'
import moment from 'moment'

import './Landing.css'
const Landing = (props) => {

    const [open, setOpen] = useState(false)
    const [expireTime, setexpireTime] = useState(false)
    const [activeRow, setActiveRow] = useState({
        rowId: '',
        btnId: 0
    })
    const [archive, setArchive] = useState(false)
    const [modal, setModal] = useState(false)
    const [quarter1Obj, setQuarter1Obj] = useState(false)
    const [quarter2Obj, setQuarter2Obj] = useState(false)
    const [quarter3Obj, setQuarter3Obj] = useState(false)
    const [quarter4Obj, setQuarter4Obj] = useState(false)

    const UseGAEventsTracker = GAEventsTracker("Objectives")
    const UseGAEventsTracker2 = GAEventsTracker("Vision & Mission Statements")

    const [state, setState] = useState({
        vision: '',
        mission: '',
        objective:'',
        quarter:''
    })


    const lists = useSelector(state => state.requests.lists)
    const Boards = useSelector(state => state.requests.boards)
    const userId = useSelector(state => state.auth.userId)
    const username = useSelector(state => state.auth.username)
    const category = useSelector(state => state.auth.category)
    const email = useSelector(state => state.auth.email)
    const _value = useSelector(state => state.requests.values)
    const statements = useSelector(state => state.requests.statements)
    const objectives = useSelector(state => state.requests.objectives)
    const listLoader = useSelector(state => state.requests.loading)
    const loading = useSelector(state => state.requests.loading)
    const users = useSelector(state => state.admin.users)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const admin = useSelector(state => state.auth.admin)

     const filter_value = _value && _value.filter(e => e.creator === userId)
     const filtereUsers = users.filter(el => el.admin === false)
    
    const last_value = filter_value && filter_value.slice(-1).pop()
    // console.log(activeRow,'jj')

    const current_date = Date.now()
    
    useEffect(() => {
        if(category === 'catalyzer') {
            userActivity()
        }
        if(current_date >= expire) {
           return setexpireTime(true)
        }
            getBoards()
            getLists()
            getStatements()
            getObjectives()
            getUsers()
            getValues()
        ReactGA.pageview(window.location.pathname + window.location.search)
        
    },[])


    const dispatch = useDispatch()
    

    const getBoards = () => dispatch(actionCreators.getBoards())
    const getLists = () => dispatch(actionCreators.getListsOnBoard())
    const getStatements = () => dispatch(actionCreators.getStatement())
    const getObjectives = () => dispatch(actionCreators.getObjective())
    const getUsers = () => dispatch(actionCreators.getUsers())
    const userActivity = () => dispatch(actionCreators.userActivity(email,username,userId))
    const getValues = () => dispatch(actionCreators.getValues())

    const openEditModal = () => setOpen(true)
    const openModal = () => setModal(true)
    const adminNavigate = (data) => props.history.push('/admin',{data:data})

    
    const new_lists = lists && lists.filter(el => el.creator === userId)
    const _boards = Boards.filter(el => el.creator === userId && el.boardType !== 'Lean Canvas')
    const current_board = _boards && _boards.slice(-1).pop()
    const current_boardID = current_board && current_board._id
    const filteredStatements = statements && statements.filter(el => el.boardId ===  current_boardID )
    const quarter1 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 1 && el.archive === false)
    const quarter2 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 2 && el.archive === false)
    const quarter3 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 3 && el.archive === false)
    const quarter4 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 4 && el.archive === false)

    const archived = objectives && objectives.filter(el => el.boardId === current_boardID && el.archive === true)
    // console.log(archived)

    const todoLists = lists && lists.filter(el => el.boardId ===  current_boardID && el.archive === false)

    

    const onDragEnd = (result) => {
            const { destination, source, draggableId } = result
            if(!destination){
                return
            }
            
                dispatch(actionCreators.dragCardWithInList(
                    source.droppableId,
                    destination.droppableId,
                    source.index,
                    destination.index,
                    draggableId
                ))

                const newDestList = todoLists.find(el => el._id === destination.droppableId)
                const newSrcList = todoLists.find(el => el._id === source.droppableId)

                dispatch(actionCreators.cardIndexUpdate(source.droppableId, destination.droppableId,newSrcList, newDestList,(res) => {
                    if(res.succes) getLists()
                }))
     }

     const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    const addStatement = () => {
        dispatch(actionCreators.addStatement(current_board._id,state.vision, state.mission, (res) => {
            UseGAEventsTracker2("addStatements", state.vision)
            if(res.success) {
                setModal(false)
                setState({
                    vision: '',
                    mission: '',
                })
            }
        }))
    }

    const checkInput = state.objective !== '' && state.quarter

    const addObjective = () => {
        dispatch(actionCreators.addObjective(current_board._id,state.objective,state.quarter, (res) => {
            UseGAEventsTracker("addObjective", state.objective)
            if(res.success) {
                setQuarter1Obj(false)
                setQuarter2Obj(false)
                setQuarter3Obj(false)
                setQuarter4Obj(false)
                setState({
                    objective: '',
                    quarter:''
                })
            }
        }))
    }

    return (
    <div className="landing-container">
        {expireTime ? 
            <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>
            : null}
            {archive ?
                <ModalUI>
                    <div className="archive-modal">
                        <div className="create-header">
                            <h3>Archive</h3>
                            <CloseIcon
                                className="create-icon"
                                style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
                                onClick={() => setArchive(false) }
                            />
                        </div>
                            {archived.length === 0 ? <h2>No Archived Records</h2>
                            : <div className="archive-container">
                                <table>
                                    <tr>
                                        <td><h3>Objective</h3></td>
                                        <td><h3>Quarter</h3></td>
                                        <td><h3>Created</h3></td>
                                    </tr>
                                {archived.map(a => (
                                    <tr>
                                        <td>{a.description}</td>
                                        <td>{a.quarter}</td>
                                        <td>{moment(a.createdAt).fromNow()}</td>
                                        <td 
                                        style={{ textAlign: 'center' 
                                        }}>
                                            {a._id === activeRow.rowId && activeRow.btnId === 1 && loading ? 
                                            <p style={{ color: '#dfa126', margin:'0'}}>Restoring...</p> : 
                                            <button 
                                            onClick={() => {
                                                    setActiveRow({
                                                        rowId: a._id,
                                                        btnId: 1
                                                    })
                                                    dispatch(actionCreators.archiveObjective(a._id, (res) => {
                                                        console.log(res)
                                                        if (res.succes) {
                                                            setActiveRow({
                                                                rowId: '',
                                                                btnId: 0
                                                            })
                                                        }
                                                    })
                                                    )
                                            }}>
                                                restore
                                            </button>}
                                        </td>
                                        <td 
                                        style={{textAlign:'center'}}
                                        >
                                            {a._id === activeRow.rowId && activeRow.btnId === 2 && loading ?
                                                <p style={{ color: '#dfa126', margin:'0' }}>Deleting...</p> :
                                            <button 
                                            onClick={() => {
                                                    setActiveRow({
                                                        rowId: a._id,
                                                        btnId: 2
                                                    })
                                                    dispatch(actionCreators.deleteObjective(a._id, (res) => {
                                                        if (res.succes) {
                                                            setActiveRow({
                                                                rowId: '',
                                                                btnId: 0
                                                            })
                                                        }
                                                    }))
                                            }}>
                                                delete
                                            </button>}
                                        </td>
                                    </tr>
                                ))}
                                </table>
                            </div>}
                    </div>
                </ModalUI>
            : null}
            {quarter1Obj ? 
            <ModalUI>
                <div className="create-modal">
                    <div className="create-header">
                        <h3>Create Quarter 1 Objective</h3>
                        <CloseIcon 
                            className="create-icon" 
                            style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)' }}
                            onClick={() => {
                                setQuarter1Obj(false)
                                setState({
                                    objective: '',
                                    quarter: ''
                                })
                            }}
                        />
                    </div>
                    <div className="create-form">
                        <input 
                            type="text"
                            placeholder="Enter objective name"
                            value={state.objective}
                            onChange={(e) => setState({ ...state, objective: e.target.value })}
                            onFocus={() => {
                                setState({
                                    quarter: 1
                                })
                            }}
                        />
                            <button 
                                onClick={addObjective} 
                                style={{
                                    background: checkInput ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
                                    color: checkInput ? '#fff' : 'rgba(0,0,0,0.4)'
                                }}
                                disabled={checkInput ? false : true}
                                >
                                    {loading ? <img src={svg} style={{ width:"30px", height:"30px"}}/> : 'Save'}
                            </button>
                    </div>
                </div>
            </ModalUI>
            : null}
            {quarter2Obj ?
                <ModalUI>
                    <div className="create-modal">
                        <div className="create-header">
                            <h3>Create Quarter 2 Objective</h3>
                            <CloseIcon
                                className="create-icon"
                                style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
                                onClick={() => {
                                    setQuarter2Obj(false)
                                    setState({
                                        objective: '',
                                        quarter: ''
                                    })
                                }}
                            />
                        </div>
                        <div className="create-form">
                            <input
                                type="text"
                                placeholder="Enter objective name"
                                value={state.objective}
                                onChange={(e) => setState({ ...state, objective: e.target.value })}
                                onFocus={() => {
                                    setState({
                                        quarter: 2
                                    })
                                }}
                            />
                            <button
                                onClick={addObjective}
                                style={{
                                    background: checkInput ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
                                    color: checkInput ? '#fff' : 'rgba(0,0,0,0.4)'
                                }}
                                disabled={checkInput ? false : true}
                            >
                                {loading ? <img src={svg} style={{ width: "30px", height: "30px" }} /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </ModalUI>
            : null}
            {quarter3Obj ?
                <ModalUI>
                    <div className="create-modal">
                        <div className="create-header">
                            <h3>Create Quarter 3 Objective</h3>
                            <CloseIcon
                                className="create-icon"
                                style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
                                onClick={() => {
                                    setQuarter3Obj(false)
                                    setState({
                                        objective: '',
                                        quarter: ''
                                    })
                                }}
                            />
                        </div>
                        <div className="create-form">
                            <input
                                type="text"
                                placeholder="Enter objective name"
                                value={state.objective}
                                onChange={(e) => setState({ ...state, objective: e.target.value })}
                                onFocus={() => {
                                    setState({
                                        quarter: 3
                                    })
                                }}
                            />
                            <button
                                onClick={addObjective}
                                style={{
                                    background: checkInput ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
                                    color: checkInput ? '#fff' : 'rgba(0,0,0,0.4)'
                                }}
                                disabled={checkInput ? false : true}
                            >
                                {loading ? <img src={svg} style={{ width: "30px", height: "30px" }} /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </ModalUI>
            : null}
            {quarter4Obj ?
                <ModalUI>
                    <div className="create-modal">
                        <div className="create-header">
                            <h3>Create Quarter 4 Objective</h3>
                            <CloseIcon
                                className="create-icon"
                                style={{ fontSize: '25px', color: 'rgba(0,0,0,0.3)' }}
                                onClick={() => {
                                    setQuarter4Obj(false)
                                    setState({
                                        objective: '',
                                        quarter: ''
                                    })
                                }}
                            />
                        </div>
                        <div className="create-form">
                            <input
                                type="text"
                                placeholder="Enter objective name"
                                value={state.objective}
                                onChange={(e) => setState({ ...state, objective: e.target.value })}
                                onFocus={() => {
                                    setState({
                                        quarter: 4
                                    })
                                }}
                            />
                            <button
                                onClick={addObjective}
                                style={{
                                    background: checkInput ? '#cf8e0a' : 'rgba(0,0,0,0.2)',
                                    color: checkInput ? '#fff' : 'rgba(0,0,0,0.4)'
                                }}
                                disabled={checkInput ? false : true}
                            >
                                {loading ? <img src={svg} style={{ width: "30px", height: "30px" }} /> : 'Save'}
                            </button>
                        </div>
                    </div>
                </ModalUI>
            : null}
        {modal ? 
            <ModalUI>
            <div className="create-modal">
                <div className="create-header">
                    <h3>Create Statements</h3>
                    <CloseIcon 
                        className="create-icon" 
                        style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)' }}
                        onClick={() => setModal(false)}
                    />
                </div>
                <div className="create-form">
                    <input 
                        type="text"
                        placeholder="Vision Statement"
                        value={state.vision}
                        onChange={(e) => setState({ ...state, vision: e.target.value })}
                    />
                    <input 
                        placeholder="Mission Statement"
                        type="text"
                        value={state.mission}
                        onChange={(e) => setState({ ...state, mission: e.target.value })}
                    />
                    <button onClick={addStatement}>{loading ? <img src={svg} style={{ width:"30px", height:"30px"}}/> : 'Save'}</button>
                </div>
            </div>
        </ModalUI>: null
        }
        {admin ? <AdminLandingPage startups={filtereUsers} adminNavigate={adminNavigate}/> : 
        <div className="landing-menu">
                    <QuotaTabs
                        todoLists={todoLists}
                        current_board={current_board}
                        onDragEnd={onDragEnd}
                        getLists={getLists}
                        openEditModal={openEditModal}
                        listLoader={listLoader}
                        quarter1={quarter1}
                        quarter2={quarter2}
                        quarter3={quarter3}
                        quarter4={quarter4}
                        svg={svg}
                        openQuarter1Obj={() => setQuarter1Obj(true)}
                        openQuarter2Obj={() => setQuarter2Obj(true)}
                        openQuarter3Obj={() => setQuarter3Obj(true)}
                        openQuarter4Obj={() => setQuarter4Obj(true)}
                    />
                    {archived.length > 0 ? 
                        <div onClick={() => setArchive(true)} className="archive-btn">
                        <ArchiveIcon onClick={() => setArchive(true)} style={{marginRight: '5px'}}/>
                        <h3>Archive</h3>
                        </div> 
                    : null}
            <div className="landing-menu-right">
            <div className="vision-statements">
                {filteredStatements && filteredStatements.length > 0 ? <Statements svg={svg} statements={filteredStatements}/> :
                <div className="vision-mission">
                    <h3>Have you set a Vision and Mission Statement yet?</h3>
                    <button className="vision-btn" onClick={openModal}>Click here to create one</button>
                </div>}
                <Diagnostics last_value={last_value && last_value}/>
            </div>
            </div>
        </div>}
    </div>
)
}

export default Landing
