import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../components/custom-input/CustomInput";
import { setPlayerName } from "../../redux/playerSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useEffect } from "react";

type InputType = {
  name: string;
};

const Start = () => {
  const navigate = useNavigate();
  const playerName = useAppSelector((state) => state.player.playerName);
  const dispatch = useAppDispatch();

  const formMethods = useForm<InputType>({
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (formData: InputType) => {
    const hasPlayerName = dispatch(setPlayerName(formData.name));

    if (hasPlayerName) navigate("./play");
  };

  useEffect(() => {
    if (playerName !== "") navigate("/play");
  }, [playerName, navigate]);

  return (
    <Stack spacing={5}>
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
