import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";

const OngoingTuitionsDataRow = ({ application }) => {
  const {role} = useRole()
return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <Link to={`${import.meta.env.VITE_SITE_URL}/tuition-details/${application.tuitionId}`} target="_blank"><p className="link link-secondary">{application.subject}</p></Link>
      </td>

      {
        role === "tutor" && <>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 ">{application.studentName}</p>
        </td>
        
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 ">{application.studentEmail}</p>
        </td>
        </>
      }
      
      {
        role === "student" && <>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 ">{application.tutorName}</p>
        </td>
        
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 ">{application.tutorEmail}</p>
        </td>
        </>
      }

      

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{application.district}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{application.offerPrice}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={
            application.status === "pending"
              ? "text-warning"
              : application.status === "enrolled"
              ? "text-success"
              : "text-error"
          }
        >
          {application?.status}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{application.updatedAt}</p>
      </td>
    </tr>
  );
};

export default OngoingTuitionsDataRow;
