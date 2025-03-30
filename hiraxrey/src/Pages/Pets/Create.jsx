import { useState } from "react";
import Sidebar from '../../components/Sidebar';
import { useNavigate } from "react-router-dom";

function PetCreate() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const presets = [
    { type: "normal", attribute: "no_potion" },
    { type: "normal", attribute: "fly" },
    { type: "normal", attribute: "ride" },
    { type: "normal", attribute: "fly_ride" },
    { type: "neon", attribute: "no_potion" },
    { type: "neon", attribute: "fly" },
    { type: "neon", attribute: "ride" },
    { type: "neon", attribute: "fly_ride" },
    { type: "mega", attribute: "no_potion" },
    { type: "mega", attribute: "fly" },
    { type: "mega", attribute: "ride" },
    { type: "mega", attribute: "fly_ride" },
  ];

  const [values, setValues] = useState(
    presets.map((preset) => ({ ...preset, value: "" }))
  );

  const handleValueChange = (index, val) => {
    const updated = [...values];
    updated[index].value = val;
    setValues(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image_url", image);
    formData.append("values", JSON.stringify(values));

    try {
      const response = await fetch("http://localhost:8000/api/pets", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setMessage("Error creating pet.");
        return;
      }

      const data = await response.json();
      setMessage(data.message);
      navigate('/pets');
    } catch (error) {
      console.error("Request failed:", error);
      setMessage("Error creating pet.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-4">Create a Pet</h1>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Pet Name:</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pet Image (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">Values:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                  <div className="p-2 bg-gray-100 rounded text-sm text-gray-700 text-center">{val.type}</div>
                  <div className="p-2 bg-gray-100 rounded text-sm text-gray-700 text-center">{val.attribute}</div>
                  <input
                    type="number"
                    placeholder="Value"
                    value={val.value}
                    required
                    onChange={(e) => handleValueChange(idx, e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate('/pets')}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetCreate;
