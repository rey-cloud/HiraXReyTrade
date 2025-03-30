import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function PetEdit() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [preview, setPreview] = useState("");
  const [values, setValues] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/pets/${id}`);
        if (!response.ok) throw new Error("Failed to fetch pet.");
        const data = await response.json();

        setName(data.name);
        setCurrentImage(`/storage/${data.image_url}`);
        const filledValues = data.pet_values.map((val) => ({
          type: val.type,
          attribute: val.attribute,
          value: val.value,
        }));
        setValues(filledValues);
      } catch (error) {
        console.error("Error fetching pet:", error);
        setMessage("Failed to load pet data.");
      }
    };

    fetchPet();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleValueChange = (index, val) => {
    const updated = [...values];
    updated[index].value = val;
    setValues(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image_url", image);
    formData.append("values", JSON.stringify(values));
    formData.append("_method", "PUT");
  
    try {
      const response = await fetch(`http://localhost:8000/api/pets/${id}`, {
        method: "POST",
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
  
      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          setErrors(errorData.errors || {});
        } else {
          setMessage("Error updating pet.");
        }
        return;
      }
  
      const data = await response.json();
      setMessage(data.message || "Pet updated successfully.");
      navigate("/pets");
    } catch (error) {
      console.error("Request failed:", error);
      setMessage("Error updating pet.");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="p-6 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Edit Pet</h2>

        {message && <div className="mb-4 text-green-600">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Pet Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name[0]}</div>}
          </div>

          <div>
            <label className="block font-medium">Update Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            <div className="mt-2">
              {preview ? (
                <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded border" />
              ) : currentImage ? (
                <img src={currentImage} alt="Current Pet" className="w-40 h-40 object-cover rounded border" />
              ) : (
                <p className="text-sm text-gray-500">No image available</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Values</label>
            <div className="space-y-2">
              {values.map((val, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <div className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">{val.type}</div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">{val.attribute}</div>
                  <input
                    type="number"
                    placeholder="Value"
                    value={val.value}
                    required
                    onChange={(e) => handleValueChange(idx, e.target.value)}
                    className="px-2 py-1 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
            >
              Update Pet
            </button>
            <button
              type="button"
              onClick={() => navigate("/pets")}
              className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetEdit;
