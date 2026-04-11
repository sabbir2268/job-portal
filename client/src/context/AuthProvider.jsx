import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import axios from "axios";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        axios
          .post(
            `${import.meta.env.VITE_JOBS_URL}/jwt`,
            {
              email: currentUser.email,
            },
            { withCredentials: true },
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_JOBS_URL}/jobs`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const authInfo = {
    user,
    loading,
    jobsLoading,
    createUser,
    loginUser,
    signInWithGoogle,
    logout,
    setUser,
    setLoading,
    setJobsLoading,
    jobs,
    setJobs,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
