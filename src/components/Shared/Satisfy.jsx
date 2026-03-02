import React from "react";
import Container from "./Container";
import { motion } from "framer-motion";

const Satisfy = () => {
  return (
    <section className="bg-primary py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-around gap-8"
        >
            <div className="text-primary-content flex flex-col border-l p-5 border-primary-content/30">
              <h1 className="text-3xl font-black">640</h1>
              <p>Success Story</p>
            </div>

            <div className="text-primary-content flex flex-col border-l p-5 border-primary-content/30">
              <h1 className="text-3xl font-black">264</h1>
              <p>Expert Tutors</p>
            </div>

            <div className="text-primary-content flex flex-col border-l p-5 border-primary-content/30">
              <h1 className="text-3xl font-black">1340</h1>
              <p>Tuitions</p>
            </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Satisfy;
