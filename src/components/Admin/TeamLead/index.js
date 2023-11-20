import React, { useCallback, useMemo } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadingOutlined,
  ReloadOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Line } from "react-chartjs-2";
import {
  Button,
  Input,
  Avatar,
  Row,
  Divider,
  Select,
  Card,
  Progress,
  Space,
  Col,
} from "antd";
import { actionCreators, ModalUI, svg } from "../../Paths";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddCardIcon from "@mui/icons-material/AddCard";
import GroupsIcon from "@mui/icons-material/Groups";
import { Helmet } from "react-helmet";
import { DownloadTableExcel } from "react-export-table-to-excel";

import CancelIcon from "@mui/icons-material/Cancel";

import { message } from "antd";

import EmailDrawer from "./components/EmailDrawer";
import PortfolioCard from "./components/PortfolioCard";
import "./TeamLead.css";
// import "../../Pages/Auth/AuthStyles.css";
const TeamLead = (props) => {
  const [open, setOpen] = React.useState(false);
  const [program, setProgram] = React.useState("");
  const [totalRevenue, setTotalRevenue] = React.useState(0);
  const [record, setRecord] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [showEmailDrawer, setShowEmailDrawer] = React.useState(false);

  const { userId, category, userRole, teams } = useSelector(
    (state) => state.auth
  );
  const { profiles } = useSelector((state) => state.profile);
  const { loading, users } = useSelector((state) => state.requests);

  const { Search } = Input;

  const startups = users.filter(
    (r) => r.teamCategory === "catalyzer" && r.userRole === "startup"
  );

  const sortedStartups = React.useMemo(() => {
    if (userRole === "team lead")
      return users.filter((r) => r.userRole === "startup");

    return users.filter((u) => teams.includes(u._id));
  }, [users]);

  console.log(sortedStartups);

  const mentor = users?.find((r) => r._id === record?._id);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getStartups();
    getProfiles();
  }, []);

  const payload = useMemo(() => {
    const newstartup = [
      ...sortedStartups.map((r) => {
        const {
          _id,
          totalExpense,
          totalRevenue,
          totalExpectedRevenueShare,
          ...rest
        } = r;
        const profile = profiles.find((r) => r.creator === _id);
        const data = profiles.find((r) => r.creator === _id)?.founder;

        return {
          ...rest,
          _id: _id,
          totalExpense: typeof totalExpense === "undefined" ? 0 : totalExpense,
          totalRevenue: typeof totalRevenue === "undefined" ? 0 : totalRevenue,
          totalExpectedRevenueShare:
            typeof totalExpectedRevenueShare === "undefined"
              ? 0
              : totalExpectedRevenueShare,
          profile: typeof data !== "undefined" ? profile : {},
        };
      }),
    ];
    return newstartup;
  }, [sortedStartups, profiles]);

  const getStartups = () => {
    dispatch(
      actionCreators.getItem(`auth/users`, (res) => {
        const { success, data, error } = res;
        if (success) {
          dispatch(actionCreators.setUsers(data.users));
        }
        if (!success) console.log(error);
      })
    );
  };

  const handleFilterUsers = () => {
    dispatch(
      actionCreators.searchItem(
        `auth/filter-users?program=${program}&totalRevenue=${totalRevenue}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setUsers(data.users));
            setProgram("");
            setTotalRevenue(0);
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const getProfiles = () => dispatch(actionCreators.getAllProfiles());

  const handleShowEmailDrawer = (r) => {
    setShowEmailDrawer(!showEmailDrawer);
    setRecord(r);
  };

  const onSearch = (value) => {
    dispatch(
      actionCreators.searchItem(
        `auth/search-users?username=${value}`,
        (res) => {
          const { success, data, error } = res;
          if (success) {
            dispatch(actionCreators.setUsers(data.users));
          }
          if (!success) console.log(error);
        }
      )
    );
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSelectProgram = (value) => {
    console.log(value);
    setProgram(value);
  };

  const onSelectRevenue = (value) => {
    setTotalRevenue(value);
  };

  return (
    <div className="startups-container">
      <Helmet>
        <title>Startup Portfolio</title>
      </Helmet>
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
        <Button type="dashed" style={{ marginRight: "1rem" }}>
          Add Startup
        </Button>
        <Search
          placeholder="search startup"
          value={searchValue}
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 200, marginRight: "1rem" }}
        />
        <h3 style={{ margin: "0", fontWeight: "300" }}>
          Total Users :{" "}
          <strong style={{ fontWeight: "bold" }}>
            {sortedStartups?.length}
          </strong>
        </h3>
        <Avatar
          style={{
            backgroundColor: "#37561b",
            marginLeft: "1rem",
          }}
          onClick={getStartups}
          className="refresh-avatar"
          size={30}
          icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
        />
      </Row>
      <Divider style={{ margin: "0.5rem" }} />
      <Row
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          width: "95%",
        }}
      >
        <Select
          showSearch
          placeholder="program"
          optionFilterProp="children"
          onChange={onSelectProgram}
          onSearch={onSelectProgram}
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
              label: "Greenovation",
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
          onChange={onSelectRevenue}
          onSearch={onSelectRevenue}
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
        <Button
          disabled={loading}
          type="dashed"
          style={{ marginLeft: "1rem" }}
          onClick={handleFilterUsers}
        >
          Filter
        </Button>
      </Row>
      <Divider style={{ margin: "0.5rem" }} />
      <Row
        xs={12}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {payload.map((r) => (
          <PortfolioCard r={r} props={props} email={handleShowEmailDrawer} />
        ))}
        {[...new Array(2 - (payload.length % 2)).fill()].map((r, i) => (
          <div
            key={i}
            style={{ width: 550, margin: "1rem", visibility: "hidden" }}
          />
        ))}
      </Row>
      <EmailDrawer
        toggle={handleShowEmailDrawer}
        open={showEmailDrawer}
        record={record}
      />
    </div>
  );
};
export default withRouter(TeamLead);
