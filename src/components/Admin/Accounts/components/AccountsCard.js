import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Avatar, Row, Divider, Card, Col } from "antd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../Paths";

const AccountsCard = ({ m, toggle, setAssignedStartups }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (arg) => {
    if (arg === "assign") {
      toggle();
      dispatch(actionCreators.setMentor(m));
      setAssignedStartups(m);
      setAnchorEl(null);
    }
    setAnchorEl(null);
  };

  return (
    <Card
      key={m._id}
      style={{ margin: "0.5rem", width: "20rem" }}
      bodyStyle={{ padding: 10 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: "0.5rem",
        }}
      >
        <MoreVertIcon
          id="basic-button"
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          style={{ fontSize: "30px", color: "rgba(0,0,0,0.4)" }}
          onClick={handleMenuClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleMenuClose()}>
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            edit
          </MenuItem>
          {m.userRole === "startup" ? null : (
            <MenuItem onClick={() => handleMenuClose("assign")}>
              <ListItemIcon>
                <EditOutlined />
              </ListItemIcon>
              Assign Startup
            </MenuItem>
          )}
        </Menu>
      </div>
      <Row
        gutter={12}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Avatar
          style={{
            backgroundColor: "#36561b56",
            color: "#37561b",
          }}
          icon={<UserOutlined />}
          // shape="square"
          size={80}
        />
        <div className="acc-card-column">
          <h3>{m.username}</h3>
          <h4>{m.teamCategory}</h4>
        </div>
      </Row>

      <Row className="acc-card-row">
        <div className="acc-centered-column">
          <h4>30mins</h4>
          <p>session mins</p>
        </div>
        <Divider type="vertical" />
        <div className="acc-centered-column">
          <h4>{m.teams.length}</h4>
          <p>Teams</p>
        </div>
        <Divider type="vertical" />
        <div className="acc-centered-column">
          <h4>5 stars</h4>
          <p>Rating</p>
        </div>
      </Row>
    </Card>
  );
};

export default AccountsCard;
