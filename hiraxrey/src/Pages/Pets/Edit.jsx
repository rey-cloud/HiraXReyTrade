import { useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from "react-router-dom";

function PetEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Pet");
  const [singleValue, setSingleValue] = useState("");
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });
  

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

  useEffect(() => {
    // Load pet data
    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/pets/${id}`);
        const data = await response.json();
        setName(data.name);
        setType(data.type);
        if (data.image_url) setPreview( data.image_url);

        if (data.type === "Pet") {
          const incomingValues = presets.map((preset) => {
            const match = data.values?.find(
              (v) => v.type === preset.type && v.attribute === preset.attribute
            );
            return {
              ...preset,
              value: match ? match.value : "",
            };
          });
          setValues(incomingValues);
        } else {
          setSingleValue(data.value);
        }
      } catch (error) {
        console.error("Error loading pet:", error);
        setMessage("Failed to load pet.");
      }
    };

    fetchPet();
  }, [id]);

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
    if (type === "Pet") {
      formData.append("values", JSON.stringify(values));
    } else {
      formData.append("value", singleValue);
    }
    formData.append("type", type);
    formData.append("_method", "PUT"); // for Laravel PUT override

    try {
      const response = await fetch(`/api/pets/${id}`, {
        method: "POST", // Laravel handles PUT via POST + _method
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setMessage("Error updating pet.");
        return;
      }

      const data = await response.json();
      setMessage(data.message);
      navigate('/pets');
    } catch (error) {
      console.error("Request failed:", error);
      setMessage("Error updating pet.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full transition-all duration-300 ${
        isOpen ? "md:ml-64" : "ml-20"
      }`}>
        <h1 className="text-2xl font-bold mb-4">Edit Pet</h1>
        {message && <div className="mb-4 text-red-600">{message}</div>}
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
                  src={preview.startsWith("blob:") ? preview : `/storage/${preview}`}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Pet">Pet</option>
              <option value="Pet Wear">Pet Wear</option>
              <option value="Stroller">Stroller</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Toy">Toy</option>
              <option value="Gift">Gift</option>
              <option value="Wing">Wing</option>
              <option value="Sticker">Sticker</option>
              <option value="Food">Food</option>
              <option value="Egg">Egg</option>
            </select>
          </div>

          {type === "Pet" ? (
            <div>
              <label className="block mb-2 font-medium">Values:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((val, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                    <div className="p-2 bg-gray-100 rounded text-sm text-center">
                      {val.type}
                    </div>
                    <div className="p-2 bg-gray-100 rounded text-sm text-center">
                      {val.attribute}
                    </div>
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
          ) : (
            <div>
              <label className="block mb-1 font-medium">Value:</label>
              <input
                type="number"
                placeholder="Enter value"
                value={singleValue}
                required
                onChange={(e) => setSingleValue(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <div className="space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate('/pets')}
              className="bg-red-600 text-white px-4 py-2 rounded"
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
