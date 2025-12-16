import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { BsFillPatchCheckFill } from "react-icons/bs";

const PaymentSuccess = () => {
  const [paymentData, setPaymentData] = useState(null)
  
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .patch(`/verify-payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.matchedCount === 1) {
          setPaymentData(res.data)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Fee Paid and Tutor Enrolled Success!.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  }, [sessionId, axiosSecure]);

  console.log(paymentData)

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="flex items-center flex-col">
        <BsFillPatchCheckFill color="green" size={150} />
      <h1 className="text-5xl font-semibold mt-10">Payment Successful</h1>
      <p className="text-gray-500 my-5 text-2xl">Thank you! Your Payment was successfully processed</p>
      </div>
      <div className="border py-3 px-10 border-gray-300 h-20 bg-gray-100 rounded-2xl my-10">
        <p className="text-gray-500">Amount Paid : <span className="text-black">৳ {paymentData?.amountTotal}</span></p>
        <p className="text-gray-500">Transaction Id : <span className="text-black">{paymentData?.transactionId}</span></p>
      </div>
      <Link to={'/dashboard/payments'} className="btn btn-info">See Payment History</Link>
    </div>
  );
};

export default PaymentSuccess;
