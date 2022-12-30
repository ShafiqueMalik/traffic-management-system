import TrafficMap from 'components/TrafficMap/TrafficMap';
import React, { useCallback, useEffect } from 'react';
import { Container, Grid, Typography, Box, Stack, Toolbar, AppBar, CssBaseline, IconButton } from "@mui/material"
import RightSidebar from 'components/RightSidebar/RightSidebar';

import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import LeftSidebar from 'components/LeftSidebar/LeftSidebar';
import { Routes, Route, Link } from "react-router-dom";
import MapPage from 'pages/MapPage/MapPage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import LeftNavbarMenu from 'components/LeftNavbarMenu/LeftNavbarMenu';
import DashboardPage from 'pages/DashboardPage/DashboardPage';

import icons from "assets/icons";
import InboxPage from 'pages/InboxPage/InboxPage';
import AppsPage from 'pages/AppsPage/AppsPage';
import TasksPage from 'pages/TasksPage/TasksPage';
import SubLeftSidebar from 'components/LeftSidebar/SubLeftNavbar/SubLeftNavbar';
import ProjectDetails from 'pages/ProjectDetails/ProjectDetails';
import LandingPage from 'pages/LandingPage/LandingPage';

const drawerWidth = 60;
function App() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const toggleLeftNavbarMenu = () => {
    setOpen((prev: boolean) => !prev);
  };
  const isProfileOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    // if(anchorEl){
    //   setAnchorEl(null);
    // }else{
    // setAnchorEl(event.currentTarget);
    // setAnchorEl(event.currentTarget);
    // }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  {
    // const { selectedImage, activeMarkerId, allMarkers } = useSelector((state: any) => state.mapTest)
    // const dispatch = useDispatch();

    // const handleKeydown = useCallback((e:any)=>{
    // console.log(e.key)
    //     if (e.key === "c") {
    //       if (activeMarkerId) {
    //         let image = allMarkers.find((m: any) => m.id === activeMarkerId)
    //         console.log("Copy");
    //         console.log(image)
    //       }
    //     }
    // },[])
    // useEffect(() => {
    //   // document.removeEventListener("keydown",handleKeydown)
    //   document.addEventListener("keydown",handleKeydown)
    // });
  }
  return (
    <div className="App">
      <CssBaseline />
      <LeftNavbarMenu open={open} setOpen={setOpen} />
      {/* <AppBar
        position="fixed"
        sx={{ zIndex: 2000, height: "50px" }}
      color="secondary"

      >
        <Toolbar sx={{ minHeight: "50px !important", justifyContent: "space-between" }}>
          <IconButton onClick={toggleLeftNavbarMenu}><MenuIcon sx={{ fill: "#646464" }} /></IconButton>

          <Box component="img" src={icons.logoYellow} alt="connector logo" sx={{ width: 150, height: 45 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Shafique Malik">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={isProfileOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isProfileOpen ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }} src="data:image/png;base64,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">M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isProfileOpen}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar> */}

      <Stack direction="row" className='app-content'>
        <LeftSidebar open={open} setOpen={setOpen}/>
        <SubLeftSidebar/>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default' }}
        >
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </Box>
      </Stack>

    </div>
  );
}

export default App;
