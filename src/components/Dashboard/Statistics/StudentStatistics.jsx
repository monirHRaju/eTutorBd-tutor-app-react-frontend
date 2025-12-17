import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaMoneyBillWave, FaUser } from "react-icons/fa";

const StudentStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: studentPaymentStat = [] } = useQuery({
    queryKey: ["student-payment-state", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/student/stat/${user?.email}`
      );
      return res.data;
    },
  });
  const { data: studentEnrolledStat = [] } = useQuery({
    queryKey: ["student-enrolled-state", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/enrolled-tuitions/student/stat/${user?.email}`
      );
      return res.data;
    },
  });

  const { data: postedTuitionsStat = [] } = useQuery({
    queryKey: ["posted-tuitions-state", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posted-tuitions/student/stat/${user?.email}`
      );
      return res.data;
    },
  });
  // console.log(postedTuitionsStat);
  return (
    <div className="w-10/12 grid grid-cols-2 md:grid-cols-4">
      {studentPaymentStat.map((stat, index) => {
        return (
          <div className="stat" key={index}>
            <div className="stat-figure text-primary">
              <FaMoneyBillWave size={30}></FaMoneyBillWave>
            </div>
            <div className="stat-title">Total Payments</div>
            <div className="stat-value text-primary">৳ {stat.totalAmount}</div>
            <div className="stat-desc">for all tuitions.</div>
          </div>
        );
      })}

      {studentEnrolledStat.map((stat, index) => {
        return (
          <div className="stat" key={index}>
            <div className="stat-figure text-success">
              <FaUser size={30}></FaUser>
            </div>
            <div className="stat-title">Total Enrolled Tutors</div>
            <div className="stat-value text-success">{stat.enrolledCount}</div>
            <div className="stat-desc">from all location.</div>
          </div>
        );
      })}
      
      {postedTuitionsStat.map((stat, index) => {
        return (
          <div className="stat" key={index}>
            <div className="stat-figure text-info">
              <FaBook size={30}></FaBook>
            </div>
            <div className="stat-title">Posted Tuitions</div>
            <div className="stat-value text-info">{stat.postedCount}</div>
            {/* <div className="stat-desc">from all location.</div> */}
          </div>
        );
      })}



    </div>
  );
};

export default StudentStatistics;
