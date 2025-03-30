import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
        setMessage('User created successfully!');
        setForm({ name: '', email: '', password: '' }); // reset form
        navigate('/users')
      } else if (response.status === 422) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='p-6 w-full'>
        <h2 className='text-xl font-bold mb-4'>Create User</h2>

        {message && <div className="mb-4 text-green-600">{message}</div>}

        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name[0]}</div>}
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email[0]}</div>}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password[0]}</div>}
          </div>
<div className='space-x-2'>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Create User
          </button>
          <button
            onClick={()=>{navigate('/users')}}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
          >
            Go Back!
          </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default Create;
