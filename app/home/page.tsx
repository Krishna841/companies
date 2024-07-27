'use client';
import React, { useState } from 'react'

import Sidebar from './sidebar'
import Data from './Data'

const Home = () => {
    const [viewData, setViewData] = useState(false);
  return (
    <div className='w-full h-full flex flex-col'>     
      <div className=' w-full h-[20%] p-4 flex justify-center items-center bg-[#d5d6fb]'>
        Lookup a Company!
        </div>
        <div className='flex w-full h-[80%]'>
        <Sidebar setViewData={setViewData} />
        <div className={`${viewData ? 'block' : 'hidden'}`}>
            <Data/>
        </div>
        </div>

    </div>
  )
}

export default Home
