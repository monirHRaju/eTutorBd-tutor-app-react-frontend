import React from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaChalkboardTeacher, FaHandshake } from "react-icons/fa";

const steps = [
  {
    title: "Post a Tuition",
    desc: "Students submit subject, location, schedule and budget.",
    icon: <FaUserEdit size={32} />,
  },
  {
    title: "Tutors Apply",
    desc: "Verified tutors review tuition details and apply instantly.",
    icon: <FaChalkboardTeacher size={32} />,
  },
  {
    title: "Connect & Start",
    desc: "Select the right tutor and begin your learning journey.",
    icon: <FaHandshake size={32} />,
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4 text-center">
        
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-3"
        >
          How the Platform Works
        </motion.h2>

        <p className="text-base-content/70 mb-12 max-w-xl mx-auto">
          eTutor BD makes tuition matching easy with a simple 3-step process.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="bg-base-100 p-8 rounded-2xl shadow border border-base-300"
            >
              <div className="flex justify-center text-primary mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-base-content/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks