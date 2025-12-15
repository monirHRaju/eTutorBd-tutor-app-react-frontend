import { Link } from "react-router";
import { IoMdTime } from "react-icons/io";
import { FaRegMoneyBill1, FaLocationDot  } from "react-icons/fa6";
import { FaTransgender, FaLanguage } from "react-icons/fa";

const Card = ({ tuition }) => {
  return (
    <div className="space-y-3 col-span-1 group shadow-xl p-3 rounded-xl">
      <div className="font-semibold text-2xl text-primary">
        {tuition.subject}
      </div>
      <div className="badge badge-primary"> {tuition.district}</div>
      
      <div className="flex flex-col gap-1">
        <div className="font-semibold flex flex-row gap-4 items-center">
          
          <FaLanguage size={20} />
          <p>Medium : {tuition.medium}</p>
        </div>

        <div className="font-semibold text-lg flex gap-4 items-center">
          <IoMdTime size={20} />
          <p>Class Time :{tuition.schedule}</p>
        </div>
        
        <div className="font-semibold text-lg flex gap-4 items-center">
          <FaTransgender size={20} />
          <p>Preferred Gender : {tuition.tutorGender}</p>
        </div>

        <div className="font-semibold flex flex-row gap-4 items-center">
          <FaRegMoneyBill1 size={20} />
          <p>Budget : ${tuition.budget}/month</p>
        </div>

      </div>

      <div className="flex justify-center">
        <Link
          to={`/tuition-details/${tuition._id}`}
          className="btn btn-base-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
