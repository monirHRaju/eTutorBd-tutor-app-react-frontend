import { useQuery } from '@tanstack/react-query'
import useAxios from '../../../hooks/useAxios'
import TuitionsDataRow from '../../../components/Dashboard/TableRows/TuitionsDataRow'
import useAuth from '../../../hooks/useAuth'

const ManageMyTuitions = () => {
  const axiosInstance = useAxios()
  const {user} = useAuth()

  
  const {data:tuitions=[], refetch} = useQuery({
    queryKey: ['my-tuitions', user?.email],
    queryFn: async()  => {
      const {data} = await axiosInstance.get(`/tuitions/${user?.email}/student`)
      return data
    }
  })
    const useremail =user.email
    console.log( { useremail, tuitions})
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
                      Subject
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Class
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      District
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Budget
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tuitions.map((tuition) => <TuitionsDataRow key={tuition._id} refetch={refetch} tuition={tuition}/>)
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

export default ManageMyTuitions
