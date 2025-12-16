import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";

const TutorUpdateProfile = () => {
  const { user, updateUserProfile, setLoading } = useAuth();
  const {role} = useRole()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
  defaultValues: {
    name: "",
    education: "",
    expectedSalary: "",
    daysPerWeek: "",
    experience: "",
    preferredMedium: "",
    preferredClasses: "",
    preferredSubjects: "",
    educationInfo: "",
    location: "",
    gender: "",
  },
});

const { data: userInfo = {}, refetch } = useQuery({
    queryKey: ["profile-update", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-info?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

useEffect(() => {
  if (userInfo) {
    reset({
      name: userInfo.name,
      education: userInfo.education,
      expectedSalary: userInfo.expectedSalary,
      daysPerWeek: userInfo.daysPerWeek,
      experience: userInfo.experience,
      preferredMedium: userInfo.preferredMedium,
      preferredClasses: userInfo.preferredClasses,
      preferredSubjects: userInfo.preferredSubjects,
      educationInfo: userInfo.educationInfo,
      location: userInfo.location,
      gender: userInfo.gender,
    });
  }
}, [userInfo, reset]);


  const handleProfileUpdate = async (data) => {
  try {
    let photoURL = userInfo?.photoURL; // keep old photo by default

    // If new photo selected
    if (data.photo && data.photo.length > 0) {
      const profileImg = data.photo[0];

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      photoURL = imgRes.data.data.url;

      // update firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });
    }

    // remove photo field
    delete data.photo;

    // attach photoURL to data
    data.photoURL = photoURL;

    // update DB
    const res = await axiosSecure.patch(`/users/${user?.email}`, data);

    if (res.data.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Info Updated",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    refetch();
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
};

  return (
    <div>
      
      <div className="">
        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          <div className="lg:flex lg:justify-around gap-5 w-6/12 mt-10 rounded-md sm:p-10 text-gray-900">
            {/* left side form */}
            <div className="flex-1 min-w-[450px] p-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo.name}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 4,
                        message: "Name must at least 4 characters.",
                      },
                    })}
                    id="name"
                    placeholder="Enter Your Name Here"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.name && (
                    <p className="text-error text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="" className="block mb-2 text-sm">
                    Current Photo
                  </label>
                  <img src={userInfo?.photoURL} className="h-10" alt="" />
                </div>

                {/* Profile Image */}
                <div>
                  <label htmlFor="photo" className="block mb-2 text-sm">
                    Select Profile Picture
                  </label>
                  <input
                    type="file"
                    {...register("photo")}
                    id="photo"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                  {errors.photo && (
                    <p className="text-error text-sm mt-1">
                      {errors.photo.message}
                    </p>
                  )}
                </div>

                {
                  role === "tutor"&& <>
                    <div>
                  <label htmlFor="education" className="block mb-2 text-sm">
                    Education Level
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.education}
                    {...register("education")}
                    id="education"
                    placeholder="Enter Your Education Level"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.education && (
                    <p className="text-error text-sm mt-1">
                      {errors.education.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="expectedSalary"
                    className="block mb-2 text-sm"
                  >
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.expectedSalary}
                    {...register("expectedSalary")}
                    id="expectedSalary"
                    placeholder="Enter Expected Salary"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="daysPerWeek" className="block mb-2 text-sm">
                    Days Per Week
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.daysPerWeek}
                    {...register("daysPerWeek")}
                    id="daysPerWeek"
                    placeholder="Enter Days Per Week"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block mb-2 text-sm">
                    Experience
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.experience}
                    {...register("experience")}
                    id="experience"
                    placeholder="Enter Your Experience"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="preferredMedium" className="block mb-2 text-sm">
                    Preferred Medium
                  </label>
                  <select 
                    defaultValue={userInfo?.preferredMedium}
                    {...register("preferredMedium")}
                    id="preferredMedium"
                    placeholder="Enter Preferred Medium"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                    
                  >
                    <option value="Bangla">Bangla</option>
                    <option value="English">English</option>
                  </select>
                  
                </div>

                <div>
                  <label
                    htmlFor="preferredClasses"
                    className="block mb-2 text-sm"
                  >
                    Preferred Classes
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.preferredClasses}
                    {...register("preferredClasses")}
                    id="preferredClasses"
                    placeholder="Enter Preferred Classes"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preferredSubjects"
                    className="block mb-2 text-sm"
                  >
                    Preferred Subjects
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.preferredSubjects}
                    {...register("preferredSubjects")}
                    id="preferredSubjects"
                    placeholder="Enter Preferred Subjects"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="educationInfo" className="block mb-2 text-sm">
                    Education Info
                  </label>
                  <textarea 
                  defaultValue={userInfo?.educationInfo}
                    {...register("educationInfo")}
                    id="educationInfo"
                    placeholder="Enter Education Info"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  
                  >

                  </textarea>
                  
                </div>

                <div>
                  <label htmlFor="location" className="block mb-2 text-sm">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={userInfo?.location}
                    {...register("location")}
                    id="location"
                    placeholder="Enter Your Location"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block mb-2 text-sm">
                    Gender
                  </label>
                  <select  
                    defaultValue={userInfo?.gender}
                    {...register("gender")}
                    id="gender"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                  >
                    
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  
                </div>
                  
                  </>
                }
                {/* Tutor information */}
                

                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default TutorUpdateProfile;
