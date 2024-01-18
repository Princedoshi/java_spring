import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='userId' className='block text-sm font-medium text-gray-600'>
            User ID:
          </label>
          <input
            type='text'
            id='userId'
            name='userId'
            value={formData.userId}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md w-96'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-600'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='mt-1 p-2 border rounded-md w-96'
            required
          />
        </div>

        <Link to='/customers'>
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
          >
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
