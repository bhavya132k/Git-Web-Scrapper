import { Repo } from "./types/Repo";

export function getHumanReadableDate(dateStr: string | null): string {
  const date = dateStr ? new Date(dateStr) : "N/A";

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  const humanReadableDate = date.toLocaleString("en-US", options);

  return humanReadableDate;
}

export const calculatePluggabilityScore = (repo: Repo) => {
  let score = 0;

  if ((repo.stars ?? 0) > 1000) {
    score += 60;
  } else if ((repo.stars ?? 0) > 100) {
    score += 40;
  } else if ((repo.stars ?? 0) > 10) {
    score += 20;
  }

  if ((repo.forks ?? 0) > 1000) {
    score += 15;
  } else if ((repo.forks ?? 0) > 100) {
    score += 10;
  } else if ((repo.forks ?? 0) > 10) {
    score += 5;
  }

  const description = repo.description ? repo.description.toLowerCase() : "";

  if (description.includes("plugin")) {
    score += 5;
  }
  if (description.includes("api")) {
    score += 5;
  }
  if (description.includes("extension")) {
    score += 5;
  }
  if (description.includes("modular")) {
    score += 5;
  }

  return score;
};
export const calculateExtensibilityScore = (repo: Repo) => {
  let score = 0;

  if ((repo.stars ?? 0) > 1000) {
    score += 15;
  } else if ((repo.stars ?? 0) > 100) {
    score += 10;
  } else if ((repo.stars ?? 0) > 10) {
    score += 5;
  }

  if ((repo.forks ?? 0) > 1000) {
    score += 55;
  } else if ((repo.forks ?? 0) > 100) {
    score += 40;
  } else if ((repo.forks ?? 0) > 10) {
    score += 20;
  }

  const description = repo.description ? repo.description.toLowerCase() : "";

  if (description.includes("extensible")) {
    score += 5;
  }
  if (description.includes("module")) {
    score += 5;
  }
  if (description.includes("framework")) {
    score += 5;
  }
  if (repo.is_template) {
    score += 5;
  }

  return score;
};
