import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { CiFilter, CiSearch } from "react-icons/ci";
import Banner from "../../assets/images/Banner.png";
import Thumbnail from "../../assets/images/Thumbnail.jpg";
import ProductModal from "../../components/ProductModal";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4">
      <button
        className="w-full text-left text-gray-700 font-medium flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

const List = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const sampleImages = [
    Thumbnail,
    Thumbnail,
    Thumbnail,
    Thumbnail,
    Thumbnail,
    Thumbnail,
    Thumbnail,
  ];

  const handleCardClick = () => {
    const product = {
      name: "Item Name",
      price: "0.05 $",
      description: "This is a detailed description of the item.".repeat(10),
      images: sampleImages,
    };
    setSelectedProduct(product);
    setMainImage(sampleImages[0]);
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 h-[90vh] bg-slate-100 relative">
        {/* Overlay for mobile sidebar */}
        {openFilter && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
            onClick={() => setOpenFilter(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            text-sm border-r-2 bg-white z-50
            absolute top-0 left-0 w-3/4 h-full
            md:static md:col-span-2 md:block md:w-full
            ${openFilter ? "block" : "hidden"}
          `}
        >
          <div className="flex items-center justify-between h-[5vh] border-b-2 px-1">
            <div className="flex items-center space-x-1">
              <div className="font-semibold">Filters</div>
              <div className="py-[1px] px-1 bg-slate-300 h-fit rounded text-xs text-slate-600">
                0
              </div>
            </div>
            <div className="cursor-pointer">Reset</div>
          </div>

          <div className="p-3 text-xs text-slate-400">
            <FilterSection title="Price">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="no-spinner bg-transparent outline-none w-full text-gray-700"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="no-spinner bg-transparent outline-none w-full text-gray-400"
                  />
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Bucks">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="no-spinner bg-transparent outline-none w-full text-gray-700"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                  <span className="text-gray-500 mr-1">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="no-spinner bg-transparent outline-none w-full text-gray-400"
                  />
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Potion">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                  <input
                    type="number"
                    placeholder="0"
                    className="no-spinner bg-transparent outline-none w-full text-gray-700"
                  />
                </div>
                <span className="text-gray-400">-</span>
                <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                  <input
                    type="number"
                    placeholder="0"
                    className="no-spinner bg-transparent outline-none w-full text-gray-400"
                  />
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Properties">
              <div className="flex flex-col gap-2">
                <div className="space-x-2">
                  <input type="checkbox" />
                  <label>House</label>
                </div>
                <div className="space-x-2">
                  <input type="checkbox" />
                  <label>Pets</label>
                </div>
              </div>
            </FilterSection>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-12 md:col-span-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-2 h-[20vh] flex flex-col gap-2">
            <img
              src={Banner}
              alt="Banner"
              className="rounded-md w-full h-2/3 object-cover"
            />

            <div className="grid grid-cols-8 gap-2">
              <div className="relative col-span-7 sm:col-span-7 col-span-6">
                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none"
                  placeholder="Search..."
                />
              </div>
              <div className="col-span-1 sm:col-span-1 flex items-center justify-center bg-white border rounded-md md:hidden">
                <button
                  onClick={() => setOpenFilter(true)}
                  className="bg-white border p-2 rounded shadow"
                >
                  <CiFilter className="size-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 max-h-[70vh] overflow-y-auto">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                onClick={handleCardClick}
                className="bg-white rounded-xl shadow border p-3 flex flex-col cursor-pointer hover:shadow-lg transition"
              >
                <img
                  src={Thumbnail}
                  alt="Item"
                  className="object-contain mb-2 w-full h-40"
                />
                <h3 className="text-sm font-semibold">Item Name</h3>
                <p className="text-xs font-bold text-gray-700">0.05 $</p>
                <div className="flex justify-end">
                  <button className="mt-2 bg-orange-400 hover:bg-orange-500 text-white rounded-md p-2 transition-colors w-fit">
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              mainImage={mainImage}
              setMainImage={setMainImage}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default List;
