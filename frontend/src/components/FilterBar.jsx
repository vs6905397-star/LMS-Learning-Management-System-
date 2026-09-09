import React from 'react'

function FilterBar({category, setCategory, level, setLevel,}) {
  return (
    <div className='bg-white rounded-2xl p-4 shadow-2xl '>

        <div className='flex justify-between items-center mb-4'>
            <h3 className='font-semibold'>Filter By</h3>

            <button className='text-blue-600 text-sm'>Clear All</button>
        </div>

        <div className='border-b pb-4 mb-4'>
            <h4 className='font-medium mb-3'>Category</h4>
            <div className='space-y-3'>
                <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={category === ""} 
                    onChange={()=>setCategory("")}  
                     className='w-4 h-4 accent-blue-600' />
                    <span>All Categories</span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={category === "Web devlopment"} 
                    onChange={(e)=>setCategory(e.target.checked ? "Web devlopment" : "")}
                    className='w-4 h-4 accent-blue-600' />
                    <span>Web devlopment</span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={category === "Data Science"} 
                    onChange={(e)=>setCategory(e.target.checked ? "Data Science" : "")}
                    className='w-4 h-4 accent-blue-600' />
                    <span>Data Science</span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={category === "Programming"} 
                    onChange={(e)=>setCategory(e.target.checked ? "Programming" : "")} 
                     className='w-4 h-4 accent-blue-600' />
                    <span>Programming</span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={category === "Design"} 
                    onChange={(e)=>setCategory(e.target.checked ? "Design" : "")} 
                    className='w-4 h-4 accent-blue-600' />
                    <span>Design</span>
                </label>

                <label className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={category === "others"} 
                     onChange={()=>setCategory("")}
                     className='w-4 h-4 accent-blue-600' />
                    <span>others</span>
                </label>
            </div>
        </div>

        <div className='border-b pb-4 mb-4'>
            <h4 className='font-medium mb-3'>Level</h4>
            <div className='space-y-3'>
                {["All","Biginner", "Intermediate", "Advanced"].map((item) => (
                     <label key={item} className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" checked={item==="All" ? level === "" : level===item} 
                    onChange={()=>item==="All"?setLevel(""):setLevel(item)}
                    className='w-4 h-4 accent-blue-600' />
                    <span>{item}</span>
                </label>
                ))}
            </div>
        </div>

        <div className='border-b pb-4 mb-4'>
            <h4 className='font-medium mb-3'>Price</h4>
            <div className='space-y-3'>
                {["All ", "Free", "Paid"].map((price) => (
                     <label key={price} className='flex items-center gap-2 cursor-pointer'>
                    <input type="checkbox" className='w-4 h-4 accent-blue-600' />
                    <span>{price}</span>
                </label>
                ))}
            </div>
        </div>
    </div>
   )
}

export default FilterBar
