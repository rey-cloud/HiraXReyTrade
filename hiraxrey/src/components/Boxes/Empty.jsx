const Empty = ({ index }) => {
  return (
    <div
      className="border-[1px] border-slate-500 aspect-square size-auto"
      onClick={() => console.log(`Clicked on index: ${index}`)}
    ></div>
  );
};

export default Empty;
