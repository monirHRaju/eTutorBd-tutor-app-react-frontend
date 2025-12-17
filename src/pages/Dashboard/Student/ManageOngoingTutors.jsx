import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import OngoingTuitionsDataRow from "../../../components/Dashboard/TableRows/OngoingTuitionsDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageOngoingTutors = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["enrolled-tuitions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/applications/${user?.email}/student`);
      return data;
    },
  });

  console.log(applications)
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
                      Tutor Name
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Tutor Email
                    </th>
                    
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Tuition Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Salary
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
                      Enroll Date
                    </th>
                   
                    {/* <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    applications.length === 0 
                    ? <tr className='flex justify-center p-6'><td className='text-center'>No data found</td></tr>
                    : applications.map((application) => <OngoingTuitionsDataRow key={application._id} refetch={refetch} application={application}/>)
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ManageOngoingTutors;
