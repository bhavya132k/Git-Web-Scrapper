import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Link,
  Chip,
  Backdrop,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RepoCard from "./RepoCard";
import { useRepoContext } from "../hooks/useRepoContext";
import { useEffect, useState, useReducer } from "react";
import {
  calculatePluggabilityScore,
  calculateExtensibilityScore,
} from "../utils";
import ErrorComponent from "./ErrorComponent";
import { getHumanReadableDate } from "../utils";

const fetchData = async (owner: string, repo_name: string) => {
  const response = await fetch(
    `http://localhost:3000/scrape-dependencies/${owner}/${repo_name}`
  ); // replace with your API URL
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

interface Dependency {
  name: string;
  version: string;
  url: string;
  dependencies?: Dependency[];
}

interface State {
  data: { dependencies: Dependency[] } | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: { dependencies: Dependency[] } }
  | { type: "FETCH_FAILURE"; payload: string };

const initialState: State = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export default function RepoDetails() {
  const { repos } = useRepoContext();
  const { repoId } = useParams();
  const repo = repos.find((item) => item.id === Number(repoId));
  const [plugability, setPlugability] = useState<string | number>("N/A");
  const [extensibility, setExtensibility] = useState<string | number>("N/A");
  const [total, setTotal] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nestedDependencies, setNestedDependencies] = useState<{
    [key: string]: Dependency[];
  }>({});
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [error, setError] = useState<string | null>(null);

  if (!repo) {
    return <ErrorComponent message="Repository not found." />;
  }

  useEffect(() => {
    console.log("Calculating scores for: ", repo);
    setPlugability(calculatePluggabilityScore(repo));
    console.log("Plugability Score: ", plugability);
    setExtensibility(calculateExtensibilityScore(repo));
    console.log("Extensibility Score: ", extensibility);
  }, [repo]);

  useEffect(() => {
    const fetchDependencies = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        if (repo.owner && repo.owner.login && repo.name) {
          const result = await fetchData(repo.owner.login, repo.name);
          setTotal(result.dependencies.length);
          dispatch({ type: "FETCH_SUCCESS", payload: result });
        } else {
          throw new Error("Repository owner or name is missing");
        }
      } catch (error: any) {
        dispatch({ type: "FETCH_FAILURE", payload: error.message });
        setError(error.message);
      }
    };

    if (repo.owner && repo.owner.login && repo.name) {
      fetchDependencies();
    }

    return () => {
      console.log("Cleanup");
    };
  }, [repo]);

  const handleAccordionClick = async (dep: Dependency, level: number) => {
    const urlSplit = dep.url.split("/");
    const owner = urlSplit[3];
    const repo_name = urlSplit[4];

    if (owner === "N/A" || repo_name === "N/A") {
      return;
    }

    const key = `${dep.name}-${level}`;

    if (!nestedDependencies[key]) {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      try {
        const result = await fetchData(owner, repo_name);
        setNestedDependencies((prev) => ({
          ...prev,
          [key]: result.dependencies,
        }));
        setTotal((prevTotal) => prevTotal + result.dependencies.length);
      } catch (error) {
        console.error("Error fetching nested dependencies:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }
    }
  };

  const renderDependencies = (dependencies: Dependency[], level: number) => {
    return dependencies.map((dep) => {
      const key = `${dep.name}-${level}`;
      return (
        <Accordion key={key}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${key}-content`}
            id={`${key}-header`}
            onClick={() => handleAccordionClick(dep, level)}
          >
            <Typography>
              {dep.name}{" "}
              <Chip
                variant="outlined"
                size="small"
                label={"Version: " + dep.version}
              />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {loadingStates[key] ? (
              <CircularProgress />
            ) : nestedDependencies[key] ? (
              renderDependencies(nestedDependencies[key], level + 1)
            ) : (
              <Typography>No nested dependencies</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <Box display="flex" flexDirection="row" p={2}>
      <Box flex={1} p={2}>
        <Box p={2}>
          <Typography variant="h5">{repo.name}</Typography>
          <Typography variant="body1">{repo.description}</Typography>
          <Stack spacing={1} direction="column" mt={2}>
            <RepoCard
              heading="Plugability"
              content="Plugability score is based on stars, forks and keywords (plugin, API) in description with specified thresholds."
              score={plugability}
            />
            <RepoCard
              heading="Extensibility"
              content="Extensibility score is calculated using forks,stars and extensibility criteria (extensible, module, framework, template) with defined thresholds."
              score={extensibility}
            />
            <RepoCard
              heading="Support"
              content={
                "last_updated at :" +
                getHumanReadableDate(
                  repo.updated_at ? repo.updated_at.toString() : "N/A"
                )
              }
            />
            <RepoCard
              heading="Origin and Pedigree"
              content={
                repo.owner ? (
                  <Box>
                    <Avatar src={repo.owner.avatar_url} />
                    <Link href={repo.owner.url}>{repo.owner.login}</Link>
                  </Box>
                ) : (
                  "N/A"
                )
              }
            />
            <RepoCard
              heading="License"
              content={repo.license ? repo.license.name : "N/A"}
            />
          </Stack>
        </Box>
      </Box>
      <Box flex={2} p={2} maxHeight={"100vh"}>
        {state.isLoading ? (
          <>
            {[1,2,3,4,5,6,7,8,9,10].map((item) => (
              <Skeleton key={item} animation="wave" height={50} />
            ))}
          </>
        ) : state.isError ? (
          <ErrorComponent
            message={"Error Fetching dependencies because of " + state.error}
          />
        ) : state.data?.dependencies.length === 0 ? (
          <ErrorComponent message="No dependencies found for this repository." />
        ) : (
          <Card>
            <Box p={2}>
              <Typography variant="h5">
                Dependency Tree{" "}
                <Chip
                  variant="outlined"
                  label={"Total Dependencies: " + total}
                  color="primary"
                />
              </Typography>
              <Divider />
              <Box mt={2}>
                {state.data?.dependencies &&
                  renderDependencies(state.data.dependencies, 1)}
              </Box>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
}
