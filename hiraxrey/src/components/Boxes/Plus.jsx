import plusIcon from "../../assets/images/plus.png";

const Plus = ({ setModal }) => {
  const handlePlusClick = () => setModal(true);

  return (
    <button
      className="border-4 border-pink-300 bg-pink-100 rounded-xl aspect-square flex justify-center items-center hover:shadow-lg transition-all duration-200 shadow-md"
      onClick={handlePlusClick}
    >
      <img src={plusIcon} alt="Plus Icon" className="w-1/2 h-1/2" />
    </button>
  );
};

export default Plus;
