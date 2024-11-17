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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import RepoCard from "./RepoCard";
import { useRepoContext } from "../hooks/RepoProvider";

export default function RepoDetails() {
  const {repos} = useRepoContext();
  const { repoId } = useParams();
  const repo = repos.find((item) => item.id === Number(repoId));

  if (!repo) {
    return <Typography>Repository not found.</Typography>;
  }

  const calculatePluggabilityScore = () => {
    return 100;
  };

  const calculateExtensibilityScore = () => {
    return 100;
  };
  const dateStr = repo.updated_at;
  const date = dateStr ? new Date(dateStr) : "N/A";

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  // Convert to human-readable format
  const humanReadableDate = date.toLocaleString("en-US", options);
  console.log(humanReadableDate);

  return (
    <Box display="flex" flexDirection="row" p={2}>
      <Box flex={1} p={2}>
        <Box p={2}>
          <Typography variant="h5">{repo.name}</Typography>
          <Typography variant="body1">{repo.description}</Typography>
          <Stack spacing={1} direction="column" mt={2}>
            {/* use card instead of chip  */}
            <RepoCard
              heading="Pluggability"
              content="Pluggability score is based on stars,forks and keywords (plugin, API) in description with specified thresholds."
              score={calculatePluggabilityScore()}
            />
            <RepoCard
              heading="Extensibility"
              content="Extensibility score is calculated using forks,stars and extensibility criteria (extensible, module, framework, template) with defined thresholds."
              score={calculateExtensibilityScore()}
            />
            <RepoCard
              heading="Support"
              content={"last_updated at :"+ humanReadableDate}
            />
            {/* access "html_url" of owner and make the content a Link component to that user */}
            <RepoCard
              heading="Origin and Pedigree"
              content={repo.owner ? <Box><Avatar src={repo.owner.avatar_url} /> <Link href={repo.owner.url} >{repo.owner.login}</Link></Box> : 'N/A'}
            />
            <RepoCard
              heading="License"
              content={repo.license ? repo.license.name : "N/A"}
            />
          </Stack>
        </Box>
      </Box>
      <Box flex={2} p={2} maxHeight={"100vh"}>
        <Card>
          <Box p={2}>
            <Typography variant="h5">Dependency Tree <Chip label="Total : 5" /></Typography>
            <Divider />
            <Box mt={2}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>Dependency 1</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Dependency 2</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography>Dependency 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="subpanel1-content"
                      id="subpanel1-header"
                    >
                      <Typography>Sub Dependency 3.1</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="subpanel2-content"
                      id="subpanel2-header"
                    >
                      <Typography>Sub Dependency 3.2</Typography>
                    </AccordionSummary>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
