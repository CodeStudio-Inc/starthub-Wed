import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../Paths";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import List1 from "./CanvasLists/List1";
import List2 from "./CanvasLists/List2";
import Navbar from "./modals/Navbar";
import "./StartupStyles.css";
import "../../Pages/LeanCanvas/LeanCanvasStyles.css";
const LeanCanvas = ({ location, history }) => {
  const { boards, lists } = useSelector((state) => state.admin);

  const data = location.state.data;

  const dispatch = useDispatch();

  const getBoards = () => dispatch(actionCreators.getAdminBoard(data?._id));
  const getLists = () => dispatch(actionCreators.getAdminLists(data?._id));

  const canvas_board =
    boards &&
    boards
      .filter((el) => el.boardType === "Lean Canvas" && el.archive === false)
      .at(-1);
  const board_lists =
    lists && lists.filter((el) => el.boardId === canvas_board?._id);

  const problem = board_lists.find((el) => el.name === "Problem");
  const solution = board_lists.find((el) => el.name === "Solution");
  const metrics = board_lists.find((el) => el.name === "Key Metrics");
  const proposition = board_lists.find(
    (el) => el.name === "Unique Value Proposition"
  );
  const advantage = board_lists.find((el) => el.name === "Unfair Advantage");
  const channels = board_lists.find((el) => el.name === "Channels");
  const segments = board_lists.find((el) => el.name === "Customer Segments");
  const revenue = board_lists.find((el) => el.name === "Revenue Streams");
  const cost = board_lists.find((el) => el.name === "Cost Structure");
  const alternatives = board_lists.find(
    (el) => el.name === "Existing Alternatives"
  );
  const concept = board_lists.find((el) => el.name === "High-Level Concept");
  const adoptors = board_lists.find((el) => el.name === "Early Adopters");

  React.useEffect(() => {
    getBoards();
    getLists();
  }, []);

  return (
    <div className="lean-container">
      <Navbar data={data} history={history} />
      <div className="canvas-main">
        <div className="canvas-main-row">
          <div className="canvas-list-list">
            <List1
              key={problem && problem._id}
              listId={problem && problem._id}
              listNumber={problem && problem.listNumber}
              title={problem && problem.name}
              cards={problem && problem.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
            <List1
              key={alternatives && alternatives._id}
              listId={alternatives && alternatives._id}
              title={alternatives && alternatives.name}
              cards={alternatives && alternatives.cards}
              boardId={canvas_board._id}
              callback={getLists}
            />
          </div>
          <div className="canvas-list-list">
            <List1
              key={solution && solution._id}
              listId={solution && solution._id}
              listNumber={solution && solution.listNumber}
              title={solution && solution.name}
              cards={solution && solution.cards}
              boardId={canvas_board._id}
              callback={getLists}
            />
            <div className="canvas-separator" />
            <List1
              key={metrics && metrics._id}
              listId={metrics && metrics._id}
              listNumber={metrics && metrics.listNumber}
              title={metrics && metrics.name}
              cards={metrics && metrics.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
          </div>
          <div className="canvas-list-list">
            <List1
              key={proposition && proposition._id}
              listId={proposition && proposition._id}
              listNumber={proposition && proposition.listNumber}
              title={proposition && proposition.name}
              cards={proposition && proposition.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
            <List1
              key={concept && concept._id}
              listId={concept && concept._id}
              title={concept && concept.name}
              cards={concept && concept.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
          </div>
          <div className="canvas-list-list">
            <List1
              key={advantage && advantage._id}
              listId={advantage && advantage._id}
              listNumber={advantage && advantage.listNumber}
              title={advantage && advantage.name}
              cards={advantage && advantage.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
            <div className="canvas-separator" />
            <List1
              key={channels && channels._id}
              listId={channels && channels._id}
              listNumber={channels && channels.listNumber}
              title={channels && channels.name}
              cards={channels && channels.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
          </div>
          <div className="canvas-list-list">
            <List1
              key={segments && segments._id}
              listId={segments && segments._id}
              listNumber={segments && segments.listNumber}
              title={segments && segments.name}
              cards={segments && segments.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
            <List1
              key={adoptors && adoptors._id}
              listId={adoptors && adoptors._id}
              title={adoptors && adoptors.name}
              cards={adoptors && adoptors.cards}
              boardId={canvas_board?._id}
              callback={getLists}
            />
          </div>
        </div>
        <div className="canvas-main-row">
          <List2
            key={cost && cost._id}
            listId={cost && cost._id}
            listNumber={cost && cost.listNumber}
            title={cost && cost.name}
            cards={cost && cost.cards}
            boardId={canvas_board?._id}
            callback={getLists}
          />
          <List2
            key={revenue && revenue._id}
            listId={revenue && revenue._id}
            listNumber={revenue && revenue.listNumber}
            title={revenue && revenue.name}
            cards={revenue && revenue.cards}
            boardId={canvas_board?._id}
            callback={getLists}
          />
        </div>
      </div>
    </div>
  );
};
export default LeanCanvas;
