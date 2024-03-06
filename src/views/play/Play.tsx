import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchQuoteData } from "../../redux/quoteSlice";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const navigate = useNavigate();
  const playerName = useAppSelector((state) => state.player.playerName);

  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.quote);

  useEffect(() => {
    if (playerName === "") navigate("/");
  }, [playerName, navigate]);

  useEffect(() => {
    const promise = dispatch(fetchQuoteData());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Stack>
      <Typography>{playerName}</Typography>

      {loading && <Typography variant="h4">loading</Typography>}

      <Typography variant="h4">{data?.content}</Typography>
    </Stack>
  );
};

export default Play;
