import Fly from "../../assets/images/Fly.png";
import Mega from "../../assets/images/Mega.png";
import Ride from "../../assets/images/Ride.png";
import Neon from "../../assets/images/Neon.png";

const PetChosen = ({ selectedPet, setSelectedPets }) => {
  // Define the function to remove a pet
  const removePet = (petToRemove) => {
    console.log("this is your selectedPet", selectedPet.Fly);
    setSelectedPets((prevPets) =>
      prevPets.filter((pet) => pet.uniqueid !== petToRemove.uniqueid)
    );
  };

  return (
    <div
      className="border-[2px] border-slate-700 flex items-center relative"
      onClick={() => removePet(selectedPet)} // Pass the selectedPet to the removePet function
    >
      <img
        src={`http://127.0.0.1:8000/storage/${selectedPet.image_url}`}
        alt=""
        className="w-[80%] h-[80%]"
      />
      <div className="flex gap-1 absolute bottom-1 right-1">
        {Object.entries({
          Mega,
          Neon,
          Fly,
          Ride,
        }).map(([key, src]) =>
          selectedPet[key] ? (
            <img key={key} className="w-4 h-4" src={src} alt={key} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default PetChosen;
