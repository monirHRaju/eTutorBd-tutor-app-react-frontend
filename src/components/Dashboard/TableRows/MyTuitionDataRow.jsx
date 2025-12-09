import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'
import { FaUserCheck } from 'react-icons/fa6'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const MyTuitionDataRow = ({application, refetch}) => {
  const axiosSecure = useAxiosSecure()


  const handleStatus = status => {
  
    const statusData = {status}
    axiosSecure.patch(`/users/status`, statusData)
        .then( res => {
          if(res.data.modifiedCount){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `User status is set to ${status}.`,
                showConfirmButton: false,
                timer: 2000
            });
            console.log('status updated ', status );
          }
        })
  }
  return (
    <tr>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{application.subject}</p>
      </td>
        
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{application.district}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{application.budget}</p>
      </td>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>{application.offerPrice}</p>
      </td>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className={application.status==='pending'? 'text-warning' : application.status === 'accepted' ? 'text-success' : 'text-error'}>{application?.status}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{application.createdAt}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {/* update status button */}
        {
          application?.status === 'accepted'
          ? <button onClick={()=> handleStatus('rejected')} className='btn btn-error btn-sm ml-3'><FaUserCheck size={20} /></button>
          : <button onClick={()=> handleStatus('accepted')} className='btn btn-success btn-sm ml-3'><FaUserCheck size={20} /></button>
        }
        
      </td>
    </tr>
  )
}

export default MyTuitionDataRow
