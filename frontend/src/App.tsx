import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RepoTable from "./components/RepoTable";
import RepoDetails from "./components/RepoDetails";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useThemeContext from "./hooks/useThemeContext";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RepoProvider } from "./hooks/RepoProvider";

const qc = new QueryClient();
function App() {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={qc}>
        <Container maxWidth="xl">
          <CssBaseline />
          <Router>
            <RepoProvider>
              <NavBar />
              <SearchBar />
              <Routes>
                <Route path="/" element={<RepoTable />} />
                <Route path="/repo/:repoId" element={<RepoDetails />} />
              </Routes>
            </RepoProvider>
          </Router>
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
