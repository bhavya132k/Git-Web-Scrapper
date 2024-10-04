import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // useNavigate in the parent component
import data from "../data/dummy.json";

export default function RepoTable() {
  const navigate = useNavigate(); // Hook should be used here, in the parent component

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID"
    },
    {
      field: "full_name",
      headerName: "Repo Name",
      width: 250,
    },
    {
      field: "stargazers_count",
      headerName: "Stars",
      width: 150,
    },
    {
      field: "forks_count",
      headerName: "Forks",
      type: "number",
      width: 150,
    },
    {
      field: "open_issues",
      headerName: "Open Issues",
      width: 160,
    },
    {
      field: "html_url",
      headerName: "Github Link",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Use the navigate function from the parent RepoTable component
            navigate(`/repo/${params.row.id}`);
          }}
        >
          Repo Details
        </Button>
      ),
    },
  ];

  const rows = data.items;

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
