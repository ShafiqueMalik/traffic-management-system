import { Box } from '@mui/system'
import React from 'react'

type StatusDotProps={
    status:"success" | "warning" | "error"
}
const statusColors ={
    success:"green",
    warning:"orange",
    error:"red"
}
const StatusDot = ({status}:StatusDotProps) => {
  return (
    <Box sx={{width:8,height:8,borderRadius:"50%", bgcolor:statusColors[status]}}/>
  )
}

export default StatusDot