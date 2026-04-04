import React, { useContext } from "react";
import {
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ApplyJob = () => {
  const job = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const handleApply = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const application = {
      jobId: job._id,
      jobTitle: job.title,
      company: job.company,
      applicantName: data.name,
      applicantEmail: data.email,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_JOBS_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      });

      const result = await res.json();
      console.log(result);
      if (result.insertedId) {
        alert("Application submitted successfully 🚀");
        navigate("/myApplications");
        // form.reset();
      }
    } catch (err) {
      console.error("Apply failed:", err);
    }

    // use axios after install axios
    // axios
    //   .post("", application)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Apply for {job.title}</h1>

      {/* Job Info */}
      <div className="mb-6 p-4 bg-base-200 rounded-xl">
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleApply} className="space-y-5">
        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text">Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="label">
            <span className="label-text">LinkedIn Profile</span>
          </label>
          <input
            type="url"
            name="linkedin"
            placeholder="https://linkedin.com/in/your-profile"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="label">
            <span className="label-text">Portfolio / GitHub</span>
          </label>
          <input
            type="url"
            name="portfolio"
            placeholder="https://your-portfolio.com"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full rounded-xl">
          Submit Application 🚀
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
