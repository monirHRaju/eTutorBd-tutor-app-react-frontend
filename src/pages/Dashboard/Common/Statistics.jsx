import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import StudentStatistics from "../../../components/Dashboard/Statistics/StudentStatistics";
import TutorStatistics from "../../../components/Dashboard/Statistics/TutorStatistics";
import useRole from "../../../hooks/useRole";

const Statistics = () => {
  const { role, isLoading } = useRole();

  const getSubTitle = () => {
    if (role === "admin") {
      return "Overview of users, total payments and tuition applications across the platform.";
    }
    if (role === "tutor") {
      return "Quick look at your earnings, enrolled students, and application status.";
    }
    return "Summary of your payments, enrolled tutors, and posted tuitions.";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Dashboard Statistics
          </h1>
          <p className="mt-2 text-base-content/70 text-sm md:text-base">
            {getSubTitle()}
          </p>
        </div>

        <div className="self-start md:self-end">
          <span className="badge badge-lg badge-primary badge-outline px-4 py-3 text-sm md:text-base">
            {role ? `${role.charAt(0).toUpperCase()}${role.slice(1)} Dashboard` : "Dashboard"}
          </span>
        </div>
      </div>

      <div>
        {role === "admin" && <AdminStatistics />}
        {role === "tutor" && <TutorStatistics />}
        {role !== "admin" && role !== "tutor" && <StudentStatistics />}
      </div>
    </div>
  );
};

export default Statistics;
