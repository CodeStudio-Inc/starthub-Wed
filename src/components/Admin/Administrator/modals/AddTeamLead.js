import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, logo, svg } from "../../../Paths";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@material-ui/icons/Close";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AccountDetails from "../components/AccountDetails";
import Accordion from "../components/Accordion";
import Features from "../components/Features";
const AddTeamLead = ({ setOpen }) => {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    category: "",
    userRole: "team lead",
    permissions: "",
    password: "",
  });
  const [emailcheck, setEmailCheck] = React.useState("");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [payload, setPayload] = React.useState();

  const { loading, platformFeatures } = useSelector((state) => state.auth);

  const adminFeatures = platformFeatures.filter((f) => f.category === "admins");

  const updateFeatuersObject = () => {
    const newPayload = [
      ...adminFeatures.map((f) => {
        const { _id, check, name } = f;
        return {
          _id: _id,
          name: name,
          check: false,
        };
      }),
    ];
    return setPayload(newPayload);
  };

  React.useEffect(() => {
    updateFeatuersObject();
  }, [platformFeatures]);

  // console.log(state);

  const steps = [
    "Enter Team Account Details",
    "Add permissions",
    "Add Features",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const dispatch = useDispatch();

  const handleCheckboxSelect = React.useCallback(
    (id) => {
      let paylod = [...payload];
      let indexNumber = -1;
      const exists = paylod.find((v) => v._id === id);
      if (exists.check === true) {
        paylod.forEach((r, index) => {
          if (r._id === id) indexNumber = index;
        });
        paylod[indexNumber] = {
          ...paylod[indexNumber],
          check: false,
        };
      }
      if (exists.check === false) {
        paylod.forEach((r, index) => {
          if (r._id === id) indexNumber = index;
        });
        paylod[indexNumber] = {
          ...paylod[indexNumber],
          check: true,
        };
      }
      setPayload(paylod);
    },
    [payload]
  );

  const handleEmailChange = (e) => {
    setState({ ...state, email: e.target.value });
    validateEmail(state.email);
    if (validateEmail(state.email)) setEmailCheck("");
    if (!validateEmail(state.email)) setEmailCheck("Enter valid email");
  };

  const register = () => {
    const filterFeaturePayload = payload.filter((f) => f.check);
    const features = [...filterFeaturePayload.map((f) => f.name)];
    setError(false);
    setSuccess(false);
    setEmailCheck("");
    if (!features.length) return setMessage("No features added for user");
    if (!validateEmail(state.email) || !state.email)
      return setEmailCheck("Enter valid email");
    if (!state.username || !state.category || !state.password)
      return setEmailCheck("All fields are required");
    dispatch(
      actionCreators.addTeamLead(
        state.username,
        state.email,
        state.category,
        state.permissions,
        state.password,
        state.userRole,
        features,
        (response) => {
          const { success, res, error, err } = response;
          if (success) {
            setSuccess(true);
            setMessage(res);
          }
          if (error) {
            setError(true);
            setMessage(JSON.stringify(err.message));
          }
        }
      )
    );
  };

  return (
    <div className="signup-main">
      <div className="signup-left">
        <div className="signup-left-backdrop">
          <h1>World-class venture building for innovators in Uganda.</h1>
          <h3>Setup Startup Account.</h3>
          {error ? (
            <div className="error-message">
              <WarningAmberIcon
                style={{
                  color: "#37561b",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
              <h4>{message}</h4>
            </div>
          ) : null}
          {success ? (
            <div className="error-message">
              <DoneIcon
                style={{
                  color: "#37561b",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
              <h4>{message}</h4>
            </div>
          ) : null}
        </div>
      </div>
      <div className="signup-right">
        <div className="close-modal-row">
          <CloseIcon
            style={{ fontSize: "25px", color: "rgba(0,0,0,0.4)" }}
            className="close-modal-icon"
            onClick={() => {
              setState({
                username: "",
                email: "",
                category: "",
                mentor: "",
                password: "",
                contractDate: "",
                percentageShare: 0.05,
                additionalMetrics: "",
              });
              setOpen(false);
            }}
          />
        </div>
        <img
          style={{ height: "120px", width: "110px" }}
          src={logo}
          alt="logo"
        />
        <div className="signup-right-container">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} color="red">
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {/* Step {activeStep + 1} */}
                {activeStep === 0 ? (
                  <AccountDetails
                    state={state}
                    setState={setState}
                    emailcheck={emailcheck}
                    handleEmailChange={handleEmailChange}
                  />
                ) : null}
                {activeStep === 1 ? (
                  <Accordion state={state} setState={setState} />
                ) : null}
                {activeStep === 2 ? (
                  <Features
                    features={adminFeatures}
                    handleCheckboxSelect={handleCheckboxSelect}
                    message={message}
                    emailcheck={emailcheck}
                  />
                ) : null}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </button>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  disabled={loading ? true : false}
                  onClick={
                    activeStep === steps.length - 1 ? register : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Create Account" : "Next"}
                </button>
              </Box>
            </React.Fragment>
          </Box>

          {/* <button onClick={register}>
            {loading ? (
              <img src={svg} style={{ width: "30px", height: "30px" }} />
            ) : (
              "Create Account"
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default AddTeamLead;
