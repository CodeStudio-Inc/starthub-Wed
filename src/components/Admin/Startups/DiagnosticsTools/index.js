import React from "react";
import Stack from "@mui/material/Stack";
import MultipleStepForm from "./MultipleStepForm";
import { FormStep } from "./MultipleStepForm";
import { Helmet } from "react-helmet";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Navbar from "../modals/Navbar";
import "./Style.css";
const Diagnostics = ({ location, history }) => {
  const [selected, setSelected] = React.useState("");

  const data = location.state.data;
  const diagnostics = data?.diagnostics;

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  if (!diagnostics.length)
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
            </Select>
          </FormControl>
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
            {diagnostics?.map((d, index) => (
              <FormStep
                stepName={d.title}
                onSubmit={() => console.log("Step 1 submit")}
              >
                <div className="step">
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
