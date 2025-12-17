import MenuItem from "./MenuItem";
import { MdPostAdd  } from "react-icons/md";
import { FaBookOpen, FaChalkboardTeacher  } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { ImProfile  } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
const StudentMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaBookOpen}
        label="My Tuitions"
        address="my-tuitions"
      />
      <MenuItem
        icon={FaChalkboardTeacher }
        label="Ongoing Tutors"
        address="ongoing-tutors"
      />
      
      <MenuItem
        icon={MdPostAdd }
        label="Post New Tuition"
        address="post-tuition"
      />

      <MenuItem
        icon={FaMoneyBill1}
        label="Payments"
        address="payments"
      />
      <MenuItem
        icon={ImProfile }
        label="Profile"
        address="/dashboard/profile"
      />
      <MenuItem
        icon={IoMdSettings}
        label="Profile Settings"
        address="profile/update-profile"
      />
      {/* <MenuItem icon={LuMessageSquareDot} label='Messages' address='messages' /> */}
    </>
  );
};

export default StudentMenu;
