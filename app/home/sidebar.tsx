'use client';
import React from 'react'

const Sidebar = ( {setViewData}: any) => {
  return (
    <div className='w-[10%] h-[95vh] bg-[#575cee] text-white flex items-start justify-center'>
      <button onClick={() => setViewData(true)}>View Data</button>
    </div>
  )
}

export default Sidebar
