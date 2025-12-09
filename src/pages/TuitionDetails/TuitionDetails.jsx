import Container from '../../components/Shared/Container'
import Button from '../../components/Shared/Button/Button'
import OfferModal from '../../components/Modal/OfferModal'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import { FaClock, FaLeftLong } from 'react-icons/fa6'
import useAuth from '../../hooks/useAuth'

const TuitionDetails = () => {
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

  
//   const { data: student = [] } = useQuery({
//     queryKey: ["student", tuition.studentEmail],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get(`/tuitions/${tuition.studentEmail}/student`)

//       return data;
//     },
//   });

//   console.log(student)

  const closeModal = () => {
    refetch()
    setIsOpen(false)
  }
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1); 
  }
  return (
    <Container>
      <div className='mx-auto w-full gap-12'>
        
        <div className='md:gap-10 flex-1 my-20'>
          {/* Plant Info */}
          <button onClick={goBack} className='flex items-center gap-3 shadow-md px-3 py-2 hover:bg-red-100' >
            <FaLeftLong></FaLeftLong>
            Go Back</button>
          
          <h2 className='text-3xl font-bold'>Tuition Needed for : <span className='text-primary'>{tuition.subject}</span></h2>
            <p className='text-2xl text-secondary font-semibold'>{tuition.district} </p>
            <p className='font-semibold'>Address: {tuition.location}</p>
          <hr className='my-6' />
          <div
            className='text-lg font-light text-neutral-500 flex items-center gap-5'>
            Schedule: <FaClock></FaClock>
            {tuition.schedule}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
          >
            {/* <div>
                <img src={student.photoURL} alt="" />
               <p>Student Name : {student.name}</p>
            </div> */}


            
          </div>
          
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Budget: {tuition.budget}$</p>
            <div>
              {
                user 
                ? <Button onClick={() => setIsOpen(true)} label='Apply as Tutor' />
                : <Link to={'/login'} className='btn btn-primary'>Apply as Tutor</Link>
              }
              
            </div>
          </div>
          <hr className='my-6' />

          <OfferModal tuition={tuition} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default TuitionDetails
