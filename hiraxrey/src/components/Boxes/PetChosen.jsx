import Fly from "../../assets/images/Fly.png";
import Mega from "../../assets/images/Mega.png";
import Ride from "../../assets/images/Ride.png";
import Neon from "../../assets/images/Neon.png";

const PetChosen = ({ selectedPet, setSelectedPets, value, setValue }) => {
  const removePet = (petToRemove) => {
    setValue((prev) => parseFloat((prev - petToRemove.petValue).toFixed(2)));
    setSelectedPets((prevPets) =>
      prevPets.filter((pet) => pet.uniqueid !== petToRemove.uniqueid)
    );
  };
  

  return (
    <div
      className="border-4 border-pink-300 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 relative aspect-square cursor-pointer"
      onClick={() => removePet(selectedPet)}
    >
      <img
        src={`/storage/${selectedPet.image_url}`}
        alt={selectedPet.name ? `Image of ${selectedPet.name}` : "Pet image"}
        className="w-[80%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md object-contain"
      />
      {
        selectedPet.type == "Pet" ? (
          <div className="flex gap-0.5 absolute bottom-1 left-1 w-[22%]">
        {Object.entries({ Mega, Neon, Fly, Ride }).map(
          ([key, src]) =>
            selectedPet[key] && (
              <img key={key} src={src} alt={key} className="size-2 sm:size-3 md:size-4" />
            )
        )}
      </div>
        ) : ""
      }
      
    </div>
  );
};

export default PetChosen;
