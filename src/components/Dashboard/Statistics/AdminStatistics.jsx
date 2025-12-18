import { FaBookOpen, FaMoneyBill  } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa6";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const { data: userStat = [] } = useQuery({
    queryKey: ["user-role-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role/stats");
      return res.data;
    },
  });

  const { data: tuitionStat = [] } = useQuery({
    queryKey: ["tuition-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions/status/stats");
      return res.data;
    },
  });
  const { data: earningStat = [] } = useQuery({
    queryKey: ["earning-stat"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment/amountTotal/stats");
      return res.data;
    },
  });
  // console.log(tuitionStat)
  const getPieChartData = (data) => {
    return data.map((item) => {
      return { name: item._id, value: item.count };
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">User Stat</h1>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
          {/* Sales Card */}
          {userStat.map((stat) => (
            <div
              key={stat._id}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
              >
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-2xl leading-normal font-normal text-blue-gray-600">
                  {stat._id}
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {stat.count}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <h1 className="text-3xl font-bold">Total Payments</h1>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
          {/* Sales Card */}
          {earningStat.map((stat, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
              >
                <FaMoneyBill className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-2xl leading-normal font-normal text-blue-gray-600">
                  Total Payments ৳
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {stat.totalAmount}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <h1 className="text-3xl font-bold">Tuition Application Stat</h1>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
          {/* Sales Card */}
          {tuitionStat.map((stat) => (
            <div
              key={stat._id}
              className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md"
            >
              <div
                className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
              >
                <FaBookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-2xl leading-normal font-normal text-blue-gray-600">
                  {stat._id}
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {stat.count}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className="w-8/12 h-[400px] flex justify-center">
          <PieChart
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              aspectRatio: 2,
            }}
            responsive
          >
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={getPieChartData(tuitionStat)}
              cx="50%"
              cy="100%"
              outerRadius="120%"
              label
              isAnimationActive={true}
            >
              {getPieChartData(tuitionStat).map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
