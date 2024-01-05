import React from 'react'

function Consult({description, info, address, color}) {
  return (
    <div className="relative">
    <div className="mt-16 border border-[#1e294d] h-80 w-80 rounded-lg mx-4 overflow-hidden relative">
        <div className="p-3 border-b border-[#1e294d] w-full">{description}</div>
        <p className="p-3 text-md text-[#c3cee0] text-sm">
            {info.length > 300 ? `${info.substring(0, 300)}...` : info}
        </p>
        <div className="absolute bottom-0 border-t border-[#1e294d] w-full mb-1 pl-2 justify-between flex">
            <div className="flex items-center">
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color }}></div>
                <p className="text-gray-400 text-xs ml-2">{address}</p>
            </div>
            <div className="mr-2 bg-blue-700 px-5 py-2 rounded-lg mt-2 mb-2 cursor-pointer hover:bg-blue-800">Help</div>
        </div>
    </div>
</div>

  )
}

export default Consult