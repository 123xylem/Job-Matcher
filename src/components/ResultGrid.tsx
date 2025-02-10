import React from "react";

interface ResultGridProps {
  data: {
    name: string;
    matchedJobs: { title: string; location: string }[];
  }[];
}

const ResultGrid: React.FC<ResultGridProps> = ({ data }) => {
  return (
    <div className="result-grid">
      <h1>Result Grid</h1>
      <div className="result-grid-inner">
        {data.map((user) => (
          <div key={user.name} className="result-grid-item">
            <h2>{user.name}</h2>
            <ul>
              {user.matchedJobs.length > 0 ? (
                user.matchedJobs.map((job) => (
                  <li key={job.title + job.location}>
                    <h3>
                      {job.title} -{" "}
                      <span className="meta-info">{job.location}</span>
                    </h3>
                  </li>
                ))
              ) : (
                <p>This user may benefit from refining search keywords</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultGrid;
