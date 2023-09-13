import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import ChecklistIcon from "@mui/icons-material/Checklist";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-content-row">
        <GroupsIcon
          style={{ fontSize: "40px", color: "#37561b", marginRight: "1rem" }}
        />
        <h2>Teams</h2>
      </div>
      <ArrowForwardIosIcon
        style={{ fontSize: "25px", color: "rgba(0,0,0,0.3)" }}
      />
    </div>
  );
};

export default Card;
