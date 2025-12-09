import { BsFingerprint } from 'react-icons/bs'
import MenuItem from './MenuItem'
import { MdOutlineManageHistory } from 'react-icons/md'
const TutorMenu = () => {

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Applications' address='my-tutor-applications' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Payments'
        address='manage-payments'
      />
      
    </>
  )
}

export default TutorMenu
