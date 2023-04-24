import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
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

import "./Diagnostics.css";
import { message } from "antd";
const Diagnostics = () => {
  const userId = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.requests.loading);

  //   console.log(_value);

  const [teamsValue, setTeamsValue] = useState(0);
  const [teamsPayload, setTeamsPayload] = useState();
  const [visionValue, setVisionValue] = useState(0);
  const [visionPayload, setVisionPayload] = useState();
  const [propositionValue, setPropositionValue] = useState(0);
  const [propositionPayload, setPropositionPayload] = useState();
  const [productValue, setProductValue] = useState(0);
  const [productPayload, setProductPayload] = useState();
  const [marketValue, setMarketValue] = useState(0);
  const [marketPayload, setMarketPayload] = useState();
  const [businessValue, setBusinessValue] = useState(0);
  const [businessPayload, setBusinessPayload] = useState();
  const [investmentValue, setInvestmentValue] = useState(0);
  const [investmentPayload, setInvestmentPayload] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getValues());
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    updateTeamsSteps();
    updateVisionSteps();
    updatePropositionSteps();
    updateProductSteps();
    updateMarketSteps();
    updateBusinessSteps();
    updateInvestmentSteps();
  }, [teams, vision, proposition, product, market, business, investment]);

  const updateTeamsSteps = () => {
    const newTeamPayload = [
      ...teams.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setTeamsPayload(newTeamPayload);
  };

  const updateVisionSteps = () => {
    const newVisionPayload = [
      ...vision.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setVisionPayload(newVisionPayload);
  };

  const updatePropositionSteps = () => {
    const newPropositionPayload = [
      ...proposition.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setPropositionPayload(newPropositionPayload);
  };

  const updateProductSteps = () => {
    const newProductPayload = [
      ...product.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setProductPayload(newProductPayload);
  };

  const updateMarketSteps = () => {
    const newMarketPayload = [
      ...market.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setMarketPayload(newMarketPayload);
  };

  const updateBusinessSteps = () => {
    const newBusinessPayload = [
      ...business.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setBusinessPayload(newBusinessPayload);
  };

  const updateInvestmentSteps = () => {
    const newInvestmentPayload = [
      ...investment.map((v) => {
        const { ...rest } = v;
        return {
          ...rest,
          checked: false,
          id: Math.random().toString().slice(2),
        };
      }),
    ];
    return setInvestmentPayload(newInvestmentPayload);
  };

  const handleTeamsOnChange = (id) => {
    let paylod = [...teamsPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setTeamsPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setTeamsValue(totalValue);
  };

  const handleVisionOnChange = (id) => {
    let paylod = [...visionPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setVisionPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setVisionValue(totalValue);
  };

  const handlePropositionOnChange = (id) => {
    let paylod = [...propositionPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setPropositionPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setPropositionValue(totalValue);
  };

  const handleProductOnChange = (id) => {
    let paylod = [...productPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setProductPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setProductValue(totalValue);
  };

  const handleMarketOnChange = (id) => {
    let paylod = [...marketPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setMarketPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setMarketValue(totalValue);
  };

  const handleBusinessOnChange = (id) => {
    let paylod = [...businessPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setBusinessPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setBusinessValue(totalValue);
  };

  const handleInvestmentOnChange = (id) => {
    let paylod = [...investmentPayload];
    let indexNumber = -1;
    const exists = paylod.find((v) => v.id === id);
    if (exists.checked === true) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: false,
      };
    }
    if (exists.checked === false) {
      paylod.forEach((r, index) => {
        if (r.id === id) indexNumber = index;
      });
      paylod[indexNumber] = {
        ...paylod[indexNumber],
        checked: true,
      };
    }
    setInvestmentPayload(paylod);
    const totalValue =
      (paylod.filter((r) => r.checked).length / paylod.length) * 100;
    setInvestmentValue(totalValue);
  };

  //   console.log(visionValue, "%");

  const handleStepsSubmit = () => {
    dispatch(
      actionCreators.addValues(
        teamsValue,
        visionValue,
        propositionValue,
        productValue,
        marketValue,
        businessValue,
        investmentValue,
        (res) => {
          if (res.success) {
            dispatch(actionCreators.getValues());
            message.info("Nice :)!!");
          }
        }
      )
    );
  };

  return (
    <div className="diagnostics-container">
      <Helmet>
        <title>Diagnostics</title>
      </Helmet>
      <div className="steps">
        <h2>Business Diagnostics</h2>
        <MultipleStepForm
          initialValues={{
            teams: teams,
            vision: vision,
            proposition: proposition,
            product: product,
            market: market,
            business: business,
            investment: investment,
          }}
          onSubmit={handleStepsSubmit}
        >
          <FormStep
            stepName="Team"
            // onSubmit={() => console.log("Step 1 submit")}
          >
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {teamsPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handleTeamsOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
          <FormStep stepName="Problem & Vision">
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {visionPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handleVisionOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
          <FormStep stepName="Value Proposition">
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {propositionPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handlePropositionOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
          <FormStep stepName="Product">
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {productPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handleProductOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
          <FormStep stepName="Market">
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {marketPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handleMarketOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
          <FormStep stepName="Business Model">
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {businessPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handleBusinessOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
          <FormStep stepName="Investment and exit">
            <div className="step">
              <Stack sx={{ height: "100%" }} spacing={1} direction="column">
                {investmentPayload
                  ?.sort((a, b) => b.value - a.value)
                  .map((r) => (
                    <div className="step-row">
                      <input
                        type="checkbox"
                        value={r.value}
                        onChange={() => handleInvestmentOnChange(r.id)}
                      />
                      <p>{r.label}</p>
                    </div>
                  ))}
              </Stack>
            </div>
          </FormStep>
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
