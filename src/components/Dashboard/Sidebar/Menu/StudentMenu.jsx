import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const StudentMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='My Tuitions'
        address='my-tuitions'
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Post New Tuition'
        address='post-tuition'
      />
      
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Applied Tutors'
        address='applied-tutors'
      />
      
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Payments'
        address='payments'
      />
      
    </>
  )
}

export default StudentMenu
