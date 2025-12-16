import { FaWpforms } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { IoMdSettings } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { ImProfile  } from "react-icons/im";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const TutorMenu = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  
  const { data: tutor = {} } = useQuery({
    queryKey: ["tutor", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-info?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  

  return (
    
    <>
      <MenuItem
        icon={FaBookOpen}
        label="My Applications"
        address="my-applications"
      />
      <MenuItem
        icon={FaWpforms}
        label="Ongoing Tuitions"
        address="ongoing-tuitions"
      />
      <MenuItem
        icon={FaMoneyBill1}
        label="Revenue History"
        address="tutor-payments"
      />
      <MenuItem
        icon={ImProfile}
        label="Profile"
        address={`/dashboard/tutor-profile/${tutor._id}`}
      />
      <MenuItem
        icon={IoMdSettings}
        label="Profile Settings"
        address="tutor-update-profile"
      />
      {/* <MenuItem icon={LuMessageSquareDot} label='Messages' address='messages' /> */}
    </>
  );
};

export default TutorMenu;
