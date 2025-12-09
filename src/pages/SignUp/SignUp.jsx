import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { ImSpinner } from "react-icons/im";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SignUp = () => {
  const { registerUser, updateUserProfile, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state || "/";

  // form submit handler
  const handleRegistration = async (data) => {
    const { name, email, role } = data;
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          // save user data to mongo
          const userData = {
            name,
            email,
            role,
            photoURL,
          };

          axiosSecure.post("/users", userData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Registration Successful!`,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });

          //3. update profile with photo
          const updateProfile = {
            displayName: data.name,
            photoURL,
          };
          updateUserProfile(updateProfile)
            .then(() => {
             
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">
            Welcome to{" "}
            <Link to={"/"} className="cursor-pointer">
              eTutorBd
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
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
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be equal or more than 6.",
                  },
                })}
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="photo" className="block mb-2 text-sm">
                Select Profile Picture
              </label>
              <input
                type="file"
                {...register("photo", { required: "photo is required" })}
                id="photo"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.photo && (
                <p className="text-error text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">
                Select Role
              </label>
              <select
                {...register("role", { required: "role is required" })}
                id="role"
                className="select w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
                defaultValue="Pick a Role"
              >
                <option disabled={true}>Pick a Role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>

              {errors.role && (
                <p className="text-error text-sm mt-1">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-secondary w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner className="animate-spin m-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
