import React from "react";
import { Row, Col } from "antd";
import { incrementValue } from "../../utilities/helpers";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Column3 = ({
  input,
  show,
  hide,
  activeList,
  id,
  title,
  placeholderTxt,
  cardName,
  setCardName,
  cards,
  addCard,
  deleteCard,
}) => {
  return (
    <Col span={12}>
      <div className="co1-3">
        <h4>{title}</h4>
        {!cards.length ? (
          <p onClick={() => show(id)}>{placeholderTxt}</p>
        ) : null}
        {cards?.map((c, i) => (
          <div className="col-card" key={c._id}>
            <h5>{i == 0 ? 1 : incrementValue(i)}. </h5>
            <h3>{c.name}</h3>
            <CancelIcon
              style={{
                fontSize: "20px",
                color: "red",
                alignSelf: "flex-start",
              }}
              className="icon"
              onClick={() => deleteCard(id, c._id)}
            />
          </div>
        ))}
        {input && activeList === id ? (
          <input
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        ) : null}
        {input && activeList == id ? (
          <div className="icon-row">
            <CancelIcon
              style={{ fontSize: "20px", color: "#37561b" }}
              onClick={hide}
              className="icon"
            />
            <h5 onClick={() => addCard(id)}>save</h5>
          </div>
        ) : (
          <AddCircleIcon
            style={{ fontSize: "20px", color: "#37561b" }}
            onClick={() => show(id)}
            className="icon"
          />
        )}
      </div>
    </Col>
  );
};

export default Column3;
