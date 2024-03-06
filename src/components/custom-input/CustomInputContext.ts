import { createContext, useContext } from "react";
import { CustomInputContext } from "./types";

const CustomInputContext = createContext<CustomInputContext | null>(null);

export const useCustomInputContext = () => {
  const context = useContext(CustomInputContext);

  if (!context) {
    throw new Error(
      "Custom input compound components (CustomInput.*) cannot be rendered outside the CustomInput component."
    );
  }

  return context;
};

export default CustomInputContext;
