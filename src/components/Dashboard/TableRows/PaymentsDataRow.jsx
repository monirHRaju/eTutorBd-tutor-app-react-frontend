import React from 'react';

const PaymentsDataRow = ({payment}) => {
    return (
        <tr>
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="text-base-content ">{payment?.studentEmail}</p>
      </td>

      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="text-base-content ">{payment?.tutorEmail}</p>
      </td>
      
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="text-base-content ">{payment?.tuitionId}</p>
      </td>
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="">{payment?.amountTotal}</p>
      </td>

      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="">{payment?.transactionId}</p>
      </td>
        
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="">{payment?.status}</p>
      </td>
        
      <td className="px-5 py-5 border-b border-base-300 bg-base-100 text-sm">
        <p className="">{payment?.createdAt}</p>
      </td>

    

    </tr>
    );
};

export default PaymentsDataRow;