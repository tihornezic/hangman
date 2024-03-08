import { SxProps, Typography, Theme } from "@mui/material";
import { fieldStyles } from "../utils";

type RevealedFieldProps = {
  character: string;
  sx?: SxProps<Theme>;
};

const RevealedField = ({ character, sx }: RevealedFieldProps) => (
  <Typography variant="body2" sx={{ ...fieldStyles, ...sx }}>
    {character}
  </Typography>
);

export default RevealedField;
