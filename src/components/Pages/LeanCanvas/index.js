import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import {
  actionCreators,
  Loader,
  ModalUI,
  svg,
  StartupNavbar,
} from "../../Paths";
import {
  rearrangelists,
  setPlaceholderTxt,
  getLastElement,
} from "../../utilities/helpers";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Row, Col, Grid, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

import Column1 from "./Column1";
import Column2 from "./Column2";
import Column3 from "./Column3";
import CanvasDropDown from "./CanvasDropDown";
import "./LeanCanvasStyles.css";
const LeanCanvas = ({ location, history }) => {
  const [canvasBoardId, setCanvasBoardId] = React.useState();
  const [boardName, setBoardName] = React.useState();
  const [archiveId, setArchiveId] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [cardName, setCardName] = React.useState(" ");
  const [payload, setPayload] = React.useState([]);
  const [input, setInput] = React.useState(false);
  const [activeList, setActiveList] = React.useState("");

  const { boards, canvas_lists, loading } = useSelector(
    (state) => state.requests
  );
  const { userRole } = useSelector((state) => state.auth);

  const data = location.state?.data;
  const userId = data?._id;

  console.log(canvas_lists);

  const roles = ["team member", "team lead"];

  payload?.sort((a, b) => a.position - b.position);

  const page = "Lean Canvas";

  let lst, col1, col2, col3, col4, col5, col6;

  lst = payload?.filter((el) => el.boardId === canvasBoardId);

  col1 = lst.filter(
    (el) => el.name === "Problem" || el.name === "Existing Alternatives"
  );
  col2 = lst.filter(
    (el) => el.name === "Solution" || el.name === "Key Metrics"
  );
  col3 = lst.filter(
    (el) =>
      el.name === "Unique Value Proposition" || el.name === "High-Level Concept"
  );
  col4 = lst.filter(
    (el) => el.name === "Unfair Advantage" || el.name === "Channels"
  );
  col5 = lst.filter(
    (el) => el.name === "Customer Segments" || el.name === "Early Adopters"
  );
  col6 = lst.filter(
    (el) => el.name === "Cost Structure" || el.name === "Revenue Streams"
  );

  const show = (id) => {
    setInput(true);
    setActiveList(id);
  };
  const hide = () => {
    setInput(false);
    setActiveList(" ");
  };

  const dispatch = useDispatch();

  const leanBoards = boards?.filter((r) => r.name !== "OKRs");

  React.useEffect(() => {
    if (typeof data !== "undefined") {
      // updateObject(canvas_lists);
      dashboardBoards();
      dashboardLists();
      setCanvasBoardId(getLastElement(leanBoards)?._id);
      setBoardName(getLastElement(leanBoards)?.name);
    } else {
      // updateObject(canvas_lists);
      setCanvasBoardId(getLastElement(leanBoards)?._id);
      setBoardName(getLastElement(leanBoards)?.name);
      getBoards();
      getLists();
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  // const updateObject = (arr) => {
  //   const newPayload = [
  //     ...arr?.map((r) => {
  //       const { name, ...rest } = r;
  //       return {
  //         ...rest,
  //         name: name,
  //         position: rearrangelists(name),
  //         placeholderTxt: setPlaceholderTxt(name),
  //       };
  //     }),
  //   ];
  //   return setPayload(newPayload);
  // };

  // const addCard = (listId) => {
  //   let cardIndex;

  //   const list = lst.find((l) => l._id === listId);

  //   if (list.cards.length === 0) cardIndex = 0;
  //   if (list.cards.length > 0) cardIndex = parseInt(list.cards.length);

  //   const data = {
  //     cardIndex,
  //     name: cardName.trimStart(),
  //     listId,
  //   };

  //   dispatch(
  //     actionCreators.addItem(
  //       `catalyzer/card`,
  //       data,
  //       (data) => {
  //         const { cardName } = data;
  //         if (!cardName) return true;
  //         else return true;
  //       },
  //       (res) => {
  //         const { success, data, error } = res;
  //         if (success) {
  //           dispatch(actionCreators.setCanvasLists(data.lists));
  //           setCardName("");
  //           setInput(false);
  //           updateObject(data.lists);
  //         }
  //         if (!success) message.info("Request Failied!");
  //       }
  //     )
  //   );
  // };

  // const deleteCard = (listId, cardId) => {
  //   dispatch(
  //     actionCreators.deleteItem(
  //       `catalyzer/card?listId=${listId}&cardId=${cardId}`,
  //       (res) => {
  //         const { success, data, error } = res;
  //         if (success) {
  //           dispatch(actionCreators.setCanvasLists(data.lists));
  //           updateObject(data.lists);
  //         }
  //         if (!success) message.info("Request Failied!");
  //       }
  //     )
  //   );
  // };

  const getBoards = () =>
    dispatch(
      actionCreators.getItem(`catalyzer/boards`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setBoards(data.boards));
        }
        if (!success) message.info("Request Failied!");
      })
    );

  const getLists = () =>
    dispatch(
      actionCreators.getItem(`catalyzer/lists`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setCanvasLists(data.lists));
          // updateObject(data.lists);
          console.log(data.lists, "lean request");
        }
        if (!success) message.info("Request Failied!");
      })
    );

  const dashboardBoards = () => {
    dispatch(
      actionCreators.getItem(`admin/boards/${userId}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setBoards(data.boards));
        }
        if (!success) message.info("Request Failied!");
      })
    );
  };

  const dashboardLists = () => {
    dispatch(
      actionCreators.getItem(`admin/lists/${userId}`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setCanvasLists(data.lists));
          // updateObject(data.lists);
        }
        if (!success) message.info("Request Failied!");
      })
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    dispatch(
      actionCreators.dragCardWithInList(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );

    const newDestList = canvas_lists.find(
      (el) => el._id === destination.droppableId
    );
    const newSrcList = canvas_lists.find((el) => el._id === source.droppableId);

    dispatch(
      actionCreators.cardIndexUpdate(
        source.droppableId,
        destination.droppableId,
        newSrcList,
        newDestList,
        () => {
          getLists();
        }
      )
    );
  };
  return (
    <div className="canvas-container">
      <Helmet>
        <title>Lean Canvas</title>
      </Helmet>
      {roles.includes(userRole) ? (
        <StartupNavbar data={data} history={history} />
      ) : null}
      {roles.includes(userRole) ? <div style={{ marginTop: "2rem" }} /> : null}
      {/* <div className="lean-header-container">
        <CanvasDropDown
          setCanvasBoardId={setCanvasBoardId}
          boardId={canvasBoardId}
          setBoardName={setBoardName}
          boardName={boardName}
          getLists={getLists}
          roles={roles}
          userRole={userRole}
        />
        {loading ? (
          <img src={svg} style={{ height: "30px", width: "30px" }} />
        ) : null}
      </div>
      <Row gutter={[16, 16]} className="row">
        <Col>
          <div className="col-1">
            {col1.map((r) => (
              <Column1
                key={r._id}
                id={r._id}
                title={r.name}
                placeholderTxt={r.placeholderTxt}
                input={input}
                show={show}
                hide={hide}
                activeList={activeList}
                cardName={cardName}
                cards={r.cards}
                setCardName={setCardName}
                addCard={addCard}
                deleteCard={deleteCard}
              />
            ))}
          </div>
        </Col>
        <Col>
          {col2.map((r) => (
            <Column2
              key={r._id}
              id={r._id}
              title={r.name}
              placeholderTxt={r.placeholderTxt}
              input={input}
              show={show}
              hide={hide}
              activeList={activeList}
              cardName={cardName}
              setCardName={setCardName}
              cards={r.cards}
              addCard={addCard}
              deleteCard={deleteCard}
            />
          ))}
        </Col>
        <Col>
          <div className="col-1">
            {col3.map((r) => (
              <Column1
                key={r._id}
                id={r._id}
                title={r.name}
                placeholderTxt={r.placeholderTxt}
                input={input}
                show={show}
                hide={hide}
                activeList={activeList}
                cardName={cardName}
                setCardName={setCardName}
                cards={r.cards}
                addCard={addCard}
                deleteCard={deleteCard}
              />
            ))}
          </div>
        </Col>
        <Col>
          {col4.map((r) => (
            <Column2
              key={r._id}
              id={r._id}
              title={r.name}
              placeholderTxt={r.placeholderTxt}
              input={input}
              show={show}
              hide={hide}
              activeList={activeList}
              cardName={cardName}
              setCardName={setCardName}
              cards={r.cards}
              addCard={addCard}
              deleteCard={deleteCard}
            />
          ))}
        </Col>
        <Col>
          <div className="col-1">
            {col5.map((r) => (
              <Column1
                key={r._id}
                id={r._id}
                title={r.name}
                placeholderTxt={r.placeholderTxt}
                input={input}
                show={show}
                hide={hide}
                activeList={activeList}
                cardName={cardName}
                setCardName={setCardName}
                cards={r.cards}
                addCard={addCard}
                deleteCard={deleteCard}
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="row">
        {col6.map((r) => (
          <Column3
            key={r._id}
            id={r._id}
            title={r.name}
            placeholderTxt={r.placeholderTxt}
            input={input}
            show={show}
            hide={hide}
            activeList={activeList}
            cardName={cardName}
            setCardName={setCardName}
            cards={r.cards}
            addCard={addCard}
            deleteCard={deleteCard}
          />
        ))}
      </Row> */}
    </div>
  );
};

export default withRouter(LeanCanvas);
