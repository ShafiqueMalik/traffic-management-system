import React from 'react'
import { Avatar, Box, TextField, Typography, Button, Tooltip, IconButton, Menu, MenuItem, ListItemIcon, SelectChangeEvent, FormControl, InputLabel, Select, Tabs, Tab, Toolbar, Divider, List, ListItem, ListItemButton, Drawer } from '@mui/material'
import { Stack } from '@mui/system'
import SearchFieldRounded from 'components/SearchFieldRounded/SearchFieldRounded'
import StatusDot from 'components/StatusDot/StatusDot'
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import SpeedButton from './SpeedButton/SpeedButton'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CustomAccordion from 'components/CustomAccordion/CustomAccordion'
import MapRightSidebarVerticalTabs from './MapRightSidebarVerticalTabs'
const MapPageRightSidebar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // setAnchorEl(null);
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [title, setTitle] = React.useState('');

    const handleTitleChange = (event: SelectChangeEvent) => {
        setTitle(event.target.value);
    };
    const [filterSign, setFilterSign] = React.useState('');

    const handleFilterSignChange = (event: SelectChangeEvent) => {
        setFilterSign(event.target.value);
    };

    const [tabFilterValue, setTabFilterValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabFilterValue(newValue);
    };
    return (
        <Box>
            <Stack gap="15px" bgcolor="#313131" p="10px" color="white" position="relative">
                <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
                    <StatusDot status='error' />
                </Box>
                <Stack direction="row" gap="10px" >
                    <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp"
                        src="https://media-exp1.licdn.com/dms/image/C4D03AQEdamYzdVdKpQ/profile-displayphoto-shrink_100_100/0/1609693309802?e=1674691200&v=beta&t=jaeta_DGfVZd4lSltTno_tF8SNKViVHtmlkPjy0hNSM" />
                    <Stack sx={{ flex: 1 }}>
                        <Typography variant="body1">Shafique Malik</Typography>
                        <Typography variant="subtitle2" color="#979797">Front End Developer</Typography>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="#979797">3330-1333-3444</Typography>
                            <Typography variant="subtitle2" color="#979797">4202</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack direction="row" gap="10px" >
                    <SearchFieldRounded />
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Filter projects">
                            <IconButton
                                sx={{ color: "#cccccc", p: 0 }}
                                onClick={handleClick}
                                size="small"
                                aria-controls={open ? 'filter-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <TuneIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="filter-menu"
                        open={open}
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
                        <MenuItem onClick={handleClose}>Project 1</MenuItem>
                        <MenuItem onClick={handleClose}>Project 2</MenuItem>
                        <MenuItem onClick={handleClose}>Project 3</MenuItem>
                        <MenuItem onClick={handleClose}>Project 4</MenuItem>
                        <MenuItem onClick={handleClose}>Project 5</MenuItem>
                    </Menu>
                </Stack>
            </Stack>

            <Stack direction="row">
                {/* <Box bgcolor="#E3E3E3" sx={{ flex: 1, p: "0" }}>
                    <CustomAccordion />
                </Box>*/}
                <MapRightSidebarVerticalTabs/>
            </Stack>
        </Box>
    )
}

export default MapPageRightSidebar