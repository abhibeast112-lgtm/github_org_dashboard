import type { Repo } from "../types/github"; // <-- use "import type"

import axios from "axios";

const API = axios.create({
  baseURL: "https://api.github.com",
});

export const fetchRepos = async (org: string, page: number) => {
  const res = await API.get<Repo[]>(
    `/orgs/${org}/repos?per_page=10&page=${page}`
  );
  return res.data;
};

export const fetchOrg = async (org: string) => {
  const res = await API.get(`/orgs/${org}`);
  return res.data;
};
