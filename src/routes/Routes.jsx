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
        path: 'profile',
        element: <PrivateRoute><ProfilePage></ProfilePage> </PrivateRoute>
      },
      {
        path: 'add-tuition',
        element: <PrivateRoute><AddTution></AddTution></PrivateRoute>
      },
      {
        path: 'tuition-details/:id',
        element: <TuitionDetails></TuitionDetails>
      },
      {
        path: 'all-tuitions',
        element: <AllTuitions></AllTuitions> 
      }
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
        path: 'my-applications',
        element: <PrivateRoute><TutorApplications></TutorApplications></PrivateRoute>
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
          <PrivateRoute>
            <ManageMyTuitions />
          </PrivateRoute>
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
        path: 'payment-success',
        Component: PaymentSuccess
      },
      
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },

      
    ],
  },
])
