import { Link } from "react-router";
import { IoMdTime } from "react-icons/io";
import { FaRegMoneyBill1, FaLocationDot  } from "react-icons/fa6";
import { FaTransgender, FaLanguage } from "react-icons/fa";

const Card = ({ tuition }) => {
  return (
    <div className="space-y-3 col-span-1 group shadow-lg p-5 rounded-2xl
        relative overflow-hidden bg-base-100 border border-base-300
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
    ">
      <div className="font-bold text-2xl text-primary">
        {tuition.subject}
      </div>
      <div className="badge badge-primary px-4 py-2"> {tuition.district}</div>
      
      <div className="flex flex-col gap-1">
        <div className="font-semibold flex flex-row gap-4 items-center">
          
          <FaLanguage size={20} />
          <p>Medium : {tuition.medium}</p>
        </div>

        <div className="font-semibold text-lg flex gap-4 items-center">
          <IoMdTime size={20} />
          <p>{tuition.schedule}</p>
        </div>
        
        <div className="font-semibold text-lg flex gap-4 items-center">
          <FaTransgender size={20} />
          <p>{tuition.tutorGender}</p>
        </div>

        <div className="font-semibold flex flex-row gap-4 items-center">
          <FaRegMoneyBill1 size={20} />
          <p>Budget : ৳ {tuition.budget}/month</p>
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
