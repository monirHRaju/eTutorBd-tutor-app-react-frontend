import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SignUp = () => {
  const { signInGoogle, registerUser, updateUserProfile, setLoading } =
    useAuth();
  const axiosSecure = useAxiosSecure();
  const from = location?.state || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  /* ================= FORM HANDLERS (UNCHANGED) ================= */
  const handleRegistration = async (data) => {
    const { name, email, role } = data;
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userData = { name, email, role, photoURL };

          axiosSecure.post("/users", userData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successful!",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });

          updateUserProfile({
            displayName: name,
            photoURL,
          });
        });

        navigate(from);
      })
      .catch((error) => {
        if (
          error.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.error("Already registered. Please login.");
          navigate("/login");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInGoogle();
      const userData = {
        name: res.user.displayName,
        email: res.user.email,
        role: "student",
        photoURL: res.user.photoURL,
      };

      setLoading(true);
      await axiosSecure.post("/users", userData);
      setLoading(false);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate(from);
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-primary">Create Account</h1>
            <p className="text-sm text-base-content/70 mt-1">
              Join <Link to="/" className="font-medium">eTutorBD</Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true, minLength: 4 })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-error text-sm">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Photo */}
            <div>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Role */}
            <select
              {...register("role", { required: true })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option disabled value="">
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>

            <button className="btn btn-primary w-full mt-4">
              Create Account
            </button>
          </form>

          {/* Social */}
          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex gap-2"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
