import React from 'react';
import { KanbanList } from '../../Paths';
import { DragDropContext } from 'react-beautiful-dnd';
import Objective from './Objective';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const QuarterTabs = ({
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
	setObjective
}) => {
	return (
		<Tabs style={{ width: '100%' }} defaultActiveKey="1" centered tabBarStyle={{ color: '#37561b' }}>
			<TabPane tab="Quarter 1" key="1" className="tab-pane">
				<Objective objectives={quarter1} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective" onClick={() => setObjective(true)}>
						<EventNoteIcon className="add-obj-icon" style={{ fontSize: '30px' }} />
						<h4>Add objective</h4>
					</div>
				)}
			</TabPane>
			<TabPane tab="Quarter 2" key="2" className="tab-pane">
				<Objective objectives={quarter2} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective" onClick={() => setObjective(true)}>
						<EventNoteIcon className="add-obj-icon" style={{ fontSize: '30px' }} />
						<h4>Add objective</h4>
					</div>
				)}
			</TabPane>
			<TabPane tab="Quarter 3" key="3" className="tab-pane">
				<Objective objectives={quarter3} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective" onClick={() => setObjective(true)}>
						<EventNoteIcon className="add-obj-icon" style={{ fontSize: '30px' }} />
						<h4>Add objective</h4>
					</div>
				)}
			</TabPane>
			<TabPane tab="Quarter 4" key="4" className="tab-pane">
				<Objective objectives={quarter4} svg={svg} />
				{objectives && objectives.length === 3 ? null : (
					<div className="add-objective" onClick={() => setObjective(true)}>
						<EventNoteIcon className="add-obj-icon" style={{ fontSize: '30px' }} />
						<h4>Add objective</h4>
					</div>
				)}
			</TabPane>
			<TabPane tab="Todos" key="5">
				<DragDropContext onDragEnd={onDragEnd}>
					<div className="landing-scroll">
						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'flex-start',
								justifyContent: 'center'
							}}
						>
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

export default QuarterTabs;
