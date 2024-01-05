import React from 'react'
import styles from '../styles/Home.module.css'

function Pro({title, type, onClick, name, color}) {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className={styles.accPostTwo}>
        <div>
        <div className="p-3 border-b border-[#20293a] w-full justify-between flex">
        <p className="text-blue-300 font-semibold">{type}</p>
       
        </div>
        
          <p className=" p-3 text-md text-[#c3cee0] text-sm">
          {title}
          </p>
          <div className="w-full flex justify-between border-[#20293a] border-t p-3">
          <div className="flex items-center">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></div>
                <p className="text-gray-400 text-xs ml-2">{name}</p>
            </div>
          <div onClick={onClick} className="text-sm bg-blue-500 p-2 rounded-lg w-16 justify-center items-center flex cursor-pointer hover:bg-blue-600">Add</div>   
          </div>
       
        </div>
       
      </div>
    </div>
  )
}

export default Pro



