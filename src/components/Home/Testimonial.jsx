import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionHeader from "../Shared/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "Arafat Hossain",
    role: "HSC Science Student",
    feedback:
      "This platform completely changed the way I study. The tutors are very supportive",
    image: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Class 10 Student",
    feedback:
      "Recorded classes help me revise anytime. Very helpful before exams!",
    image: "https://i.pravatar.cc/100?img=32",
    rating: 5,
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    role: "Admission Candidate",
    feedback:
      "Personalized guidance boosted my confidence and performance.",
    image: "https://i.pravatar.cc/100?img=45",
    rating: 4,
  },
  {
    id: 4,
    name: "Sadia Rahman",
    role: "Class 9 Student",
    feedback:
      "Easy to use and very effective learning experience.",
    image: "https://i.pravatar.cc/100?img=23",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  return (
    <section className="my-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <SectionHeader label="Testimonials" title="What Our Students Say" subtitle="Real feedback from students who improved their learning experience with us." />


        {/* Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          slidesPerGroup={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-full rounded-2xl p-6 shadow-lg">
                
                {/* Rating */}
                <div className="flex mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="mr-1"
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className=" mb-6 leading-relaxed">
                  “{item.feedback}”
                </p>

                {/* User */}
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border-2 border-[var(--color-secondary)]"
                  />
                  <div>
                    <h4 className="font-semibold ">
                      {item.name}
                    </h4>
                    <p className="text-sm ">
                      {item.role}
                    </p>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default TestimonialSlider;
