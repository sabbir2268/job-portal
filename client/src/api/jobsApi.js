export const jobsCreatedByPromise = (email) => {
  return fetch(
    `${import.meta.env.VITE_JOBS_URL}/jobs/applications?email=${email}`,
  ).then((res) => res.json());
};
