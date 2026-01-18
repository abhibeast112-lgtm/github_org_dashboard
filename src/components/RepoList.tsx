import type { Repo } from "../types/github"; // <-- type-only import
import RepoCard from "./RepoCard";

export default function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </>
  );
}
