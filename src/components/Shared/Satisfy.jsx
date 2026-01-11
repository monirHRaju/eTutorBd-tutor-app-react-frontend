import React from "react";
import Container from "./Container";
import { motion } from "framer-motion";

const Satisfy = () => {
  return (
    <div className="bg-secondary h-35">
      <Container>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false }}
          className="mb-20"
        >
          <div className="p-4 flex justify-around">
            <div className="text-white flex flex-col border-l p-5 border-white">
              <h1 className="text-3xl font-black">640</h1>
              <p>Success Story</p>
            </div>

            <div className="text-white flex flex-col border-l p-5 border-white">
              <h1 className="text-3xl font-black">264</h1>
              <p>Expert Tutors</p>
            </div>

            <div className="text-white flex flex-col border-l p-5 border-white">
              <h1 className="text-3xl font-black">1340</h1>
              <p>Tuitions</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Satisfy;
