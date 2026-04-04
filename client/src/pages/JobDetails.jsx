import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const job = useLoaderData();

  if (!job) {
    return <p className="text-center mt-10">Loading job details...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={job.company_logo}
          alt={job.company}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-lg opacity-80">{job.company}</p>
          <p className="text-sm opacity-60">{job.location}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="badge badge-primary">{job.jobType}</span>
        <span className="badge badge-outline">{job.category}</span>
        <span className="badge badge-secondary">{job.status}</span>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-1">Salary</h2>
        <p>
          {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
          {job.salaryRange?.currency?.toUpperCase()}
        </p>
      </div>

      {/* Deadline */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-1">Application Deadline</h2>
        <p>{job.applicationDeadline}</p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Job Description</h2>
        <p className="opacity-80">{job.description}</p>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Requirements</h2>
        <ul className="list-disc pl-5 space-y-1">
          {job.requirements?.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-1">
          {job.responsibilities?.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>

      {/* HR */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">HR Contact</h2>
        <p>Name: {job.hr_name}</p>
        <p>Email: {job.hr_email}</p>
      </div>

      <Link
        to={`/job-apply/${job._id}`}
        className="btn btn-primary btn-wide rounded-xl"
      >
        Apply Now 🚀
      </Link>
    </div>
  );
};

export default JobDetails;
