import { useEffect, useState } from "react";
import axios from "axios"; // Ensure you have axios installed or use another HTTP library
import Containers from "./components/Containers";
import Chart from "./Chart";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(0);
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(0);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axios.get("/api/pets?paginate=false");
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="border-2 border-slate-500 border-opacity-50 flex justify-between h-96 mx-3 rounded-[4px] mt-10 items-center px-4 lg:px-16 lg:max-w-[800px] lg:mx-auto bg-white">
        <Containers pets={pets} setResultValue={setLeftValue}/>
        <div 
  className={`text-4xl font-bold 
    ${leftValue - rightValue > 0 ? "text-red-500" : leftValue - rightValue < 0 ? "text-green-500" : "text-gray-700"}`}
>
  {Math.abs(leftValue - rightValue)}
</div>

        <Containers pets={pets} setResultValue={setRightValue}/>
      </div>
      {/* <Chart /> */}
    </>
  );
};

export default Home;
