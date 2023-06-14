import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, message } from "antd";
import { actionCreators } from "../../Paths";
import { Helmet } from "react-helmet";
import { Tabs } from "antd";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import Quarter from "./Quarter";
import "./OKROverviewStyles.css";
import moment from "moment";
const OKROverview = () => {
  const { TabPane } = Tabs;
  const { users } = useSelector((state) => state.admin);
  const { objectives, loading } = useSelector((state) => state.requests);
  //   console.log(objectives);
  const [description, setDescription] = React.useState("");
  const [keyResultState, setKeyresultState] = React.useState({
    keyResult: "",
    startDate: "",
  });
  const [objective, setAddObjective] = React.useState(false);
  const [editObjective, setEditObjective] = React.useState(false);
  const [keyResult, setAddKeyresult] = React.useState(false);
  const [editkeyResult, setEditKeyresult] = React.useState(false);
  const [progressBtn, setProgressBtn] = React.useState(false);
  const [activeCardId, setActiveCardId] = React.useState("");
  const [payload, setPayload] = React.useState([]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getObjectives();
    updateObjectives();
  }, []);

  const updateObjectives = () => {
    const newPayload = [
      ...objectives?.map((d) => {
        const { objPercentage, keyresults, ...rest } = d;
        return {
          ...rest,
          objPercentage: objPercentage,
          keyresults: [
            ...keyresults?.map((s) => {
              const { checked, ...keyresult } = s;
              return {
                ...keyresult,
                checked: checked ? checked : false,
              };
            }),
          ],
        };
      }),
    ];
    return setPayload(newPayload);
  };

  const getObjectives = () => dispatch(actionCreators.getObjective());

  const showAddObjective = () => setAddObjective(true);
  const hideAddObjective = () => setAddObjective(false);

  const showEditObjective = (id) => {
    setActiveCardId(id);
    setEditObjective(true);
  };
  const hideEditObjective = () => setEditObjective(false);

  const showEditKeyresult = (id) => {
    setActiveCardId(id);
    setEditKeyresult(true);
  };
  const hideEditKeyresult = () => setEditKeyresult(false);

  const showAddKeyresult = (id) => {
    setActiveCardId(id);
    setAddKeyresult(true);
  };
  const hideAddKeyresult = () => setAddKeyresult(false);

  const showProgressBtn = (id) => {
    setActiveCardId(id);
    setProgressBtn(true);
  };
  const hideProgressBtn = () => setProgressBtn(false);

  const addObjective = () => {
    let quarter;
    if (!description) return message.info("Enter objective description");
    if (
      parseInt(moment(new Date()).format("M")) >= 1 &&
      parseInt(moment(new Date()).format("M")) <= 3
    )
      quarter = 1;
    if (
      parseInt(moment(new Date()).format("M")) >= 4 &&
      parseInt(moment(new Date()).format("M")) <= 6
    )
      quarter = 2;
    if (
      parseInt(moment(new Date()).format("M")) >= 7 &&
      parseInt(moment(new Date()).format("M")) <= 9
    )
      quarter = 3;
    if (
      parseInt(moment(new Date()).format("M")) >= 10 &&
      parseInt(moment(new Date()).format("M")) <= 12
    )
      quarter = 4;

    dispatch(
      actionCreators.addObjective(description, quarter, (res) => {
        const { success, data } = res;
        if (success) {
          setPayload(data);
          setDescription("");
          hideAddObjective();
        }
      })
    );
  };

  const editObjectiveDescription = (id) => {
    dispatch(
      actionCreators.editObjective(id, description, (res) => {
        const { success, data } = res;
        if (success) {
          setPayload(data);
          hideEditObjective();
          setDescription("");
        }
      })
    );
  };

  const deleteObjective = (id) => {
    dispatch(
      actionCreators.deleteObjective(id, (res) => {
        const { success, data } = res;
        if (success) {
          setPayload(data);
        }
      })
    );
  };

  const addkeyResult = (id) => {
    if (!keyResultState.keyResult) return;

    dispatch(
      actionCreators.addkeyResult(
        keyResultState.keyResult,
        keyResultState.startDate,
        id,
        (res) => {
          const { success, data } = res;
          if (success) {
            setPayload(data);
            hideAddKeyresult();
            setKeyresultState({
              keyResult: "",
              startDate: "",
            });
          }
        }
      )
    );
  };

  const editKeyresult = (objId, krId) => {
    dispatch(
      actionCreators.editkeyResult(
        objId,
        krId,
        keyResultState.keyResult,
        keyResultState.startDate,
        (res) => {
          const { success, data } = res;
          if (success) {
            setPayload(data);
            hideEditKeyresult();
            setKeyresultState({
              keyResult: "",
              startDate: "",
            });
          }
        }
      )
    );
  };

  const deleteKeyresult = (objId, krId, objIndex) => {
    let paylod = [...payload];
    const removeKeyresult = paylod[objIndex].keyresults.filter(
      (kr) => kr._id !== krId
    );

    paylod[objIndex] = {
      ...paylod[objIndex],
      keyresults: removeKeyresult,
    };

    paylod[objIndex].objPercentage =
      (paylod[objIndex].keyresults.filter((kr) => kr.checked).length /
        paylod[objIndex].keyresults.length) *
      100;

    setPayload(paylod);
    showProgressBtn(objId);
    console.log(paylod[objIndex]);
  };

  const updateKeyresultsStatus = (objId, krId, objIndex, krIndex) => {
    let paylod = [...payload];

    const keyresult = paylod[objIndex].keyresults[krIndex];

    if (keyresult.checked) {
      paylod[objIndex].keyresults[krIndex] = {
        ...paylod[objIndex].keyresults[krIndex],
        checked: false,
      };
    }

    if (keyresult.checked === false) {
      paylod[objIndex].keyresults[krIndex] = {
        ...paylod[objIndex].keyresults[krIndex],
        checked: true,
      };
    }

    paylod[objIndex].objPercentage =
      (paylod[objIndex].keyresults.filter((kr) => kr.checked).length /
        paylod[objIndex].keyresults.length) *
      100;

    setPayload(paylod);
    showProgressBtn(objId);
    // console.log(paylod[objIndex].keyresults[krIndex]);
  };

  const updateObjectiveProgress = (objId) => {
    const paylod = [...payload];

    const updatedObjective = paylod.find((r) => r._id === objId);

    dispatch(
      actionCreators.updateObjectiveProgress(
        objId,
        !updatedObjective.objPercentage
          ? 0
          : Math.round(updatedObjective.objPercentage),
        updatedObjective.keyresults,
        (res) => {
          const { success, data } = res;
          if (success) {
            setPayload(data);
            hideProgressBtn();
          }
        }
      )
    );
  };

  const quarter2 = payload.filter((el) => el.quarter === 2);

  //   console.log(quarter2);

  return (
    <div className="okroverview-container">
      <Helmet>
        <title>OKRs</title>
      </Helmet>
      <h2>OKRs</h2>
      <Tabs
        style={{ width: "100%" }}
        defaultActiveKey="1"
        centered
        tabBarStyle={{ color: "#37561b" }}
      >
        <TabPane tab="First Quarter" key="1">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              description={description}
              setDescription={setDescription}
              keyResultState={keyResultState}
              setKeyresultState={setKeyresultState}
              addObjective={addObjective}
              addkeyResult={addkeyResult}
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              objective={objective}
              keyResult={keyResult}
              editObjective={editObjective}
              editObjectiveDescription={editObjectiveDescription}
              updateObjectiveProgress={updateObjectiveProgress}
              editkeyResult={editkeyResult}
              editKeyresult={editKeyresult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 1)]}
              loading={loading}
              updateKeyresultsStatus={updateKeyresultsStatus}
            />
          </div>
        </TabPane>
        <TabPane tab="Second Quarter" key="2">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              description={description}
              setDescription={setDescription}
              keyResultState={keyResultState}
              setKeyresultState={setKeyresultState}
              addObjective={addObjective}
              addkeyResult={addkeyResult}
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              objective={objective}
              keyResult={keyResult}
              editObjective={editObjective}
              editObjectiveDescription={editObjectiveDescription}
              updateObjectiveProgress={updateObjectiveProgress}
              editkeyResult={editkeyResult}
              editKeyresult={editKeyresult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 2)]}
              loading={loading}
              updateKeyresultsStatus={updateKeyresultsStatus}
            />
          </div>
        </TabPane>
        <TabPane tab="Third Quarter" key="3">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              description={description}
              setDescription={setDescription}
              keyResultState={keyResultState}
              setKeyresultState={setKeyresultState}
              addObjective={addObjective}
              addkeyResult={addkeyResult}
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              objective={objective}
              keyResult={keyResult}
              editObjective={editObjective}
              editObjectiveDescription={editObjectiveDescription}
              updateObjectiveProgress={updateObjectiveProgress}
              editkeyResult={editkeyResult}
              editKeyresult={editKeyresult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 3)]}
              loading={loading}
              updateKeyresultsStatus={updateKeyresultsStatus}
            />
          </div>
        </TabPane>
        <TabPane tab="Fourth Quarter" key="4">
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "scroll",
              overflow: "auto",
            }}
          >
            <Quarter
              description={description}
              setDescription={setDescription}
              keyResultState={keyResultState}
              setKeyresultState={setKeyresultState}
              addObjective={addObjective}
              addkeyResult={addkeyResult}
              deleteKeyresult={deleteKeyresult}
              deleteObjective={deleteObjective}
              objective={objective}
              keyResult={keyResult}
              editObjective={editObjective}
              editObjectiveDescription={editObjectiveDescription}
              updateObjectiveProgress={updateObjectiveProgress}
              editkeyResult={editkeyResult}
              editKeyresult={editKeyresult}
              activeCardId={activeCardId}
              progressBtn={progressBtn}
              showAddObjective={showAddObjective}
              hideAddObjective={hideAddObjective}
              showAddKeyresult={showAddKeyresult}
              hideAddKeyresult={hideAddKeyresult}
              showEditKeyresult={showEditKeyresult}
              hideEditKeyresult={hideEditKeyresult}
              showEditObjective={showEditObjective}
              hideEditObjective={hideEditObjective}
              objectives={[...payload.filter((r) => r.quarter === 4)]}
              loading={loading}
              updateKeyresultsStatus={updateKeyresultsStatus}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default withRouter(OKROverview);
