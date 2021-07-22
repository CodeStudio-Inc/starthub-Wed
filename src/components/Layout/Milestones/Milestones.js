import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import {DragDropContext} from 'react-beautiful-dnd'
import MilestoneList from './MilestoneList'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import ModalUI from '../../ModalUI'
import svg from '../../../assets/images/spinner.svg'

const Milestones = (props) => {
    const [cardName, setCardName] = useState('')
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [activeCard, setActiveCard] = useState({})
    const [onFocus, setOnFocus] = useState(false)
    const [visible, setVisible] = useState(false)

    const loading = useSelector(state => state.requests.loading)
    
    const boardName = props.location.state.data.name
    const boardId = props.location.state.data._id

    const lists = useSelector(state => state.requests.milestone_lists)
    const expire = useSelector(state => state.auth.tokenExpiration)
    const dragdropLoading = useSelector(state => state.requests.loading)

    const todoLists = lists.filter(el => el.boardId === boardId)
    // console.log(todoLists)

    const dispatch = useDispatch()

    const current_date = Date.now()

    useEffect(() => {
        if(current_date >= expire) {
           return setOpen(true)
        }
        getLists()
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
            {open ? <ModalUI>
                <div className="edit-card">
                    <div className="edit-card-row">
                        {/* <p>Create Board</p> */}
                        <CloseIcon onClick={() => setOpen(false)}  className="close" style={{ fontSize: '20px', color:'rgba(0,0,0,0.7)' }} />
                    </div>
                    <div className="edit-card-detail">
                        {!visible ? 
                            <div className="edit-card-row2">
                                <h3>{activeCard && activeCard.name}</h3>
                                <EditIcon className="edit-card-icon" style={{ fontSize: '20px' }} onClick={() => setVisible(true)} />
                            </div>
                            : null
                        }
                        {visible ?
                            <div className="edit-card-row2">
                                <input
                                    placeholder="Text"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                                <button >save</button>
                                <CloseIcon onClick={() => setVisible(false)} className="close" style={{ fontSize: '25px' }} />
                            </div>
                            : null}
                            <h5>Description</h5>
                            <textarea
                                placeholder="Add a more detailed description"
                                onFocus={() => setOnFocus(true)}
                            />
                        {onFocus ? 
                            <div className="edit-description">
                                <button >Save</button>
                                <button onClick={() => setOnFocus(false)}>Cancel</button>
                            </div>
                            : null
                        }
                        <div className="edit-description">
                            <h4>Created:</h4>
                            <h5>12/09/02</h5>
                        </div>
                    </div>
                </div>
            </ModalUI> : null}
            <div className="main-container">
            <div className="right-column-content">
                <div className="cards-right-column-content">
                    <div className="boards-header">
                        <h2>{boardName}</h2>
                        <div className="edit-row">
                            <h5 onClick={() => props.history.goBack()}>Go Back</h5>
                            {/* <AddBoxIcon onClick={() => setOpen(true)} className="add-icon" style={{ fontSize: '40px', color: 'rgba(0, 0, 0, 0.1)' }} /> */}
                        </div>
                    </div>
                    {dragdropLoading ? 
                    <div>
                        <img src={svg} style={{width:'30px',height:'30px'}}/>
                    </div> : null}
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
