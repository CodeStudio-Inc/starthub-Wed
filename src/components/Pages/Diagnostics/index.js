import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../Paths";
import { message } from "antd";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Checkbox from "@mui/material/Checkbox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import GroupsIcon from "@mui/icons-material/Groups";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import ContentModal from "./ContentModal";
import { steps } from "../../utilities/json";
import { getCurrentQuarter } from "../../utilities/helpers";

export default function DiagnosticsTools() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState([]);
  const [checked, setChecked] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { payload } = useSelector((state) => state.diagnostics);
  const { category, userRole } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  // set user diagnostics
  React.useEffect(() => {
    const categories = ["SheTechs", "OIP"];
    let paylod;
    if (!payload.length) {
      if (!categories.includes(category)) {
        paylod = steps.filter((r) => r.title !== "Co-creation with partners");
        return dispatch(actionCreators.diagnosticsPayload(paylod));
      }
      dispatch(actionCreators.diagnosticsPayload(steps));
    }
  }, [steps]);

  const maxSteps = payload.length;

  const handleChange = (id, i) => {
    const totalTasks = payload[activeStep].tasks.length;
    payload[activeStep].tasks[i] = {
      ...payload[activeStep].tasks[i],
      status: !payload[activeStep].tasks[i].status,
    };
    let totalCheckTasks = payload[activeStep].tasks.filter((t) => t.status);
    const percentageCovered = (totalCheckTasks.length / totalTasks) * 100;
    payload[activeStep] = {
      ...payload[activeStep],
      score: Math.round(percentageCovered),
    };
    dispatch(actionCreators.diagnosticsPayload(payload));
  };

  const handleNext = () => {
    dispatch(
      actionCreators.addDiagnostics(payload, (res) => {
        const { success } = res;
        if (success) message.info("progress saved!");
      })
    );
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFinish = () => {
    dispatch(
      actionCreators.addDiagnostics(payload, (res) => {
        const { success } = res;
        if (success) message.info("Results submitted!");
      })
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const setDiagnosticIcons = (icon) => {
    switch (icon) {
      case "partners":
        return (
          <GroupsIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "team":
        return (
          <GroupsIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "value":
        return (
          <VolunteerActivismIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "product":
        return (
          <TipsAndUpdatesIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "sales":
        return (
          <CurrencyExchangeIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "finance":
        return (
          <MonetizationOnIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "operations":
        return (
          <ManageAccountsIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      case "compliance":
        return (
          <ListAltIcon
            style={{
              fontSize: "40px",
              color: "#91d4a1",
              marginRight: "0.5rem",
            }}
          />
        );
      default:
        break;
    }
  };

  const handleAddObjective = () => {
    const quarter = getCurrentQuarter();
    const data = {
      description,
      quarter,
      category,
      userRole,
    };
    dispatch(
      actionCreators.addItem(
        `catalyzer/objective`,
        data,
        (data) => {
          const { description } = data;
          if (!description) return false;
          else return true;
        },
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setObjectives(data.objs));
            message.info("Task successfully added to objectives");
            setAnchorEl(null);
            setDescription("");
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event, step) => {
    setAnchorEl(event.currentTarget);
    setDescription(step.task);
    setContent(step?.content);
  };

  const handleMenuClose = (arg) => setAnchorEl(null);

  const handleShowContentModal = () => {
    setIsModalOpen(true);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <Box
        sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
      >
        {setDiagnosticIcons(payload[activeStep]?.icon)}
        <h2 style={{ margin: "0", color: "#91d4a1" }}>
          {payload[activeStep]?.title}
        </h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          width: "90%",
        }}
      >
        {payload[activeStep]?.tasks
          ?.sort((a, b) => a.id - b.id)
          .map((t, i) => (
            <Card
              key={t.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                margin: "0.5rem",
                padding: "0.3rem",
                backgroundColor: t.status ? "#91d4a1" : "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // height: "80vh",
                }}
              >
                <Checkbox
                  color="success"
                  checked={t.status}
                  onChange={() => handleChange(t.id, i)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <h4 style={{ color: t.status ? "#37561b" : "black" }}>
                  {t.task}
                </h4>
              </Box>
              <MoreVertIcon
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                style={{ fontSize: "30px", color: "rgba(0,0,0,0.4)" }}
                onClick={(e) => handleMenuClick(e, t)}
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
                <MenuItem onClick={handleAddObjective} disabled={loading}>
                  <ListItemIcon>
                    <BookmarkAddIcon
                      style={{ fontSize: "20px", color: "rgba(0,0,0,0.3)" }}
                    />
                  </ListItemIcon>
                  Add to objectives
                </MenuItem>
                <MenuItem onClick={handleShowContentModal} disabled={loading}>
                  <ListItemIcon>
                    <PermMediaIcon
                      style={{ fontSize: "20px", color: "rgba(0,0,0,0.3)" }}
                    />
                  </ListItemIcon>
                  View content
                </MenuItem>
              </Menu>
            </Card>
          ))}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ? (
            <Button
              size="small"
              style={{ color: "#37561b" }}
              onClick={handleFinish}
            >
              Submit
            </Button>
          ) : (
            <Button
              size="small"
              onClick={handleNext}
              style={{ color: "#37561b" }}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          )
        }
        backButton={
          <Button
            size="small"
            style={{ color: "#37561b" }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <ContentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        content={content}
      />
    </Box>
  );
}
