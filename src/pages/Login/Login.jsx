import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { FaHome } from 'react-icons/fa'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const Login = () => {
  const { signInUser, signInGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = useAxiosSecure()
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const from = location?.state || '/dashboard'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} />

  // form submit handler
  const handleLogin = (data) => {
        // console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                toast.success('Login Successful')
                navigate(from)
            })
            .catch(error => {
                setLoading(false)
                return toast.error(`Failed Login ${error.message}`)
            })
    }

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
          title: err.message || "Registration Failed",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    };

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                {...register("email", { required: "email is required" })}
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                {...register("password", { required: "password is required" })}
                autoComplete='current-password'
                id='password'
                
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-lime-500 text-gray-400 cursor-pointer'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?
          <Link
            state={from}
            to='/signup'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
        <p className='px-6 text-sm text-center text-gray-400'>
          Or, Go to
        <Link to={'/'} className='flex justify-center items-center text-blue-500 hover:cursor-pointer'><FaHome> </FaHome>&nbsp; Homepage</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
