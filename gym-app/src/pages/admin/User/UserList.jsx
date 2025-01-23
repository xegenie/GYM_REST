import React from 'react'
import Header from '../../../components/admin/Header/adminHeader';
import AdminFooter from '../../../components/admin/Header/adminFooter';
import UserListContainer from '../../../containers/User/UserListContainer'


const UserList = () => {
  return (
    <>

      <Header />
      <UserListContainer />
      <AdminFooter />

    </>
  )
}

export default UserList