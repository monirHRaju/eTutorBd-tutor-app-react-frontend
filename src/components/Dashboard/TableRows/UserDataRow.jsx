import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'
import { FaTrash, FaUserCheck } from 'react-icons/fa6'
import { FaUserAltSlash } from 'react-icons/fa'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const UserDataRow = ({user, refetch}) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure()


  const handleStatus = status => {
  
    const statusData = {status}
    axiosSecure.patch(`/users/${user._id}/status`, statusData)
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
            
          }
        })
  }

    const handleDelete = (userId) => {
      
      Swal.fire({
        title: `Are you sure to Delete User?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          //delete from mongo db
          axiosSecure.delete(`/users/${userId}/delete`).then((res) => {
            if (res.data.deletedCount) {
              refetch();
  
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `User Deleted Success!.`,
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
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className=''>{user?.role}</p>
      </td>
      
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className={user?.status==='pending'? 'text-warning' : user?.status === 'accepted' ? 'text-success' : 'text-error'}>{user?.status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {/* update role modal */}
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        
        {/* update status button */}
        {
          user?.status === 'accepted'
          ? <button onClick={()=> handleStatus('rejected')} data-tip="Reject User" className='btn tooltip btn-warning btn-sm ml-3'><FaUserAltSlash size={20} /></button>
          : <button onClick={()=> handleStatus('accepted')} data-tip="Accept User" className='btn tooltip btn-success btn-sm ml-3'><FaUserCheck size={20} /></button>
        }
        {/* delete tuition*/}
                <button
                  data-tip="Delete User" 
                  onClick={() => handleDelete(user?._id)}
                  className="btn btn-error btn-sm ml-3 tooltip"
                >
                  <FaTrash size={20} />
                </button>


        

        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          role={user?.role}
          user={user}
          refetch={refetch}
        />
      </td>
    </tr>
  )
}

export default UserDataRow
