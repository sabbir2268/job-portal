import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import JobCard from "./JobCard";

const HotJobs = () => {
  const { jobs, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <h1>Total jobs: {jobs.length}</h1>
      <h1 className="text-3xl font-bold mb-8 text-center">Hot Jobs 🔥</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobs?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default HotJobs;
