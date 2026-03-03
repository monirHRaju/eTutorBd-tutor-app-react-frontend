import React from "react";
import { motion } from "framer-motion";
import Container from "../Shared/Container";
import { Link } from "react-router"; // fixed import

const Hero = () => {
  const avatars = [
    "https://i.ibb.co.com/Vcq1rM3k/st4.jpg",
    "https://i.ibb.co.com/x4V7YGj/st3.jpg",
    "https://i.ibb.co.com/kVsw45gW/st2.jpg",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    }),
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-base-200/50 via-base-100 to-base-200/40">
      {/* Decorative background blobs */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -top-32 -right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />

      <Container>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-12 md:py-20">
          {/* Left side - Text content */}
          <motion.div
            initial="hidden"
            animate="show"
            className="space-y-7 md:space-y-9 order-2 md:order-1"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs md:text-sm text-primary border border-primary/15"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              Learn smarter with verified tutors
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={0.15}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
            >
              Upgrade your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                learning journey
              </span>
              <br className="hidden sm:block" /> with expert tutors.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.3}
              className="text-base md:text-lg text-base-content/70 max-w-xl leading-relaxed"
            >
              Post tuition needs in minutes or apply as a tutor. eTutor BD
              intelligently connects students with trusted, verified teachers
              in their city and online.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              custom={0.45}
              className="flex flex-wrap gap-4 items-center pt-2"
            >
              <Link
                to="/tutors"
                className="btn btn-primary btn-lg px-10 shadow-lg shadow-primary/30"
              >
                Find a Tutor
              </Link>
              <Link
                to="/tuitions"
                className="btn btn-ghost btn-lg border border-base-300/80 bg-base-100/60 backdrop-blur-md hover:bg-base-200/80"
              >
                Browse Tuitions
              </Link>
            </motion.div>

            {/* Stats + avatars */}
            <motion.div
              variants={fadeUp}
              custom={0.6}
              className="flex flex-wrap items-center gap-6 md:gap-10 pt-4"
            >
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  5.1K+
                </p>
                <p className="text-xs md:text-sm text-base-content/60">
                  Active students & parents
                  <br />
                  across Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {avatars.map((src, i) => (
                    <motion.img
                      key={i}
                      src={src}
                      alt="Student avatar"
                      whileHover={{ y: -3, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-base-100 shadow-md object-cover"
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-base-content/70">
                  Loved by students, trusted by parents.
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="rounded-3xl border border-base-300/60 bg-base-100/80 backdrop-blur-xl shadow-2xl shadow-primary/15 overflow-hidden flex items-center justify-center p-6 md:p-10"
              >
                <img
                  src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?_gl=1*1mgf85l*_ga*MTg5NTI5MTE2MS4xNzY1NzA3MTkz*_ga_8JE65Q40S6*czE3NzI1NTE5MDIkbzkkZzEkdDE3NzI1NTE5NTgkajQkbDAkaDA."
                  alt="Students learning with tutors - education illustration"
                  className="w-full max-h-[420px] md:max-h-[480px] object-contain"
                />
              </motion.div>

              {/* Floating stats card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute -bottom-6 left-3 md:left-8 bg-base-100/95 border border-base-300/60 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-base-content/60">
                    Live tuitions this week
                  </p>
                  <p className="text-sm font-semibold">320+ ongoing sessions</p>
                </div>
              </motion.div>

              {/* Online tutors badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute -top-5 right-3 md:right-8 bg-primary text-primary-content px-4 py-2 rounded-2xl shadow-lg text-xs md:text-sm font-semibold flex items-center gap-2"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/70 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                </span>
                500+ tutors online now
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;