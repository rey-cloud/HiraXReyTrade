const PetChosen = ({ selectedPet, setSelectedPets }) => {
  // Define the function to remove a pet
  const removePet = (petToRemove) => {
    setSelectedPets((prevPets) =>
      prevPets.filter((pet) => pet.uniqueid !== petToRemove.uniqueid)
    );
  };

  return (
    <div
      className="border-[2px] border-slate-700 min-h-[75px] flex items-center"
      onClick={() => removePet(selectedPet)} // Pass the selectedPet to the removePet function
    >
      <img
        src={`http://127.0.0.1:8000/storage/${selectedPet.image_url}`}
        alt=""
        className="w-[80%] h-[80%]"
      />
    </div>
  );
};

export default PetChosen;
