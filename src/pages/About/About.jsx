import { FaUserGraduate, FaChalkboardTeacher, FaClock, FaShieldAlt } from "react-icons/fa";

const stats = [
  { label: "Students Enrolled", value: "10K+" },
  { label: "Verified Tutors", value: "2K+" },
  { label: "Subjects Covered", value: "50+" },
  { label: "Success Rate", value: "95%" },
];

const features = [
  {
    icon: <FaUserGraduate />,
    title: "Student-Centered Learning",
    desc: "Personalized tuition solutions designed to match every student's needs.",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Verified Expert Tutors",
    desc: "Highly qualified tutors carefully verified for quality and safety.",
  },
  {
    icon: <FaClock />,
    title: "Flexible Scheduling",
    desc: "Learn anytime, anywhere with schedules that fit your lifestyle.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Trusted Platform",
    desc: "Secure communication, verified profiles, and transparent processes.",
  },
];

const About = () => {
  return (
    <main>

      {/* Hero */}
      <section className="py-28 bg-base-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content">
            About eTutor BD
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base-content/70">
            eTutor BD is a modern tuition platform connecting students with
            trusted tutors to make learning accessible, flexible, and effective.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Who We Are
            </h2>
            <p className="text-base-content/70 leading-relaxed">
              We are an education-focused platform built to simplify tuition
              matching. Our goal is to remove the barriers between students and
              quality education by using technology, transparency, and trust.
            </p>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              Whether you are a school student, admission candidate, or guardian,
              eTutor BD helps you find the right tutor with confidence.
            </p>
          </div>

          <div className="bg-base-200 rounded-3xl p-10">
            <h3 className="text-xl font-semibold text-base-content mb-3">
              Our Mission
            </h3>
            <p className="text-base-content/70">
              To empower students through personalized learning and provide
              tutors with meaningful teaching opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
              What We Offer
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-base-content">
              Smart Tuition Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div
                key={i}
                className="bg-base-100 border border-base-300 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-base-content mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-base-content/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-base-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <h3 className="text-4xl font-bold text-primary">
                  {stat.value}
                </h3>
                <p className="mt-2 text-base-content/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Your Learning Journey Today
          </h2>
          <p className="mt-4 text-white/80">
            Join thousands of students and tutors already growing with eTutor BD.
          </p>
          <a
            href="/signup"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-base-100 text-primary font-semibold hover:bg-base-200 transition"
          >
            Get Started
          </a>
        </div>
      </section>

    </main>
  );
};

export default About;
