import React from 'react';

const PaymentsDataRow = ({payment}) => {
    return (
        <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{payment?.studentEmail}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{payment?.tutorEmail}</p>
      </td>
      
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{payment?.tuitionId}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{payment?.amountTotal}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{payment?.transactionId}</p>
      </td>
        
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{payment?.status}</p>
      </td>
        
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="">{payment?.createdAt}</p>
      </td>

    

    </tr>
    );
};

export default PaymentsDataRow;