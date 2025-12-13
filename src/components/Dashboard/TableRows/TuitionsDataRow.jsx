import { FaTrash } from "react-icons/fa6";
import { FaRegCheckSquare, FaRegWindowClose   } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";
import { IoInformationCircleOutline } from "react-icons/io5"
import ViewApplicationsModal from "../../Modal/ViewApplicationsModal";
import { useState } from "react";

const TuitionsDataRow = ({ tuition, refetch }) => {
    let [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure();
  const {role} = useRole()

  const handleStatus = (status) => {
    const statusData = { status };
    axiosSecure
      .patch(`/tuitions/${tuition._id}/status`, statusData)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Tuition status is set to ${status}.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleDelete = (tuitionId) => {
    
    Swal.fire({
      title: "Do you want to Delete?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        //delete from mongo db
        axiosSecure.delete(`/tuitions/${tuitionId}/delete`).then((res) => {
          if (res.data.deletedCount) {
            refetch();

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Tuition Deleted Success!.`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{tuition?.subject}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{tuition?.className}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{tuition?.district}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{tuition?.budget}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={
            tuition?.status === "accepted"
              ? "text-info"
              : tuition?.status === "rejected"
              ? "text-error"
              : tuition?.status === "enrolled"
              ? "text-success"
              : "text-warning"
          }
        >
          {
            tuition?.status === "accepted"
              ? "Accepted"
              : tuition?.status === "rejected"
              ? "Rejected"
              : tuition?.status === "enrolled"
              ? "Enrolled"
              : "Pending"
        }
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={
            tuition?.tutorEnrolled === true
              ? "text-success"
              : "text-error"
          }
        >
          {tuition?.tutorEnrolled ? 'Enrolled' : 'Not enrolled' }
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        
        {/* see application */}  

        {/* view tuition*/}
        {
          role === 'student' && <button
         onClick={() => setIsOpen(true)}
          className="btn btn-info btn-sm ml-3"
        >
          <IoInformationCircleOutline size={20} />
        </button>
        }
        
        {/* update status button */}
        {
          role === 'admin' && <>
            {tuition?.status === "accepted" ? (
          <button
            onClick={() => handleStatus("rejected")}
            className="btn btn-warning btn-sm ml-3 tooltip"
            data-tip="Reject Tuition"
          >
            <FaRegWindowClose size={20} />
          </button>
        ) : (
          <button
            data-tip="Accept Tuition"
            onClick={() => handleStatus("accepted")}
            className="btn btn-success btn-sm ml-3 tooltip"
          >
            <FaRegCheckSquare  size={20} />
          </button>
        )}
          </>
          
          
        }
        {/* delete tuition*/}
        <button
          data-tip="Delete Tuition" 
          onClick={() => handleDelete(tuition?._id)}
          className="btn btn-error btn-sm ml-3 tooltip"
        >
          <FaTrash size={20} />
        </button>
          
        {/* Modal */}
        <ViewApplicationsModal
          isOpen={isOpen}
          closeModal={closeModal}
          tuition={tuition}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default TuitionsDataRow;
