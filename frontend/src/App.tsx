import RepoTable from "./components/RepoTable";
// import AppBar  from "@mui/material/AppBar";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useThemeContext from "./hooks/useThemeContext";
// import Container from "@mui/material/Container";

function App() {
  const { theme } = useThemeContext();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Stack spacing={4}>
          <NavBar />
          <SearchBar />
          <RepoTable />
        </Stack>
    </ThemeProvider>
  );
}

export default App;
