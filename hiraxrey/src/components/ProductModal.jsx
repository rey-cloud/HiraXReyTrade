import React from "react";

const ProductModal = ({ product, mainImage, setMainImage, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Images */}
          <div>
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-64 object-contain rounded"
            />
            <div className="flex mt-2 gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 object-contain border rounded cursor-pointer hover:ring-2 ${
                    img === mainImage ? "ring-2 ring-orange-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl font-bold text-orange-500 mb-4">
              {product.price}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
