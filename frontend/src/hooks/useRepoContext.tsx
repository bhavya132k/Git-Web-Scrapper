import React, { createContext, useContext, useState, useEffect } from "react";
import { Repo } from "../types/Repo";

type RepoContextType = {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  page: number;
  addPage: (page: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  repos: Repo[];
  loading: boolean;
  fetchRepos: () => void;
  error: boolean;
  errorMessage: string;
  totalCount: number;
};

export const RepoContext = createContext<RepoContextType | undefined>(
  undefined
);

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pages, setPages] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const controller = new AbortController();
  const signal = controller.signal;

  const fetchRepos = (clearRepos: boolean = false) => {
    if (!navigator.onLine) {
      setError(true);
      setErrorMessage("No internet connection");
      return;
    }
    setError(false);
    setLoading(true);
    fetch(
      `http://localhost:3000/api?keywords=${value.join(",")}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            console.log(result);
            setTotalCount(result.total_count);
            if (clearRepos) {
              setRepos(result.items);
            } else {
              setRepos((prevRepos) => [...prevRepos, ...result.items]);
            }
            console.log(repos);
            setLoading(false);
          });
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
        if (error.name === "AbortError") {
          return;
        }
        setError(true);
        setErrorMessage("Failed to fetch");
      });
  };

  function abortFetching() {
    console.log("Fetching aborted");
    // Abort.
    controller.abort();
  }

  useEffect(() => {

    fetchRepos(true);
    setPages([]);
    setPage(1);
    return () => {
      abortFetching();
      setRepos([]);
    };
  }, [value]);

  useEffect(() => {
    console.log("Page:", page);
    if (!pages.includes(page)) {
      setPages([...pages, page]);
      fetchRepos();
    }

    setPage(page);

    return () => {
      abortFetching();
      setPages([]);
    };
  }, [page]);

  const addPage = (page: number) => {
    if (!pages.includes(page)) {
      setPages([...pages, page]);
      setPage(page);
    }
  };

  return (
    <RepoContext.Provider
      value={{
        value,
        setValue,
        page,
        setPage,
        addPage,
        repos,
        totalCount,
        loading,
        fetchRepos,
        error,
        errorMessage,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
