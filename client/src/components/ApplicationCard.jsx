import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ApplicationCard = ({ app }) => {
  const { jobs } = useContext(AuthContext);
  const { jobId } = app;

  // find the matched job
  const matchedJob = jobs?.find((job) => job._id === jobId);

  if (!matchedJob) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="border rounded-2xl shadow-md p-5 bg-base-100 hover:shadow-lg transition">
      {/* Job Info */}
      <div className="mb-3">
        <h1>Job Id: {matchedJob._id}</h1>
        <h2 className="text-xl font-semibold">Job Title: {matchedJob.title}</h2>
        <p className="text-gray-400">Company: {matchedJob.company}</p>
        <p className="text-gray-500">Location: {matchedJob.location}</p>
      </div>
    </div>
  );
};

export default ApplicationCard;
