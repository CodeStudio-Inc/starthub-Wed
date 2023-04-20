import * as actionCreators from '../store/actionCreators';
import HomepageTemplate from '../Pages/HomepageTemplate';
import OKRs from '../Pages/OKRs';
import InternalOKRs from '../Pages/OKRs/InternalOKRs';
import KanbanList from '../DnD/KanbanList';
import KanbanCard from '../DnD/KanbanCard';
import Objective from '../Pages/OKRs/Objective';
import Statements from '../Pages/OKRs/Statements';
import Keyresult from '../Pages/OKRs/Keyresult';
import Login from '../Pages/Auth';
import Addkeyresult from '../Pages/OKRs/Addkeyresult';
import QuarterTabs from '../Pages/OKRs/QuaterTabs';
import ModalUI from '../ModalUI';
import Menu from '../ModalUI/Menu';
import Loader from '../ModalUI/Loader';
import Card from '../Pages/LeanCanvas/Card';
import List1 from '../Pages/LeanCanvas/List1';
import List2 from '../Pages/LeanCanvas/List2';
import LeanCanvas from '../Pages/LeanCanvas';
import DiagnosticsTest from '../Pages/Diagnostics';
import Calendar from '../Pages/Carlender';
import Metrics from '../Pages/Metrics';
import BonitaSchedule from '../Pages/Carlender/BonitaSchedule';
import TimothySchedule from '../Pages/Carlender/TimothySchedule';
import MathiusSchedule from '../Pages/Carlender/MathiusSchedule';
import AdminNavbar from '../OverallAdmin/Navbar';
import OverallAdmin from '../OverallAdmin';
import Navbar from '../Pages/HomepageTemplate/Navbar';
import Startups from '../Admin/Startups';
import Loans from '../Admin/Loans';
import Startup from '../Admin/Startups/Startup';
import OkrOverview from '../Admin/OkrOverview';
import Revenues from '../Admin/Revenue';
import Overview from '../Admin/Revenue/Overview';
import RevenueShare from '../Admin/Revenue/RevenueShare';
import RevenueAccumulation from '../Admin/Revenue/RevenueAccumulation';
import ResourceFiles from '../Admin/ResourceFiles';
import ObjectivesTable from '../Admin/Startups/OKRs';
import AdminLeanCanvas from '../Admin/Startups/LeanCanvas';
import Error from '../tabs/Error';
import svg from '../../assets/images/spinner.svg';
import GAEventsTracker from '../Hooks/GAEventsTracker';
import logo from '../../assets/images/logo.png';

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
	Loader,
	Objective,
	Statements,
	Keyresult,
	Addkeyresult,
	QuarterTabs,
	DiagnosticsTest,
	Navbar,
	Card,
	List1,
	List2,
	LeanCanvas,
	Metrics,
	Calendar,
	BonitaSchedule,
	TimothySchedule,
	MathiusSchedule,
	Startups,
	AdminNavbar,
	OverallAdmin,
	Loans,
	Startup,
	OkrOverview,
	Revenues,
	Overview,
	RevenueShare,
	RevenueAccumulation,
	ResourceFiles,
	AdminLeanCanvas,
	ObjectivesTable,
	Error,
	svg,
	logo,
	GAEventsTracker
};
