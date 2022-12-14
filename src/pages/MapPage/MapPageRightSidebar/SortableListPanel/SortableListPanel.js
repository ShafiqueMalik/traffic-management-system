import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable as arrayMove } from "array-move";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import trafficSigns from "assets/traffic-signs";
import {IoReorderFourOutline} from "react-icons/io5"
import { Box, Typography } from "@mui/material";
import PanelHeader from "../PanelHeader/PanelHeader";

const SortableListPanel = () => {
  const [items, setItems] = useState([
    { id: "1", totalNumberOfSign: 2, img: trafficSigns.speed80Sign, text: "Road work ahead" },
    { id: "2", totalNumberOfSign: 3, img: trafficSigns.speed80Sign, text: "Road work ahead" },
    { id: "3", totalNumberOfSign: 4, img: trafficSigns.speed80Sign, text: "Road work ahead" },
    { id: "4", totalNumberOfSign: 5, img: trafficSigns.speed80Sign, text: "Road work ahead" }
  ]);

  console.log(items)
  const onDrop = ({ removedIndex, addedIndex }) => {
    // console.log({ removedIndex, addedIndex });
    setItems(items => arrayMove(items, removedIndex, addedIndex));
  };

  return (
    <Box sx={{p:"10px"}}>
      <PanelHeader text="TGS RESOURCE"/>
      <List>
        <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
          {items.map(({ id, text, totalNumberOfSign, img }) => (
            <Draggable key={id}>
              <ListItem sx={{ gap: 1, py:"8px",px:0}}>
                <Box component="span" fontWeight="bold">{totalNumberOfSign?.toString()?.padStart(2, "0")}</Box>
                <Box component="img" src={img} sx={{ width: "47px", height: "34px" }} />
                <ListItemText primary={text} sx={{ fontSize: "11px", flex: 1 }} />
                <ListItemSecondaryAction sx={{ display: "flex",right:0,cursor:"pointer" }}>
                  <ListItemIcon className="drag-handle" sx={{ minWidth: "24px" }}>
                    <IoReorderFourOutline style={{width:"24px",height:"24px"}}/>
                  </ListItemIcon>
                </ListItemSecondaryAction>
              </ListItem>
            </Draggable>
          ))}
        </Container>
      </List>
    </Box>

  );
};

export default SortableListPanel