import { motion } from "framer-motion";
import Lottie from "lottie-react";
import codingAnimation from "../assets/lottie/Coding.json"; // your lottie file

const Banner = () => {
  return (
    <section className="flex items-center justify-center px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-primary">Vibe Coding</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl opacity-80 mb-8 mx-auto md:mx-0">
            Where creativity meets code. Build modern, aesthetic, and powerful
            web experiences while keeping your flow state alive.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg rounded-2xl"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* RIGHT ANIMATION */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <Lottie animationData={codingAnimation} loop={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
