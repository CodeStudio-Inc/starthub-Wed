import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KanbanList from '../dnd/KanbanList'
import { DragDropContext} from 'react-beautiful-dnd'
import * as actionCreators from '../../../store/actionCreators'
import ModalUI from '../../../ModalUI' 
import CloseIcon from '@mui/icons-material/Close'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Objectives from '../Landingpage/Objective'
import Statements from '../Landingpage/Statements'
import Diagnostics from '../Landingpage/Diagnostics'
import svg from '../../../../assets/images/spinner.svg'

import '../Landingpage/Landing.css'
const AdminPanel = () => {

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
            <div className="landing-menu">
                <div className="landing-menu-left">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="landing-scroll">
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
                                    archivedtodoLists={archivedtodoLists}
                                    setArchive={setArchive}
                                    archive={archive}
                                />
                            ))}
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
            </div>
        </div>
    )
}

export default AdminPanel
