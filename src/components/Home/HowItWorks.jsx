import React from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaChalkboardTeacher, FaHandshake } from "react-icons/fa";
import SectionHeader from "../Shared/SectionHeader";

const steps = [
  {
    title: "Post a Tuition",
    desc: "Students submit subject, location, schedule and budget.",
    icon: <FaUserEdit size={34} />,
  },
  {
    title: "Tutors Apply",
    desc: "Verified tutors review tuition details and apply instantly.",
    icon: <FaChalkboardTeacher size={34} />,
  },
  {
    title: "Connect & Start",
    desc: "Select the right tutor and begin your learning journey.",
    icon: <FaHandshake size={34} />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function HowItWorks() {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      
      {/* Soft decorative blur */}
      {/* <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" /> */}

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <SectionHeader label="How It Works" title="Simple 3-Step Process" subtitle="eTutor BD makes tuition matching easy with a simple 3-step process." />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.06,
                y: -10,
              }}
              className="group relative bg-base-100 p-10 rounded-3xl border border-base-300 shadow-md hover:shadow-xl transition"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition" />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 flex justify-center mb-5 text-primary"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {step.icon}
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="relative z-10 font-semibold text-xl mb-2">
                {step.title}
              </h3>
              <p className="relative z-10 text-sm text-base-content/70">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
