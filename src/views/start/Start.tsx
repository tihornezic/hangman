import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/custom-input/CustomInput";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";
import { clearUserName, setUserName } from "../../redux/gameSlice";

type InputType = {
  name: string;
};

const Start = () => {
  const navigate = useNavigate();
  const { userName, gameId } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const formMethods = useForm<InputType>({
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (formData: InputType) => {
    const hasPlayerName = dispatch(setUserName(formData.name));

    if (hasPlayerName) navigate("./play");
  };

  useEffect(() => {
    if (userName !== "") dispatch(clearUserName());
  }, [userName, dispatch, gameId]);

  return (
    <Stack spacing={7}>
      <Typography variant="h2" color="primary.main">
        Hangman
      </Typography>

      <FormProvider {...formMethods}>
        <Stack component="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            input={<CustomInput.Text />}
            name="name"
            placeholder="Enter your name"
            required
          />

          <Button type="submit" variant="contained">
            Play
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default Start;
