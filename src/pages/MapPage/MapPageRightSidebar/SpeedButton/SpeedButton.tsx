import React from 'react'

import {IconButton} from '@mui/material'

type SpeedButtonProps = {
    children:React.ReactNode,
    onClick?:()=>void,
    selectedIndex?:number,
    index?:number
}
const SpeedButton = ({children,onClick,selectedIndex,index}:SpeedButtonProps) => {
  return (
    <IconButton className={`${selectedIndex!==undefined && selectedIndex === index?"active":""}`}  onClick={()=>onClick?.()} sx={{
        padding: 0,
        fontSize: "12px",
        width: "25px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid red",
        fontWeight: "bold",
        color: "black",
        "&.active":{
          bgcolor:"#f59b9b"
        }
    }}>{children}</IconButton>
  )
}

export default SpeedButton