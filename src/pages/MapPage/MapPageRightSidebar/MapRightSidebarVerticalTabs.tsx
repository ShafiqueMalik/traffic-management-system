import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomAccordion from 'components/CustomAccordion/CustomAccordion';
import MoreIcon from '@mui/icons-material/More';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LayersIcon from '@mui/icons-material/Layers';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import RouteIcon from '@mui/icons-material/Route';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { AiOutlineProject } from "react-icons/ai"
import { SlLayers } from "react-icons/sl"
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { TfiBlackboard } from "react-icons/tfi"
import { GiPathDistance,GiBlackBook } from "react-icons/gi";
import { FaRoad, FaChessBoard,FaRegObjectGroup } from "react-icons/fa";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import icons from "assets/icons"
import DescriptionIcon from '@mui/icons-material/Description';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import { GoChecklist } from "react-icons/go";
import SettingsIcon from '@mui/icons-material/Settings';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function MapRightSidebarVerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: "row-reverse" }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    bgcolor: "#cccccc", borderColor: 'divider', width: "50px",
                    "& .MuiTabs-indicator": { display: "none" },
                    "& .MuiTab-root": { p: 0, minWidth: "50px!important", minHeight: "40px" },
                    "& .MuiTab-root svg": { fontSize: "22px" },
                    "& .divider": {
                        borderBottom: "1px solid",
                        borderColor: "divider"
                    },
                    "& .MuiTab-root.Mui-selected": {
                       bgcolor:"#FFC001",
                       color:"#ffffff"
                    }
                }}
            >
                <Tab icon={<AiOutlineProject />}  {...a11yProps(0)} />
                <Tab className="divider" icon={<LibraryAddCheckIcon />}  {...a11yProps(1)} />



                <Tab icon={<SlLayers />}  {...a11yProps(2)} />
                <Tab className="divider" icon={<FaRegObjectGroup />}  {...a11yProps(3)} />


                <Tab icon={<CleaningServicesIcon />}  {...a11yProps(4)} />
                <Tab icon={<TfiBlackboard />}  {...a11yProps(5)} />
                <Tab icon={<GiPathDistance />}  {...a11yProps(6)} />
                <Tab icon={<FaRoad />}  {...a11yProps(7)} />
                <Tab className="divider" icon={<ChangeHistoryIcon />}  {...a11yProps(8)} />

                <Tab icon={<GiBlackBook />}  {...a11yProps(9)} />
                <Tab icon={<DescriptionIcon />}  {...a11yProps(10)} />
                <Tab icon={<FaChessBoard />}  {...a11yProps(11)} />
                <Tab className="divider" icon={<ThumbsUpDownIcon />}  {...a11yProps(12)} />

                <Tab icon={<GoChecklist />}  {...a11yProps(13)} />
                <Tab icon={<SettingsIcon />}  {...a11yProps(14)} />


            </Tabs>
            <Box className="right-vertical-tabs-panel-container"
             sx={{ flex: 1,
                position: "relative",
                top: "136px",
            }}
            >
                <TabPanel value={value} index={0}>
                    <Box bgcolor="#E3E3E3" sx={{ flex: 1, p: "0" }}>
                        <CustomAccordion />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box sx={{ bgcolor: "purple", color: "white", height: "400px" }}>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box sx={{ bgcolor: "orange", color: "white", height: "400px" }}>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Box sx={{ bgcolor: "brown", color: "white", height: "400px" }}>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Box sx={{ bgcolor: "blue", color: "white", height: "400px" }}>
                    </Box>
                </TabPanel>
            </Box>
        </Box>
    );
}