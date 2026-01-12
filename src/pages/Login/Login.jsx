
// const Login = () => {
//   const { signInUser, signInGoogle, loading, user, setLoading } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const axiosSecure = useAxiosSecure()
//   const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm();
  
//     const from = location?.state || '/dashboard'

//   if (loading) return <LoadingSpinner />
//   if (user) return <Navigate to={from} />

//   // form submit handler
//   const handleLogin = (data) => {
//         // console.log('form data', data);
//         signInUser(data.email, data.password)
//             .then(result => {
//                 console.log(result.user)
//                 toast.success('Login Successful')
//                 navigate(from)
//             })
//             .catch(error => {
//                 setLoading(false)
//                 return toast.error(`Failed Login ${error.message}`)
//             })
//     }

//   // Handle Google Signin
//   const handleGoogleSignIn = async () => {
//       try {
//         const res = await signInGoogle();
  
//         const userData = {
//           name: res.user.displayName,
//           email: res.user.email,
//           role: "student",
//           photoURL: res.user.photoURL,
//         };
//         setLoading(true)
//         await axiosSecure.post("/users", userData);
//         setLoading(false)
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Registration Successful!",
//           showConfirmButton: false,
//           timer: 2000,
//         });
  
//         navigate(from);
//       } catch (err) {
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: err.message || "Registration Failed",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     };

//   return (
//     <div className='flex justify-center items-center min-h-screen bg-white'>
//       <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
//         <div className='mb-8 text-center'>
//           <h1 className='my-3 text-4xl font-bold'>Log In</h1>
//           <p className='text-sm text-gray-400'>
//             Sign in to access your account
//           </p>
//         </div>
//         <form
//           onSubmit={handleSubmit(handleLogin)}
//           noValidate=''
//           action=''
//           className='space-y-6 ng-untouched ng-pristine ng-valid'
//         >
//           <div className='space-y-4'>
//             <div>
//               <label htmlFor='email' className='block mb-2 text-sm'>
//                 Email address
//               </label>
//               <input
//                 type='email'
//                 {...register("email", { required: "email is required" })}
//                 id='email'
//                 placeholder='Enter Your Email Here'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//                 data-temp-mail-org='0'
//               />
//               {errors.email && (
//                 <p className="text-error text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>
//             <div>
//               <div className='flex justify-between'>
//                 <label htmlFor='password' className='text-sm mb-2'>
//                   Password
//                 </label>
//               </div>
//               <input
//                 type='password'
//                 {...register("password", { required: "password is required" })}
//                 autoComplete='current-password'
//                 id='password'
                
//                 placeholder='*******'
//                 className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
//               />
//               {errors.password && (
//                 <p className="text-error text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div>
//             <button
//               type='submit'
//               className='bg-lime-500 w-full rounded-md py-3 text-white'
//             >
//               {loading ? (
//                 <TbFidgetSpinner className='animate-spin m-auto' />
//               ) : (
//                 'Continue'
//               )}
//             </button>
//           </div>
//         </form>
//         <div className='space-y-1'>
//           <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
//             Forgot password?
//           </button>
//         </div>
//         <div className='flex items-center pt-4 space-x-1'>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//           <p className='px-3 text-sm dark:text-gray-400'>
//             Login with social accounts
//           </p>
//           <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
//         </div>
//         <div
//           onClick={handleGoogleSignIn}
//           className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
//         >
//           <FcGoogle size={32} />

//           <p>Continue with Google</p>
//         </div>
//         <p className='px-6 text-sm text-center text-gray-400'>
//           Don&apos;t have an account yet?
//           <Link
//             state={from}
//             to='/signup'
//             className='hover:underline hover:text-lime-500 text-gray-600'
//           >
//             Sign up
//           </Link>
//           .
//         </p>
//         <p className='px-6 text-sm text-center text-gray-400'>
//           Or, Go to
//         <Link to={'/'} className='flex justify-center items-center text-blue-500 hover:cursor-pointer'><FaHome> </FaHome>&nbsp; Homepage</Link>
//         </p>
//       </div>
//     </div>
//   )
// }

import React, { useContext, useRef } from "react"; // Added useRef

import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router"; // Fixed import

import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../providers/AuthContext";

const Login = () => {
  const { signInWithGoogle, signInUser } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  // Refs for form inputs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Function to fill demo credentials
  const fillDemoCredentials = () => {
    if (emailRef.current) emailRef.current.value = "admin@email.com";
    if (passwordRef.current) passwordRef.current.value = "123456";
  };
  
  const fillStudentCredentials = () => {
    if (emailRef.current) emailRef.current.value = "student@email.com";
    if (passwordRef.current) passwordRef.current.value = "123456";
  };
  
  const fillTutorCredentials = () => {
    if (emailRef.current) emailRef.current.value = "tutor2@email.com";
    if (passwordRef.current) passwordRef.current.value = "123456";
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        axiosInstance.post("/users", newUser).then((data) => {
          if (data.data.insertedId || data.data.message === "User already exists") {
            Swal.fire({
              title: "Logged In Successfully!",
              icon: "success",
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          title: "Google Login Failed",
          text: err.message,
          icon: "error",
          position: "top-end",
          timer: 2000,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Logged In Successfully!",
          icon: "success",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed!",
          text: error.message || error.code,
          icon: "warning",
          position: "top-end",
          timer: 2500,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl shadow-2xl rounded-3xl overflow-hidden">
        {/* Left: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="p-10 md:p-16 flex flex-col justify-center"
        >
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-2">
              Welcome Back!
            </h1>
            <p className="text-accent/70 mb-6">
              Log in to continue your learning journey
            </p>

            {/* Demo Button */}
            <div className="mb-8 text-center">
              <button
                onClick={fillDemoCredentials}
                className="btn btn-secondary btn-outline text-secondary hover:bg-secondary hover:text-white"
              >
                Try Demo Account (Admin)
              </button>
              
              <button
                onClick={fillStudentCredentials}
                className="btn btn-secondary btn-outline text-secondary hover:bg-secondary hover:text-white"
              >
                (Student)
              </button>
              
              <button
                onClick={fillTutorCredentials}
                className="btn btn-secondary btn-outline text-secondary hover:bg-secondary hover:text-white"
              >
                (Tutor)
              </button>


            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef} // Attach ref
                  required
                  placeholder="you@example.com"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-accent font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef} // Attach ref
                  required
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <label className="label justify-end">
                  <a href="#" className="label-text-alt link link-hover text-primary">
                    Forgot password?
                  </a>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-full text-white text-lg">
                Login
              </button>
            </form>

            <div className="divider my-8 text-accent/60">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 flex items-center gap-3 text-accent"
            >
              <svg width="20" height="20" viewBox="0 0 533 533" xmlns="http://www.w3.org/2000/svg">
                <path d="M533 261c0-19-2-37-5-55H272v104h147c-6 32-25 59-53 77l82 64c48-44 82-111 82-190z" fill="#4285f4"/>
                <path d="M272 533c73 0 135-25 180-67l-82-64c-22 15-51 24-98 24-75 0-139-51-162-121l-84 65c47 91 140 163 246 163z" fill="#34a853"/>
                <path d="M110 318c-5-16-8-33-8-51s3-35 8-51l-84-65c-37 74-37 161 0 235l84-65c-13-22-20-47-20-73z" fill="#fbbc02"/>
                <path d="M272 107c40 0 76 14 104 41l77-77C403 26 337 0 272 0 166 0 73 72 26 163l84 65c23-70 87-121 162-121z" fill="#ea4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-8 text-accent/70">
              New here?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right: Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block relative bg-gradient-to-br from-primary to-primary/80"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
            alt="Happy students learning online together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Learn Without Limits</h2>
            <p className="text-xl opacity-90">Join thousands of learners mastering new skills every day</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;