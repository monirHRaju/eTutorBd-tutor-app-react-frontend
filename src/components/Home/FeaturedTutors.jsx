import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Container from "../Shared/Container";
import { motion } from "framer-motion";
import TutorInfoCard from "./TutorInfoCard";

const FeaturedTutors = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: tutors = [] } = useQuery({
    queryKey: ["tutors", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/accepted-latest-tutors"
      );

      return data;
    },
  });
  // console.log(tutors)
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
        <h1 className='text-primary text-6xl font-bold my-20 text-center'>Featured Tutors</h1>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tutors.map((tutor, index) => (
            <TutorInfoCard key={index} tutor={tutor} />
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export default FeaturedTutors;
