import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomAccordion from 'components/CustomAccordion/CustomAccordion';
import MoreIcon from '@mui/icons-material/More';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LayersIcon from '@mui/icons-material/Layers';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import RouteIcon from '@mui/icons-material/Route';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';


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
                    "& .MuiTab-root": { p: 0, minWidth: "50px!important" }
                }}
            >
                <Tab icon={<MoreIcon />}  {...a11yProps(0)} />
                <Tab icon={<LibraryAddCheckIcon />}  {...a11yProps(1)} />
                <Tab icon={<LayersIcon />}  {...a11yProps(2)} />
            </Tabs>
            <Box sx={{ flex: 1 }}>
                <TabPanel value={value} index={0}>
                    <Box bgcolor="#E3E3E3" sx={{ flex: 1, p: "0" }}>
                        <CustomAccordion />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box sx={{bgcolor:"purple",color:"white"}}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis beatae mollitia tempore officiis illo! Inventore eos culpa distinctio veritatis ullam reprehenderit obcaecati cum numquam debitis molestias nostrum recusandae delectus odit fuga, consectetur, quia velit eligendi pariatur nulla vero facilis autem consequuntur repellendus? Sit cum dignissimos dicta deserunt consequuntur nihil quod!
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                <Box sx={{bgcolor:"orange",color:"white"}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate corrupti esse, recusandae nobis excepturi odit modi, cum provident, perspiciatis cumque atque. Officiis id consequatur officia, saepe perferendis reiciendis voluptatem dolorem, repellendus sapiente quis asperiores culpa adipisci, quod sequi ab! Quam saepe, est dolorem hic iste a quas. Repudiandae, iusto placeat.
                  </Box>
                </TabPanel>
            </Box>
        </Box>
    );
}