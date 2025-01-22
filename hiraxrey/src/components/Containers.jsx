import { useEffect, useState } from "react";
import "./Container.css";
import PetSelectionModal from "./PetSelectionModal";
import Plus from "./Boxes/Plus";
import Empty from "./Boxes/Empty";
import PetChosen from "./Boxes/PetChosen";

const Containers = (pets) => {
  const [gridNum, setGridNums] = useState(9);
  const [modal, setModal] = useState(false);
  const [selectedPets, setSelectedPets] = useState([]);
  useEffect(() => {
    if (selectedPets.length < 10 && selectedPets.length > 8) {
      setGridNums(12);
    } else if (selectedPets.length < 9) {
      setGridNums(9);
    } else if (selectedPets.length < 12) {
      setGridNums(12);
    } else if (selectedPets.length < 15) {
      setGridNums(15);
    } else if (selectedPets.length < 13 && selectedPets.length > 11) {
      setGridNums(15);
    } else if (selectedPets.length < 16 && selectedPets.length > 14) {
      setGridNums(18);
    } else if (selectedPets.length >= 18) {
      setModal(false);
    }
  }, [selectedPets]);

  return (
    <>
      <div className="flex flex-col items-center w-[40%] ">
        <div className="text-center text-3xl font-bold mb-2">0</div>
        <div className="w-full h-60 grid grid-cols-3 overflow-y-auto overflow-x-hidden gap-1 custom-scrollbar">
          {Array.from({ length: gridNum }).map((_, index) =>
            index < selectedPets.length ? (
              <PetChosen
                key={index}
                selectedPet={selectedPets[index]}
                setSelectedPets={setSelectedPets}
              />
            ) : index === selectedPets.length ? (
              <Plus key="plus-button" setModal={setModal} />
            ) : (
              <Empty key={index} index={index} />
            )
          )}
        </div>
      </div>
      <PetSelectionModal
        modal={modal}
        setModal={setModal}
        pets={pets}
        selectedPets={selectedPets}
        setSelectedPets={setSelectedPets}
      />
    </>
  );
};

export default Containers;
