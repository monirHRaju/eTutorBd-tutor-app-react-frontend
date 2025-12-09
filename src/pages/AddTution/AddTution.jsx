import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddTution = () => {
  const [classes, setClasses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
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



  const handleTuitionSubmit = async(data) => {
      data.studentName = user.displayName
      data.studentEmail = user.email
      data.studentId = user.uid
      data.status = 'pending'
      
      console.log(data);

      await axiosSecure.post('/tuitions', data)
      .then((res) => {
        console.log('Tuiond Added, inserted Id:', res.data.insertedId)
              if (res.data.insertedId) {

                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Tuition Created Success. Please wait for admin approval.`,
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
     
    };



  return (
    <Container>
      {/* required fields: class, budget, location, subject, schedule */}
      <div className="my-10 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Add Tuition</h1>
          <p className="text-sm text-gray-400">Submit Your Tuition</p>
        </div>
        <form
          onSubmit={handleSubmit(handleTuitionSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            {/* subject */}
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm">
                Subject
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

            {/* class */}
            <div>
              <label htmlFor="class" className="block mb-2 text-sm">
                Class
              </label>
              <select
                {...register("class", { required: "class is required" })}
                id="class"
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

              {errors.class && (
                <p className="text-error text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>

            {/* District */}
            <div>
              <label htmlFor="district" className="block mb-2 text-sm">
                Your District
              </label>
              <select
                {...register("district", { required: "district is required" })}
                id="class"
                className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                defaultValue="Pick a district"
              >
                <option disabled={true}>Pick a class</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              {errors.district && (
                <p className="text-error text-sm mt-1">{errors.district.message}</p>
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
                <p className="text-error text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
            
          </div>
        
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
                type="text"
                {...register("schedule", {
                  required: "schedule is required",
                  minLength: {
                    value: 2,
                    message: "schedule must at least 4 characters.",
                  },
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
            



          <div>
            <button
              type="submit"
              className="bg-secondary w-full rounded-md py-3 text-white"
            >
              Add Tuition
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddTution;
