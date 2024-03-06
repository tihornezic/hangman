import { OutlinedTextFieldProps, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
  RegisterOptions,
  Validate,
  ValidationRule,
  FieldPath,
} from "react-hook-form";

export type CommonProps = {
  name: string;
  type?: OutlinedTextFieldProps["type"];
  adornment?: {
    icon: ReactNode;
    onClick?: () => void;
  };
  placeholder?: string;
  disabled?: boolean;
};

export type CustomInputProps<
  // TFieldValues extends FieldValues,
  // TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  input: ReactNode;
  defaultHelperText?: string;
  required?: boolean;
  customRequiredMessage?: string;
  validationRegEx?: ValidationRule<RegExp>;
  // validate?: Validate<string, TFieldValues>;
  rules?: Omit<
    // RegisterOptions<TFieldValues, TName>,
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  sx?: SxProps<Theme>;
} & CommonProps;

export type CustomInputContext = {
  useFormContext: () => UseFormReturn;
  field: ControllerRenderProps<FieldValues, string>;
  hasError: boolean;
} & CommonProps;
