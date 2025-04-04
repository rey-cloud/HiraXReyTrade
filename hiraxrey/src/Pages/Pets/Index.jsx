import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import noImage from '../../../public/assets/no-image.png';

const Index = () => {
  const [petArray, petSetArray] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
  const [searchTerm, setSearchTerm] = useState('');

  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });

  const fetchData = async (page = 1, search = '') => {
    try {
      const response = await fetch(`/api/pets?page=${page}&search=${search}`);
      const data = await response.json();

      petSetArray(data.data);
      setPagination({ current_page: data.current_page, last_page: data.last_page });
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchData(1, searchTerm);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this pet?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/pets/${id}/delete`, { method: "DELETE" });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting pet:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Delete successful:", data);
      petSetArray(prev => prev.filter(p => p.id !== id));
      fetchData(pagination.current_page);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`transition-all duration-300 flex-1 p-4 ${
          isOpen ? "md:ml-64" : "ml-20"
        }`}>
        <div className="mb-4">
          <Link to="/pet/create" className="rounded bg-slate-500 text-white px-4 py-2 inline-block">
            Create New Pet
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by pet name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full md:max-w-md"
          />
        </div>
        <h2 className="text-xl font-bold mb-2">Pet Table</h2>
        <div className="p-4 bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Values</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {petArray.map(pet => (
                <tr key={pet.id}>
                  <td className="border px-4 py-2">{pet.id}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={pet.image_url ? `/storage/${pet.image_url}` : noImage}
                      alt=""
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{pet.name}</td>
                  <td className="border px-4 py-2">
                    {pet.type != 'Pet' ? pet.value : <select className="w-full border border-gray-300 rounded px-2 py-1 bg-gray-100 text-gray-500">
                      {pet.pet_values.map((value, idx) => (
                        <option key={idx} disabled>
                          {value.type === 'normal' ? '' : value.type === 'neon' ? '🟢' : value.type === 'mega' ? '🟣' : ''}
                          {value.attribute === 'fly_ride' ? '🔵🔴' : value.attribute === 'fly' ? '🔵' : value.attribute === 'ride' ? '🔴' : ''} - {value.value}
                        </option>
                      ))}
                    </select>}
                    
                  </td>
                  <td className="border px-4 py-2">
                    {pet.type}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      <Link to={`/pet/edit/${pet.id}`} className="rounded-sm px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white text-xs">Edit</Link>
                      <Link to={`/pet/show/${pet.id}`} className="rounded-sm px-2 py-1 bg-yellow-500 hover:bg-yellow-700 text-white text-xs">Show</Link>
                      <button onClick={() => handleDelete(pet.id)} className="rounded-sm px-2 py-1 bg-red-500 hover:bg-red-700 text-white text-xs">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
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
