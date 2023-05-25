import React from "react";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
require("dotenv").config();

function App() {
  const { token } = useSelector((state) => state.auth);

  axios.defaults.baseURL = process.env.REACT_APP_TEST_BASE_URL;
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.post["Content-Type"] =
    process.env.REACT_APP_CONTENT_TYPE_HEADER;
  axios.defaults.headers.get["Content-Type"] =
    process.env.REACT_APP_CONTENT_TYPE_HEADER;
  axios.defaults.headers.post["Access-Control-Allow-Origin"] =
    process.env.REACT_APP_ACCESS_CONTROL_HEADER;
  axios.defaults.headers.get["Access-Control-Allow-Origin"] =
    process.env.REACT_APP_ACCESS_CONTROL_HEADER;

  return (
    <DndProvider backend={HTML5Backend}>
      <Navigation />
    </DndProvider>
  );
}

export default App;
