import Fly from "../../assets/images/Fly.png";
import Mega from "../../assets/images/Mega.png";
import Ride from "../../assets/images/Ride.png";
import Neon from "../../assets/images/Neon.png";

const PetChosen = ({ selectedPet, setSelectedPets, value, setValue }) => {
  // Define the function to remove a pet
  const removePet = (petToRemove) => {
    setValue(value - petToRemove.petValue)
    setSelectedPets((prevPets) =>
      prevPets.filter((pet) => pet.uniqueid !== petToRemove.uniqueid)
    );
  };

  return (
    <div
      className="border-[2px] border-slate-700 flex items-center relative aspect-square"
      onClick={() => removePet(selectedPet)} // Pass the selectedPet to the removePet function
    >
      <img
        src={`/storage/${selectedPet.image_url}`}
        alt={selectedPet.name ? `Image of ${selectedPet.name}` : "Pet image"}
        className="w-[80%] h-[80%]"
      />

      <div className="flex gap-[1px] absolute bottom-[1px] left-[1px] w-[20%]">
        {Object.entries({
          Mega,
          Neon,
          Fly,
          Ride,
        }).map(([key, src]) =>
          selectedPet[key] ? (
            <img key={key} className="" src={src} alt={key} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default PetChosen;
