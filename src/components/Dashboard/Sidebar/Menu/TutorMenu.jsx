import { FaWpforms } from "react-icons/fa"
import MenuItem from './MenuItem'
import { MdOutlineManageHistory } from 'react-icons/md'
const TutorMenu = () => {

  return (
    <>
      <MenuItem icon={FaWpforms} label='My Applications' address='my-applications' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Payments'
        address='manage-payments'
      />
      
    </>
  )
}

export default TutorMenu
