import React, { createContext, useContext, useState, useEffect } from "react";
import { Repo } from "../types/Repo";

type RepoContextType = {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  repos: Repo[];
  loading: boolean;
  fetchRepos: () => void;
};

export const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<number[]>([]);

  const fetchRepos = (clearRepos: boolean = false) => {
    setLoading(true);
    fetch(`http://localhost:3000/api?keywords=${value.join(",")}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            console.log(result);
            if (clearRepos) {
              setRepos(result.items);
            } else {
              setRepos((prevRepos) => [...prevRepos, ...result.items]);
            }
            console.log(repos)
            setLoading(false);
          });
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepos(true);
    setPages([]);
  }, [value]);

  useEffect(() => {
    console.log("Page:", page);
    if (!pages.includes(page)) {
      setPages([...pages, page, page + 1]);
      fetchRepos(); 
      setPage(page + 1);
      fetchRepos();
    }
  }, [page]);

  return (
    <RepoContext.Provider value={{ value, setValue, page, setPage, repos, loading, fetchRepos }}>
      {children}
    </RepoContext.Provider>
  );
};