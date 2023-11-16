import * as actionCreators from "../store/actionCreators";
import HomepageTemplate from "../Pages/HomepageTemplate";
import OKRs from "../Pages/OKRs";
import InternalOKRs from "../Pages/OKRs/InternalOKRs";
import KanbanList from "../DnD/KanbanList";
import KanbanCard from "../DnD/KanbanCard";
import Objective from "../Pages/OKRs/Objective";
import Statements from "../Pages/OKRs/Statements";
import Keyresult from "../Pages/OKRs/Keyresult";
import Login from "../Pages/Auth";
import Addkeyresult from "../Pages/OKRs/Addkeyresult";
import QuarterTabs from "../Pages/OKRs/QuaterTabs";
import ModalUI from "../ModalUI";
import Menu from "../ModalUI/Menu";
import StartupNavbar from "../Admin/Navbar";
import Loader from "../ModalUI/Loader";
import Card from "../Pages/LeanCanvas/Card";
import LeanCanvas from "../Pages/LeanCanvas";
import DiagnosticsTest from "../Pages/Diagnostics";
import Calendar from "../Pages/Carlender";
import Metrics from "../Pages/Metrics";
import StartupProfile from "../Pages/StartupProfile";
import BonitaSchedule from "../Pages/Carlender/BonitaSchedule";
import TimothySchedule from "../Pages/Carlender/TimothySchedule";
import MathiusSchedule from "../Pages/Carlender/MathiusSchedule";
import Navbar from "../Pages/HomepageTemplate/Navbar";
import Profile from "../Admin/Startups/Profile";
import Startups from "../Admin/Startups";
import AdminPanel from "../Admin/Administrator";
import TeamLead from "../Admin/TeamLead";
import TeamLeads from "../Admin/Administrator/TeamLeads";
import TeamMembers from "../Admin/Administrator/TeamMembers";
import AdminStartups from "../Admin/Administrator/Startups";
import StartupList from "../Admin/Startups/StartupList";
import AddStartup from "../Admin/Programs";
import AddMember from "../Admin/Accounts";
import Events from "../Admin/Events";
import Startup from "../Admin/Startups/Startup";
import OkrOverview from "../Admin/OkrOverview";
import StartupOkrs from "../Pages/OkrOverview";
import Revenue from "../Admin/TeamLead/Revenue";
import ResourceFiles from "../Admin/ResourceFiles";
import ObjectivesTable from "../Admin/Startups/OKRs";
import DiagnosticTools from "../Admin/Startups/DiagnosticsTools";
import Error from "../tabs/Error";
import svg from "../../assets/images/spinner.svg";
import GAEventsTracker from "../Hooks/GAEventsTracker";
import logo from "../../assets/images/logo.png";
import pin from "../../assets/images/pin2.png";

export {
  actionCreators,
  Login,
  HomepageTemplate,
  OKRs,
  InternalOKRs,
  KanbanList,
  KanbanCard,
  ModalUI,
  Menu,
  StartupNavbar,
  Loader,
  Objective,
  Statements,
  Keyresult,
  Addkeyresult,
  QuarterTabs,
  DiagnosticsTest,
  Navbar,
  Card,
  TeamLeads,
  TeamMembers,
  AdminStartups,
  LeanCanvas,
  Metrics,
  StartupProfile,
  Calendar,
  BonitaSchedule,
  TimothySchedule,
  MathiusSchedule,
  Startups,
  AdminPanel,
  TeamLead,
  Events,
  Startup,
  StartupList,
  AddStartup,
  AddMember,
  Profile,
  OkrOverview,
  StartupOkrs,
  Revenue,
  ResourceFiles,
  DiagnosticTools,
  ObjectivesTable,
  Error,
  svg,
  logo,
  pin,
  GAEventsTracker,
};
