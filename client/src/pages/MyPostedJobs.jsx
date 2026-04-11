import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { jobsCreatedByPromise } from "../api/jobsApi";
import { Link } from "react-router";
import PostedJobsCard from "../components/PostedJobsCard";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsCreatedByPromise(userEmail);
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchJobs();
    }
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
          {jobs.map((job, index) => (
            <PostedJobsCard job={job} key={index}></PostedJobsCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
