import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs } from "antd";
import { Table } from "antd";
import moment from "moment";
import { actionCreators, ModalUI, svg } from "../../../Paths";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EventNoteIcon from "@mui/icons-material/EventNote";

import Objective from "./Objective";
import NewObjective from "../modals/NewObjective";
import Navbar from "../modals/Navbar";
import "../StartupStyles.css";
import "../../../Pages/OKRs/OKRStyles.css";
const OKRs = ({ location, history }) => {
  const { TabPane } = Tabs;

  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [rowId, setRowId] = React.useState("");
  const [message, setMessage] = React.useState(false);
  const [state, setState] = React.useState({
    description: "",
    quarter: "",
    keyresult: "",
    measureOfSuccess: 0,
  });
  const [dates, setDates] = React.useState({
    year: "",
  });

  const { objectives, loading, boards } = useSelector((state) => state.admin);
  const board_id = boards && boards.at(-1)?._id;

  const data = location.state.data;

  const dispatch = useDispatch();

  const getObjectives = () =>
    dispatch(actionCreators.getAdminObjectives(data?._id));
  const filterAdminObjectives = () =>
    dispatch(actionCreators.filterAdminObjectives(dates.year, data?._id));

  React.useEffect(() => {
    getObjectives();
  }, []);

  const addObjective = () => {
    if (!state.description || !state.quarter)
      return setMessage("Invalid Entries");
    dispatch(
      actionCreators.addAdminObjectives(
        data?._id,
        board_id,
        state.description,
        state.quarter,
        (res) => {
          setState({
            description: "",
            quarter: "",
          });
          if (res.success) return setMessage("Objective Added");
          if (!res.success) return setMessage("Error while adding objective");
        }
      )
    );
  };
  const addKeyresult = () => {
    if (!state.keyresult || !rowId) return alert("Invalid Entries");
    setLoader(true);
    dispatch(
      actionCreators.addAdminkeyResult(
        data?._id,
        state.keyresult,
        state.measureOfSuccess,
        rowId,
        (res) => {
          setLoader(false);
          setState({
            keyresult: "",
            measureOfSuccess: 0,
          });
          if (!res.success) return alert("Error while adding objective");
        }
      )
    );
  };

  const quarter1 = objectives.filter((e) => e.quarter === 1);
  const quarter2 = objectives.filter((e) => e.quarter === 2);
  const quarter3 = objectives.filter((e) => e.quarter === 3);
  const quarter4 = objectives.filter((e) => e.quarter === 4);

  const AddObjectiveBtn = () => {
    return (
      <div className="add-objective" onClick={() => setOpen(true)}>
        <EventNoteIcon className="add-obj-icon" style={{ fontSize: "30px" }} />
        <h4>Add objective</h4>
      </div>
    );
  };

  return (
    <div className="admin-okrs-container">
      {open ? (
        <ModalUI setClose={setOpen}>
          <NewObjective
            state={state}
            setState={setState}
            setOpen={setOpen}
            loading={loading}
            svg={svg}
            addObjective={addObjective}
            message={message}
          />
        </ModalUI>
      ) : null}
      <Navbar data={data} history={history} />
      <div className="objective-table-row">
        <h3>Objective Keyresults</h3>
        <div className="admin-filter-row">
          <div className="admin-filter-input-row">
            {/* <h4>Enter Year</h4> */}
            <input
              placeholder="enter year"
              type="text"
              value={dates.year}
              onChange={(e) => setDates({ ...dates, year: e.target.value })}
            />
          </div>
          {loading ? (
            <img style={{ height: "20px", width: "20px" }} src={svg} />
          ) : (
            <button onClick={filterAdminObjectives}>search</button>
          )}
        </div>
        {/* <div
					className="objective-add-startup-button"
					onClick={() => {
						setOpen(true);
						setMessage('');
					}}
				>
					<ControlPointIcon style={{ fontSize: '20px', color: '#fff', marginRight: '0.5rem' }} />
					<p>New Objective</p>
				</div> */}
      </div>
      <Tabs
        style={{ width: "100%", overflowY: "scroll", height: "100vh" }}
        defaultActiveKey="1"
        centered
        tabBarStyle={{ color: "#37561b" }}
      >
        <TabPane tab="Quarter 1" key="1">
          <Objective objectives={quarter1} svg={svg} userId={data._id} />
          <AddObjectiveBtn />
        </TabPane>
        <TabPane tab="Quarter 2" key="2">
          <Objective objectives={quarter2} svg={svg} userId={data._id} />
          <AddObjectiveBtn />
        </TabPane>
        <TabPane tab="Quarter 3" key="3">
          <Objective objectives={quarter3} svg={svg} userId={data._id} />
          <AddObjectiveBtn />
        </TabPane>
        <TabPane tab="Quarter 4" key="4">
          <Objective objectives={quarter4} svg={svg} userId={data._id} />
          <AddObjectiveBtn />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OKRs;
