import { FaTrash, FaUserCheck } from "react-icons/fa6";
import { TiUserDelete } from "react-icons/ti";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TuitionsDataRow = ({ tuition, refetch }) => {
  const axiosSecure = useAxiosSecure();

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
        axiosSecure.delete(`/tuitions/${tuitionId}/delete`)
      .then((res) => {
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
        <p className="text-gray-900 ">{tuition?.class}</p>
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
            tuition?.status === "accepted" ? "text-success" : tuition.status === "pending" ? "text-warning" : "text-error"
          }
        >
          {tuition?.status}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* update status button */}
        {tuition?.status === "accepted" ? (
          <button
            onClick={() => handleStatus("rejected")}
            className="btn btn-error btn-sm ml-3"
          >
            <TiUserDelete size={20} />
          </button>
        ) : (
          <button
            onClick={() => handleStatus("accepted")}
            className="btn btn-success btn-sm ml-3"
          >
            <FaUserCheck size={20} />
          </button>
        )}

        {/* delete tuition*/}
        <button
          onClick={() => handleDelete(tuition?._id)}
          className="btn btn-error btn-sm ml-3"
        >
          <FaTrash size={20} />
        </button>
      </td>
    </tr>
  );
};

export default TuitionsDataRow;
