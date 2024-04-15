import React from 'react'

function Dropdowns({currencies,currency,setCurrency,title=""}) {
  
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <div className='mt-1 relative'>
        <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className='w-full p-2 border border-gray-200 rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:cursor-pointer'>
            {currencies.map(currency=>{
                return <option value={currency} key={currency}>{currency}</option>
            })}
        </select>
      </div>
    </div>
  )
}

export default Dropdowns
