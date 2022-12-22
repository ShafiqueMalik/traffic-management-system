
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
import LanguageIcon from '@mui/icons-material/Language';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TurnSharpRightOutlinedIcon from '@mui/icons-material/TurnSharpRightOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
export const leftSidebarNavigationData = [
  {
    text: "Inbox",
    route: "inbox",
    icon: <WorkOutlineOutlinedIcon />
  },
  {
    text: "Map",
    route: "",
    icon: <LanguageIcon/>
  },  {
    text: "Dashboard",
    route: "dashboard",
    icon: <TurnSharpRightOutlinedIcon />
  }, {
    text: "Task",
    route: "tasks",
    icon: <DescriptionOutlinedIcon />
  },
  {
    text: "Apps",
    route: "apps",
    icon: <AssignmentTurnedInOutlinedIcon />
  },
];




const drawerWidth = 60;

export default function SubLeftSidebar() {
  return (
    <Box className="sub-leftsidebar" sx={{
      "& .MuiDrawer-paper":{
        left:"60px",
        boxShadow:1,

      },

    }}>
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
                  "&.active + .MuiListItemText-root": { visibility: "visible", }
                }}
              >
                {Icon}
              </ListItemButton>
              <ListItemText sx={{ m: 0, visibility: "hidden", color: "icon.main", "& span": { fontSize: "10px" } }}>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
        {/* <Box component={Link}>
          <Box component="img" src=""/>
        </Box> */}
       
      </Drawer>
    </Box>
  );
}