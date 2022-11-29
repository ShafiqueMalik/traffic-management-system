import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
//left sidebar
import SmsIcon from '@mui/icons-material/Sms';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import BsConeStriped from "react-icons/bs";
import AssignmentIcon from '@mui/icons-material/Assignment';
export const leftSidebarNavigationData = [
    {
        text: "Home",
        route: "",
        icon: HomeIcon
    },{
        text: "Dashboard",
        route: "dashboard",
        icon: DashboardIcon
    },{
        text: "Sms",
        route: "sms",
        icon: SmsIcon
    }, {
        text: "tasks",
        route: "",
        icon: BsConeStriped
    }, {
        text: "documents",
        route: "documents",
        icon: AssignmentIcon
    }];

