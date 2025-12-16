import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { user, updateUserProfile, setLoading } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
  defaultValues: {
    name: ""
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
    });
  }
}, [userInfo, reset]);


  const handleProfileUpdate = async (data) => {
  try {
    let photoURL = userInfo?.photoURL; 

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
        photoURL
      });
      console.log('updated user')
    }
    await updateUserProfile({
        displayName: data.name
      });
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
        title: "Profile Updated",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    refetch();
    
  } catch (error) {
    setLoading(false);
    
    // console.error(error);
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

export default UpdateProfile;
