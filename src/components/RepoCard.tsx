import type { Repo } from "../types/github"; // <-- type-only import
import "./RepoCard.css";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div style={{ border: "1px solid #ff0000", padding: 10 }}>
      <a href={repo.html_url} target="_blank">
        <h3>{repo.name}</h3>
      </a>
      ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
      <div>Updated: {new Date(repo.updated_at).toDateString()}</div>
    </div>
  );
}
