import { FaChalkboardTeacher, FaUserGraduate, FaClock, FaBookOpen } from "react-icons/fa";
import Container from "../Shared/Container";
import SectionHeader from "../Shared/SectionHeader";

const features = [
  {
    id: 1,
    title: "Expert Tutors",
    description:
      "Learn from experienced and verified tutors who are experts in their subjects.",
    icon: <FaChalkboardTeacher />,
  },
  {
    id: 2,
    title: "Personalized Learning",
    description:
      "Get one-to-one guidance and customized study plans based on your needs.",
    icon: <FaUserGraduate />,
  },
  {
    id: 3,
    title: "Flexible Schedule",
    description:
      "Attend classes at your convenient time with recorded sessions available.",
    icon: <FaClock />,
  },
  {
    id: 4,
    title: "Comprehensive Materials",
    description:
      "Access notes, assignments, quizzes, and recorded lectures anytime.",
    icon: <FaBookOpen />,
  },
];

const Features = () => {
  return (
    <Container>
      <section className="my-20 px-4">
        <SectionHeader label="Features" title="Why Choose Our Tutoring Platform" subtitle="Experience the benefits of personalized learning with our expert tutors." />
      <div className="max-w-screen-2xl mx-auto rounded-3xl bg-gradient-to-r from-[#06B6D4] to-[#4ae4ff] text-white p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex gap-4 ${
                index !== features.length - 1
                  ? "lg:border-r border-white/30 lg:pr-6"
                  : ""
              }`}
            >
              <div className="text-3xl bg-white/20 p-3 rounded-xl h-fit">
                {feature.icon}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Container>
  );
};

export default Features;
