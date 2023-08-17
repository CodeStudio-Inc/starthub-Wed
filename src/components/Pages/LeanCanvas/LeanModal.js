import React from "react";
import { Modal } from "antd";
const LeanModal = ({
  title,
  open,
  closeModal,
  addCanvas,
  updateCanvas,
  loading,
  name,
  setName,
}) => {
  return (
    <Modal
      title={title}
      centered
      visible={open}
      onOk={title === "Rename Model" ? updateCanvas : addCanvas}
      onCancel={closeModal}
      okText="save"
      confirmLoading={loading}
    >
      <input
        disabled={loading}
        className="modal-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={
          title === "Rename Model" ? "Enter new model name" : "Enter model name"
        }
      />
    </Modal>
  );
};

export default LeanModal;
