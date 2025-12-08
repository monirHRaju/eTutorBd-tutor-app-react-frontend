import { Link } from 'react-router'
import { IoMdTime } from "react-icons/io";
import { FaRegMoneyBill1 } from "react-icons/fa6";
const Card = ({tuition}) => {

  return (
    <Link
      to={`/tuition-details/${tuition._id}`}
      className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
    >
      <div className='space-y-3'>
        
        <div className='font-semibold text-2xl text-primary'>{tuition.subject}</div>
        <div className='btn btn-primary font-semibold bg-primary px-3 py-2'> {tuition.district}</div>
        <div className='font-semibold text-lg'>Location: {tuition.location}</div>
        <div className='font-semibold text-lg flex gap-4 items-center'>
          <IoMdTime  size={20}/> 
          <p>{tuition.schedule}</p>
        </div>
        
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold flex flex-row gap-4 items-center'> 
            <FaRegMoneyBill1 size={20}/> 
            <p>{tuition.budget}</p>
          </div>
        </div>

        <div>
          <button className='btn btn-secondary'>Send Offer</button>
        </div>
      </div>
    </Link>
  )
}

export default Card
