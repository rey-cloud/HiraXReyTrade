import { useEffect, useState } from "react";
import axios from "axios"; // Ensure you have axios installed or use another HTTP library
import Containers from "./components/Containers";
import Chart from "./Chart";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/pets");
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
        <Containers pets={pets} />
        <div className="text-4xl">0</div>
        <Containers pets={pets} />
      </div>
      <Chart />
    </>
  );
};

export default Home;
