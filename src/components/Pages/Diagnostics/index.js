import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import MultipleStepForm from "./MultipleStepForm";
import { FormStep } from "./MultipleStepForm";
import {
  teams,
  vision,
  proposition,
  product,
  market,
  business,
  investment,
} from "./Steps";
import { actionCreators, svg } from "../../Paths";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import "./Diagnostics.css";
import { message } from "antd";
const Diagnostics = () => {
  const { userId, diagnostics } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.requests.loading);
  const { payload } = useSelector((state) => state.diagnostics);

  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    updateDiagnosticsObject();
  }, [diagnostics]);

  const getDiagnostics = () => dispatch(actionCreators.getUserDiagnostics());

  const updateDiagnosticsObject = () => {
    const newPayload = [
      ...diagnostics?.map((d) => {
        const { score, steps, ...rest } = d;
        return {
          ...rest,
          score: score,
          steps: [
            ...steps?.map((s) => {
              const { checked, ...step } = s;
              return {
                ...step,
                checked: checked ? checked : false,
              };
            }),
          ],
        };
      }),
    ];
    return dispatch(actionCreators.diagnosticsPayload(newPayload));
  };

  // console.log(diagnostics);

  const handleChange = (toolIndex, stepIndex) => {
    let paylod = [...payload];

    const step = paylod[toolIndex].steps[stepIndex];
    if (step.checked === true) {
      paylod[toolIndex].steps[stepIndex] = {
        ...paylod[toolIndex].steps[stepIndex],
        checked: false,
      };
    }
    if (step.checked === false) {
      paylod[toolIndex].steps[stepIndex] = {
        ...paylod[toolIndex].steps[stepIndex],
        checked: true,
      };
    }
    paylod[toolIndex].score =
      (paylod[toolIndex].steps.filter((s) => s.checked).length /
        paylod[toolIndex].steps.length) *
      100;
    dispatch(actionCreators.diagnosticsPayload(paylod));
  };

  const handleStepsSubmit = () => {
    dispatch(
      actionCreators.updateUserDiagnostics(payload, (res) => {
        const { success } = res;
        if (success) {
          message.info("Your Diagnostics score has been updated. Thanks!!!");
          getDiagnostics();
        }
        if (!success) message.info("Sorry, Failed to update diagnostics score");
      })
    );
  };

  const clickMe = () => message.info("Clicked");

  if (!payload.length)
    return (
      <div className="diagnostics-container">
        <div className="steps">
          <h2 style={{ alignSelf: "center" }}>User has no Diagnostics set</h2>
        </div>
      </div>
    );
  else
    return (
      <div className="diagnostics-container">
        <Helmet>
          <title>Diagnostics</title>
        </Helmet>
        <div className="steps">
          <h2>Business Diagnostics</h2>
          <MultipleStepForm
            initialValues={{
              teams: "",
              vision: "",
              proposition: "",
              product: "",
              market: "",
              business: "",
              investment: "",
            }}
            onSubmit={handleStepsSubmit}
          >
            {payload?.map((d, index) => (
              <FormStep
                stepName={d.title}
                onSubmit={() => console.log("Step 1 submit")}
              >
                <div className="step">
                  <div className="progress-bar">
                    <Box
                      sx={{
                        width: "100%",
                        alignSelf: "center",
                        marginRight: "0.5rem",
                      }}
                    >
                      <button
                        className="save-steps"
                        onClick={handleStepsSubmit}
                      >
                        save progress
                      </button>
                      <LinearProgress
                        variant="determinate"
                        value={d.score}
                        color="primary"
                      />
                    </Box>
                    <h5>{Math.round(d.score)}%</h5>
                  </div>
                  <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                    {d?.steps
                      ?.sort((a, b) => b.stepNo - a.stepNo)
                      .map((s, i) => (
                        <FormGroup key={i}>
                          <FormControlLabel
                            onChange={() => handleChange(index, i)}
                            checked={s.checked ? s.checked : null}
                            control={<Checkbox />}
                            label={s.step}
                          />
                        </FormGroup>
                      ))}
                  </Stack>
                </div>
              </FormStep>
            ))}
          </MultipleStepForm>
          {loading ? (
            <span>
              <img src={svg} style={{ width: "30px", height: "30px" }} />
            </span>
          ) : null}
        </div>
      </div>
    );
};

export default Diagnostics;
