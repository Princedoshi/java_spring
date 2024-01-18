import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); 

const AddCustomerModal = ({ isOpen, onRequestClose, onCustomerAdded }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        address: '',
        city: '',
        state: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp/customers', formData);

            onRequestClose();
            onCustomerAdded(response.data);
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Customer Modal"
        >
            <h2>Add a Customer</h2>
            <form onSubmit={handleSubmit} className='flex flex-col mt-2 gap-2'>
                {/* Render your input fields based on formData */}
                {/* For brevity, you can use a loop or manually list the input fields */}
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="street">Street:</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.street}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.state}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className='border border-black w-56 rounded-md p-2'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />



                <button type="submit" className='border border-black bg-black text-white w-32 mt-2 h-12 rounded-lg'>Submit</button>
            </form>
        </Modal>
    );
};

export default AddCustomerModal;
