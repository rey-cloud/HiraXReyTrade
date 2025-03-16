import { useState } from "react";
import close from "../assets/images/close.png";
import Attributes from "./Buttons/Attributes";

const PetSelectionModal = ({
  modal,
  setModal,
  pets,
  selectedPets,
  setSelectedPets,
}) => {
  const [Fly, setFly] = useState(false);
  const [Ride, setRide] = useState(false);
  const [Normal, setNormal] = useState(true);
  const [Neon, setNeon] = useState(false);
  const [Mega, setMega] = useState(false);

  const handleToggle = (type) => {
    if (type === "Normal") {
      setNormal(true);
      setNeon(false);
      setMega(false);
    } else if (type === "Neon") {
      setNeon(true);
      setNormal(false);
      setMega(false);
    } else if (type === "Mega") {
      setMega(true);
      setNormal(false);
      setNeon(false);
    }
  };

  const PetClicked = (pet) => {
    const uniquePet = {
      ...pet,
      Fly,
      Ride,
      Normal,
      Neon,
      Mega,
      uniqueid: selectedPets.length + 1,
    };
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
            <Attributes
              name={"Fly"}
              color={"bg-[#158eca]"}
              toggle={Fly}
              setToggle={setFly}
            />
            <Attributes
              name={"Ride"}
              color={"bg-[#f6146d]"}
              toggle={Ride}
              setToggle={setRide}
            />
            <Attributes
              name={"Normal"}
              color={"bg-[#ff6766]"}
              toggle={Normal}
              setToggle={() => handleToggle("Normal")}
            />
            <Attributes
              name={"Neon"}
              color={"bg-[#439c25]"}
              toggle={Neon}
              setToggle={() => handleToggle("Neon")}
            />
            <Attributes
              name={"Mega"}
              color={"bg-[#4d12bd]"}
              toggle={Mega}
              setToggle={() => handleToggle("Mega")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetSelectionModal;
