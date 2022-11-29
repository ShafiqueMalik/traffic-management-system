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

//left sidebar
import SmsIcon from '@mui/icons-material/Sms';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import {BsConeStriped} from "react-icons/bs";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {ReactComponent as ConeIcon}  from "assets/icons/traffic-cone.svg";

export const leftSidebarNavigationData = [
  {
    text: "Home",
    route: "",
    icon: <HomeIcon />
  }, {
    text: "Dashboard",
    route: "dashboard",
    icon: <DashboardIcon />
  }, {
    text: "Sms",
    route: "sms",
    icon: <SmsIcon />
  }, {
    text: "tasks",
    route: "tasks",
    icon: <ConeIcon/>
  }, {
    text: "documents",
    route: "documents",
    icon: <AssignmentIcon />
  }];




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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ minHeight: "50px !important" }} />
        <Divider />
        <List component={Stack} gap={5}>
          {leftSidebarNavigationData.map(({ text, route, icon: Icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={NavLink} to={`${route}`}
                sx={{ "&.active svg": { fill: "#FFC001" } }}
              >
                {Icon}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}