import { OutlinedInput } from "@mui/material";
import { useCustomInputContext } from "../../CustomInputContext";

const CustomInputText = () => {
  const { field, placeholder, type, disabled } = useCustomInputContext();

  return (
    <OutlinedInput
      {...field}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
    />
  );
};

export default CustomInputText;
