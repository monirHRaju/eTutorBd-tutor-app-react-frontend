import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TutorInfoCard from '../../components/Home/TutorInfoCard';
import Container from '../../components/Shared/Container';
import SectionHeader from '../../components/Shared/SectionHeader';

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
        <SectionHeader label="Tutors" title="Meet Our Expert Tutors" subtitle="Discover highly qualified and experienced tutors ready to guide your learning journey." />
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