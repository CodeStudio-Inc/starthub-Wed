import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import ModalUI from '../../ModalUI'
import { DragDropContext } from 'react-beautiful-dnd'
import CanvasList from './CanvasList'
import CanvasList2 from './CanvasList2'
import svg from '../../../assets/images/spinner.svg'
import DeleteIcon from '@material-ui/icons/Delete'
import ArchiveIcon from '@material-ui/icons/Archive'
import UnarchiveIcon from '@material-ui/icons/Unarchive'
import moment from 'moment'
import Loader from '../../ModalUI/Loader'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'


import './Canvas.css'
const Home = (props) => {

    const [name, setBoardName] = useState('')
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [archive, setArchive] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    const [boardId, setBoardId] = useState('')
    const [boardName, setName] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})

    const Boards = useSelector(state => state.requests.boards)
    const userId = useSelector(state => state.auth.userId)
    const cards = useSelector(state => state.requests.canvas_cards)
    const lists = useSelector(state => state.requests.canvas_lists)
    const username = useSelector(state => state.auth.username)

    const dragdropLoading = useSelector(state => state.requests.loading)

    const page = 'Lean Canvas'

    const filtereBoards = Boards.filter(el => el.boardType === page  && el.archive === false)
    const archivedBoards = Boards.filter(el => el.boardType === page && el.startup === username && el.archive === true)
    const expire = useSelector(state => state.auth.tokenExpiration)
    // console.log(filtereBoards)

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

        

    // const emptyboardarrayCheck = () => {
        // if(filtereBoards && filtereBoards.length === 0) return setName(true)
        current_lean_canvas = filtereBoards && filtereBoards.slice(-1).pop()
        lst = lists && lists.filter(el => el.boardId === current_lean_canvas._id)
        
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
    // } 
    // console.log(lst)


    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setShow(true)
        }
        dispatch(actionCreators.getBoards())
        getLists()
        // emptyboardarrayCheck()
    }, [])


    const getLists = () => dispatch(actionCreators.getListsOnBoard( () => { }))

    const openEditModal = () => setOpen(true)

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

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
            {archive ? 
                <ModalUI>
                     <div className="archive">
                            <div className="archive-header">
                                {deleteError ? <h3>{deleteError}</h3> : <h3>Archived Boards</h3>}
                            </div>
                        {archivedBoards.map(board => (
                            <div style={{width:'100%'}}>
                                <div className="archive-row">
                                    <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                        <UnarchiveIcon  className="close" style={{ fontSize: '25px' }} />
                                        <h4>{board.name}</h4>
                                    </div>
                                    <p> created {moment(board.dateCreated).fromNow()}</p>
                                    <button
                                        onClick={() => dispatch(actionCreators.unarchiveBoard(board._id, (res) => {
                                            if(res.success) setArchive(false)
                                        }))}
                                    >Restore board</button>
                                    {board.creator === userId ? 
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            let boardLists = lists && lists.filter(el => el.boardId === board._id)
                                            if(boardLists.length === 0){
                                                dispatch(actionCreators.deleteBoard(board._id,(res) => {
                                            if(res.success) {
                                                setArchive(false)
                                                setDeleteError('')
                                            }
                                            }))
                                            }
                                            if( boardLists.length > 0) setDeleteError('First delete the lists on the board please!')
                                        }}
                                    >
                                        Permanently Delete Board
                                    </button>
                                    : null}
                                </div>
                                <div className="archive-separator"/>
                            </div>
                        ))}
                        <button onClick={() => setArchive(false)}>Exit</button>
                    </div>
                </ModalUI>
            : null}
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            <div className="canvas-landing-menu">
                {/* <div className="canvases">
                </div>     */}
                    {boardName ? <h1>Your Account has no Lean Canvas, Please contact your Mentor</h1> : <DragDropContext onDragEnd={onDragEnd}>
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
                    </DragDropContext>}
            </div>
            {/* <div className="boards-right-column">
                <div className="boards-right-column-content">
                    <div className="boards-header">
                        <h2>Lean Canvas</h2>
                        {archivedBoards.length > 0 ?
                            <div className="icon-header"  onClick={() => setArchive(true)}>
                                 <ArchiveIcon className="close" style={{ fontSize: '25px' }} />
                                 <p>Archive</p>
                            </div>
                        : null}
                    </div>
                    {loading ? <img src={svg} style={{width:'30px',height:'30px'}}/> :
                        <div className="boards-row">
                            {filtereBoards.map((board, index) => (
                                <div
                                    key={index}
                                    className="board-card"
                                >
                                    <div className="boards-inner-row">
                                        {visible && boardId === board._id ? null : 
                                            <h3
                                            onClick={() => dispatch(actionCreators.createCanvasLists(board._id, (res) => {
                                                if (res.success) {
                                                    props.history.push('/canvas', { data: board })
                                                }
                                            }))} >
                                                {board.name}
                                            </h3>
                                        }
                                        {visible && boardId === board._id ?
                                        <div className="edit-card-row2">
                                            <input
                                                placeholder="Enter Card Title"
                                                value={boardName}
                                                onChange={(e) => setName(e.target.value)}
                                                onKeyUp={(e) => {
                                                    if (e.key === 'Enter') {
                                                    dispatch(actionCreators.updateBoard(board._id, boardName, (res) => {
                                                    if(res.success) {
                                                        setVisible(false)
                                                        setName('')
                                                    }
                                                }))
                                                    }
                                                }}
                                            />
                                            <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                                            <DeleteIcon 
                                            className="close" style={{ fontSize: '25px' }} 
                                            onClick={() => dispatch(actionCreators.archiveBoard(board._id,(res)=>{
                                                if(res.success) {
                                                    setVisible(false)
                                                    setName('')
                                                }
                                            }))}  
                                            />
                                        </div>
                                        : null}
                                        {visible && boardId === board._id ? null : 
                                        <EditIcon 
                                            className="edit-icon" fontSize="small" 
                                            onClick={() => {
                                                setBoardId(board._id)
                                                setVisible(true)
                                            }}/>}
                                    </div>
                                </div>
                                
                            ))}
                            <input
                                className="add-canvas"
                                placeholder="+ Add New Canvas"
                                value={name}
                                onChange={(e) => setBoardName(e.target.value)}
                                onKeyUp={(e) => {
                                            if (e.key === 'Enter') {
                                                dispatch(actionCreators.createBoard(name,username,page,(res) => {
                                                if (res.success) setBoardName('')
                                            }))
                                            }
                                        }}
                            />
                        </div>
                    }
                   
                </div>
            </div> */}
        </div>
    )
}

export default Home
