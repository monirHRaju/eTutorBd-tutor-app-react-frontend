import Button from '../../components/Shared/Button/Button'
import OfferModal from '../../components/Modal/OfferModal'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import { FaLeftLong } from 'react-icons/fa6'
import useAuth from '../../hooks/useAuth'
import { FaMapMarkerAlt, FaUserGraduate, FaBook, FaClock, FaVenusMars, FaMoneyBillWave } from "react-icons/fa";

export default function TuitionDetails() {
  const [isOpen, setIsOpen] = useState(false)
  const axiosInstance = useAxios()
  const {user} = useAuth()


  const {id} = useParams()

  const { data: tuition = [], refetch} = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const {data} = await axiosInstance.get(`/tuitions/${id}`);

      return data;
    },
  });

  const closeModal = () => {
    refetch()
    setIsOpen(false)
  }
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1); 
  }
  
  const {
    subject, medium, studentGender, className,requirements, district, location, tutorGender, budget, schedule, createdAt, jobId
  } = tuition;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-12">
      <div onClick={goBack} className='flex gap-3 items-center w-25'>
        <FaLeftLong />
        <button> Back</button>
      </div>
      <div className="card bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary">
              {subject}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Job ID : {jobId} · Posted at : {createdAt}
            </p>

            <div className="flex justify-center items-center gap-2 mt-3 text-secondary">
              <FaMapMarkerAlt />
              <span className="font-semibold">{location}, {district}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <InfoItem icon={<FaBook />} label="Medium" value={medium} />
            <InfoItem icon={<FaUserGraduate />} label="Class" value={className} />
            <InfoItem icon={<FaVenusMars />} label="Student Gender" value={studentGender} />

            <InfoItem icon={<FaUserGraduate />} label="Preferred Tutor" value={tutorGender} />
            <InfoItem icon={<FaClock />} label="Tutoring Time" value={schedule} />

            <InfoItem
              icon={<FaBook />}
              label="Subject"
              value={<span className="badge badge-secondary">{subject}</span>}
            />
            <InfoItem
              icon={<FaMoneyBillWave />}
              label="Salary"
              value={<span className="text-secondary font-semibold">৳ {budget}</span>}
            />
          </div>

          {/* Requirements */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-1">Other Requirements :</h3>
            <p className="text-sm text-gray-600">{requirements}</p>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            {
              user 
              ? <Button onClick={() => setIsOpen(true)} className="btn btn-outline btn-secondary gap-2" label='Apply as Tutor' />
              : <Link to={'/login'} className='btn btn-secondary'>Apply as Tutor</Link>
            }
          </div>
        </div>
        <OfferModal  tuition={tuition} refetch={refetch} closeModal={closeModal} isOpen={isOpen} />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-secondary mt-1">{icon}</div>
      <div>
        <p className="text-gray-500">{label} :</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}