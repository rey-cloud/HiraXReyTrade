import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import noImage from '../../../public/assets/no-image.png';

const Index = () => {
  const [userArray, userSetArray] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });
  

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await fetch(`/api/users?page=${page}&search=${search}`);
      const data = await response.json();
  
      userSetArray(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  

  useEffect(() => {
    fetchData(1, searchTerm); // Refetch when searchTerm changes
  }, [searchTerm]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Delete successful:", data);
      userSetArray(prev => prev.filter(p => p.id !== id));

      // Optional: refetch current page
      fetchData(pagination.current_page);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`p-6 w-full transition-all duration-300 ${
        isOpen ? "md:ml-64" : "ml-20"
      }`}>
        <div className='mb-4'>
          <Link to="/user/create" className="rounded bg-slate-500 text-white px-4 py-2 inline-block">Create New User</Link>
        </div>
        <div>
        <input
          type="text"
          placeholder="Search by user name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full max-w-md"
        />

        </div>
          <h2 className="text-xl font-bold mb-2">User Table</h2>
        <div className="p-4 bg-white shadow rounded max-h-[55vh] overflow-y-auto">
          <table className="min-w-full border ">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userArray.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 flex space-x-1 justify-center">
                    <Link to={`/user/edit/${user.id}`} className="rounded-sm px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white">Edit</Link>
                    <Link to={`/user/show/${user.id}`} className="rounded-sm px-2 py-1 bg-yellow-500 hover:bg-yellow-700 text-white">Show</Link>
                    <button onClick={() => handleDelete(user.id)} className="rounded-sm px-2 py-1 bg-red-500 hover:bg-red-700 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
          {/* Pagination Buttons */}
          <div className="mt-4 flex items-center gap-2">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => fetchData(pagination.current_page - 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-2 py-1">
              Page {pagination.current_page} of {pagination.last_page}
            </span>

            <button
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => fetchData(pagination.current_page + 1)}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
      </div>
    </div>
  );
};

export default Index;
