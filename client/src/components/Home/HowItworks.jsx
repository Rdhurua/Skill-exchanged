import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaHandshake } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-5xl text-blue-500" />,
    title: "Sign Up",
    description: "Create an account to start exchanging skills with others.",
  },
  {
    icon: <FaSearch className="text-5xl text-green-500" />,
    title: "Find a Match",
    description: "Browse available skills or list your own to connect with learners and mentors.",
  },
  {
    icon: <FaHandshake className="text-5xl text-purple-500" />,
    title: "Connect & Learn",
    description: "Schedule sessions, communicate, and exchange skills effectively.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 w-72 flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {step.icon}
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
