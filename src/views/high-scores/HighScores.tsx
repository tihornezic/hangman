import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchHighScoreData } from "../../redux/highScoreSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const columns: GridColDef[] = [
  { field: "userName", headerName: "User name", flex: 1 },
  {
    field: "errors",
    headerName: "Score",
    flex: 1,
    valueFormatter: (params) => {
      const score = 100 / 1 + params.value;

      return score;
    },
  },
];

const HighScores = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.highScores);

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
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  );
};

export default HighScores;
