import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // useNavigate in the parent component
import { Chip, Link, Tooltip, Typography } from "@mui/material";
import { useRepoContext } from "../hooks/RepoProvider";
import { Repo } from "../types/Repo";
import SearchBar from "./SearchBar";

export default function RepoTable() {
  const navigate = useNavigate(); // Hook should be used here, in the parent component

  const columns: GridColDef[] = [
    {
      field: "full_name",
      headerName: "Repo Name",
      sortable: false,
      filterable: false,
      hideable: false,
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
      sortable: false,
      filterable: false,
      hideable: false,
      width: 300,
      renderCell: (params) => (
        <Tooltip
          title={params.row.description ? params.row.description : "N/A"}
        >
          <Typography variant="body2" noWrap>
            {params.row.description ? params.row.description : "N/A"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "owner.login",
      headerName: "Origin and Pedigree",
      width: 160,
      sortable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => <Chip label={params.row.owner?.login ?? "N/A"} />,
    },
    {
      field: "updated_at",
      headerName: "Support",
      sortable: false,
      filterable: false,
      hideable: false,
      width: 250,
    },
    {
      field: "license.name",
      headerName: "License",
      width: 200,
      sortable: false,
      filterable: false,
      hideable: false,
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
      hideable: false,
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
          View Details
        </Button>
      ),
    },
  ];
  const { repos, setPage } = useRepoContext();

  const rows = repos.map((repo) => {
    return {
      id: repo.id,
      full_name: repo.full_name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      owner: repo.owner,
      updated_at: repo.updated_at,
      license: repo.license,
      html_url: repo.html_url,
    };
  });

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <SearchBar />
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        disableRowSelectionOnClick
        pagination
        pageSizeOptions={[20]}
        onPaginationModelChange={(model) => {
          // only try setting the page if the page is not in pages fetched already
          if (model.page > 0) {
            setPage(model.page);
          }
        }}
      />
    </Box>
  );
}
