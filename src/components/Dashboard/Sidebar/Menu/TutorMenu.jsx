import { FaWpforms } from "react-icons/fa"
import MenuItem from './MenuItem'
import { MdOutlineManageHistory } from 'react-icons/md'
import { LuMessageSquareDot  } from 'react-icons/lu'
const TutorMenu = () => {

  return (
    <>
      <MenuItem icon={FaWpforms} label='My Applications' address='my-applications' />
      <MenuItem icon={FaWpforms} label='Ongoing Tuitions' address='ongoing-tuitions' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Revenue History'
        address='tutor-payments'
      />
      <MenuItem icon={LuMessageSquareDot} label='Messages' address='messages' />
    </>
  )
}

export default TutorMenu
