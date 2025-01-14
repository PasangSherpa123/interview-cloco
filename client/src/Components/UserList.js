import React from 'react';
import Table from './Table';

const UserList = () => {
  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'gender', label: 'Gender' },
    { key: 'address', label: 'Address' },
    { key: 'dob', label: 'Date of Birth' },
  ];

  const data = [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+123456789',
      gender: 'Male',
      address: '123 Street, City',
      dob: '1990-01-01',
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+987654321',
      gender: 'Female',
      address: '456 Avenue, City',
      dob: '1995-05-15',
    },
  ];

  return <Table columns={columns} data={data} />;
};

export default UserList;
