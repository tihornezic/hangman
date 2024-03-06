import FormControl, { useFormControl } from "@mui/material/FormControl";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import CustomInputContext from "./CustomInputContext";
import CustomInputText from "./components/custom-inputs/CustomInputText";
import CustomFormHelperText from "./components/CustomFormHelperText";
import { CustomInputProps } from "./types";

const FormHelperText = ({
  helper,
  defaultHelperText,
}: {
  helper?: FieldError | undefined;
  defaultHelperText?: string;
}) => {
  const { error } = useFormControl() || {};

  return (
    <>
      {error && (
        <CustomFormHelperText error={error}>
          {helper?.message || defaultHelperText}
        </CustomFormHelperText>
      )}
    </>
  );
};

const CustomInput = ({
  name,
  type,
  adornment,
  placeholder,
  disabled = false,
  input,
  defaultHelperText,
  required = false,
  customRequiredMessage,
  validationRegEx,
  // validate,
  rules,
  sx,
}: CustomInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required
          ? customRequiredMessage || "This field is required"
          : false,
        pattern: validationRegEx,
        // validate: (value) => validate?.(value),
        ...rules,
      }}
      render={({ field, fieldState }) => {
        const hasError = fieldState.error !== undefined;
        const context = {
          name,
          type,
          adornment,
          placeholder,
          disabled,
          useFormContext,
          field,
          hasError,
        };

        return (
          <CustomInputContext.Provider value={context}>
            <FormControl error={hasError} sx={{ ...sx }}>
              {input}

              <FormHelperText
                helper={fieldState.error}
                defaultHelperText={defaultHelperText}
              />
            </FormControl>
          </CustomInputContext.Provider>
        );
      }}
    />
  );
};

CustomInput.Text = CustomInputText;

export default CustomInput;
