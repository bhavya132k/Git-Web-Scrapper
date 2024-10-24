import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RepoTable from "./components/RepoTable";
import RepoDetails from "./components/RepoDetails";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useThemeContext from "./hooks/useThemeContext";

function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <CssBaseline />
        <Router>
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path="/" element={<RepoTable />} />
            <Route path="/repo/:repoId" element={<RepoDetails />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
