import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const OfferModal = ({ tuition, closeModal, isOpen }) => {
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const {
      studentName,
      budget,
      studentId,
      studentEmail,
      _id: tuitionId,
    } = tuition;

  const {data: userRole = null, refetch} = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async() => {
      // search user role type
      const {data} = await axiosInstance.get(`/users/${user?.email}/email`)
      
      return data
    },
    enabled: !!user?.email

  })

  console.log(userRole)

  
  const handleSendOffer = (e) => {
    e.preventDefault();
    const offerPrice = e.target.offer.value;

    const offerInfo = {
      offerPrice,
      studentName,
      budget,
      studentId,
      studentEmail,
      tuitionId,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
    };
    axiosInstance
      .post("/offers", offerInfo)
      .then((res) => {
        if (res.data.insertedId) {
          closeModal()
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Offer sent.`,
            showConfirmButton: false,
            timer: 2000,
          });
          
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <form onSubmit={handleSendOffer}>
            <DialogPanel
              transition
              className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-center leading-6 text-gray-900"
              >
                Review Info Before Apply for this Tuition
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500 font-semibold">
                  Subject : {tuition.subject}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{tuition.district}</p>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Budget: $ {tuition.budget}
                </p>
              </div>

              <input
                type="text"
                name="offer"
                required
                placeholder="Place your offer"
                className="input"
              />
              <div className="flex mt-2 justify-around">
                <button
                  type="submit"
                  className="cursor-pointer inline-flex justify-center text-white btn btn-secondary px-4 py-2 text-sm font-medium"
                >
                  Send Offer
                </button>
                <button
                  type="button"
                  className="cursor-pointer inline-flex justify-center text-white btn btn-error px-4 py-2 text-sm font-medium"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default OfferModal;
