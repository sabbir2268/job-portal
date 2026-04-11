import React from "react";
import { Link } from "react-router";

const PostedJobsCard = ({ job }) => {
  return (
    <div>
      <div
        key={job._id}
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
      >
        <div className="card-body">
          <div className="flex items-center gap-3">
            <img
              src={job.company_logo}
              alt={job.company}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <h2 className="card-title text-lg">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>

          <p className="text-sm mt-2">📍 {job.location}</p>

          <p className="text-sm">💼 {job.jobType}</p>

          <p className="text-sm">🏷️ {job.category}</p>

          <p className="text-sm">
            💰 {job.salaryRange?.min} - {job.salaryRange?.max}{" "}
            {job.salaryRange?.currency}
          </p>

          <p className="text-sm">⏳ Deadline: {job.applicationDeadline}</p>

          <div className="card-actions justify-between mt-4 flex items-center">
            <Link
              to={`/applications/${job._id}`}
              className="btn btn-primary btn-sm"
            >
              view applications
            </Link>
            <p>count: {job.application_Count}</p>
            <span
              className={`badge ${
                job.status === "active" ? "badge-success" : "badge-error"
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobsCard;
