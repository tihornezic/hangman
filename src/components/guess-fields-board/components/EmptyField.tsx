import { Box } from "@mui/material";
import { fieldStyles } from "../utils";

const EmptyField = () => (
  <Box
    sx={{
      borderBottom: "2px solid black",
      ...fieldStyles,
    }}
  />
);

export default EmptyField;
