import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../../public/elogo.png";
// Icons
import { GrLogout } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import useRole from "../../../hooks/useRole";
import StudentMenu from "./Menu/StudentMenu";
import TutorMenu from "./Menu/TutorMenu";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const { role } = useRole();
  const navigate = useNavigate();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const userLogout = () => {
    logOut()
    .then(() => {
    setTimeout(toast.error('Logged Out!'), 1500)
      navigate("/");
    })
    .catch(err => {
      setTimeout(toast.error(err), 1500)
      navigate("/");
    })
  };
  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className=" bg-accent text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                src={user?.photoURL || logo}
                alt="logo"
                width="40"
                height="40"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-accent"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-accent w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
              <span className="flex gap-3 items-center font-semibold text-white">
                <img
                  src={user?.photoURL || logo}
                  alt="logo"
                  width="60"
                  height="60"
                />
                <div>
                  <Link to={"/"}>
                    <h3 className="text-2xl">eTutor BD</h3>
                    <p>{user?.displayName}</p>
                    <p>{user?.email}</p>
                  </Link>

                  <span onClick={() => userLogout()} className="link">
                    Logout
                  </span>
                </div>
              </span>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              />
              {/* Role-Based Menu */}
              {role === "admin" ? (
                <AdminMenu />
              ) : role === "tutor" ? (
                <TutorMenu />
              ) : (
                <StudentMenu />
              )}

              <MenuItem
                icon={IoMdSettings}
                label="Profile"
                address="/dashboard/profile"
              />

              <button
                onClick={()=> userLogout()}
                className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-primary bg-white rounded-full transition-colors duration-300 transform"
              >
                <GrLogout className="w-5 h-5" />

                <span className="mx-4 font-medium">Logout</span>
              </button>
            </nav>
          </div>

          {/* Bottom Content */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
