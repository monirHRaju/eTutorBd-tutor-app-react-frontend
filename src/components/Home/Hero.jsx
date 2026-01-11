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

  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-base-200/40 via-base-100 to-base-200/30">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center py-12 md:py-0">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 md:space-y-10 order-2 md:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
            >
              Find <span className="text-secondary">Trusted</span> Tutors
              <br />
              Near You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg md:text-xl text-base-content/70 max-w-xl leading-relaxed"
            >
              Post tuition needs or apply as a tutor and connect with verified
              students and qualified teachers across Bangladesh.
            </motion.p>

            {/* Stats + Avatars */}
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              <div>
                <div className="text-4xl md:text-5xl font-bold">5.1K+</div>
                <p className="text-base-content/60 text-sm md:text-base mt-1">
                  Active Students
                  <br />
                  All Over Bangladesh
                </p>
              </div>

              <div className="flex">
                {avatars.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt="student"
                    initial={{ scale: 0.8, x: -20 * (avatars.length - i) }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-16 md:w-20 rounded-full border-4 border-white shadow-md object-cover aspect-square -ml-3 first:ml-0"
                  />
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-5 items-center pt-4"
            >
              <Link
                to="/tutors"
                className="btn btn-secondary btn-lg px-10 shadow-lg shadow-primary/30"
              >
                Find A Tutor
              </Link>
              <Link
                to="/tuitions"
                className="btn btn-outline btn-lg text-lg font-semibold hover:bg-primary/10"
              >
                Browse Tuitions →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative">
              <img
                src="https://i.ibb.co.com/fGNN1qrp/hero-student-photo.png"
                alt="Happy student learning"
                className="w-full max-h-[680px] object-contain mx-auto drop-shadow-2xl"
              />

              {/* Optional subtle floating badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 md:-bottom-10 right-4 md:right-12 bg-secondary text-white px-6 py-3 rounded-2xl shadow-xl text-lg font-bold"
              >
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