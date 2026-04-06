import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// import your auth context if you have one
// import { AuthContext } from "../context/AuthContext";

const MyPostedJobs = () => {
  // const { user } = useContext(AuthContext);
  const userEmail = "hr@techsolutions.com"; // replace with user?.email

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_JOBS_URL}/jobs?hr_email=${userEmail}`,
        );

        setJobs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userEmail]);

  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
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

                <p className="text-sm">
                  ⏳ Deadline: {job.applicationDeadline}
                </p>

                <div className="card-actions justify-end mt-4">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
