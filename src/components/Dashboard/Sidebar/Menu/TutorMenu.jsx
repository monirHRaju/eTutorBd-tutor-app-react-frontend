import { FaWpforms } from "react-icons/fa"
import MenuItem from './MenuItem'
import { MdOutlineManageHistory } from 'react-icons/md'
const TutorMenu = () => {

  return (
    <>
      <MenuItem icon={FaWpforms} label='My Applications' address='my-applications' />
      <MenuItem icon={FaWpforms} label='Ongoing Tuitions' address='ongoing-tuitions' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Revenue History'
        address='revenue-history'
      />
      
    </>
  )
}

export default TutorMenu
