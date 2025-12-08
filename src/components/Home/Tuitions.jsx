import React from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Container from "../Shared/Container";

const Tuitions = () => {

  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: tuitions = [] } = useQuery({
    queryKey: ["tuitions", user?.email],
    queryFn: async () => {
      const {data} = await axiosInstance.get("/tuitions");

      return data;
    },
  });
  console.log(tuitions)
  return (

    <Container>
        <h1>All aps</h1>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          tuitions.map((tuition, index) => <Card key={index} tuition={tuition} />)
        }
      </div>
    </Container>
  );
};

export default Tuitions;
