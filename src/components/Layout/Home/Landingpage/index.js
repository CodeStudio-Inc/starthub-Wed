import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KanbanList from '../dnd/KanbanList'
import { DragDropContext} from 'react-beautiful-dnd'
import * as actionCreators from '../../../store/actionCreators'
import ModalUI from "../../../ModalUI"
import CloseIcon from '@mui/icons-material/Close'
import Statements from './Statements'
import Objective from './Objective'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Diagnostics from './Diagnostics'
import svg from '../../../../assets/images/spinner.svg'
import AdminLandingPage from './AdminLandingPage'
import { List  } from 'react-content-loader'

import './Landing.css'
const Landing = (props) => {

    const [open, setOpen] = useState(false)
    const [expireTime, setexpireTime] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [archive, setArchive] = useState(false)
    const [modal, setModal] = useState(false)
    const [objModal, setobjModal] = useState(false)

    const [state, setState] = useState({
        vision: '',
        mission: '',
        objective:''
    })


    const lists = useSelector(state => state.requests.lists)
    const Boards = useSelector(state => state.requests.boards)
    const userId = useSelector(state => state.auth.userId)
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
    //  console.log(statements,'jj',objectives)

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setexpireTime(true)
        }
        getBoards()
        getLists()
        getStatements()
        getObjectives()
        getUsers()
    },[])

    const dispatch = useDispatch()

    const getBoards = () => dispatch(actionCreators.getBoards())
    const getLists = () => dispatch(actionCreators.getListsOnBoard( () => { }))
    const getStatements = () => dispatch(actionCreators.getStatement())
    const getObjectives = () => dispatch(actionCreators.getObjective())
    const getUsers = () => dispatch(actionCreators.getUsers())

    const openEditModal = () => setOpen(true)
    const openModal = () => setModal(true)

    
    const new_lists = lists.filter(el => el.creator === userId)
    const _boards = Boards.filter(el => el.creator === userId && el.boardType !== 'Lean Canvas')
    const current_board = _boards && _boards.slice(-1).pop()
    const current_boardID = current_board && current_board._id
    const filteredObjs = objectives && objectives.filter(el => el.boardId ===  current_boardID )
    const filteredStatements = statements && statements.filter(el => el.boardId ===  current_boardID )
    // console.log(current_board,'llll')

    const todoLists = lists && lists.filter(el => el.boardId ===  current_boardID && el.archive === false)
    // const archivedtodoLists = lists && lists.filter(el => el.boardId === current_board._id && el.archive === true)
    // console.log(lists,'kk')
    // console.log(loading)

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

                dispatch(actionCreators.cardIndexUpdate(source.droppableId, destination.droppableId,newSrcList, newDestList, () => {
                    getLists()
                } ))
     }

     const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    const addStatement = () => {
        dispatch(actionCreators.addStatement(current_board._id,state.vision, state.mission, (res) => {
            if(res.success) {
                setModal(false)
                setState({
                    vision: '',
                    mission: '',
                })
            }
        }))
    }

    const addObjective = () => {
        dispatch(actionCreators.addObjective(current_board._id,state.objective, (res) => {
            if(res.success) {
                setobjModal(false)
                setState({
                    objective: ''
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
        {objModal ? 
            <ModalUI>
                <div className="create-modal">
                    <div className="create-header">
                        <h3>Create Objective</h3>
                        <CloseIcon 
                            className="create-icon" 
                            style={{ fontSize: '25px', color:'rgba(0,0,0,0.3)' }}
                            onClick={() => setobjModal(false)}
                        />
                    </div>
                    <div className="create-form">
                        <input 
                            type="text"
                            placeholder="Enter objective name"
                            value={state.objective}
                            onChange={(e) => setState({ ...state, objective: e.target.value })}
                        />
                        <button onClick={addObjective}>{loading ? <img src={svg} style={{ width:"30px", height:"30px"}}/> : 'Save'}</button>
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
        {admin ? <AdminLandingPage startups={filtereUsers}/> : 
        <div className="landing-menu">
            <div className="landing-menu-left">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="landing-scroll">
                        
                        {listLoader ? 
                            <List  />
                        :
                        <div style={{width:'100%', display:'flex', alignItems:'flex-start'}}>
                        {todoLists && todoLists.map(l => (
                            <KanbanList
                            key={l._id}
                            listId={l._id}
                            title={l.name}
                            cards={l.cards}
                            boardId={current_board._id}
                            callback={getLists}
                            open={openEditModal}
                            setActiveCard={setActiveCard}
                            // archivedtodoLists={archivedtodoLists}
                            setArchive={setArchive}
                            archive={archive}
                            />
                            ))}
                        </div>
                        }
                    </div>
                </DragDropContext>
                    <Objective objectives={filteredObjs} keyresults={objectives.keyresults} svg={svg}/>
                    {filteredObjs && filteredObjs.length === 3 ? null : <div className="add-objective">
                        <AddBoxIcon onClick={() => setobjModal(true)} className="add-obj-icon" style={{ fontSize: '60px'}} />
                        <p onClick={() => setobjModal(true)}>Click to add new Objective</p>
                    </div>}
            </div>
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
