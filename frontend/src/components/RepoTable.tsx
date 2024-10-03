import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import data from "../data/dummy.json";

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
    field: "open_issues",
    headerName: "Open Issues",
    width: 160,
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
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.open(params.row.html_url, "_blank");
          }}
        >
          Go to Repo
        </Button>
      );
    },
  },
];

const rows = data.items;

export default function RepoTable() {
  console.log(data.items.length);
  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
