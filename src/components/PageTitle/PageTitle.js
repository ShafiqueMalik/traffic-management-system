import { Box, Typography } from '@mui/material'
import React from 'react'

const PageTitle = ({title,sx}) => {
  return (
    <Box className='page-title' sx={{...sx,mb:2}}>
        <Typography variant="h5">{title}</Typography>
    </Box>
  )
}

export default PageTitle