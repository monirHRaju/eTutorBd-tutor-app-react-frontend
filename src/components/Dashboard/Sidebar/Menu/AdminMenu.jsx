import {FaWpforms,  FaUserCog } from 'react-icons/fa'
import { LiaSchoolSolid } from 'react-icons/lia'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={LiaSchoolSolid} label='Manage Tuitions' address='manage-tuitions' />
      <MenuItem icon={FaWpforms} label='Tuition Applications' address='manage-applications' />
    </>
  )
}

export default AdminMenu
