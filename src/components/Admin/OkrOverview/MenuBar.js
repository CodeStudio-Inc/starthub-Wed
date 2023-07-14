import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../Paths";
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

const MenuBar = ({ handleOpenDialogue, setPayload }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [year, setYear] = React.useState("");

  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const searchOkrs = (e) => {
    if (!year) return;
    if (e.key === "Enter") {
      dispatch(
        actionCreators.searchItem(`catalyzer/filter?year=${year}`, (res) => {
          const { success, data, error } = res;
          setPayload(data.objs);
          dispatch(actionCreators.setObjectives(data.objs));
          setYear("");
        })
      );
    }
  };

  const openMenu = Boolean(anchorEl);
  const handleMenueClick = (event) => {
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
            <input
              value={year}
              placeholder="enter year to search"
              onKeyUp={(e) => searchOkrs(e)}
              onChange={(e) => setYear(e.target.value)}
              disabled={loading}
            />
            <MoreVertIcon
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              style={{ fontSize: "30px", color: "rgba(0,0,0,0.4)" }}
              onClick={handleMenueClick}
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
              <MenuItem onClick={() => handleMenuClose("add objective")}>
                <ListItemIcon>
                  <PostAddIcon
                    style={{ fontSize: "20px", color: "rgba(0,0,0,0.4)" }}
                  />
                </ListItemIcon>
                add objective
              </MenuItem>
              {/* <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <DownloadIcon
                    style={{ fontSize: "20px", color: "rgba(0,0,0,0.4)" }}
                  />
                </ListItemIcon>
                export
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonAddIcon
                    style={{ fontSize: "20px", color: "rgba(0,0,0,0.4)" }}
                  />
                </ListItemIcon>
                invite
              </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
