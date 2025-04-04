import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // get user ID from URL

  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    // Fetch user data for editing
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setForm({ name: data.name, email: data.email, password: '' });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User updated:', data);
        setMessage('User updated successfully!');
        navigate('/users');
      } else if (response.status === 422) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`p-6 w-full transition-all duration-300 ${isOpen ? "md:ml-64" : "ml-20"}`}>
        <h2 className='text-xl font-bold mb-4'>Edit User</h2>

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
              placeholder="Leave blank to keep current password"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password[0]}</div>}
          </div>

          <div className='space-x-2'>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
            >
              Update User
            </button>
            <button
              onClick={() => navigate('/users')}
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

export default EditUser;
