
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, NavLink } from 'react-router-dom';
import { Stack } from '@mui/system';
import { IconButton, Avatar } from "@mui/material";
//left sidebar
import SmsIcon from '@mui/icons-material/Sms';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import { BsConeStriped } from "react-icons/bs";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ReactComponent as ConeIcon } from "assets/icons/traffic-cone.svg";
import { BsChatLeftTextFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5"
import { FaGlobe } from "react-icons/fa";
import { IoAppsSharp } from "react-icons/io5";
import UserLevelBox from './UserLevelBox/UserLevelBox';
export const leftSidebarNavigationData = [
  {
    text: "Home",
    route: "",
    icon: <svg preserveAspectRatio="none"
      data-bbox="24 33 152.001 134" viewBox="24 33 152.001 134" height="24" width="24" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true">
      <g>
        <path d="M159.621 121.057L109.217 38.8c-4.726-7.737-16.025-7.732-20.745.009L26.236 140.885c-7.475 12.26 5.093 26.906 18.453 21.504l100.386-40.592c9.257-3.675 14.546-.74 14.546-.74z"></path>
        <path d="M173.822 144.873l-4.835-7.931c-3.723-6.107-11.357-8.624-18.015-5.94l-43.744 17.637 49.153 17.467c12.971 4.609 24.58-9.524 17.441-21.233z"></path>
      </g>
    </svg>
  }, {
    text: "Inbox",
    route: "inbox",
    icon: <BsChatLeftTextFill />
  }, {
    text: "Dashboard",
    route: "dashboard",
    icon: <IoStatsChart />
  }, {
    text: "Task",
    route: "tasks",
    icon: <FaGlobe />
  },
  {
    text: "Apps",
    route: "apps",
    icon: <IoAppsSharp />
  },
];




const drawerWidth = 60;

export default function LeftSidebar() {
  return (
    <Box>
      {/* <AppBar
        position="relative"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: "#323232"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ minHeight: "50px !important" }} />
        <Divider />
        <List component={Stack} gap="15px">
          {leftSidebarNavigationData.map(({ text, route, icon: Icon }) => (
            <ListItem key={text} disablePadding sx={{
              flexDirection: "column",
              "&:hover": {
                ".MuiListItemText-root": { visibility: "visible" }
              }
            }}>
              <ListItemButton component={NavLink} to={`${route}`}
                sx={{
                  "& svg": { fill: "#646464", width: "20px", height: "20px" },
                  "&.active svg": { fill: "#FFC001" },
                  "&.active + .MuiListItemText-root": { visibility: "visible", color: "#ffffff" }
                }}
              >
                {Icon}
                {text==="Inbox" && <Box sx={{
                  position: "absolute",
                  top: "3px",
                  right: "11px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}></Box>}
              </ListItemButton>
              <ListItemText sx={{ m: 0, visibility: "hidden", color: "icon.main", "& span": { fontSize: "10px" } }}>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
        {/* <Box component={Link}>
          <Box component="img" src=""/>
        </Box> */}
        <IconButton
          component={Link}
          to="/profile"
          size="small"
          sx={{
            mt: "auto", mb: "30px", flexDirection: "column",
            "&:hover .profile-name": { visibility: "visible" }
          }}
        >
          <Avatar sx={{ width: 32, height: 32 }} src="data:image/png;base64,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">M</Avatar>
          <Typography className="profile-name"
            sx={{ color: "#ffffff", visibility: "hidden", mt: "5px", fontSize: "12px" }}
          >Joarez</Typography>
        </IconButton>
        <UserLevelBox level={1}/>
      </Drawer>
    </Box>
  );
}