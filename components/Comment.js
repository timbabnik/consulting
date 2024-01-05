import React from 'react'
import styles from '../styles/Home.module.css'

function Comment({title, address, color, add, deleteComment, talk}) {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className={styles.accPost}>
        <div className="w-full">
        <div className="p-3 border-b border-[#20293a] w-full justify-end flex">
        <img onClick={deleteComment} src="https://i.postimg.cc/JnYbbQXq/3-Tvm-V8-Logo-Makr.png" className="h-6 cursor-pointer" />
        </div>
        
          <p onClick={talk} className=" p-3 text-md text-[#c3cee0] text-sm my-4">
          {title}
          </p>
          <div className="w-full flex justify-between border-[#20293a] border-t p-3">
          <div className="flex items-center">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></div>
                <p className="text-gray-400 text-xs ml-2">{address.slice(0, 4)}</p>

            </div>
          <div onClick={add} className="text-sm bg-blue-500 p-2 rounded-lg w-16 justify-center items-center flex cursor-pointer hover:bg-blue-600">Add</div>   
          </div>
       
        </div>
       
      </div>
    </div>
  )
}

export default Comment



