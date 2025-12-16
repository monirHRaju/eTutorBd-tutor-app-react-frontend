import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TutorInfoCard from '../../components/Home/TutorInfoCard';
import Container from '../../components/Shared/Container';

const Tutors = () => {
  const axiosInstance = useAxios();

  const { data: tutors = [] } = useQuery({
    queryKey: ["tutors", 'accepted'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/tutors"
      );

      return data;
    },
  });

  return (
    <div>
      <Container>
        <h1 className="text-4xl font-bold mt-10 mb-6 text-center text-primary">
        All Tutors
      </h1>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tutors.map((tutor, index) => (
            <TutorInfoCard key={index} tutor={tutor} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Tutors;