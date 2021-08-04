import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../../store/actionCreators'
import {DragDropContext} from 'react-beautiful-dnd'
import MilestoneList from './MilestoneList'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../../ModalUI'
import Loader from '../../../ModalUI/Loader'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const Milestones = (props) => {
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [onFocus, setOnFocus] = useState(false)
    const [visible, setVisible] = useState(false)

    // const loading = useSelector(state => state.requests.loading)
    
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id
    const creator = props.location.state.data.creator

    const lists = useSelector(state => state.admin.lists)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const dragdropLoading = useSelector(state => state.requests.loading)

    const todoLists = lists.filter(el => el.creator === creator)
    // console.log(lists)

    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
        getLists()
        dispatch(actionCreators.getAdminLists(creator,boardId,() => { }))
    }, [])

    const handleLogoutClick = () => {
            dispatch(actionCreators.removeUser())
            props.history.push('/')
    }

    const openEditModal = () => setOpen(true)

    const getLists = () => dispatch(actionCreators.getListsOnBoard( () => { }))

    const statements = todoLists.filter(el => el.name.includes('Statement'))
    const Milestones = todoLists.filter(el => el.name.includes('Milestone'))
    // console.log("object", Milestones)

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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {show ? <ModalUI>
                <div className="edit-card">
                    <h5>Session timeout please login again</h5>
                    <button className="session-timeout" onClick={handleLogoutClick}>Login</button>
                </div>
            </ModalUI>: null}
            <div className="main-container">
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <div className="edit-row" onClick={() => props.history.goBack()}>
                            <ArrowBackIcon  style={{ fontSize: '20px', color:'#dfa126' }} />
                            <h5>Board</h5>
                        </div>
                    </div>
                    {dragdropLoading ? <Loader/> : null}
                        <div className="statement-row">
                           {statements.map(l => (
                                <MilestoneList
                                    key={l._id}
                                    listId={l._id}
                                    title={l.name}
                                    cards={l.cards}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                            ))}
                        </div>
                    
                    <div className="milestones-row">
                        {Milestones.map(l => (
                                <MilestoneList
                                    key={l._id}
                                    listId={l._id}
                                    title={l.name}
                                    cards={l.cards}
                                    callback={getLists}
                                    open={openEditModal}
                                    setActiveCard={setActiveCard}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
        </DragDropContext>
    )
}

export default Milestones
