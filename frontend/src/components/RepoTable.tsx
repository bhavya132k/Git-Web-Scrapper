import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { Chip, Link, Tooltip, Typography, Box, Button } from "@mui/material";
import { useRepoContext } from "../hooks/useRepoContext";
import SearchBar from "./SearchBar";
import { getHumanReadableDate } from "../utils";
import { Repo } from "../types/Repo";
import ErrorComponent from "./ErrorComponent";

export default function RepoTable() {
  const navigate = useNavigate();
  const { repos, totalCount, loading, error, errorMessage } = useRepoContext();

  const columns = useMemo<MRT_ColumnDef<Repo>[]>(
    () => [
      {
        accessorKey: "full_name",
        header: "Repo Name",
        maxSize: 250,
        Cell: ({ cell }) => (
          <Link href={cell.row.original.html_url} target="_blank">
            {cell.getValue<string>()}
          </Link>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        maxSize: 400,
        Cell: ({ cell }) => (
          <Tooltip title={cell.getValue<string>() || "N/A"}>
            <Typography variant="body2" noWrap>
              {cell.getValue<string>() || "N/A"}
            </Typography>
          </Tooltip>
        ),
      },
      {
        accessorKey: "owner.login",
        header: "Origin and Pedigree",
        size: 160,
        Cell: ({ cell }) => <Chip label={cell.getValue<string>() || "N/A"} />,
      },
      {
        accessorKey: "updated_at",
        header: "Support",
        size: 250,
        Cell: ({ cell }) => (
          <Typography variant="body2">
            {cell.getValue<string>()
              ? getHumanReadableDate(cell.getValue<string>())
              : "N/A"}
          </Typography>
        ),
      },
      {
        accessorKey: "license.name",
        header: "License",
        size: 200,
        Cell: ({ cell }) => (
          <Chip label={cell.getValue<string>() || "No License"} />
        ),
      },
      {
        accessorKey: "html_url",
        header: "Details Page",
        size: 200,
        Cell: ({ cell }) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/repo/${cell.row.original.id}`)}
          >
            View Details
          </Button>
        ),
      },
    ],
    [navigate]
  );

  if (error) {
    return <ErrorComponent message={errorMessage} />;
  }

  return (
    <Box sx={{ height: "90%", width: "100%" }}>
      <SearchBar />
      <MaterialReactTable
        columns={columns}
        data={repos}
        enableColumnResizing={true}
        rowCount={totalCount}
        enableTopToolbar={false}
        enableSorting={false}
        enableFilters={false}
        enableColumnActions={false}
        enablePagination={true}
        state={{
          isLoading: loading,
        }}
        initialState={{
          pagination: {
            pageIndex: 0,
            pageSize: 20,
          },
        }}
        // onPaginationChange={}
        muiPaginationProps={{
          showRowsPerPage: false,
          showFirstButton: false,
          showLastButton: false,
        }}
      />
    </Box>
  );
}
