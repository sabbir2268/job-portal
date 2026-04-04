import React from "react";
import { useNavigate } from "react-router";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const {
    title,
    company,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company_logo,
  } = job;

  return (
    <div className="card bg-base-300 shadow-md hover:shadow-xl transition rounded-2xl p-4 text-left">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={company_logo}
          alt={company}
          className="w-12 h-12 object-contain"
        />
        <div>
          <h2 className="text-lg font-semibold">{company}</h2>
          <p className="text-sm opacity-70">{location}</p>
        </div>
      </div>

      {/* Job Info */}
      <h3 className="text-xl font-bold mb-2 ">{title}</h3>

      <div className="flex flex-wrap gap-2 text-sm mb-3 ">
        <span className="badge badge-primary">{jobType}</span>
        <span className="badge badge-outline">{category}</span>
      </div>

      {/* Salary */}
      <p className="mb-2">
        <span className="font-medium">Salary:</span> {salaryRange?.min} -{" "}
        {salaryRange?.max} {salaryRange?.currency}
      </p>

      {/* Deadline */}
      <p className="mb-3 text-sm opacity-70">Deadline: {applicationDeadline}</p>

      {/* Description */}
      <p className="text-sm opacity-80 line-clamp-3">{description}</p>

      {/* Action */}
      <button
        onClick={() => navigate(`/jobs/${job._id}`)}
        className="btn btn-primary btn-sm mt-4 w-full"
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;
