import React from "react";

const ApplicationCard = ({ app }) => {
  const {
    jobTitle,
    company,
    applicantName,
    applicantEmail,
    linkedin,
    portfolio,
  } = app;

  return (
    <div className="border rounded-2xl shadow-md p-5 bg-base-100 hover:shadow-lg transition">
      {/* Job Info */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold">{jobTitle}</h2>
        <p className="text-gray-500">{company}</p>
      </div>

      {/* Applicant Info */}
      <div className="mb-4">
        <p>
          <span className="font-medium">Name:</span> {applicantName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {applicantEmail}
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          LinkedIn Profile
        </a>

        <a
          href={portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Portfolio
        </a>
      </div>
    </div>
  );
};

export default ApplicationCard;
