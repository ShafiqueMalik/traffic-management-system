import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {
    FormControl, Slider, Select, InputLabel,
    FormGroup, Input, InputAdornment, OutlinedInput, Stack, TextField
} from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import IconButtonComponent from './IconButtonComponent';


import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import FlipIcon from '@mui/icons-material/Flip';
import EditIcon from '@mui/icons-material/Edit';
import StraightenIcon from '@mui/icons-material/Straighten';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteIcon from '@mui/icons-material/Delete';


import LayersIcon from '@mui/icons-material/Layers';
import ShareIcon from '@mui/icons-material/Share';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ColorInputField from './ColorInputField/ColorInputField';

import {BiCrosshair,BiUndo,BiRedo,BiPointer,BiShareAlt} from "react-icons/bi";
import {AiOutlineExpand} from "react-icons/ai";
import {RiRulerLine} from "react-icons/ri";


import {FiMousePointer,FiShare2} from "react-icons/fi";
import {VscSave} from "react-icons/vsc";
import {HiOutlineDocumentSearch} from "react-icons/hi";
import {BsFileMedical} from "react-icons/bs";
import {AiOutlineFileSearch} from "react-icons/ai";




const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const drawerWidth = 60;


function MapPageActionsBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [lineColor, setLineColor] = React.useState("")
    const [fillColor, setFillColor] = React.useState("")
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const undoRedoHandler = (action: string) => {
        if (action === "undo") {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'z', 'ctrlKey': true }));

        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'y', 'ctrlKey': true }));
        }
    }

    const handleShapeDelete = () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Delete' }));
    }

    return (
        <AppBar position="sticky"
            // color="dark"
            sx={{
                bgcolor: "#3C3C3C",
                width: `100%`,
                mt:0,
                top:0,
                "& svg": { fill: "#646464" },
                "& .MuiIconButton-root:hover svg": { fill: "#ffffff" }
            }}>
            <Container maxWidth="xl" sx={{ height: "100%" }}>
                <Toolbar disableGutters sx={{ maxHeight: "50px", minHeight: "50px !important" }}>
                    {/* this is removed and adding new design */}
                    {/* <IconButton color="inherit" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                        <ArrowBackIosNewIcon />
                    </IconButton> */}


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* for big device */}
                    {/* this is removed and adding new design */}
                    {/* <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Stack direction="row" sx={{ flexGrow: 1, ml: 4, display: { xs: 'none', md: 'flex' } }}>
                            <IconButtonComponent icon={<MyLocationIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<LocationOnIcon />} onClick={() => alert(2)} />
                            <Stack direction="row" alignItems="center">
                                <ColorInputField color={lineColor} setColor={setLineColor} text="Line Color" />
                            </Stack>
                        </Stack>

                        <Stack direction="row" sx={{ flexGrow: 1, ml: 4, display: { xs: 'none', md: 'flex' } }}>
                            <IconButtonComponent icon={<StraightenIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<EditIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<FlipIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<HighlightAltIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<UndoIcon />} onClick={() => undoRedoHandler("undo")} />
                            <IconButtonComponent icon={<RedoIcon />} onClick={() => undoRedoHandler("redo")} />
                            <IconButtonComponent icon={<DeleteIcon />} onClick={() => handleShapeDelete()} />
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <ColorInputField color={fillColor} setColor={setFillColor} text="Fill Color" />
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end" sx={{ flexGrow: 1, ml: "auto", display: { xs: 'none', md: 'flex' } }}>
                            <IconButtonComponent icon={<LayersIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<ShareIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<PictureAsPdfIcon />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<WorkspacePremiumIcon />} onClick={() => alert(1)} />
                        </Stack>
                    </Stack> */}

                    <Stack direction="row" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Stack direction="row" 
                        sx={{ flexGrow: 1, mr: "auto", display: { xs: 'none', md: 'flex' } }}>
                            <IconButtonComponent icon={<BiCrosshair />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<AiOutlineExpand />} onClick={() => alert(2)} />
                            <IconButtonComponent icon={<RiRulerLine />} onClick={() => alert(2)} />
                        </Stack>

                        <Stack direction="row" 
                        sx={{   display: { xs: 'none', md: 'flex' } }}>
                            <IconButtonComponent icon={<BiPointer />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<BiUndo />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<BiRedo />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<VscSave />} onClick={() => alert(1)} />
                            <IconButtonComponent icon={<AiOutlineFileSearch />} onClick={() => undoRedoHandler("undo")} />
                            <IconButtonComponent icon={<BiShareAlt />} onClick={() => undoRedoHandler("redo")} />
                            <IconButtonComponent icon={<BsFileMedical />} onClick={() => handleShapeDelete()} />
                        </Stack>

                    </Stack>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MapPageActionsBar;