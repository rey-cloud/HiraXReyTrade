import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import { CiFilter } from "react-icons/ci";
import starpets from "../../assets/images/starpets.jpg"
import { CiSearch } from "react-icons/ci";

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
  return (
    <>
    <Navbar />
    <div className='grid grid-cols-12 h-[90vh] bg-slate-100'>
        <div className=' col-span-2 text-sm border-r-2 hidden bg-red-400' >
            <div className='flex items-center justify-between h-[5vh] border-b-2 px-1'>
                <div className='flex items-center space-x-1'>
                    <div className='font-semibold'>Filters</div>
                    <div className='py-[1px] px-1 bg-slate-300 h-fit rounded text-xs text-slate-600'>0</div>
                </div>
                <div>
                    Reset
                </div>
            </div>

            <div className='p-3 text-xs text-slate-400'>
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
                            className="no-spinner bg-transparent outline-none w-full text-gray-700"
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
                            className="no-spinner bg-transparent outline-none w-full text-gray-700"
                            />
                        </div>
                    </div>
                </FilterSection>

                <FilterSection title="Properties">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                            <span className="text-gray-500 mr-1">$</span>
                            <input
                            type="number"
                            placeholder="0.00"
                            className="bg-transparent outline-none w-full text-gray-700"
                            />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="flex items-center bg-gray-100 rounded px-2 py-1 w-full">
                            <span className="text-gray-500 mr-1">$</span>
                            <input
                            type="text"
                            value="∞"
                            disabled
                            className="bg-transparent outline-none w-full text-gray-400"
                            />
                        </div>
                    </div>
                </FilterSection>
            </div>
        </div>
        <div className=' col-span-12 h-full'>
            <div className=' p-1 grid-rows-2 flex flex-col gap-1'>
                <img src={starpets} alt="" className='rounded-md'/>
                
                <div className='grid grid-cols-8 gap-1'>
                    <div className="relative col-span-7">
                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none"
                            placeholder="Search..."
                        />
                    </div>

                    <div className='bg-white border rounded-md flex items-center justify-center'>
                    <CiFilter className=' size-5 '/>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[80vh]grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2 max-h-[80vh] overflow-y-auto">
                    {[...Array(8)].map((_, i) => (
                        <div
                        key={i}
                        className="bg-white rounded-xl shadow border p-3 flex flex-col items-center justify-between"
                        >
                        <img
                            src="/your-image-path.png" // Replace with actual item image
                            alt="Item"
                            className="h-20 object-contain mb-2"
                        />
                        <h3 className="text-sm font-semibold text-center">Item Name</h3>
                        <p className="text-xs font-bold text-gray-700">0.05 $</p>

                        <button className="mt-2 bg-orange-400 hover:bg-orange-500 text-white rounded-md p-2 transition-colors">
                            🛒
                        </button>
                        </div>
                    ))}
                </div>

            </div>
                    
        </div>
    </div>
    </>
  )
}

export default List