import Containers from "./components/Containers";
import Chart from "./Chart";

const Home = () => {
  return (
    <>
      <div className="border-2 border-slate-500 border-opacity-50 flex justify-between h-96 mx-3 rounded-[4px] mt-10 items-center px-4 lg:px-16 lg:max-w-[800px] lg:mx-auto bg-white">
        <Containers />
        <div className="text-4xl ">0</div>
        <Containers />
      </div>
      <Chart />
    </>
  );
};

export default Home;
