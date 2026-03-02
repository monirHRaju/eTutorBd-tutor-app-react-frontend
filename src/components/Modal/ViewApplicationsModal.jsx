import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const ViewApplicationsModal = ({ tuition, isOpen, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const {role} = useRole()

  const { data: applications = [], refetch: appsRefetch } = useQuery({
    queryKey: ["applications", tuition._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/applications/${tuition._id}`);

      return data;
    },
  });
  const handleStatus = (status, applicationId) => {
    const statusData = { status };
    axiosSecure
      .patch(`/applications/${applicationId}/status`, statusData)
      .then((res) => {
        if (res.data.modifiedCount) {
          appsRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Application status is set to ${status}.`,
            showConfirmButton: false,
            timer: 2000,
          });
          closeModal();
        }
      });
  };

  const handlePayment = async (application) => {
    const paymentInfo = {
      subject: application?.subject,
      tutorEmail: application?.tutorEmail,
      studentId: application?.studentId,
      tuitionId: application?.tuitionId,
      budget: application?.budget,
      tutorName: application?.tutorName,
      studentName: application?.studentName,
      studentEmail: application?.studentEmail,
      offerPrice: application?.offerPrice,
    };
    console.log(paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    //  console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-base-100 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-base-content"
              >
                All Applications for{" "}
                <span className="text-primary">{tuition.subject}</span>
              </DialogTitle>

              <div>
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-base-100 border-b border-base-300 text-base-content text-left text-sm uppercase font-normal"
                      >
                        Tutor Name
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-base-100 border-b border-base-300 text-base-content text-left text-sm uppercase font-normal"
                      >
                        Tutor Offer
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-base-100 border-b border-base-300 text-base-content text-left text-sm uppercase font-normal"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-base-100 border-b border-base-300 text-base-content text-left text-sm uppercase font-normal"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr key={application._id}>
                        <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
                          <Link
                            to={`${import.meta.env.VITE_SITE_URL}/tutor-info/${
                              application.tutorEmail
                            }/email`}
                            className="tooltip"
                            data-tip="Click for more info"
                          >
                            <p className="link ">{application.tutorName}</p>
                          </Link>
                        </td>

                        <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
                          <p className="text-base-content ">
                            {application.offerPrice}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
                          <p
                            className={
                              application?.status === "enrolled"
                                ? "text-info"
                                : application?.status === "rejected"
                                ? "text-error"
                                : "text-warning"
                            }
                          >
                            {application?.status === "enrolled"
                              ? "Accepted"
                              : application?.status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
                          {
                            role === "student" && <button
                            onClick={() => handlePayment(application)}
                            className="cursor-pointer btn btn-secondary btn-sm"
                          >
                            Accept & Pay
                          </button>
                          }
                          

                          <button
                            onClick={() =>
                              handleStatus("rejected", application._id)
                            }
                            className="cursor-pointer btn btn-error btn-sm"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex mt-2 justify-around">
                <button
                  type="button"
                  className="cursor-pointer btn btn-error btn-outline"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ViewApplicationsModal;
