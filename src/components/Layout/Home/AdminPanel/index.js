import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KanbanList from './AdminList'
import { DragDropContext} from 'react-beautiful-dnd'
import * as actionCreators from '../../../store/actionCreators'
import ModalUI from '../../../ModalUI' 
import CloseIcon from '@mui/icons-material/Close'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Objective from '../Landingpage/Objective'
import Statements from '../Landingpage/Statements'
import Diagnostics from '../Landingpage/Diagnostics'
import svg from '../../../../assets/images/spinner.svg'
import { List  } from 'react-content-loader'

import '../Landingpage/Landing.css'
import { style } from '@mui/system'
const AdminPanel = (props) => {

    const [open, setOpen] = useState(false)
    const [expireTime, setexpireTime] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [archive, setArchive] = useState(false)
    const [modal, setModal] = useState(false)
    const [objModal, setobjModal] = useState(false)

    const startupId = props.location.state.data._id
    const username = props.location.state.data.username
    const category = props.location.state.data.category
    // console.log(startupId)

    const lists = useSelector(state => state.admin.lists)
    const Boards = useSelector(state => state.admin.boards)
    const userId = useSelector(state => state.auth.userId)
    const _value = useSelector(state => state.requests.values)
    const statements = useSelector(state => state.admin.statements)
    const objectives = useSelector(state => state.admin.objectives)
    const loading = useSelector(state => state.admin.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const admin = useSelector(state => state.auth.admin)

     const filter_value = _value && _value.filter(e => e.creator === startupId)
    
     const last_value = filter_value && filter_value.slice(-1).pop()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setexpireTime(true)
        }
        getBoards()
        getLists()
        getStatements()
        getObjectives()
    },[])

    const dispatch = useDispatch()

    const openEditModal = () => setOpen(true)
    const openModal = () => setModal(true)

    
    // const new_lists = lists.filter(el => el.creator === startupId)
    const _boards = Boards.filter(el => el.creator === startupId && el.boardType !== 'Lean Canvas')
    const current_board = _boards && _boards.slice(-1).pop()
    const current_boardID = current_board && current_board._id
    const filteredObjs = objectives && objectives.filter(el => el.boardId ===  current_boardID )
    const filteredStatements = statements && statements.filter(el => el.boardId ===  current_boardID )
    
    const getBoards = () => dispatch(actionCreators.getAdminBoard(startupId))
    const getLists = () => dispatch(actionCreators.getAdminLists(startupId ))
    const getStatements = () => dispatch(actionCreators.getAdminStatements(startupId))
    const getObjectives = () => dispatch(actionCreators.getAdminObjectives(startupId))
    
    const todoLists = lists && lists.filter(el => el.creator === startupId && el.boardId ===  current_boardID && el.archive === false)
    // console.log(startupId,'llll')
    // console.log(todoLists,'bbb')


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
            <div className="landing-menu">
                <div className={category === 'internal' ? 'extra' : 'landing-menu-left'}>
                    <h2>{username.toUpperCase()}</h2>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="landing-scroll">
                            {loading ? 
                            <List  /> :
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
                                    setArchive={setArchive}
                                    archive={archive}
                                />
                            ))}
                            </div>}
                        </div>
                    </DragDropContext>
                        <Objective objectives={filteredObjs} keyresults={objectives && objectives.keyresults} svg={svg}/>
                        {/* {filteredObjs && filteredObjs.length === 3 ? null : <div className="add-objective">
                            <AddBoxIcon onClick={() => setobjModal(true)} className="add-obj-icon" style={{ fontSize: '60px'}} />
                            <p >Click to add new Objective</p>
                        </div>} */}
                </div>
                {category === 'internal' ? null : <div className="landing-menu-right">
                <div className="vision-statements">
                    {filteredStatements && filteredStatements.length > 0 ? <Statements svg={svg} statements={filteredStatements}/> :
                    null}
                    {category === 'internal' ? null : <Diagnostics last_value={last_value && last_value}/>}
                </div>
                </div>}
            </div>
        </div>
    )
}

export default AdminPanel
