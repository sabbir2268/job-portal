import axios from "axios";
import React from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";

const ViewApplications = () => {
  const { job_id } = useParams();
  const applications = useLoaderData();

  if (applications.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No applications found for this job.
      </div>
    );
  }

  const handleStatusChange = (e, app_id) => {
    console.log(e.target.value, app_id);

    axios
      .patch(`${import.meta.env.VITE_JOBS_URL}/applications/${app_id}`, {
        status: e.target.value,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Status Updated!",
            text: "Applicant status has been changed successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1">Applications for Job</h2>
        <p className="text-gray-500">
          Job ID: <span className="font-mono">{job_id}</span>
        </p>
        <p className="text-gray-400 mt-1">
          Total Applications: {applications.length}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border rounded-2xl p-5 shadow-md bg-base-100 hover:shadow-xl transition flex flex-col justify-between"
          >
            {/* Top Section */}
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {app.applicantName || "Unnamed Applicant"}
              </h3>

              <p className="text-sm text-gray-400 break-all">
                {app.applicantEmail}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2">
              {app.portfolio && (
                <a
                  href={app.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline btn-primary w-full"
                >
                  🌐 Portfolio
                </a>
              )}

              {app.linkedin && (
                <a
                  href={app.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline btn-info w-full"
                >
                  💼 LinkedIn
                </a>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 text-xs text-gray-400">
              Applicant ID: {app._id}
            </div>
            <select
              onChange={(e) => handleStatusChange(e, app._id)}
              defaultValue={app.status}
              className="select"
            >
              <option disabled={true}>Status</option>
              <option>Call For Viva</option>
              <option>Hired</option>
              <option>Rejected</option>
              <option>Waiting list</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
