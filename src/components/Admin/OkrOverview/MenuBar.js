import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../Paths";
import { Button, DatePicker } from "antd";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DownloadIcon from "@mui/icons-material/Download";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MenuBar = ({ handleOpenDialogue, setPayload, userId, activeTab }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [year, setYear] = React.useState("");
  const [date, setDate] = React.useState("");

  const { loading } = useSelector((state) => state.requests);

  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  const searchOkrs = (e) => {
    if (userId) return searchDashboardOkrs(e);
    if (!year) return;
    if (e.key === "Enter") {
      dispatch(
        actionCreators.searchItem(`catalyzer/filter?year=${year}`, (res) => {
          const { success, data, error } = res;
          if (success) {
            setPayload(data.objs);
            dispatch(actionCreators.setObjectives(data.objs));
            setYear("");
          }
        })
      );
    }
  };

  const searchDashboardOkrs = (e) => {
    if (!year) return;
    if (e.key === "Enter") {
      dispatch(
        actionCreators.searchItem(
          `catalyzer/dashboard-okrs?userId=${userId}&year=${year}`,
          (res) => {
            const { success, data, error } = res;
            if (success) {
              setPayload(data.objs);
              dispatch(actionCreators.setObjectives(data.objs));
              setYear("");
            }
          }
        )
      );
    }
  };

  const handleDateOnChange = (date, dateString) => {
    setDate(dateString);
  };

  const searchNotes = (e) => {
    if (!date.length) return;
    dispatch(
      actionCreators.searchItem(
        `catalyzer/filter-notes?startDate=${date[0]}&endDate=${date[1]}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setNotes(data.notes));
          }
        }
      )
    );
  };

  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (arg) => {
    if (arg === "add objective") {
      handleOpenDialogue();
      setAnchorEl(null);
    }
    setAnchorEl(null);
  };

  return (
    <Box className="app-bar-container">
      <AppBar
        position="static"
        style={{ background: "none", marginBottom: "1rem" }}
      >
        <Toolbar className="tool-bar">
          <h1>OKRs</h1>
          <Box className="tool-bar-action-container">
            {activeTab === "5" ? (
              <RangePicker
                style={{ marginRight: "1rem", width: "300px" }}
                onChange={handleDateOnChange}
              />
            ) : (
              <input
                value={year}
                placeholder="year"
                onKeyUp={(e) => searchOkrs(e)}
                onChange={(e) => setYear(e.target.value)}
                disabled={loading}
              />
            )}
            {activeTab === "5" ? (
              <Button onClick={searchNotes}>Filter</Button>
            ) : null}
            {/* {userId ? null : (
              <MoreVertIcon
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                style={{ fontSize: "30px", color: "rgba(0,0,0,0.4)" }}
                onClick={handleMenuClick}
              />
            )} */}
            {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleMenuClose("add objective")}>
                <ListItemIcon>
                  <PostAddIcon
                    style={{ fontSize: "20px", color: "rgba(0,0,0,0.4)" }}
                  />
                </ListItemIcon>
                add objective
              </MenuItem>
            </Menu> */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
