import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import CanvasList from './AdminCanvasList'
import CanvasList2 from './AdminCanvasList2'
import moment from 'moment'
import * as actionCreators from '../../../store/actionCreators'
import Loader from '../../../ModalUI/Loader'
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspace'

import '../../Canvas/Canvas.css'
import './Admin.css'
const AdminCanvas = (props) => {

    const [name, setBoardName] = useState('')
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [archive, setArchive] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    const [boardId, setBoardId] = useState('')
    const [boardName, setName] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})

    const userId = props.location.state.userId
    const username = props.location.state.user
    const base_key = props.location.state.key
    const startupId = props.location.state.userId
    const Boards = useSelector(state => state.admin.boards)
    const lists = useSelector(state => state.admin.lists)
    const dragdropLoading = useSelector(state => state.admin.loading)

    const dispatch = useDispatch()

    const getBoards = () => dispatch(actionCreators.getAdminBoard(userId))
    const getLists = () => dispatch(actionCreators.getAdminLists(userId))

    useEffect(() => {
        getBoards()
        getLists()
    },[])

    const page = 'Lean Canvas'

    let current_lean_canvas,
        lst,
        problem,
        solution,
        metrics,
        proposition,
        advantage,
        channels,
        segments,
        revenue,
        cost,
        alternatives,
        concept,
        adoptors

    const filtereBoards = Boards.filter(el => el.boardType === page  && el.archive === false)
    current_lean_canvas = filtereBoards && filtereBoards.slice(-1).pop()
    lst = lists && lists.filter(el => el.boardId === current_lean_canvas._id)
    // console.log(Boards)

    problem = lst.find(el => el.name === 'Problem')
    solution = lst.find(el => el.name === 'Solution')
    metrics = lst.find(el => el.name === 'Key Metrics')
    proposition = lst.find(el => el.name === 'Unique Value Proposition')
    advantage = lst.find(el => el.name === 'Unfair Advantage')
    channels = lst.find(el => el.name === 'Channels')
    segments = lst.find(el => el.name === 'Customer Segments')
    revenue = lst.find(el => el.name === 'Revenue Streams')
    cost = lst.find(el => el.name === 'Cost Structure')
    alternatives = lst.find(el => el.name === 'Existing Alternatives')
    concept = lst.find(el => el.name === 'High-Level Concept')
    adoptors = lst.find(el => el.name === 'Early Adopters')


    const openEditModal = () => setOpen(true)

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

                const newDestList = lists.find(el => el._id === destination.droppableId)
                const newSrcList = lists.find(el => el._id === source.droppableId)

                dispatch(actionCreators.cardIndexUpdate(source.droppableId, destination.droppableId,newSrcList, newDestList, () => {
                    getLists()
                } ))
     }

    return (
        <div className="canvas-container">
            <div className="admin-navbar">
                <h2>{username.toUpperCase()}</h2>
                <div className="admin-navbar-links">
                    <p onClick={() => props.history.push('/admin-metrics',{key: base_key, user: username, userId: startupId})}>Dashboard</p>
                    <p onClick={() => props.history.push('/')}>Startups</p>
                    <div className="admin-icon-row">
                        <KeyboardBackspaceRoundedIcon 
                        className="admin-navbar-icon"
                        onClick={() => props.history.goBack()} 
                        style={{ fontSize: '25px', color:'#dfa126' }} 
                        />
                        <h4 onClick={() => props.history.goBack()}>back</h4>
                    </div>
                </div>
            </div>
            <div className="admin-canvas-landing-menu">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="canvas-main">
                                {dragdropLoading ? <Loader/> : null}
                            <div className="canvas-main-row">
                                <div className="canvas-list-list">
                                    <CanvasList
                                    key={problem && problem._id}
                                    listId={problem && problem._id}
                                    listNumber={problem && problem.listNumber}
                                    title={problem && problem.name}
                                    cards={problem && problem.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                    <CanvasList
                                    key={alternatives && alternatives._id}
                                    listId={alternatives && alternatives._id}
                                    title={alternatives && alternatives.name}
                                    cards={alternatives && alternatives.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                </div>
                                <div className="canvas-list-list">
                                    <CanvasList
                                    key={solution && solution._id}
                                    listId={solution && solution._id}
                                    listNumber={solution && solution.listNumber}
                                    title={solution && solution.name}
                                    cards={solution && solution.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                <div className="canvas-separator"/>
                                    <CanvasList
                                    key={metrics && metrics._id}
                                    listId={metrics && metrics._id}
                                    listNumber={metrics && metrics.listNumber}
                                    title={metrics && metrics.name}
                                    cards={metrics && metrics.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                </div>
                                <div className="canvas-list-list">
                                <CanvasList
                                    key={proposition && proposition._id}
                                    listId={proposition && proposition._id}
                                    listNumber={proposition && proposition.listNumber}
                                    title={proposition && proposition.name}
                                    cards={proposition && proposition.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                <CanvasList
                                    key={concept && concept._id}
                                    listId={concept && concept._id}
                                    title={concept && concept.name}
                                    cards={concept && concept.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                </div>
                                <div className="canvas-list-list">
                                    <CanvasList
                                    key={advantage && advantage._id}
                                    listId={advantage && advantage._id}
                                    listNumber={advantage && advantage.listNumber}
                                    title={advantage && advantage.name}
                                    cards={advantage && advantage.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                <div className="canvas-separator"/>
                                    <CanvasList
                                    key={channels && channels._id}
                                    listId={channels && channels._id}
                                    listNumber={channels && channels.listNumber}
                                    title={channels && channels.name}
                                    cards={channels && channels.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                </div>
                                <div className="canvas-list-list">
                                    <CanvasList
                                    key={segments && segments._id}
                                    listId={segments && segments._id}
                                    listNumber={segments && segments.listNumber}
                                    title={segments && segments.name}
                                    cards={segments && segments.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                <CanvasList
                                    key={adoptors && adoptors._id}
                                    listId={adoptors && adoptors._id}
                                    title={adoptors && adoptors.name}
                                    cards={adoptors && adoptors.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                </div>
                            </div>
                    
                    
                            <div className="canvas-main-row">
                                <CanvasList2
                                    key={cost && cost._id}
                                    listId={cost && cost._id}
                                    listNumber={cost && cost.listNumber}
                                    title={cost && cost.name}
                                    cards={cost && cost.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                                <CanvasList2
                                    key={revenue && revenue._id}
                                    listId={revenue && revenue._id}
                                    listNumber={revenue && revenue.listNumber}
                                    title={revenue && revenue.name}
                                    cards={revenue && revenue.cards}
                                    boardId={boardId}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                            </div>
                    </div>
                </DragDropContext>
            </div>
        </div>
    )
}

export default AdminCanvas
