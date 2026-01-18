import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepos, fetchOrg } from "./api/github";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import Skeleton from "./components/Skeleton";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

/* ✅ THIS IS USED */
const getInitialTheme = () =>
  localStorage.getItem("theme") ?? "dark";

export default function App() {
  /* ✅ ADD THIS */
  const [theme, setTheme] = useState(getInitialTheme);

  const [org, setOrg] = useState(localStorage.getItem("org") || "");
  const debouncedOrg = useDebounce(org);

  /* ✅ APPLY THE THEME TO <html> */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("org", org);
  }, [org]);

  const orgQuery = useQuery({
    queryKey: ["org", debouncedOrg],
    queryFn: () => fetchOrg(debouncedOrg),
    enabled: !!debouncedOrg,
    staleTime: 1000 * 60 * 5,
  });

  const repoQuery = useQuery({
    queryKey: ["repos", debouncedOrg],
    queryFn: () => fetchRepos(debouncedOrg, 1),
    enabled: !!debouncedOrg,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="container">
      {/* HEADER */}
      <header>
        <h1>GitHub Organization Dashboard</h1>
        <p className="subtitle">
          Search and explore public repositories
        </p>

        {/* ✅ DARK MODE TOGGLE */}
        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* SEARCH */}
      <SearchBar value={org} onChange={setOrg} />

      {/* ORG STATE */}
      {orgQuery.isLoading && <Skeleton />}
      {orgQuery.isError && (
        <p className="state error">❌ Organization not found</p>
      )}

      {orgQuery.data && (
        <div className="org-info">
          <img
            src={orgQuery.data.avatar_url}
            alt="org avatar"
            className="avatar"
          />
          <h2>{orgQuery.data.login}</h2>
        </div>
      )}

      {/* REPO STATE */}
      {repoQuery.isLoading && (
        <div className="grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      )}

      {repoQuery.data && <RepoList repos={repoQuery.data} />}
    </div>
  );
}
