
import React, { FC } from 'react';
import AdminNavbar from '../../Components/admin/adminNavbar/adminNavbar';
import AdminUsers from '../../Components/admin/adminUserListing/adminUsers';

const AdminUser: FC = () => {


    return (
        <>
        <AdminNavbar/>
        <AdminUsers/>
        </>
    )
};

export default AdminUser;
