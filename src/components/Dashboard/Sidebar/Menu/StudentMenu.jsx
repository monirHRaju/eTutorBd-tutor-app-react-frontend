import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
import { LuMessageSquareDot } from 'react-icons/lu'
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
        label='Payments'
        address='payments'
      />
      {/* <MenuItem icon={LuMessageSquareDot} label='Messages' address='messages' /> */}
    </>
  )
}

export default StudentMenu
