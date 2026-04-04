export const getMyApplications = async (email) => {
  const res = await fetch(
    `${import.meta.env.VITE_JOBS_URL}/applications?email=${email}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};
