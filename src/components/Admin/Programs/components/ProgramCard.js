import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { EditOutlined } from "@ant-design/icons";
import {
  getFirstLetterAfterSpace,
  calculateDaysBetweenDates,
} from "../../../utilities/helpers";
import moment from "moment";

const ProgramCard = ({ id, program }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (arg) => {
    setAnchorEl(null);
  };

  return (
    <div className="project-card" key={id}>
      <div className="project-card-row">
        <div className="project-card-avatar">
          <h1>{getFirstLetterAfterSpace(program.name)}</h1>
        </div>
        <div className="project-card-column">
          <h4>{program.name}</h4>
          <p>4 beneficiaries</p>
          <h5>{calculateDaysBetweenDates(program.duration)} Days Program</h5>
        </div>
      </div>
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
      </Menu>
    </div>
  );
};

export default ProgramCard;
