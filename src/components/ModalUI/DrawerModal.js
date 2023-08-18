import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, Space, Button } from "antd";

const DrawerModal = ({ open, close, title, children }) => {
  return (
    <Drawer
      title={title}
      placement="bottom"
      closeIcon={null}
      onClose={close}
      height={700}
      visible={open}
      bodyStyle={{
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
      }}
      extra={
        <Space>
          <CloseIcon
            onClick={close}
            style={{ fontSize: "25px", color: "rgba(0,0,0,0.2)" }}
          />
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

export default DrawerModal;
