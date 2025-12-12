import {FaWpforms,  FaUserCog } from 'react-icons/fa'
import { LiaSchoolSolid } from 'react-icons/lia'
import MenuItem from './MenuItem'
import { LuMessageSquareDot } from 'react-icons/lu'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={LiaSchoolSolid} label='Manage Tuitions' address='manage-tuitions' />
      <MenuItem icon={FaWpforms} label='Tuition Applications' address='manage-applications' />
      <MenuItem icon={LuMessageSquareDot} label='Messages' address='messages' />
    </>
  )
}

export default AdminMenu
