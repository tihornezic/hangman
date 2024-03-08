import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchHighScoreData } from "../../redux/scoreSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { calculateScore } from "../../helpers/helpers";

const columns: GridColDef[] = [
  { field: "userName", headerName: "User name", flex: 1 },
  {
    field: "errors",
    headerName: "Score",
    flex: 1,
    valueFormatter: (params) => {
      const score = calculateScore(params.value);

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
            sortModel: [{ field: "errors", sort: "asc" }],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export default HighScores;
