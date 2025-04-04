import { useEffect, useState } from "react";
import close from "../assets/images/close.png";
import Attributes from "./Buttons/Attributes";

const PetSelectionModal = ({
  modal,
  setModal,
  pets,
  setPets,
  selectedPets,
  setSelectedPets,
  value,
  setValue
}) => {
  const [Fly, setFly] = useState(false);
  const [Ride, setRide] = useState(false);
  const [Normal, setNormal] = useState(true);
  const [Neon, setNeon] = useState(false);
  const [Mega, setMega] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState(""); // or "Pet" if you want default selected

  const fetchData = async ( search = '') => {
    try {
      console.log(type)
      const response = await fetch(`/api/pets?paginate=false&search=${search}&type=${type}`);
      const data = await response.json();
      console.log(data)
      setPets(data);
      setPagination({ current_page: data.current_page, last_page: data.last_page });
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm, type]); // 👈 include `type` here  

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

  const PetClicked = async (pet) => {
    try {
      let response = null;

      if (pet.type === 'Pet') {
        const type = Normal ? 'normal' : (Neon ? 'neon' : (Mega ? 'mega' : ''));
        const attribute = Fly ? (Ride ? 'fly_ride' : "fly") : Ride ? 'ride' : 'no_potion';
        response = await fetch(`/api/pets/${pet.id}/getValue?type=${type}&attribute=${attribute}`);
      } else {
        response = await fetch(`/api/pets/${pet.id}/getValue`);
      }

      
      if (!response.ok) {
        throw new Error("Failed to fetch pet value");
      }
      
      const petValue = await response.json(); // Assuming the API returns JSON data

      setValue(parseFloat((value + petValue).toFixed(2)));
      const uniquePet = {
        ...pet,
        Fly, // Use API response
        Ride,
        Normal,
        Neon,
        Mega,
        uniqueid: selectedPets.length + 1,
        petValue
      };
  
      setSelectedPets((prevPets) => [...prevPets, uniquePet]);
    } catch (error) {
      console.error("Error fetching pet value:", error);
    }
  };
  

  if (!modal) {
    return null;
  }
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white p-4 sm:p-6 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Dropdown */}
          <div className="mt-4">
            <select
              name="categories"
              id="categories"
              value={type || ""}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:ring focus:ring-indigo-200"
            >
              <option value="">All</option>
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

          {/* Pet Grid */}
          <div className="mt-4 max-h-[50vh] overflow-y-auto grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 sm:gap-4 p-3">
            {pets.map((pet) => (
              <img
                key={pet.id}
                src={`/storage/${pet.image_url}`}
                alt={pet.name}
                className="w-full aspect-square object-cover rounded-md shadow-md cursor-pointer transition-transform transition-shadow duration-200 hover:shadow-[0_0_10px_4px_rgba(255,105,180,0.3)]"
                onClick={() => PetClicked(pet)}
              />
            ))}
          </div>

          {/* Attribute Buttons */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Attributes name={"Fly"} color={"bg-[#158eca]"} toggle={Fly} setToggle={setFly} />
            <Attributes name={"Ride"} color={"bg-[#f6146d]"} toggle={Ride} setToggle={setRide} />
            <Attributes name={"Normal"} color={"bg-[#ff6766]"} toggle={Normal} setToggle={() => handleToggle("Normal")} />
            <Attributes name={"Neon"} color={"bg-[#439c25]"} toggle={Neon} setToggle={() => handleToggle("Neon")} />
            <Attributes name={"Mega"} color={"bg-[#4d12bd]"} toggle={Mega} setToggle={() => handleToggle("Mega")} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default PetSelectionModal;
