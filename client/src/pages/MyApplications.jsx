import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ApplicationCard from "../components/ApplicationCard";
import { jobsCreatedByPromise } from "../api/jobsApi";

const MyApplications = () => {
  const { user } = useContext(AuthContext);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    jobsCreatedByPromise(user.email)
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold">
          My Applications: {applications.length}
        </h1>
      </div>

      {/* Grid */}
      {applications.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No applications found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {applications.map((app) => (
            <ApplicationCard key={app._id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
