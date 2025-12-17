import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import StudentStatistics from '../../../components/Dashboard/Statistics/StudentStatistics'
import TutorStatistics from '../../../components/Dashboard/Statistics/TutorStatistics'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const {role} = useRole()

  return (
    <div>
      {
        role === "admin"
        ? <AdminStatistics />
        : role === "tutor"
        ? <TutorStatistics />
        : <StudentStatistics />
      }
      
    </div>
  )
}

export default Statistics
