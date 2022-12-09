import React,{useState} from 'react'
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
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {toggleSignCaption,toggleFilterAccordion,toggleAllAccordion} from 'app/slices/globalSlice';


const MapPageRightSidebar = () => {
    const {showSignCaption ,showFilterAccordion,showAllAccordion  } = useSelector((state:any) => state.global)
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showCaption, setShowCaption] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [collapseAll, setCollapseAll] = useState(true);
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
    const handleFilterClick = ()=>{
        dispatch(toggleFilterAccordion());
    }
    const handleShowAllAccordionClick = ()=>{
        dispatch(toggleAllAccordion());
    }
    return (
        <Box>
            <Stack className="top-profile-card" gap="15px" bgcolor="#313131" p="10px" color="white" position="relative"
                sx={{
                    position: "fixed",
                    zIndex: 10,
                    width: "300px",
                }}
            >
                <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
                    <StatusDot status='error' />
                </Box>
                <Stack direction="row" gap="10px" >
                    <Link to="/profile" style={{ alignSelf: "baseline" }}>
                        <Avatar sx={{ width: 40, height: 40 }} alt="Remy Sharp"
                            src="https://media-exp1.licdn.com/dms/image/C4D03AQEdamYzdVdKpQ/profile-displayphoto-shrink_100_100/0/1609693309802?e=1674691200&v=beta&t=jaeta_DGfVZd4lSltTno_tF8SNKViVHtmlkPjy0hNSM" />
                    </Link>
                    <Stack sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight="bold">000000-000000</Typography>
                        <Typography variant="subtitle2" color="#979797">9 jone street, Austrailia</Typography>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" color="#979797">3330-1333-3444</Typography>
                            <Typography variant="subtitle2" color="#979797">4202</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" gap="10px">
                    <IconButton size="small" sx={{color:"#969696",p:0}} onClick={()=>setShowCaption(prev=>!prev)}>
                        {showCaption? <ClosedCaptionIcon fontSize='small'  /> : <ClosedCaptionDisabledIcon fontSize='small' />}
                    </IconButton>
                    <SearchFieldRounded placeholder='Search Project...' />
                    <IconButton size="small" sx={{color:"#969696",p:0}} onClick={handleFilterClick}>
                        {showFilterAccordion? <FilterAltIcon fontSize='small'   /> : <FilterAltOffIcon fontSize='small' />}
                    </IconButton>
                    <IconButton size="small" sx={{color:"#969696",p:0}} onClick={handleShowAllAccordionClick}>
                        {showAllAccordion? <UnfoldMoreIcon fontSize='small' />:<UnfoldLessIcon fontSize='small'  />}
                    </IconButton>
                </Stack>
            </Stack>

            <Stack direction="row">
                {/* <Box bgcolor="#E3E3E3" sx={{ flex: 1, p: "0" }}>
                    <CustomAccordion />
                </Box>*/}
                <MapRightSidebarVerticalTabs />
            </Stack>
        </Box>
    )
}

export default MapPageRightSidebar