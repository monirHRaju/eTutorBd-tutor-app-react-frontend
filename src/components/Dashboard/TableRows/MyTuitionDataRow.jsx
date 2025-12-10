import { FaTrash, FaUserCheck } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyTuitionDataRow = ({ application, refetch }) => {
  const axiosSecure = useAxiosSecure();
  // const role = useRole();

  // const handleStatus = (status) => {
  //   const statusData = { status };
  //   axiosSecure
  //     .patch(`/applications/${application._id}/status`, statusData)
  //     .then((res) => {
  //       if (res.data.modifiedCount) {
  //         refetch();
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: `Application status is set to ${status}.`,
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       }
  //     });
  // };

  const handleDelete = (applicationId) => {
    Swal.fire({
      title: `Do you want to Delete? ${application.subject}`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        //delete from mongo db
        axiosSecure
          .patch(`/applications/${applicationId}/delete`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Application Deleted.`,
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
        <Link to={`${import.meta.env.VITE_SITE_URL}/tuition-details/${application.tuitionId}`} target="_blank"><p className="link link-secondary">{application.subject}</p></Link>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{application.district}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{application.budget}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{application.offerPrice}</p>
      </td>

      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={
            application.status === "pending"
              ? "text-warning"
              : application.status === "accepted"
              ? "text-success"
              : "text-error"
          }
        >
          {application?.status}
        </p>
      </td> */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{application.createdAt}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* update status button */}
        {/* {role === "admin" && (
          <>
            {application?.status === "accepted" ? (
              <button
                onClick={() => handleStatus("rejected")}
                className="btn btn-warning btn-sm ml-3"
              >
                <FaUserCheck size={20} />
              </button>
            ) : (
              <button
                onClick={() => handleStatus("accepted")}
                className="btn btn-success btn-sm ml-3"
              >
                <FaUserCheck size={20} />
              </button>
            )}
          </>
        )} */}

        <button
          onClick={() => handleDelete(application._id)}
          className="btn btn-error btn-sm ml-3"
        >
          <FaTrash size={20} />
        </button>
      </td>
    </tr>
  );
};

export default MyTuitionDataRow;
