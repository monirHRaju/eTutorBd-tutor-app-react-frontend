import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import ProfilePage from '../pages/Profile/Profile'
import { createBrowserRouter } from 'react-router'
import AddTution from '../pages/AddTution/AddTution'
import AllTuitions from '../pages/AllTuitions/AllTuitions'
import TuitionDetails from '../pages/TuitionDetails/TuitionDetails'
import ManageTuitions from '../pages/Dashboard/Admin/ManageTuitions'
import AdminRoute from './AdminRoute'
import TutorApplications from '../pages/Dashboard/Tutor/ManageTutorApplications'
import ManageMyTuitions from '../pages/Dashboard/Student/ManageMyTuitions'
import PaymentSuccess from '../pages/Dashboard/Common/PaymentSuccess'
import PaymentCancelled from '../pages/Dashboard/Common/PaymentCancelled'
import PostTuition from '../pages/Dashboard/Student/PostTuition'
import Tutors from '../pages/Tutors/Tutors'
import TutorProfile from '../pages/TutorProfile/TutorProfile'
import Payments from '../pages/Dashboard/Common/Payments'
import TutorPayments from '../pages/Dashboard/Common/TutorPayments'
import AllPayments from '../pages/Dashboard/Common/AllPayments'
import StudentRoute from './StudentRoute'
import UpdateProfile from '../pages/Dashboard/Common/UpdateProfile'
import TutorDetails from '../pages/Tutors/TutorDetails'
import TutorUpdateProfile from '../pages/Dashboard/Common/TutorProfileUpdate'
import TutorRoute from './TutorRoute'
import ManageOngoingTuitions from '../pages/Dashboard/Tutor/ManageOngoingTuitions'
import ManageOngoingTutors from '../pages/Dashboard/Student/ManageOngoingTutors'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'tutor-profile/:id',
        element: <TutorDetails></TutorDetails>
      },
      
      {
        path: 'tuition-details/:id',
        element: <TuitionDetails></TuitionDetails>
      },
      {
        path: 'tuitions',
        element: <AllTuitions></AllTuitions> 
      },
      {
        path: 'tutors',
        Component: Tutors
      },

    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'ongoing-tuitions',
        element: <TutorRoute><ManageOngoingTuitions></ManageOngoingTuitions></TutorRoute>
      },
      
      {
        path: 'ongoing-tutors',
        element: <StudentRoute><ManageOngoingTutors></ManageOngoingTutors></StudentRoute>
      },
      
      {
        path: 'my-applications',
        element: <TutorRoute><TutorApplications></TutorApplications></TutorRoute>
      },

      {
        path: 'manage-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: 'post-tuition',
        element: <PrivateRoute><StudentRoute><PostTuition></PostTuition></StudentRoute></PrivateRoute>
      },
      {
        path: 'manage-tuitions',
        element: (
          <AdminRoute>
            <ManageTuitions />
          </AdminRoute>
        ),
      },
      
      {
        path: 'my-tuitions',
        element: (
          <StudentRoute>
            <ManageMyTuitions />
          </StudentRoute>
        ),
      },
      
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      
      {
        path: 'tutor-profile/:id',
        element: (
          <TutorRoute>
            <TutorDetails />
          </TutorRoute>
        ),
      },
      
      {
        path: 'profile/update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      
      {
        path: 'tutor-update-profile',
        element: (
          <TutorRoute>
            <TutorUpdateProfile />
          </TutorRoute>
        ),
      },

      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      
      {
        path: 'payments',
        Component: Payments
      },
      
      {
        path: 'tutor-payments',
        Component: TutorPayments
      },
      
      {
        path: 'all-payments',
        Component: AllPayments
      },

      
    ],
  },
])
