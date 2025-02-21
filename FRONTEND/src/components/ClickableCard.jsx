import React from 'react'

function ClickableCard({ type, icon, onClick, url }) {
    return (
        <div onClick={() => {
            onClick(url)
        }} className="p-7 flex items-center justify-center gap-6 cursor-pointer
 shadow-orange-100 shrink-0 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <img className='h-15 w-12' src={icon} alt="icon" />
            <p className="text-gray-100 font-semibold">{type}</p>
        </div>
    )
}

export default ClickableCard