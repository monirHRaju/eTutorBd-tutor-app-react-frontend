import { Link } from 'react-router'
import { IoMdTime } from "react-icons/io";
import { FaRegMoneyBill1 } from "react-icons/fa6";
const Card = ({tuition}) => {

  return (
    // <Link
    //   to={`/tuition-details/${tuition._id}`}
    //   className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    // >
      <div className='space-y-3 col-span-1 group shadow-xl p-3 rounded-xl'>
        
        <div className='font-semibold text-2xl text-primary'>{tuition.subject}</div>
        <div className='badge badge-primary'> {tuition.district}</div>
        <div className='font-semibold text-lg'>Address: {tuition.location}</div>
        
        
        <div className='flex flex-row justify-between items-center gap-1'>
          <div className='font-semibold flex flex-row gap-4 items-center'> 
            <FaRegMoneyBill1 size={20}/> 
            <p>{tuition.budget}</p>
          </div>
          <div className='font-semibold text-lg flex gap-4 items-center'>
          <IoMdTime  size={20}/> 
          <p>{tuition.schedule}</p>
        </div>
        </div>

        <div className='flex justify-center'>
          <Link to={`/tuition-details/${tuition._id}`}  className='btn btn-base-300'>View Details</Link>
        </div>
      </div>
    // </Link>
  )
}

export default Card
