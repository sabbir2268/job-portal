export const jobsCreatedByPromise = (email) => {
  return fetch(`${import.meta.env.VITE_JOBS_URL}/jobs?email=${email}`).then(
    (res) => res.json(),
  );
};
