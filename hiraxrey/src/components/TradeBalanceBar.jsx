import { FaHeart } from "react-icons/fa";

const TradeBalanceBar = ({ leftValue, rightValue }) => {
  const total = leftValue + rightValue;
  const leftPercent = total > 0 ? (leftValue / total) * 100 : 50;
  const rightPercent = 100 - leftPercent;

  const getStatus = () => {
    if (leftValue > rightValue) return "🥺 You’re over!";
    if (leftValue < rightValue) return "🎉 You win!";
    return "🤝 Fair trade!";
  };

  return (
    <div className="w-full max-w-[800px] mx-auto text-center mt-6">
      <div className="text-pink-500 font-bold text-xl sm:text-2xl mb-2 flex justify-center items-center gap-2">
        <FaHeart className="text-red-400 animate-bounce" />
        {getStatus()}
        <FaHeart className="text-red-400 animate-bounce" />
      </div>

      <div className="relative w-full h-10 bg-pink-100 rounded-full overflow-hidden shadow-md border-2 border-pink-200">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm sm:text-base font-bold flex items-center justify-center rounded-l-full transition-all duration-500 ease-in-out"
          style={{ width: `${leftPercent}%` }}
        >
          🐾 {leftValue.toFixed(2)}
        </div>
        <div
          className="h-full bg-gradient-to-l from-cyan-300 to-blue-400 text-white text-sm sm:text-base font-bold flex items-center justify-center rounded-r-full transition-all duration-500 ease-in-out"
          style={{ width: `${rightPercent}%` }}
        >
          {rightValue.toFixed(2)} 🐾
        </div>
      </div>
    </div>
  );
};

export default TradeBalanceBar;
