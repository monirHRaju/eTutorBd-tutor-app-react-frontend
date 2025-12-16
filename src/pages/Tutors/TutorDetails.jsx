import { useQuery } from "@tanstack/react-query";
import { FaUserGraduate, FaMapMarkerAlt, FaVenusMars } from "react-icons/fa";
import { MdSchool, MdAttachMoney } from "react-icons/md";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const TutorDetails = () => {
  const {id} = useParams()
  // console.log(id)
  const axiosInstance = useAxios()

  const {data:tutor={}} = useQuery({
    
    queryKey: ["tutor", id],
    queryFn: async () => {
      const {data} = await axiosInstance.get(`/tutors/${id}`)

      return data
    }
  })

  // console.log(tutor)

  if (!tutor) return null;

  const {
    name,
    photoURL,
    education,
    experience,
    expectedSalary,
    daysPerWeek,
    preferredMedium,
    preferredClasses,
    preferredSubjects,
    educationInfo,
    location,
    gender,
  } = tutor;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body flex flex-col md:flex-row items-center gap-6">
          <img
            src={photoURL}
            alt={name}
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{name}</h2>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt /> {location}
              </span>
              <span className="flex items-center gap-1">
                <FaVenusMars /> {gender}
              </span>
              <span className="flex items-center gap-1">
                <MdSchool /> {education}
              </span>
            </div>
          </div>

          {/* <button className="btn btn-secondary">
            Apply for Tuition
          </button> */}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaUserGraduate /> Tutor Information
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <strong>Experience:</strong> {experience}
              </li>
              <li>
                <strong>Days Per Week:</strong> {daysPerWeek}
              </li>
              <li>
                <strong>Preferred Medium:</strong> {preferredMedium}
              </li>
              <li>
                <strong>Preferred Classes:</strong> {preferredClasses}
              </li>
              <li>
                <strong>Preferred Subjects:</strong> {preferredSubjects}
              </li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MdAttachMoney /> Salary & Education
            </h3>

            <p className="mb-2 text-sm">
              <strong>Expected Salary:</strong> ৳{expectedSalary}
            </p>

            <div className="mt-3">
              <strong className="text-sm">Education Background:</strong>
              <pre className="mt-2 whitespace-pre-line text-sm bg-base-200 p-3 rounded-md">
                {educationInfo}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
