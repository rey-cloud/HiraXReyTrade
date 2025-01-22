const Empty = ({ index }) => {
  return (
    <div
      className="border-[1px] border-slate-500 min-h-[75px]"
      onClick={() => console.log(`Clicked on index: ${index}`)}
    ></div>
  );
};

export default Empty;
