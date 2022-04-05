import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KanbanList from './AdminList'
import { DragDropContext} from 'react-beautiful-dnd'
import * as actionCreators from '../../../store/actionCreators'
import ModalUI from '../../../ModalUI'
import Objective from './AdminObjective'
import Statements from './AdminStatement'
import Diagnostics from '../Landingpage/Diagnostics'
import svg from '../../../../assets/images/spinner.svg'
import QuotaTabs from './QuotaTabs'
import { List  } from 'react-content-loader'

import '../Landingpage/Landing.css'
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
    const base_key = props.location.state.data.base_key
    // console.log(props)

    const lists = useSelector(state => state.admin.lists)
    const Boards = useSelector(state => state.admin.boards)
    const userId = useSelector(state => state.auth.userId)
    const _value = useSelector(state => state.admin.values)
    const statements = useSelector(state => state.admin.statements)
    const objectives = useSelector(state => state.admin.objectives)
    const loading = useSelector(state => state.admin.loading)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const admin = useSelector(state => state.auth.admin)

     const filter_value = _value && _value.filter(e => e.creator === startupId)
    
     const last_value = filter_value && filter_value.slice(-1).pop()

    const current_date = Date.now()

    useEffect(() => {
        if (current_date >= expire) {
           return setexpireTime(true)
        }
        getBoards()
        getLists()
        getStatements()
        getObjectives()
        getValues()
    },[])

    const dispatch = useDispatch()

    const openEditModal = () => setOpen(true)
    const openModal = () => setModal(true)

    const _boards = Boards.filter(el => el.creator === startupId && el.boardType !== 'Lean Canvas')
    const current_board = _boards && _boards.slice(-1).pop()
    const current_boardID = current_board && current_board._id
    const filteredObjs = objectives && objectives.filter(el => el.boardId ===  current_boardID )
    const filteredStatements = statements && statements.filter(el => el.boardId ===  current_boardID )
    const quarter1 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 1)
    const quarter2 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 2)
    const quarter3 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 3)
    const quarter4 = objectives && objectives.filter(el => el.boardId === current_boardID && el.quarter === 4)
    
    const getBoards = () => dispatch(actionCreators.getAdminBoard(startupId))
    const getLists = () => dispatch(actionCreators.getAdminLists(startupId ))
    const getStatements = () => dispatch(actionCreators.getAdminStatements(startupId))
    const getObjectives = () => dispatch(actionCreators.getAdminObjectives(startupId))
    const getValues = () => dispatch(actionCreators.getAdminValues(startupId))
    
    const todoLists = lists && lists.filter(el => el.creator === startupId && el.boardId ===  current_boardID && el.archive === false)
    // console.log(quarter1,'llll')
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
            {category === 'internal' ? null :
            <div className="admin-nav">
                <h2>{username.toUpperCase()}</h2>
                {category === 'academy' ? null :
                <div className="admin-nav-links">
                    <p onClick={() => props.history.push('/admin-canvas',{userId: startupId, user: username,key: base_key })}>Lean canvas</p>
                    <p onClick={() => props.history.push('/admin-metrics',{key: base_key, user: username, userId: startupId})}>Dashboard</p>
                    <p onClick={() => props.history.push('/')}>Startups</p>
                </div>
                }
            </div>}
            <div className="landing-menu">
                <div className={category === 'internal' ? 'extra' : 'landing-menu-left'}>
                    <QuotaTabs
                        todoLists={todoLists}
                        current_board={current_board}
                        onDragEnd={onDragEnd}
                        getLists={getLists}
                        openEditModal={openEditModal}
                        setActiveCard={setActiveCard}
                        setArchive={setArchive}
                        archive={archive}
                        quarter1={quarter1}
                        quarter2={quarter2}
                        quarter3={quarter3}
                        quarter4={quarter4}
                        svg={svg}
                    />
                </div>
                {category === 'internal' ? null : 
                <div className="landing-menu-right">
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
