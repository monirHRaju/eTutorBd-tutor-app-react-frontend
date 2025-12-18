import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {  FaMoneyBillWave, FaUser } from "react-icons/fa";

const TutorStatistics = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()

  const { data: tutorPaymentStat = [] } = useQuery({
    queryKey: ["tutor-payment-state", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/tutor/stat/${user?.email}`);
      return res.data;
    },
  });
  
  const { data: tutorEnrolledStat = [] } = useQuery({
    queryKey: ["tutor-enrolled-state"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled-tuitions/tutor/stat/${user?.email}`);
      return res.data;
    },
  });
  
  
  const { data: tutorPendingStat = [] } = useQuery({
    queryKey: ["tutor-pending-state"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending-tuitions/tutor/stat/${user?.email}`);
      return res.data;
    },
  });
  
  const { data: tutorRejectedStat = [] } = useQuery({
    queryKey: ["tutor-rejected-state"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rejected-tuitions/tutor/stat/${user?.email}`);
      return res.data;
    },
  });
  
  // console.log(tutorEnrolledStat)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

      {
        tutorPaymentStat.map((stat, index) => { 
        return <div className="stat shadow" key={index}>
        <div className="stat-figure text-primary">
          <FaMoneyBillWave size={30}></FaMoneyBillWave>
        </div>
        <div className="stat-title">Total Payment Received</div>
        <div className="stat-value text-primary">৳ {stat.totalAmount}</div>
        <div className="stat-desc">from all tuitions.</div>
      </div>

        })
      }
      
      {
        tutorEnrolledStat.map((stat, index) => { 
        return <div className="stat shadow" key={index}>
        <div className="stat-figure text-success">
          <FaUser size={30}></FaUser>
        </div>
        <div className="stat-title">Total Enrolled Student</div>
        <div className="stat-value text-success">{stat.enrolledCount}</div>
        <div className="stat-desc">from all location.</div>
      </div>

        })
      }
      
      {
        tutorPendingStat.map((stat, index) => { 
        return <div className="stat shadow" key={index}>
        <div className="stat-figure text-warning">
          <FaUser size={30}></FaUser>
        </div>
        <div className="stat-title">Total Pending Applications</div>
        <div className="stat-value text-warning">{stat.pendingCount}</div>
        <div className="stat-desc">from all location.</div>
      </div>

        })
      }
      
      {
        tutorRejectedStat.map((stat, index) => { 
        return <div className="stat shadow" key={index}>
        <div className="stat-figure text-error">
          <FaUser size={30}></FaUser>
        </div>
        <div className="stat-title">Total Rejected Applications</div>
        <div className="stat-value text-error">{stat.rejectedCount}</div>
        <div className="stat-desc">from all location.</div>
      </div>

        })
      }

    </div>
  );
};

export default TutorStatistics;
