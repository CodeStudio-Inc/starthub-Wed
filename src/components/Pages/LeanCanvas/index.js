import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import {
  List1,
  List2,
  actionCreators,
  Loader,
  Menu,
  ModalUI,
  svg,
} from "../../Paths";
import { rearrangelists, setPlaceholderTxt } from "../../utilities/helpers";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { Row, Col, Grid, message } from "antd";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

import Column1 from "./Column1";
import Column2 from "./Column2";
import Column3 from "./Column3";
import "./LeanCanvasStyles.css";
const LeanCanvas = () => {
  const [canvasBoardId, setCanvasBoardId] = React.useState();
  const [archiveId, setArchiveId] = React.useState();
  const [boardName, setBoardName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [cardName, setCardName] = React.useState(" ");
  const [payload, setPayload] = React.useState([]);
  const [input, setInput] = React.useState(false);
  const [activeList, setActiveList] = React.useState("");

  const { boards, canvas_lists, loading } = useSelector(
    (state) => state.requests
  );

  payload.sort((a, b) => a.position - b.position);

  const page = "Lean Canvas";

  const leanBoard = React.useMemo(() => {
    let board = boards.filter(
      (el) => el.boardType === page && el.archive === false
    );
    let archive = boards.filter(
      (el) => el.boardType === page && el.archive === true
    );
    return { board: board, archive: archive };
  }, [boards, canvasBoardId]);

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

  React.useEffect(() => {
    updateObject(canvas_lists);
    setCanvasBoardId(
      leanBoard.board.length === 0 ? null : leanBoard.board.at(-1)._id
    );
    setBoardName(
      leanBoard.board.length === 0 ? null : leanBoard.board.at(-1).name
    );
    dispatch(actionCreators.getBoards());
    getLists();
    ReactGA.pageview(window.location.pathname);
  }, []);

  const updateObject = (arr) => {
    const newPayload = [
      ...arr?.map((r) => {
        const { name, ...rest } = r;
        return {
          ...rest,
          name: name,
          position: rearrangelists(name),
          placeholderTxt: setPlaceholderTxt(name),
        };
      }),
    ];
    return setPayload(newPayload);
  };

  //   console.log(col1);

  const addCard = (listId) => {
    let cardIndex;

    const list = lst.find((l) => l._id === listId);

    if (list.cards.length === 0) cardIndex = 0;
    if (list.cards.length > 0) cardIndex = parseInt(list.cards.length);

    const data = {
      cardIndex,
      name: cardName.trimStart(),
      listId,
    };

    dispatch(
      actionCreators.addItem(
        `catalyzer/card`,
        data,
        (data) => {
          const { cardName } = data;
          if (!cardName) return true;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setCanvasLists(data.lists));
            setCardName("");
            setInput(false);
            updateObject(data.lists);
          }
          if (!success) message.info("Request Failied!");
        }
      )
    );
  };

  const deleteCard = (listId, cardId) => {
    dispatch(
      actionCreators.deleteItem(
        `catalyzer/card?listId=${listId}&cardId=${cardId}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setCanvasLists(data.lists));
            updateObject(data.lists);
          }
          if (!success) message.info("Request Failied!");
        }
      )
    );
  };

  const getLists = () => dispatch(actionCreators.getListsOnBoard(() => {}));

  const archiveBoard = () => {
    if (leanBoard.board.length === 1) return;
    else dispatch(actionCreators.archiveBoard(canvasBoardId));
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
      {loading ? (
        <img src={svg} style={{ height: "30px", width: "30px" }} />
      ) : null}
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
      </Row>
    </div>
  );
};

export default withRouter(LeanCanvas);
