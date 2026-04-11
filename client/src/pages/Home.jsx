import { motion } from "motion/react";
import Banner from "../components/Banner";
import HotJobs from "../components/HotJobs";
const Home = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* HERO SECTION */}
      {/* <Banner></Banner> */}

      {/* FEATURES SECTION */}
      {/* <section className="grid md:grid-cols-3 gap-6 px-6 pb-20 max-w-6xl mx-auto">
        <div className="bg-base-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">⚡ Fast Development</h2>
          <p className="opacity-70">
            Build projects quickly with modern tools like React, Tailwind, and
            component-driven design.
          </p>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">🎨 Aesthetic UI</h2>
          <p className="opacity-70">
            Focus on clean, minimal, and beautiful interfaces that feel good to
            use and build.
          </p>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-3">🚀 Real Projects</h2>
          <p className="opacity-70">
            Learn by building real-world applications that actually matter and
            level up your dev skills.
          </p>
        </div>
      </section> */}

      <section className="bg-base-100 py-5 px-6 text-center">
        <HotJobs></HotJobs>
      </section>
    </div>
  );
};

export default Home;
