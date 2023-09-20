import React, { useState } from "react";
import { Button, Modal } from "antd";
import Iframe from "react-iframe";
const ContentModal = ({ isModalOpen, setIsModalOpen, content }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Content Guide"
        visible={isModalOpen}
        footer={null}
        maskClosable={true}
        width="70%"
        onCancel={handleCancel}
      >
        {content?.map((c) => (
          <Iframe
            key={c.link}
            url={c.link}
            width="100%"
            height="500px"
            styles={{ border: "none" }}
            display="block"
            position="relative"
            allow="geolocation 'self' https://www.starthubafrica.com;"
          />
        ))}
      </Modal>
    </>
  );
};
export default ContentModal;
