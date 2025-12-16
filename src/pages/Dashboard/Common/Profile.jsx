import { MdEmail } from "react-icons/md";
import { FaUserEdit, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const {user} = useAuth()
  const {role} = useRole()
  const axiosSecure = useAxiosSecure()
  
  const { data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-info?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  


  if (!user) return null;

  const { name, email, photoURL } = userInfo;

  return (
    <div className="max-w-lg mx-auto mt-14">
      <div className="card bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
        {/* Top Banner */}
        <div className="h-28 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        <div className="card-body items-center text-center -mt-16">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-4 shadow-lg">
              <img src={photoURL} alt={name} />
            </div>
          </div>

          {/* Name */}
          <h2 className="text-3xl font-bold mt-4">{name}</h2>

          {/* Role */}
          <div className="flex items-center gap-3 text-lg capitalize text-gray-600 mt-1">
            <FaUserGraduate className="text-2xl text-primary" />
            <span>{role}</span>
          </div>

          {/* Info */}
          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-xl">
              <MdEmail className="text-3xl text-primary" />
              <span className="text-base font-medium">{email}</span>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 w-full">
            <Link
              to="update-profile"
              className="btn btn-secondary w-full gap-3 text-base"
            >
              <FaUserEdit className="text-xl" />
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
