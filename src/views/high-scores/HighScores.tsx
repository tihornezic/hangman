import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchHighScoreData } from "../../redux/scoreSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { calculateScoreSmarter } from "../../helpers/helpers";

const columns: GridColDef[] = [
  { field: "userName", headerName: "User name", flex: 1 },
  {
    field: "score",
    headerName: "Score",
    flex: 1,
    valueGetter: (params) => {
      const quoteLength = params.row.length;
      const uniqueCharacters = params.row.uniqueCharacters;
      const errors = params.row.errors;
      const solvingTime = params.row.duration;

      const score = calculateScoreSmarter(
        quoteLength,
        uniqueCharacters,
        errors,
        solvingTime
      );

      return score;
    },
  },
];

const HighScores = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.highScores);

  useEffect(() => {
    const promise = dispatch(fetchHighScoreData());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <Box sx={{ height: 420, width: "65%" }}>
      <DataGrid
        loading={loading}
        rows={data ?? []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
          sorting: {
            sortModel: [{ field: "score", sort: "desc" }],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export default HighScores;
