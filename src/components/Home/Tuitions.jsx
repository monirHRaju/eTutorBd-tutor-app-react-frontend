import React from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Container from "../Shared/Container";
import { motion } from "framer-motion";
import { Link } from "react-router";
const Tuitions = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: tuitions = [] } = useQuery({
    queryKey: ["tuitions", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/not-enrolled-accepted-latest-tuitions"
      );

      return data;
    },
  });
  // console.log(tuitions)
  return (
    <Container>
      {/* <h1>All aps</h1> */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: false }}
        className="my-20"
      >
        <h1 className='text-primary text-6xl font-bold my-20 text-center'>Latest Tuitions</h1>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tuitions.map((tuition, index) => (
            <Card key={index} tuition={tuition} />
          ))}
        </div>
        <div className="flex justify-center my-10">
          <Link to={'/tuitions'} className="btn btn-primary btn-lg">See All Tuitions</Link>
        </div>
      </motion.div>
    </Container>
  );
};

export default Tuitions;
