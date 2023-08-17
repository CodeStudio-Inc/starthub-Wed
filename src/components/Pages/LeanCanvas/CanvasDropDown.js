import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Dropdown, Menu, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { actionCreators, svg } from "../../Paths";
import { getLastElement } from "../../utilities/helpers";

import LeanModal from "./LeanModal";
const CanvasDropDown = ({
  setCanvasBoardId,
  boardId,
  setBoardName,
  boardName,
  getLists,
  roles,
  userRole,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [name, setName] = React.useState("");

  const { boards, loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const showModal = (title) => {
    setOpenModal(true);
    setModalTitle(title);
  };
  const hideModal = () => setOpenModal(false);

  const addCanvas = () => {
    const data = {
      name,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/create-canvas`,
        data,
        (data) => {
          const { name } = data;
          if (!name) return true;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setBoards(data.boards));
            setName("");
            hideModal();
            getLists();
          }
          if (!success) message.info("Request failed");
        }
      )
    );
  };

  const updateCanvas = () => {
    const data = {
      name,
    };
    dispatch(
      actionCreators.updateItem(
        `catalyzer/update-board/${boardId}`,
        data,
        (data) => {
          const { name } = data;
          if (!name) return true;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setBoards(data.boards));
            setName("");
            hideModal();
            const board = data.boards.find((r) => r._id === boardId);
            setBoardName(board.name);
          }
          if (!success) message.info("Request failed");
        }
      )
    );
  };

  const leanBoards = boards?.filter((r) => r.name !== "OKRs");

  const findBoardId = (name) => {
    setBoardName(name);
    const board = boards?.find((r) => r.name === name);
    return setCanvasBoardId(board._id);
  };

  const menu = (
    <Menu>
      <LeanModal name={name} setName={setName} />
      <Menu.Item disabled key="1">
        Action
      </Menu.Item>
      <Menu.Item
        disabled={roles.includes(userRole) ? true : false}
        onClick={() => showModal("Rename Model")}
        key="2"
      >
        Rename
      </Menu.Item>
      <Divider style={{ margin: 0 }} />
      <Menu.Item
        disabled={roles.includes(userRole) ? true : false}
        onClick={() => showModal("Add New Model")}
        key="3"
      >
        New Model
      </Menu.Item>
      <Divider style={{ margin: 0 }} />
      <Menu.Item disabled key="4">
        Switch Model
      </Menu.Item>
      {leanBoards?.map((r) => (
        <Menu.Item key={r._id} onClick={() => findBoardId(r.name)}>
          {r.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <LeanModal
        title={modalTitle}
        open={openModal}
        closeModal={hideModal}
        updateCanvas={updateCanvas}
        addCanvas={addCanvas}
        loading={loading}
        name={name}
        setName={setName}
      />
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        overlayStyle={{ alignSelf: "flex-start" }}
      >
        <h3 onClick={(e) => e.preventDefault()}>
          {boardName} <DownOutlined />
        </h3>
      </Dropdown>
    </div>
  );
};

export default CanvasDropDown;
