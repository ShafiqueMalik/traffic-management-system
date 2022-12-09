import { Box } from "@mui/material";
import logoWhite100 from "assets/images/logo-white100.png";

const WhiteLogo = ({ sx }: any) => {
  return (
    <Box component="img" src={logoWhite100} alt="logo white 100"
      sx={sx}
    />
  )
}

export default WhiteLogo
