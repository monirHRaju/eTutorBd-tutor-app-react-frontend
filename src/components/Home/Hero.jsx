import React from "react";
import Container from "../Shared/Container";
import { Link } from "react-router";

const Hero = () => {
  return (
    <Container>
    <div className="order-2 md:flex justify-center items-center gap-5 mt-16">
      <div className="md:flex-1 space-y-6">
        <div>
          <h1 className="text-6xl font-black my-8 leading-tight">FIND TRUSTED TUTORS NEAR YOU</h1>
          <p className="text-base-300 my-8">
            Post tuition needs or apply as a tutor and connect with <br></br> verified
            students and teachers across Bangladesh.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl">5.1K</h2>
            <p className="text-base-300">Students All <br></br> Over Bangladesh.</p>
          </div>
          <div className="flex my-10">
            <img
              src="https://i.ibb.co.com/Vcq1rM3k/st4.jpg"
              className="rounded-full border-4 w-20 border-white bor "
              alt=""
            />
            <img
              src="https://i.ibb.co.com/x4V7YGj/st3.jpg"
              className="-ml-5 rounded-full border-4 w-20 border-white bor "
              alt=""
            />
            <img
              src="https://i.ibb.co.com/kVsw45gW/st2.jpg"
              className="-ml-5 rounded-full border-4 w-20 border-white bor "
              alt=""
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <Link to={'/tutors'} className="btn btn-primary btn-lg">Find A Tutor</Link>
          <Link to={'/tuitions'} className="text-primary text-2xl font-bold">See Tuitions</Link>
        </div>
      </div>
      <div className="order-1 md:flex-1 p-4 pb-0 object-cover">
        <img src="https://i.ibb.co.com/fGNN1qrp/hero-student-photo.png" className="h-[600px]" alt="" />
      </div>
    </div>
    </Container>
  )
};

export default Hero;
