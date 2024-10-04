import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import data from "../data/dummy.json";

export default function RepoDetails() {
  const { repoId } = useParams();
  const repo = data.items.find((item) => item.id === Number(repoId));

  if (!repo) {
    return <Typography>Repository not found.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {repo.full_name}
      </Typography>
      <Typography variant="h6">Stars: {repo.stargazers_count}</Typography>
      <Typography variant="h6">Forks: {repo.forks_count}</Typography>
      <Typography variant="h6">Open Issues: {repo.open_issues}</Typography>
      <Typography variant="h6">Watchers: {repo.watchers_count}</Typography>
      <Typography variant="h6">Default Branch: {repo.default_branch}</Typography>
      <Typography variant="h6">Language: {repo.language}</Typography>
      <Typography variant="h6">
        GitHub Link:{" "}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.html_url}
        </a>
      </Typography>
      {/* Add more details here as necessary */}
    </Box>
  );
}
