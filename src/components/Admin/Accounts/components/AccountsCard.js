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

const AccountsCard = ({ m, toggle }) => {
  const [email, setEmail] = React.useState(m.email);
  const [username, setUsername] = React.useState(m.username);
  const [edit, setEdit] = React.useState(false);
  const [activeCard, setActiveCard] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { loading } = useSelector((state) => state.requests);

  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const toggleEdit = () => setEdit(!edit);

  const handleMenuClick = (event) => {
    setEdit(false);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (arg) => {
    if (arg === "assign") {
      toggle();
      dispatch(actionCreators.setMentor(m));
      setAnchorEl(null);
    }
    setAnchorEl(null);
  };

  const handleEditUser = (id) => {
    toggleEdit();
    setActiveCard(id);
    setAnchorEl(null);
  };

  const handleUpdateUser = () => {
    const data = {
      email,
      username,
    };
    dispatch(
      actionCreators.updateItem(
        `/auth/update-user/${activeCard}`,
        data,
        (data) => {
          const { email, username } = data;
          if (!email || !username) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setUsers(data.users));
            // console.log(data.users);
            setEdit(false);
          }
        }
      )
    );
  };

  return (
    <Card
      key={m._id}
      style={{ margin: "0.5rem", width: "25rem" }}
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
          disabled={loading}
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
          <MenuItem onClick={() => handleEditUser(m._id)}>
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
        {edit && activeCard === m._id ? (
          <div className="acc-card-column">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              onFocus={() => setActiveCard(m._id)}
              disabled={loading}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setActiveCard(m._id)}
              disabled={loading}
            />
            <p disabled={loading} onClick={handleUpdateUser}>
              {loading ? "updating" : "save"}
            </p>
          </div>
        ) : (
          <div className="acc-card-column">
            <h3>{m.username}</h3>
            <h4>{m.email}</h4>
          </div>
        )}
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
