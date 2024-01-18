// Table.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination';
import axios from 'axios';

const Table = ({ customers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [editedCustomer, setEditedCustomer] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    email: '',
  });

 


  useEffect(() => {
    setCurrentPage(1);
  }, [customers]);

  if (!customers || !customers.content) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.content.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(customers.content.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (customer) => {
    setEditedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp/customers/${editedCustomer.id}`, editedCustomer);

      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };


  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp/customers/${customerId}`);

      window.location.reload();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };


  return (
    <div>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>ID</th>
            <th className='py-2 px-4 border-b'>First Name</th>
            <th className='py-2 px-4 border-b'>Last Name</th>
            <th className='py-2 px-4 border-b'>Address</th>
            <th className='py-2 px-4 border-b'>City</th>
            <th className='py-2 px-4 border-b'>State</th>
            <th className='py-2 px-4 border-b'>Email</th>
            <th className='py-2 px-4 border-b'>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((customer) => (
            <tr key={customer.id}>
              <td className='py-2 px-4 border-b'>{customer.id}</td>
              <td className='py-2 px-4 border-b'>{customer.firstName}</td>
              <td className='py-2 px-4 border-b'>{customer.lastName}</td>
              <td className='py-2 px-4 border-b'>{customer.address}</td>
              <td className='py-2 px-4 border-b'>{customer.city}</td>
              <td className='py-2 px-4 border-b'>{customer.state}</td>
              <td className='py-2 px-4 border-b'>{customer.email}</td>
              <td className='py-2 px-4 border-b'>
                <div className='flex'>
                <button
                  className='bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 mr-2'
                  onClick={() => handleEdit(customer.id)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className='bg-red-500 text-white p-1 rounded-md hover:bg-red-600'
                  onClick={() => handleDelete(customer.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
       <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <h2>Edit Customer</h2>
        <form>
       
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={editedCustomer.firstName}
            onChange={(e) => setEditedCustomer({ ...editedCustomer, firstName: e.target.value })}
          />
          <button type="button" onClick={handleEditSubmit}>
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Table;
