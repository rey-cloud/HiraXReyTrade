import "./Container.css";

const Containers = () => {
  return (
    <div className="flex flex-col items-center w-[40%] ">
      <div className="text-center text-3xl font-bold mb-2">0</div>
      <div className="w-full h-60 grid grid-cols-3 overflow-y-auto overflow-x-hidden gap-1 custom-scrollbar">
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
        <div className="border-[1px] border-slate-500 min-h-[75px]"></div>
      </div>
    </div>
  );
};

export default Containers;
