import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'
import { FaClock } from 'react-icons/fa6'

const TuitionDetails = () => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosInstance = useAxios()

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
  return (
    <Container>
      <div className='mx-auto w-full gap-12'>
        
        <div className='md:gap-10 flex-1'>
          {/* Plant Info */}
          <Heading
            title={tuition.subject}
            subtitle={`Location: ${tuition.district}, ${tuition.location}`}
          />
          <hr className='my-6' />
          <div
            className='text-lg font-light text-neutral-500 flex items-center gap-5'>
            <FaClock></FaClock>
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
            <div>
                <img src={student.photoURL} alt="" />
               <p>Student Name : {student.name}</p>
            </div>


            
          </div>
          
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Budget: {tuition.budget}$</p>
            <div>
              <Button onClick={() => setIsOpen(true)} label='Apply as Tutor' />
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal tuition={tuition} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default TuitionDetails
