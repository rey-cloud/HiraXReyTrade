import close from "../assets/images/close.png";

const PetSelectionModal = ({
  modal,
  setModal,
  pets,
  selectedPets,
  setSelectedPets,
}) => {
  const PetClicked = (pet) => {
    const uniquePet = { ...pet, uniqueid: selectedPets.length + 1 }; // Add unique ID
    setSelectedPets((prevPets) => [...prevPets, uniquePet]);
  };

  if (!modal) {
    return null;
  }
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 w-full max-w-lg mx-auto rounded-lg shadow-lg">
          {/* Close button */}
          <div className="flex justify-end">
            <button onClick={() => setModal(false)}>
              <img src={close} alt="Close" className="h-6 w-6" />
            </button>
          </div>

          {/* Search input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Dropdown */}
          <div className="mt-4">
            <select
              name="categories"
              id="categories"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200"
            >
              <option value="pets">Pets</option>
              <option value="eggs">Eggs</option>
              <option value="vehicles">Vehicles</option>
              <option value="petWear">Pet Wear</option>
            </select>
          </div>

          {/* Images (Scrollable Container) */}
          <div className="mt-4 max-h-96 overflow-y-auto grid grid-cols-4 gap-4">
            {pets.pets.map((pet) => (
              <img
                key={pet.id} // Always provide a unique key when mapping
                src={`http://127.0.0.1:8000/storage/${pet.image_url}`}
                alt={pet.name} // Add an alt attribute for accessibility
                className="w-80% h-80% object-cover rounded-md shadow"
                onClick={() => PetClicked(pet)}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Fly
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Ride
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Normal
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              Neon
            </button>
            <button className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
              Mega
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSelectionModal;
