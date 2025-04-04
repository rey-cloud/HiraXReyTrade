import { useEffect, useState } from "react";
import axios from "axios";
import Containers from "./components/Containers";
import { RotateLoader } from "react-spinners";
import Navbar from "../src/components/navbar";
import TradeBalanceBar from "./components/TradeBalanceBar";
import { FaBalanceScale } from "react-icons/fa";

const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br  font-sans">
      <Navbar />

      <TradeBalanceBar leftValue={leftValue} rightValue={rightValue} />

      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <RotateLoader color="#f472b6" />
        </div>
      ) : (
        <div className="flex justify-center mt-8 from-pink-50 via-rose-100 to-purple-100 px-2">
          <div className="w-full max-w-[900px] rounded-3xl border-4 border-rose-200 bg-white shadow-xl p-4 sm:p-6 flex items-center justify-between gap-4">
            <Containers
              pets={pets}
              setPets={setPets}
              setResultValue={setLeftValue}
            />

            <div className="text-4xl font-bold text-rose-400 hidden sm:block">
              <FaBalanceScale />
            </div>

            <Containers
              pets={pets}
              setPets={setPets}
              setResultValue={setRightValue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
