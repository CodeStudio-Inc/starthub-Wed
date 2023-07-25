import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { actionCreators, logo, svg } from "../../Paths";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AccountDetails from "./components/AccountDetails";
import Features from "./components/Features";
import Diagnostics from "./components/DiagnosticTools";
import "./Styles.css";
const AddStartup = () => {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    category: "",
    userRole: "startup",
    password: "",
    contractDate: "",
    percentageShare: 0,
    additionalMetrics: "",
  });
  const [selected, setSelected] = React.useState("");
  const [emailcheck, setEmailCheck] = React.useState("");
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [payload, setPayload] = React.useState();

  const { diagnostics } = useSelector((state) => state.diagnostics);
  const { loading, platformFeatures, categories } = useSelector(
    (state) => state.auth
  );

  const adminFeatures = platformFeatures.filter(
    (f) => f.category === "startups"
  );

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

  const checkDiagnosticsSelect = (arr) => {
    const exists = arr?.find((v) => v?.name === "diagnostics");
    return exists?.check;
  };

  const steps = [
    "Enter Startup Account Details",
    "Add Features",
    checkDiagnosticsSelect(payload) ? "Add Diagnostics" : null,
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
    const filterDiagnostics = diagnostics.filter((d) => d.project === selected);
    console.log(selected);
    const filterFeaturePayload = payload.filter((f) => f.check);
    const features = [
      ...filterFeaturePayload.map((f) => ({ name: f.name, status: f.check })),
    ];
    // setError(false);
    // setSuccess(false);
    // setEmailCheck("");
    if (!features.length) return message.info("No features added for user");
    if (!filterDiagnostics.length)
      return message.info("No diagnostics added for user");
    if (state.password.length < 8)
      return message.info("Password must be atleast 8 characters");
    if (!validateEmail(state.email) || !state.email)
      return setEmailCheck("Enter valid email");
    if (!state.username || !state.category || !state.password)
      return setEmailCheck("All fields are required");
    dispatch(
      actionCreators.addStartup(
        state.username,
        state.email,
        state.category,
        state.password,
        features,
        filterDiagnostics,
        state.userRole,
        state.contractDate,
        state.percentageShare,
        (response) => {
          const { success, res, error, err } = response;
          if (success) {
            message.info("User Account created Successfully");
            setState({
              username: "",
              email: "",
              category: "",
              userRole: "startup",
              password: "",
              contractDate: "",
              percentageShare: 0,
              additionalMetrics: "",
            });
            dispatch(actionCreators.getUserz());
          }
          if (error) {
            message.info(JSON.stringify(err.message));
          }
        }
      )
    );
  };
  return (
    <div className="add-startup-container">
      <h2>Add New Startup</h2>
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
                categories={categories}
              />
            ) : null}
            {activeStep === 1 ? (
              <Features
                features={adminFeatures}
                handleCheckboxSelect={handleCheckboxSelect}
                emailcheck={emailcheck}
              />
            ) : null}
            {activeStep === 2 && checkDiagnosticsSelect(payload) ? (
              <Diagnostics
                diagnostics={diagnostics}
                selected={selected}
                setSelected={setSelected}
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
              onClick={activeStep === steps.length - 1 ? register : handleNext}
            >
              {activeStep === steps.length - 1 ? "Create Account" : "Next"}
            </button>
          </Box>
        </React.Fragment>
      </Box>
      {loading ? (
        <img src={svg} style={{ height: "30px", width: "30px" }} />
      ) : null}
    </div>
  );
};

export default AddStartup;
