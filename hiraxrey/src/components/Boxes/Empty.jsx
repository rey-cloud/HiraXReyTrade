const Empty = ({ index }) => {
  return (
    <div
      className="border-2 border-pink-200 bg-pink-50 rounded-xl aspect-square size-auto  transition-transform duration-200 shadow-inner"
      onClick={() => console.log(`Clicked on index: ${index}`)}
    ></div>
  );
};

export default Empty;
