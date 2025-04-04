import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'

const Index = () => {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });
  
  return (
    <div className='flex'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`p-6 transition-all duration-300 ${
        isOpen ? "md:ml-64" : "ml-20"
      }`}>
        this is ur profile
      </div>
    </div>
  )
}

export default Index