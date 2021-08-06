import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import { DragDropContext } from 'react-beautiful-dnd'
import CanvasList from './CanvasList'
import CanvasList2 from './CanvasList2'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../../ModalUI'
import Loader from '../../../ModalUI/Loader'

import '../../Canvas/Canvas.css'
const Canvas = (props) => {

    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [onFocus, setOnFocus] = useState(false)
    const [visible, setVisible] = useState(false)

    const dragdropLoading = useSelector(state => state.requests.loading)
    const lists = useSelector(state => state.admin.lists)
    const expire = useSelector(state => state.auth.tokenExpiration)

    console.log(lists)
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id
    const creator = props.location.state.data.creator

    const problem = lists.find(el => el.name === 'Problem')
    const solution = lists.find(el => el.name === 'Solution')
    const metrics = lists.find(el => el.name === 'Key Metrics')
    const proposition = lists.find(el => el.name === 'Unique Value Proposition')
    const advantage = lists.find(el => el.name === 'Unfair Advantage')
    const channels = lists.find(el => el.name === 'Channels')
    const segments = lists.find(el => el.name === 'Customer Segments')
    const revenue = lists.find(el => el.name === 'Revenue Streams')
    const cost = lists.find(el => el.name === 'Cost Structure')
    const alternatives = lists.find(el => el.name === 'Existing Alternatives')
    const adoptors = lists.find(el => el.name === 'Early Adopters')
    
    // console.log(props, 'ff')

    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setShow(true)
        }
        getLists()
        dispatch(actionCreators.getAdminLists(creator,boardId,() => { }))
    }, [])

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    const getLists = () => dispatch(actionCreators.getListsOnBoard( () => { }))

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
        <div className="main-container">
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            <div className="right-column-canvas-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <ArrowBackIcon className="back-icon"  style={{ fontSize: '20px', color:'#dfa126' }} onClick={() => props.history.goBack()} />
                    </div>
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
                            </div>
                            {/* <CanvasList
                                key={concept && concept._id}
                                listId={concept && concept._id}
                                title={concept && concept.name}
                                cards={concept && concept.cards}
                                boardId={boardId}
                                callback={getLists}
                                open={openEditModal}
                                setActiveCard={setActiveCard}
                            /> */}
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
        </div>
    )
}

export default Canvas
