const Attributes = ({ name, color, toggle, setToggle }) => {
  const TogglePetAttribute = () => {
    setToggle(!toggle);
  };

  return (
    <button
      className={`px-4 py-2 ${
        toggle ? color : "bg-gray-600"
      } text-white rounded-md hover:opacity-80 `}
      onClick={() => TogglePetAttribute()}
    >
      {name}
    </button>
  );
};

export default Attributes;
