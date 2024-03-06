import { ReactNode } from "react";
import MuiFormHelperText from "@mui/material/FormHelperText";
import { SxProps, Theme } from "@mui/material";

interface CustomFormHelperTextProps {
  error: boolean;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const CustomFormHelperText = ({ children, sx }: CustomFormHelperTextProps) => (
  <MuiFormHelperText
    sx={{
      m: 0,
      mt: 0.5,
      ...sx,
    }}
  >
    {children}
  </MuiFormHelperText>
);

export default CustomFormHelperText;
