import { Cloud, Code2, Megaphone, ShieldCheck, Smartphone } from "lucide-react"


function CategoriesBox() {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 m-5 justify-center  gap-3 cursor-pointer'>
        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <Smartphone size={50} className='bg-blue-300 text-blue-600 rounded-full p-2'/>
            <h1 className='font-semibold text-lg'>Mobile Development</h1>
        </div>
        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <ShieldCheck size={50} className='bg-green-300 text-green-700 rounded-full p-2'/>
            <h1 className='font-semibold text-lg'>Cyber Security</h1>
        </div>
        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <Cloud size={50} className='bg-orange-300 text-orange-600 rounded-full p-2'/>
            <h1 className='font-semibold text-lg'>Cloud</h1>
        </div>
        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <Megaphone size={50} className='bg-violet-300 text-violet-800 rounded-full p-2'/>
            <h1 className='font-semibold text-lg'>Marketing</h1>
        </div>
        <div className='flex bg-whitesmoke rounded-xl shadow-2xl border border-gray-200 items-center p-2  gap-3 hover:scale-105 hover:shadow-xl transition-all duration-150'>
            <Code2 size={50} className='bg-pink-300 text-pink-600 rounded-full p-2'/>
            <h1 className='font-semibold text-lg'>Programming</h1>
        </div>
    </section>
  )
}

export default CategoriesBox
