import plusIcon from "../../assets/images/plus.png";

const Plus = ({ setModal }) => {
  const handlePlusClick = () => {
    setModal(true); // Show the modal
  };

  return (
    <button
      className="border-[1px] border-slate-500 flex justify-center items-center shadow-sm shadow-black aspect-square"
      onClick={() => handlePlusClick()}
    >
      <img src={plusIcon} alt="Plus Icon" className="w-1/2 h-1/2" />
    </button>
  );
};

export default Plus;
