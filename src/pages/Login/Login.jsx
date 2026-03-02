import React, { useRef } from "react"; // Added useRef

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router"; // Fixed import
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { signInUser, signInGoogle, setLoading } = useAuth()
  const axiosSecure = useAxiosSecure()
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

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
      try {
        const res = await signInGoogle();
  
        const userData = {
          name: res.user.displayName,
          email: res.user.email,
          role: "student",
          photoURL: res.user.photoURL,
        };
        setLoading(true)
        await axiosSecure.post("/users", userData);
        setLoading(false)
        toast.success("Registration Successful!");
        navigate('/');
      } catch (err) {
        toast.error(err.message || "Registration Failed");
      }
    };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Logged In Successfully!");
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((error) => {
        toast.error(error.message || error.code || "Login Failed!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-8 bg-base-100 shadow-lg rounded-2xl"
        >
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              Welcome Back!
            </h1>
            <p className="text-base-content/70 mb-6">
              Log in to continue your learning journey
            </p>

            {/* Demo Button */}
            <div className="mb-8 text-center">
              <button
                onClick={fillDemoCredentials}
                className="btn btn-secondary btn-outline text-secondary-content hover:bg-secondary hover:text-secondary-content"
              >
                Try Demo Account (Admin)
              </button>
              
              <button
                onClick={fillStudentCredentials}
                className="btn btn-secondary btn-outline text-secondary-content hover:bg-secondary hover:text-secondary-content"
              >
                (Student)
              </button>
              
              <button
                onClick={fillTutorCredentials}
                className="btn btn-secondary btn-outline text-secondary-content hover:bg-secondary hover:text-secondary-content"
              >
                (Tutor)
              </button>


            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef} // Attach ref
                  required
                  placeholder="you@example.com"
                  className="input input-bordered w-full focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef} // Attach ref
                  required
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <label className="label justify-end">
                  <a href="#" className="label-text-alt link link-hover text-primary">
                    Forgot password?
                  </a>
                </label>
              </div>

              <button type="submit" className="btn btn-secondary w-full text-secondary-content text-lg">
                Login
              </button>
            </form>

            <div className="divider my-8 text-base-content/60">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full border-base-300 hover:bg-base-200 flex items-center gap-3 text-base-content"
            >
              <svg width="20" height="20" viewBox="0 0 533 533" xmlns="http://www.w3.org/2000/svg">
                <path d="M533 261c0-19-2-37-5-55H272v104h147c-6 32-25 59-53 77l82 64c48-44 82-111 82-190z" fill="#4285f4"/>
                <path d="M272 533c73 0 135-25 180-67l-82-64c-22 15-51 24-98 24-75 0-139-51-162-121l-84 65c47 91 140 163 246 163z" fill="#34a853"/>
                <path d="M110 318c-5-16-8-33-8-51s3-35 8-51l-84-65c-37 74-37 161 0 235l84-65c-13-22-20-47-20-73z" fill="#fbbc02"/>
                <path d="M272 107c40 0 76 14 104 41l77-77C403 26 337 0 272 0 166 0 73 72 26 163l84 65c23-70 87-121 162-121z" fill="#ea4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-8 text-base-content/70">
              New here?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create an account
              </Link> 
            </p>
            <p className="text-center mt-8 text-base-content/70">
              Back to home?{" "}
              <Link to="/" className="font-semibold text-primary hover:underline">
                Go Home
              </Link> 
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;