import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import SearchFieldRounded from 'components/SearchFieldRounded/SearchFieldRounded'
import StatusDot from 'components/StatusDot/StatusDot'
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import SpeedButton from 'pages/MapPage/MapPageRightSidebar/SpeedButton/SpeedButton';


import {
    Avatar, Box, TextField, Typography, Stack,
    Button, Tooltip, IconButton, Menu, MenuItem,
    ListItemIcon, SelectChangeEvent, FormControl,
    InputLabel, Select, Tabs, Tab, List, ListItemButton
} from '@mui/material'
import trafficSigns from "assets/traffic-signs";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterAccordion } from 'app/slices/globalSlice';

import { TfiArrowsHorizontal } from "react-icons/tfi"
import { TbArrowFork } from "react-icons/tb"
import { BsCircle, BsPentagon } from "react-icons/bs"


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '& .MuiAccordionSummary-root': { paddingInline: "10px" }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(0),
        "& .MuiTypography-root": {
            fontSize: "14px",
            fontWeight: "500"
        }
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomAccordion() {
    const { showSignCaption, showFilterAccordion, showAllAccordion } = useSelector((state: any) => state.global)
    const dispatch = useDispatch();

    const [filterBySignPanel, setFilterBySignsPanel] = React.useState(false);
    const [signsPanel, setSignsPanel] = React.useState(false);
    const [conesPanel, setConesPanel] = React.useState(false);
    const [devicesPanel, setDevicesPanel] = React.useState(false);
    const [dimentionsPanel, setDimentionsPanel] = React.useState(false);

    const allPanelSetter: any = {
        1: setFilterBySignsPanel,
        2: setSignsPanel,
        3: setConesPanel,
        4: setDevicesPanel,
        5: setDimentionsPanel,
    }

    //this will run useEffect on update but not on initial render
    const isInitialMount = React.useRef(true);


    const handleAccordionChange = (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        if (panel === 1) {
            dispatch(toggleFilterAccordion());
        }
        allPanelSetter[panel]((prev: any) => !prev);
    };
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
    const [countrySelect, setCountrySelect] = React.useState("");
    const [regionSelect, setRegionSelect] = React.useState("");
    const [typesSelect, setTypesSelect] = React.useState("");
    const handleFilterSignChange = (event: SelectChangeEvent) => {
        setFilterSign(event.target.value);
    };

    const [tabFilterValue, setTabFilterValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabFilterValue(newValue);
    };
    const [selectedSpeedIndex, setSelectedSpeedIndex] = React.useState(-1);

    const selectSpeedButtonIndex = (idx: number) => {
        setSelectedSpeedIndex(idx)
    }

    React.useEffect(() => {
        setFilterBySignsPanel(showFilterAccordion)
    }, [showFilterAccordion]);

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            Object.entries(allPanelSetter).forEach(([key, panelSetter]: [any, any]) => {
                if (key === "1") {
                    dispatch(toggleFilterAccordion(showAllAccordion));
                } else {
                    if (showAllAccordion) {
                        panelSetter(true);
                    } else {
                        panelSetter(false);
                    }
                }
            });

        }
    }, [showAllAccordion])

    return (
        <Box className="accordion-container">
            <Accordion expanded={filterBySignPanel} onChange={handleAccordionChange(1)}>
                <AccordionSummary aria-controls="filterBySignPaneld-content" id="filterBySignPaneld-header">
                    <Typography>Filter By Signs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" justifyContent="space-between" mb={2} alignItems="center" gap="10px">
                        <FormControl sx={{ m: 0, flex: 1 }} size="small">
                            <InputLabel id="country-select-small" sx={{ fontSize: "14px" }}>Country</InputLabel>
                            <Select
                                labelId="country-select-small"
                                id="country-select-small"
                                value={countrySelect}
                                label="Country"
                                onChange={(e) => setCountrySelect(e.target.value)}
                                sx={{ fontSize: "14px" }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Country 1</MenuItem>
                                <MenuItem value={20}>Country 2</MenuItem>
                                <MenuItem value={30}>Country 3</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 0, flex: 1 }} size="small">
                            <InputLabel id="region-select-small" sx={{ fontSize: "14px" }}>Region</InputLabel>
                            <Select
                                labelId="region-select-small"
                                id="region-select-small"
                                value={regionSelect}
                                label="Region"
                                onChange={(e) => setRegionSelect(e.target.value)}
                                sx={{ fontSize: "14px" }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Region 1</MenuItem>
                                <MenuItem value={20}>Region 2</MenuItem>
                                <MenuItem value={30}>Region 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ width: "100%" }} size="small">
                        <InputLabel id="type-select-small" sx={{ fontSize: "14px" }}>Types</InputLabel>
                        <Select
                            labelId="type-select-small"
                            id="type-select-small"
                            value={typesSelect}
                            label="Types"
                            onChange={(e) => setTypesSelect(e.target.value)}
                            sx={{ fontSize: "14px" }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Type 1</MenuItem>
                            <MenuItem value={20}>Type 2</MenuItem>
                            <MenuItem value={30}>Type 3</MenuItem>
                        </Select>
                    </FormControl>


                    <Box sx={{ mt: 2, borderColor: 'divider', position: "relative" }}>
                        <Tabs value={tabFilterValue}
                            sx={{
                                minHeight: "30px !important",
                                "& .MuiTab-root": { minHeight: "30px" },
                                "& .MuiTab-root:not(:first-child)": { flex: 1 },
                                "& .MuiTab-root:not(:first-child) .close-icon": {
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    fontSize: "18px",
                                    display: "none"
                                },
                                "& .MuiTab-root.Mui-selected .close-icon": {
                                    display: "block"
                                },
                                "& .MuiTab-root.Mui-selected": {
                                    bgcolor: "#cccccc"
                                },
                                "& .MuiTab-root:not(:first-child):not(:last-child)": {
                                    borderRight: "1px solid #cccccc"
                                }
                            }}
                            onChange={handleTabChange} aria-label="filter tab">
                            <Tab label="" sx={{ width: 0, height: 0, minWidth: 0, p: 0 }} />
                            <Tab label="around" icon={<CloseIcon onClick={() => setTabFilterValue(0)} color='error' className="close-icon" />} sx={{ fontSize: "12px", p: 0, minWidth: "65px" }} />
                            <Tab label="past" icon={<CloseIcon onClick={() => setTabFilterValue(0)} color='error' className="close-icon" />} sx={{ fontSize: "12px", p: 0, minWidth: "65px" }} />
                            <Tab label="through" icon={<CloseIcon onClick={() => setTabFilterValue(0)} color='error' className="close-icon" />} sx={{ fontSize: "12px", p: 0, minWidth: "65px" }} />
                        </Tabs>
                        {/* {tabFilterValue !== 0 && <IconButton onClick={() => setTabFilterValue(0)}
                            color="error" sx={{ position: "absolute", right: "-13px", top: "-6px" }}>
                            <CloseIcon />
                        </IconButton>} */}
                    </Box>
                    <Stack direction="row" mt={2} flexWrap="nowrap" gap="4px">
                        {/* <List component="nav" aria-label="main mailbox folders">
                            <ListItemButton
                                // selected={selectedIndex === 0}
                                // onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                <SpeedButton>40</SpeedButton>
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton
                                // selected={selectedIndex === 0}
                                // onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                <SpeedButton>50</SpeedButton>
                                </ListItemIcon>
                            </ListItemButton>
                        </List> */}
                        {[40, 50, 60, 70, 80, 90, 100, 110].map((speed, idx) => (
                            <SpeedButton key={speed} index={idx} selectedIndex={selectedSpeedIndex} onClick={() => selectSpeedButtonIndex(idx)}>{speed}</SpeedButton>
                        ))}
                        {/* <SpeedButton>40</SpeedButton>

                        <SpeedButton>50</SpeedButton>
                        <SpeedButton>60</SpeedButton>
                        <SpeedButton>70</SpeedButton>
                        <SpeedButton>80</SpeedButton>
                        <SpeedButton>90</SpeedButton>
                        <SpeedButton>100</SpeedButton>
                        <SpeedButton>110</SpeedButton> */}
                        <SpeedButton onClick={() => setSelectedSpeedIndex(-1)}>
                            <Box sx={{ width: "80%", height: "4px", bgcolor: "#3f3f3f", transform: "rotate(-45deg)" }} />
                        </SpeedButton>
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={signsPanel} onChange={handleAccordionChange(2)}>
                <AccordionSummary aria-controls="signsPaneld-content" id="signsPaneld-header">
                    <Typography>Signs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        "& img": { maxWidth: "100%", height: "auto" },
                        gap: "5px"
                    }}>
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.speed80Sign} alt="speed 80"
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={conesPanel} onChange={handleAccordionChange(3)}>
                <AccordionSummary aria-controls="conesPaneld-content" id="conesPaneld-header">
                    <Typography>Cones</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        "& img": { maxWidth: "100%", height: "auto" },
                        gap: "5px"
                    }}>
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.cone} alt="speed 80"
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={devicesPanel} onChange={handleAccordionChange(4)}>
                <AccordionSummary aria-controls="conesPaneld-content" id="conesPaneld-header">
                    <Typography>Devices</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        "& img": { maxWidth: "100%", height: "auto" },
                        gap: "5px"
                    }}>
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                        <Box component="img" src={trafficSigns.device} alt="speed 80"
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={dimentionsPanel} onChange={handleAccordionChange(5)}>
                <AccordionSummary aria-controls="conesPaneld-content" id="conesPaneld-header">
                    <Typography>Dimenstions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        "& img": { maxWidth: "100%", height: "auto" },
                        gap: "5px"
                    }}>
                        <IconButton>
                            <TfiArrowsHorizontal />
                        </IconButton>
                        <IconButton>
                            <TbArrowFork />
                        </IconButton>
                        <IconButton>
                            <BsCircle />
                        </IconButton>
                        <IconButton>
                            <BsPentagon />
                        </IconButton>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}