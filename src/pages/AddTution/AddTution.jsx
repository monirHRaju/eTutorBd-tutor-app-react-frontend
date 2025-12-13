import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddTution = () => {
  const [classes, setClasses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    fetch("/classes.json")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error("Error loading classes:", err));
  }, []);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  const handleTuitionSubmit = async (data) => {
    data.studentName = user.displayName;
    data.studentEmail = user.email;
    data.studentId = user.uid;
    data.status = "pending";

    // console.log(data);

    try {
       await axiosSecure.post("/tuitions", data).then((res) => {
      // console.log("Tuition Added, inserted Id:", res.data.insertedId);
      
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Tuition Created Success. Please wait for admin approval.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
       reset()
    });
    } catch (error) {
      console.error(error);
    }


  } 

  return (
    <Container>
      {/* required fields: class, budget, location, subject, schedule */}
    
        <div className="mb-8 text-center">
          <h1 className="my-8 text-primary text-4xl font-bold">Add Tuition</h1>
          <p className="text-2xl text-gray-400">
            Submit Your Tuition Information
          </p>
        </div>
        <form onSubmit={handleSubmit(handleTuitionSubmit)}>
          <div className="lg:flex lg:justify-around gap-5  mt-10 rounded-md sm:p-10 bg-gray-100 text-gray-900">
            {/* left side form */}
            <div className="flex-1 min-w-[450px] p-8">
              <div className="space-y-4">
                {/* subject */}
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm">
                    Subject (s)
                  </label>
                  <input
                    type="text"
                    {...register("subject", {
                      required: "subject is required",
                      minLength: {
                        value: 4,
                        message: "subject must at least 4 characters.",
                      },
                    })}
                    id="subject"
                    placeholder="Enter Your subject Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.subject && (
                    <p className="text-error text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Medium */}
                <div>
                  <label htmlFor="medium" className="block mb-2 text-sm">
                    Student Gender
                  </label>
                  <select
                    {...register("medium", { required: "Medium is required" })}
                    id="medium"
                    className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                    defaultValue="Select Medium"
                  >
                    <option disabled={true}>Select Medium</option>

                    <option>Bangla</option>
                    <option>English</option>
                  </select>
                  {errors.medium && (
                    <p className="text-error text-sm mt-1">
                      {errors.medium.message}
                    </p>
                  )}
                </div>

                {/* class */}
                <div>
                  <label htmlFor="className" className="block mb-2 text-sm">
                    Class
                  </label>
                  <select
                    {...register("className", { required: "class is required" })}
                    id="className"
                    className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                    defaultValue="Pick a class"
                  >
                    <option disabled={true}>Pick a class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name}
                      </option>
                    ))}
                  </select>

                  {errors.className && (
                    <p className="text-error text-sm mt-1">
                      {errors.className.message}
                    </p>
                  )}
                </div>

                {/* District */}
                <div>
                  <label htmlFor="district" className="block mb-2 text-sm">
                    Your District
                  </label>
                  <select
                    {...register("district", {
                      required: "district is required",
                    })}
                    id="district"
                    className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                    defaultValue="Select your district"
                  >
                    <option disabled={true}>Select your district</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>

                  {errors.district && (
                    <p className="text-error text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                {/* location */}
                <div>
                  <label htmlFor="location" className="block mb-2 text-sm">
                    Your Location
                  </label>
                  <input
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                      minLength: {
                        value: 4,
                        message: "Location must at least 4 characters.",
                      },
                    })}
                    id="location"
                    placeholder="Enter Your Location Thana -> Area"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />

                  {errors.location && (
                    <p className="text-error text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                
              </div>

              
            </div>

            {/* right side form */}
            <div className="flex-1 min-w-[450px] p-8">
              <div className="space-y-4">
                {/* budget */}
                <div>
                  <label htmlFor="budget" className="block mb-2 text-sm">
                    Your Monthly Budget
                  </label>
                  <input
                    type="number"
                    {...register("budget", {
                      required: "budget is required",
                    })}
                    id="budget"
                    placeholder="Enter Your budget Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.budget && (
                    <p className="text-error text-sm mt-1">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                {/* schedule */}
              <div>
                <label htmlFor="schedule" className="block mb-2 text-sm">
                  Preferred Schedule
                </label>
                <input
                  type="time"
                  {...register("schedule", {
                    required: "schedule is required",
                  })}
                  id="schedule"
                  placeholder="Enter Your schedule Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.schedule && (
                  <p className="text-error text-sm mt-1">
                    {errors.schedule.message}
                  </p>
                )}
              </div>
              
                {/* Student gender */}
                <div>
                  <label htmlFor="studentGender" className="block mb-2 text-sm">
                    Student Gender
                  </label>
                  <select
                    {...register("studentGender", {
                      required: "student Gender is required",
                    })}
                    id="studentGender"
                    className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                    defaultValue="Select Student Gender"
                  >
                    <option disabled={true}>Select Student Gender</option>

                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  {errors.studentGender && (
                    <p className="text-error text-sm mt-1">
                      {errors.studentGender.message}
                    </p>
                  )}
                </div>

                {/* tutor gender */}
                <div>
                  <label htmlFor="tutorGender" className="block mb-2 text-sm">
                    Tutor Gender
                  </label>
                  <select
                    {...register("tutorGender", {
                      required: "student Gender is required",
                    })}
                    id="tutorGender"
                    className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                    defaultValue="Preferred Tutor Gender"
                  >
                    <option disabled={true}>Preferred Tutor Gender</option>

                    <option>Any Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  {errors.tutorGender && (
                    <p className="text-error text-sm mt-1">
                      {errors.tutorGender.message}
                    </p>
                  )}
                </div>

                {/* Additional Requirements */}
                <div>
                  <label htmlFor="requirements" className="block mb-2 text-sm">
                    Requirements
                  </label>
                  
                  <input
                    type="text"
                    {...register("requirements")}
                    id="requirements"
                    placeholder="Enter requirement Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />

                  {errors.requirements && (
                    <p className="text-error text-sm mt-1">
                      {errors.requirements.message}
                    </p>
                  )}
                </div>

               
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-secondary w-full rounded-md py-3 text-white"
            >
              Submit Tuition
            </button>
          </div>
        </form>
  
    </Container>
  );
};

export default AddTution;
