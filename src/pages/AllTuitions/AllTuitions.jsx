import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Home/Card";
import Container from "../../components/Shared/Container";

const AllTuitions = () => {
  const axiosInstance = useAxios();

  const { data: tuitions = [] } = useQuery({
    queryKey: ["tuitions", 'not-enrolled-accepted'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/not-enrolled-accepted-tuitions"
      );

      return data;
    },
  });

  return (
    <div>
      <Container>
        <h1 className="text-4xl font-bold mt-10 mb-6 text-center">
        All Tuitions
      </h1>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tuitions.map((tuition, index) => (
            <Card key={index} tuition={tuition} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllTuitions;
