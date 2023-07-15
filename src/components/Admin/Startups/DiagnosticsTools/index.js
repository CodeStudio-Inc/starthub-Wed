import React from "react";
import Stack from "@mui/material/Stack";
import MultipleStepForm from "./MultipleStepForm";
import { FormStep } from "./MultipleStepForm";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators, svg } from "../../../Paths";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import Navbar from "../modals/Navbar";
import "./Style.css";
const Diagnostics = ({ location, history }) => {
  const [selected, setSelected] = React.useState("");
  const [successMessage, setMessage] = React.useState("");
  const [payload, setPayload] = React.useState([]);

  const { diagnostics } = useSelector((state) => state.diagnostics);
  const { loading } = useSelector((state) => state.auth);

  const data = location.state.data;
  const diagnostic = data?.diagnostics;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelected(event.target.value);
    let diagnosticPayload = diagnostics.filter(
      (d) => d.project === event.target.value
    );
    setPayload(diagnosticPayload);
  };

  const getStartups = () => dispatch(actionCreators.getUsers());

  const attachDiagnostics = () => {
    dispatch(
      actionCreators.attachDiagnostics(data._id, payload, (res) => {
        const { success, message } = res;
        if (success) {
          getStartups();
          setMessage(message);
        }
      })
    );
  };

  if (!diagnostic.length)
    return (
      <div className="diagnostics-container">
        <Navbar data={data} history={history} />
        <div className="attach-diagnostics">
          <h3>Add diagnostic tools</h3>
          <FormControl sx={{ m: 1, width: "30%", minHeight: 40 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selected}
              onChange={handleChange}
              autoWidth
              style={{
                height: 50,
              }}
              label="startups"
            >
              <MenuItem value="OIP">OIP</MenuItem>
              <MenuItem value="Catalyzer">Catalyzer</MenuItem>
              <MenuItem value="SheTechs">SheTechs</MenuItem>
            </Select>
          </FormControl>
          {selected ? (
            <button onClick={attachDiagnostics}>Attach</button>
          ) : null}
          {loading ? (
            <img src={svg} style={{ height: "20px", width: "20px" }} />
          ) : null}
          <h5>{successMessage}</h5>
        </div>
      </div>
    );
  else
    return (
      <div className="diagnostics-container">
        <Helmet>
          <title>Diagnostics</title>
        </Helmet>
        <Navbar data={data} history={history} />
        <div className="steps">
          <h2 style={{ marginTop: "2rem" }}>Business Diagnostics</h2>
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
          >
            {diagnostic?.map((d, index) => (
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
                            // onChange={() => handleChange(index, i)}
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
        </div>
      </div>
    );
};

export default Diagnostics;
