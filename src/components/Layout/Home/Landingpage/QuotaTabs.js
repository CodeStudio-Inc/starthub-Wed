import React from 'react';
import KanbanList from '../dnd/KanbanList';
import { DragDropContext } from 'react-beautiful-dnd';
import Objective from './Objective';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const QuotaTabs = ({
	todoLists,
	current_board,
	onDragEnd,
	getLists,
	openEditModal,
	listLoader,
	objectives,
	quarter1,
	quarter2,
	quarter3,
	quarter4,
	svg,
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
			<TabPane tab="Quarter 1" key="1" className="tab-pane">
				<Objective objectives={quarter1} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective">
						<AddBoxIcon onClick={openQuarter1Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
						<p onClick={openQuarter1Obj}>Click to add new Objective</p>
					</div>
				)}
			</TabPane>
			<TabPane tab="Quarter 2" key="2" className="tab-pane">
				<Objective objectives={quarter2} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective">
						<AddBoxIcon onClick={openQuarter2Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
						<p onClick={openQuarter2Obj}>Click to add new Objective</p>
					</div>
				)}
			</TabPane>
			<TabPane tab="Quarter 3" key="3" className="tab-pane">
				<Objective objectives={quarter3} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective">
						<AddBoxIcon onClick={openQuarter3Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
						<p onClick={openQuarter3Obj}>Click to add new Objective</p>
					</div>
				)}
			</TabPane>
			<TabPane tab="Quarter 4" key="4" className="tab-pane">
				<Objective objectives={quarter4} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective">
						<AddBoxIcon onClick={openQuarter4Obj} className="add-obj-icon" style={{ fontSize: '60px' }} />
						<p onClick={openQuarter4Obj}>Click to add new Objective</p>
					</div>
				)}
			</TabPane>
			<TabPane tab="Todos" key="5">
				<DragDropContext onDragEnd={onDragEnd}>
					<div className="landing-scroll">
						<div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
							{todoLists &&
								todoLists.map((l) => (
									<KanbanList
										key={l._id}
										listId={l._id}
										title={l.name}
										cards={l.cards}
										boardId={current_board._id}
										callback={getLists}
										open={openEditModal}
									/>
								))}
						</div>
					</div>
				</DragDropContext>
			</TabPane>
		</Tabs>
	);
};

export default QuotaTabs;
