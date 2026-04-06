import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    if (Number(data.min) > Number(data.max)) {
      alert("Min salary cannot be greater than max salary");
      return;
    }

    const formattedData = {
      title: data.title,
      location: data.location,
      jobType: data.jobType,
      category: data.category,
      applicationDeadline: data.applicationDeadline,
      salaryRange: {
        min: Number(data.min),
        max: Number(data.max),
        currency: data.currency,
      },
      description: data.description,
      company: data.company,
      requirements: data.requirements
        ? data.requirements
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      responsibilities: data.responsibilities
        ? data.responsibilities
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : [],
      status: "active",
      hr_email: data.hr_email,
      hr_name: data.hr_name,
      company_logo: data.company_logo,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_JOBS_URL}/jobs`,
        formattedData,
      );

      console.log(res.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Job added successfully 🚀",
        confirmButtonText: "OK",
      });

      // reset form
      e.target.reset();
      navigate("/myPostedJobs");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add job ❌",
      });
    }
  };

  const categories = [
    "Engineering",
    "Marketing",
    "Design",
    "Sales",
    "IT & Networking",
    "Data Science",
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-10">
      <div className="w-full max-w-3xl bg-base-100 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Job</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Job Title"
            className="input input-bordered w-full"
            required
          />

          <input
            name="company"
            placeholder="Company Name"
            className="input input-bordered w-full"
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            required
          />

          <select
            name="jobType"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Job Type</option>
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>

          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Deadline */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold mb-2">
                Application Deadline
              </span>
            </label>
            <input
              type="date"
              name="applicationDeadline"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Salary */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold mb-2">
                Salary Range
              </span>
            </label>

            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="min"
                placeholder="Min"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="max"
                placeholder="Max"
                className="input input-bordered w-full"
                required
              />

              <select name="currency" className="select select-bordered w-full">
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Job Description"
            className="textarea textarea-bordered w-full"
            required
          />

          <input
            name="requirements"
            placeholder="Requirements (comma separated)"
            className="input input-bordered w-full"
          />

          <input
            name="responsibilities"
            placeholder="Responsibilities (comma separated)"
            className="input input-bordered w-full"
          />

          <input
            name="hr_name"
            placeholder="HR Name"
            defaultValue={user.displayName}
            className="input input-bordered w-full"
            required
          />

          <input
            name="hr_email"
            type="email"
            defaultValue={user.email}
            placeholder="HR Email"
            className="input input-bordered w-full"
            required
          />

          <input
            name="company_logo"
            placeholder="Company Logo URL"
            className="input input-bordered w-full"
          />

          <button className="btn btn-primary w-full">Add Job</button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
