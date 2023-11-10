import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Radar } from "react-chartjs-2";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Row, Table, Card, Avatar, Input, Divider, Button, Select } from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddCardIcon from "@mui/icons-material/AddCard";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Helmet } from "react-helmet";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Modal from "@mui/material/Modal";
import AssignmentIcon from "@mui/icons-material/Assignment";

import AddFeatures from "./components/AddFeatures";
import AddCategories from "./components/AddCategories";
import AddDiagnostics from "./components/AddDiagnostics";
import AddTeamLead from "./modals/AddTeamLead";
import "./AdminPanel.css";
import "../../Pages/Auth/AuthStyles.css";

const { Search } = Input;

const AdminPanel = (props) => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [payload, setPayload] = React.useState([]);

  const { users, loading } = useSelector((state) => state.admin);
  const { profiles } = useSelector((state) => state.profile);
  const { userId, category } = useSelector((state) => state.auth);

  const tableRef = React.useRef(null);

  const startups = users.filter(
    (r) => r.teamCategory === "catalyzer" && r.userRole === "startup"
  );
  // console.log(startups);

  const dispatch = useDispatch();

  let records = [];

  React.useEffect(() => {
    getStartups();
    getProfiles();
    updateStartupObject();
  }, []);

  const getStartups = () => dispatch(actionCreators.getUsers());
  const getProfiles = () => dispatch(actionCreators.getAllProfiles());
  // console.log(profiles);

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const updateStartupObject = () => {
    const newstartup = [
      ...startups.map((r) => {
        const { _id, ...rest } = r;
        const profile = profiles.find((r) => r.creator === _id);
        const data = profiles.find((r) => r.creator === _id)?.founder;
        let destructuredData,
          defaultPayload,
          restructuredPayload,
          datasets,
          graphData;
        if (typeof data !== "undefined") {
          destructuredData = Array.from(
            data,
            ({
              name,
              growth,
              product,
              finance,
              operations,
              communication,
            }) => ({
              name,
              growth,
              product,
              finance,
              operations,
              communication,
            })
          );
          defaultPayload = [
            {
              name: "default",
              growth: 1,
              product: 2,
              finance: 5,
              operations: 8,
              communication: 10,
            },
            ...destructuredData,
          ];
          restructuredPayload = [
            ...defaultPayload.map((f) => {
              const { name } = f;
              return {
                name: name,
                data: Object.values(
                  defaultPayload.find((e) => e.name === name)
                ).slice(1),
                label: Object.keys(
                  defaultPayload.find((e) => e.name === name)
                ).slice(1),
              };
            }),
          ];
          datasets = [
            ...restructuredPayload?.map((f) => ({
              label: f.name === "default" ? " " : f.name,
              data: f.data,
              fill: true,
              backgroundColor:
                f.name === "default"
                  ? "rgba(0,0,0,0)"
                  : ["#36561b56", "#dfa12685", "#61041848"],
              borderColor:
                f.name === "default"
                  ? "rgba(0,0,0,0)"
                  : ["#37561b", "#dfa126", "#61041848"],
              pointBackgroundColor:
                f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
              pointBorderColor:
                f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
              pointHoverBackgroundColor:
                f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
              pointHoverBorderColor:
                f.name === "default" ? "rgba(0,0,0,0)" : "#681a1b",
              pointStyle: "circle",
            })),
          ];
          graphData = {
            labels: [...restructuredPayload?.map((f) => f.label)][0],
            datasets: datasets,
            maintainAspectRatio: true,
          };
        }

        return {
          ...rest,
          profile: typeof data !== "undefined" ? profile : {},
          radaGraph:
            typeof data !== "undefined"
              ? graphData
              : {
                  labels: [
                    "growth",
                    "product",
                    "finance",
                    "operations",
                    "communication",
                  ],
                  datasets: [],
                  maintainAspectRatio: true,
                },
        };
      }),
    ];
    return setPayload(newstartup);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearchSelect = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="startups-container">
      <Helmet>
        <title>Startups Overview</title>
      </Helmet>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddTeamLead setOpen={handleClose} />
      </Modal>
      <Row
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "95%",
          margin: "0.5rem",
        }}
      >
        <Search
          placeholder="search startup"
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0" }}>Total Users :{users.length}</h3>
        <Button type="dashed" style={{ marginLeft: "1rem" }}>
          Add Startup
        </Button>
        <Avatar
          style={{
            backgroundColor: "#37561b",
            marginLeft: "1rem",
          }}
          size={30}
          icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
        />
      </Row>
      <Divider />
      <Row
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "95%",
        }}
      >
        <Select
          showSearch
          placeholder="Category"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearchSelect}
          options={[
            {
              value: "catalyzer",
              label: "Catalyzer",
            },
            {
              value: "SheTechs",
              label: "SheTechs",
            },
            {
              value: "Greenovation",
              label: "Tom",
            },
            {
              value: "OIP",
              label: "OIP",
            },
          ]}
        />
        <Select
          showSearch
          placeholder="Revenue Generated"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearchSelect}
          style={{ marginLeft: "1rem" }}
          options={[
            {
              value: 500000,
              label: "1,0000USD",
            },
            {
              value: 1000000,
              label: "20,000USD",
            },
            {
              value: 1000000,
              label: "40,OOOUSD",
            },
          ]}
        />
        <Button type="dashed" style={{ marginLeft: "1rem" }}>
          Filter
        </Button>
      </Row>
      <Divider />
      <Row
        xs={12}
        gutter={4}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {payload.map((r) => (
          <Card
            style={{
              width: 550,
              margin: "1rem",
            }}
          >
            <div className="card-content-column">
              <Row xs={12}>
                <div className="avatar-column">
                  <Avatar
                    style={{
                      backgroundColor: "#36561b56",
                    }}
                    size={55}
                  >
                    {r.username.substring(0, 1)}
                  </Avatar>
                  <h3>{r.username}</h3>
                </div>
                <div className="avatar-column">
                  <h2>Pitch Deck</h2>
                  {/* <h3>{r?.profile?.pitch}</h3> */}
                  <h3>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </h3>
                </div>
              </Row>
              <Divider />
              <Row xs={12}>
                <div className="radar-graph-column">
                  <h2>Founder skill level on a scale of 10</h2>
                  <Divider />
                  {typeof r?.radaGraph === "undefined" ? null : (
                    <Radar
                      data={r?.radaGraph}
                      options={{
                        aspectRatio: 2,
                      }}
                    />
                  )}
                </div>
              </Row>
            </div>
          </Card>
        ))}
      </Row>
    </div>
  );
};
export default withRouter(AdminPanel);
