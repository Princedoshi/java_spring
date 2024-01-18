import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../Components/Table';
import AddCustomerModal from '../Components/AddCustomerModal';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchOptions, setSearchOptions] = useState('firstName');
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp/customers/${customerId}');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, [searchTerm]); 

    console.log("customers", customers);

    const handleSearch = () => {
        
        const customerData = customers.content || [];
      
        const filteredCustomers = customerData.filter((customer) => {
          const searchTermLowerCase = searchTerm.toLowerCase();
          const customerValue = customer[searchOptions].toLowerCase();
      
          return customerValue.includes(searchTermLowerCase);
        });
      
        setCustomers({ ...customers, content: filteredCustomers });
      };
      
      
      
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        window.location.reload();
    };

    const handleCustomerAdded = (newCustomer) => {
        // Update the state with the new customer
        setCustomers([...customers, newCustomer]);
    };



    return (
        <div>
            <div className='flex justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Customers</h1>
                <button className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600' onClick={openAddModal}>
                    Add a Customer
                </button>
                <AddCustomerModal
                    isOpen={isAddModalOpen}
                    onRequestClose={closeAddModal}
                    onCustomerAdded={handleCustomerAdded}
                />
            </div>

            <div className='flex items-center mb-4'>
                <label htmlFor='searchOptions' className='mr-2 text-sm font-medium text-gray-600'>
                    Search By:
                </label>
                <select
                    id='searchOptions'
                    className='p-2 border rounded-md'
                    value={searchOptions}
                    onChange={(e) => setSearchOptions(e.target.value)}
                >
                    <option value='firstName'>First Name</option>
                    <option value='lastName'>Last Name</option>
                    <option value='address'>Address</option>
                    <option value='city'>City</option>
                    <option value='state'>State</option>
                    <option value='email'>Email</option>
                </select>
                <input
                    type='text'
                    id='searchTerm'
                    placeholder='Enter search term...'
                    className='ml-2 p-2 border rounded-md'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className='bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600'
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <div className='mt-10'>
                <Table customers={customers} />
            </div>
        </div>
    );
};

export default Customers;
