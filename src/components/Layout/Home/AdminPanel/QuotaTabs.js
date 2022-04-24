import React from 'react'
import KanbanList from './AdminList'
import { DragDropContext } from 'react-beautiful-dnd'
import Objective from './AdminObjective'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { List } from 'react-content-loader'
import { Tabs } from 'antd'

const { TabPane } = Tabs
const QuotaTabs = ({
    todoLists,
    current_board,
    onDragEnd,
    getLists,
    openEditModal,
    setActiveCard,
    setArchive,
    archive,
    listLoader,
    objectives,
    quarter1,
    quarter2,
    quarter3,
    quarter4,
    svg,
    startupId,
    openQuarter1Obj,
    openQuarter2Obj,
    openQuarter3Obj,
    openQuarter4Obj
}) => {
    return (
        <Tabs
            style={{ width: '100%', overflowY: 'scroll', height: '100vh' }}
            defaultActiveKey="1"
            centered
            tabBarStyle={{ color: '#dfa126' }}
        >
            <TabPane tab="Todos" key="1">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="landing-scroll">
                        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
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
                        </div>
                    </div>
                </DragDropContext>
            </TabPane>
            <TabPane tab="Objectives Q1" key="2" className="tab-pane">
                <Objective objectives={quarter1} startupId={startupId} svg={svg} />
                {objectives && objectives.length === 3 ? null :
                    <div className="add-objective">
                        <AddBoxIcon onClick={openQuarter1Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
                        <p onClick={openQuarter1Obj}>Click to add new Objective</p>
                    </div>
                }
            </TabPane>
            <TabPane tab="Objectives Q2" key="3" className="tab-pane">
                <Objective objectives={quarter2} startupId={startupId} svg={svg} />
                {objectives && objectives.length === 3 ? null :
                    <div className="add-objective">
                        <AddBoxIcon onClick={openQuarter2Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
                        <p onClick={openQuarter2Obj}>Click to add new Objective</p>
                    </div>
                }
            </TabPane>
            <TabPane tab="Objectives Q3" key="4" className="tab-pane">
                <Objective objectives={quarter3} startupId={startupId} svg={svg} />
                {objectives && objectives.length === 3 ? null :
                    <div className="add-objective">
                        <AddBoxIcon onClick={openQuarter3Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
                        <p onClick={openQuarter3Obj}>Click to add new Objective</p>
                    </div>
                }
            </TabPane>
            <TabPane tab="Objectives Q4" key="5" className="tab-pane">
                <Objective objectives={quarter4} startupId={startupId} svg={svg} />
                {objectives && objectives.length === 3 ? null :
                    <div className="add-objective">
                        <AddBoxIcon onClick={openQuarter4Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
                        <p onClick={openQuarter4Obj}>Click to add new Objective</p>
                    </div>
                }
            </TabPane>
        </Tabs>
    )
}

export default QuotaTabs
