import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../hooks/useAxios'
import useAuth from '../../../hooks/useAuth'
import PaymentsDataRow from '../../../components/Dashboard/TableRows/PaymentsDataRow'

const TutorPayments = () => {
  const axiosInstance = useAxios()
  const {user} = useAuth()

  
  const {data:payments=[], refetch} = useQuery({
    queryKey: ['student-payments', user?.email],
    queryFn: async()  => {
      const {data} = await axiosInstance.get(`/tutor-payments?email=${user?.email}`)
      return data
    }
  })

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Paid By
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Paid To
                    </th>
                    
                 
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      tuitionId
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Amount
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Transaction Id
                    </th>
                   
                   <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Payment Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    payments.length === 0 
                    ? <tr className='flex justify-center p-6'><td className='text-center'>No data found</td></tr>
                    : payments.map((payment) => <PaymentsDataRow key={payment._id} refetch={refetch} payment={payment}/>)
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TutorPayments
