import Container from "../Container";
import { Link, NavLink } from "react-router";
import logo from "../../../../public/eLogo.png";
import useAuth from "../../../hooks/useAuth";
import MyNavLink from "../../Home/MyNavLink";
const Navbar = () => {
  const { user, logOut } = useAuth();

  const navLinks = (
    <>
      {/* <li><NavLink to={"/"}>Home</NavLink></li> */}

      <li><MyNavLink to={"/"} className={''}>Home</MyNavLink></li>
      <li><MyNavLink to={"/dashboard/post-tuition"}>Add Tuition</MyNavLink></li>
      <li><MyNavLink to={"/tuitions"}>All Tuitions</MyNavLink></li>
      <li><MyNavLink to={"/tutors"}>Tutors</MyNavLink></li>
      <li><MyNavLink to={"/contact"}>Contact</MyNavLink></li>
      <li><MyNavLink to={"/dashboard"}>Dashboard</MyNavLink></li>
    </>
  );
  return (
    <div className="fixed w-full z-10 bg-accent">
      <div className="py-4 text-white">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-secondary rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
                >
                  {navLinks}

                </ul>
              </div>

              <Link
                to={"/"}
                className="flex gap-4 items-center text-2xl font-bold"
              >
                <img src={logo} className="w-12" alt="" />
                <p>eTutor BD</p>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                
                {navLinks}
              
              </ul>
            </div>
            <div className="navbar-end">
              {user ? (
                <div className="flex gap-5">
                  <img
                    src={user?.photoURL}
                    className="w-10 border rounded-full"
                    alt=""
                  />
                  <a
                    onClick={() => logOut()}
                    className="btn btn-outline hover:bg-primary"
                  >
                    Logout
                  </a>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="btn btn-outline hover:bg-primary"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
