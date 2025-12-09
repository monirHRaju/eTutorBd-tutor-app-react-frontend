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
        label='Manage Payments'
        address='manage-payments'
      />
    </>
  )
}

export default StudentMenu
