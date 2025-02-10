import { useState, useEffect, useMemo } from "react";
import ResultGrid from "./components/ResultGrid";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState<{ title: string; location: string }[]>([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getJobs();
        await getUsers();
      } catch (error) {
        setError(`Failed to fetch: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getJobs = async () => {
    const url = `${BACKEND_URL}/jobs`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    setJobs(data);
  };

  const getUsers = async () => {
    const url = `${BACKEND_URL}/users`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    const data = await response.json();
    setUsers(data);
  };

  const matchJobToUser = (
    bio: string,
    job: { title: string; location: string }
  ) => {
    // split job title and check if they're in the users bio
    const jobKeywords = job.title.toLowerCase().split(" ");

    const titleMatch = jobKeywords.some((keyword) =>
      bio.toLowerCase().includes(keyword)
    );

    return titleMatch;
  };

  const matches = useMemo(() => {
    return users.map((user: { bio: string; name: string }) => {
      const matchedJobs = jobs.filter((job) => matchJobToUser(user.bio, job));
      return { name: user.name, matchedJobs: matchedJobs || [] };
    });
  }, [users, jobs]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return <div>{matches.length > 0 && <ResultGrid data={matches} />}</div>;
}

export default App;
