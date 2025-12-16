import { FaWpforms, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { IoMdSettings } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { FaMoneyBill1 } from "react-icons/fa6";
import { ImProfile  } from "react-icons/im";


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaBookOpen}
        label="Manage Tuitions"
        address="manage-tuitions"
      />
      <MenuItem
        icon={FaWpforms}
        label="Tuition Applications"
        address="manage-applications"
      />
      <MenuItem
        icon={FaMoneyBill1}
        label="Payments"
        address="all-payments"
      />
      <MenuItem
        icon={ImProfile}
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

export default AdminMenu;
