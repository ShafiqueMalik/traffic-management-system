import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

//left sidebar
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LockIcon from '@mui/icons-material/Lock';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';

export const leftNavbarMenuData = [
    {
        text: "MY ACCOUNT",
        route: "my-account",
        icon: <PersonIcon />
    }, {
        text: "BUSINESS ACCOUNT",
        route: "business-account",
        icon: <AccountBalanceIcon />
    },
    {
        text: "SWITCH ACCESS",
        route: "switch-access",
        icon: <SwapHorizIcon />
    }, {
        text: "VEHICLES",
        route: "vehicles",
        icon: <DirectionsCarIcon />
    }, {
        text: "PASSWORD & PRIVACY",
        route: "password-privacy",
        icon: <LockIcon />
    }, {
        text: "WALLET & EARNINGS",
        route: "wallet-earnings",
        icon: <AccountBalanceWalletIcon />
    }, {
        text: "REWARDS & POINTS",
        route: "rewards-points",
        icon: <StarIcon />
    }, {
        text: "SETTINGS",
        route: "settings",
        icon: <SettingsIcon />
    }, {
        text: "HELP & SUPPORT",
        route: "help-support",
        icon: <SupportAgentIcon />
    }, {
        text: "LOGOUT",
        route: "logout",
        icon: <LogoutIcon />
    },];




export default function LeftNavbarMenu({ open, setOpen }: any) {


    return (
        <div>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen((prev: boolean) => !prev)}
                sx={{ zIndex: 3000, }}

            >
                <List>
                    <IconButton color="error"  onClick={()=>setOpen((prev:boolean)=>!prev)}
                    sx={{display:"flex",ml:"auto",transform:"translate(-15px, 0px)"}}>
                        <CloseIcon />
                    </IconButton>

                    {leftNavbarMenuData.map(({ text, route, icon }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton component={NavLink} to={`${route}`}
                                sx={{
                                    "&.active": { bgcolor: "#FFC001" },
                                    "&.active svg": { fill: "#000000" },
                                    "&.active .MuiTypography-root": { color: "#000000" }
                                }}
                            >
                                <ListItemIcon sx={{"& svg":{fill:"#FFC001"},minWidth:"40px"}}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}