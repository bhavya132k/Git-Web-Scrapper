import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // useNavigate in the parent component
import data from "../data/dummy.json";
import { Chip, Link, Tooltip, Typography } from "@mui/material";

export default function RepoTable() {
  const navigate = useNavigate(); // Hook should be used here, in the parent component

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hideable: true,
    },
    {
      field: "full_name",
      headerName: "Repo Name",
      width: 250,
      type: "string",
      renderCell: (params) => (
        <Link href={params.row.html_url} target="_blank">
          {params.row.full_name}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 300,
      renderCell: (params) => (
        <Tooltip title={params.row.description ? params.row.description : "N/A"}>
          <Typography variant="body2" noWrap>
            {params.row.description ? params.row.description : "N/A"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "stargazers_count",
      headerName: "stars",
      type: "number",
      width: 40,
    },
    {
      field: "owner.login",
      headerName: "Origin and Pedigree",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Chip label={params.row.owner.login ? params.row.owner.login : "N/A"} />
      ),
    },
    {
      field: "updated_at",
      headerName: "Support ( last updated )",
      width: 250,
    },
    {
      field: "license.name",
      headerName: "License",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Chip
          label={
            params.row.license
              ? params.row.license.name || "No License"
              : "No License"
          }
        />
      ),
    },

    {
      field: "html_url",
      headerName: "Details Page",
      width: 200,
      sortable: false,
      filterable: false,
      type: "actions",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // Use the navigate function from the parent RepoTable component
            navigate(`/repo/${params.row.id}`);
          }}
        >
          View DETAILS
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
