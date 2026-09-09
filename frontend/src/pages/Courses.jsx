import { useEffect, useState } from 'react'
import MainLayout from "../layout/MainLayout"
import CoursesBox from '../components/CoursesBox'
import FilterBar from '../components/FilterBar'
import { ArrowLeft, ArrowRight, MenuIcon } from 'lucide-react'
import { getCourses } from "../api/courseApi"



function Courses() {

    const [showFilter, setShowFilter] = useState(false);
    const [courses, setCourses] = useState([]);
    const[pageCount, setPageCount]=useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const[category, setCategory] = useState("");
    const[level,setLevel] = useState("");
    const[page, setPage] = useState(1);

    const [debounceSearch, setDebounceSearch] = useState("");

    const handlePrivious = () => {
      if(page>1){
      setPage(page-1);
      
      }
    }

    const handleNext = () => {
      if(page < pageCount?.totalPages){
        setPage(page+1);
        
      }
    }

    let start = Math.max(1, page -1);
    let end = Math.min(pageCount.totalPages, start +3);

    if(end - start < 3){
      start = Math.max(1, end -3);
    }

    const limit = 9;

    const startCourse = (page -1) * limit + 1;

    const endCourse = Math.min(page * limit, pageCount.totalCourse)

    useEffect(()=>{
      const timer = setTimeout(() => {
        setDebounceSearch(search)
      }, 500);

      return ()=>clearTimeout(timer);
    },[search]);


    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCourses({
          search, category,
          level, page,
        });

        setCourses(data.courses);
        setPageCount(data)

      } catch (error) {
        console.log(error);
        setError("Failed to load courses please try again");
      } finally{
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchCourses();
    },[search, category, level, page]);


  return (
    <MainLayout search={search} setSearch={setSearch}>

      <div className='flex flex-col gap-3 bg-gray-100 justify-center items-center h-25'>
        <h1 className='text-3xl font-bold  items-center justify-center'>All Courses</h1>
        <p>Explore our wide range of courses and find the perfect one for you</p>
      </div>


      <div className='flex gap-6 px-6 py-6'>
        <aside className='w-60 shrink-0 hidden lg:block'>
          <FilterBar category={category} setCategory={setCategory} level={level} setLevel={setLevel}/>
        </aside>

        <main className='flex-1 min-w-0'>
          <div className='flex justify-between items-center mb-5'>
            <div className='flex gap-5 items-center'>

              <button onClick={() => setShowFilter(!showFilter)} className='lg:hidden shadow-2xl border border-gray-200 bg-white  px-2 py-2 rounded-lg'>
                <MenuIcon/>
              </button>
            
            <p>showing {startCourse}-{endCourse} of {pageCount?.totalCourse} courses</p>
            </div>

            
          </div>

          {showFilter && (
            <div className='lg:hidden mb-5'>
              <FilterBar category={category} setCategory={setCategory} level={level} setLevel={setLevel}/>
            </div>
          )}

          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 justify-center  gap-3'>

            {loading ? (
              <p className='justify-center items-center'>loading courses</p>
            ) : error ? (
              <div>
              <p className='text-red-600'>{error}</p>
              <button onClick={fetchCourses} className='justify-center items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg'>Retry</button>
              </div>
            ) : courses.length === 0 ? (
              <p >No courses found...</p>
            ) : (   
            courses?.map((item) => (
              <CoursesBox courses={item} key={item._id} enrolled={false} type={"courses"}/>
             ))
             )}
          </div>
        </main>
      </div>

      <div className='flex flex-row justify-center items-center m-6 space-x-2.5'>
        <button disabled={page === 1} onClick={handlePrivious} className='flex items-center gap-1 rounded-xl shadow-xl p-1.5 border border-gray-100 text-sm font-semibold hover:scale-110 cursor-pointer'><ArrowLeft size={15}/>prev</button>

        {Array.from({length: end- start + 1}, (_, index) => start+index).map((pageNumber) => (
         <button key={pageNumber} onClick={()=>setPage(pageNumber)} className={`${pageCount.currentPage === pageNumber ? "bg-blue-600 text-white" : ""} rounded-xl shadow-xl p-1.5 border border-gray-100 text-sm font-semibold hover:scale-110 cursor-pointer`}>{pageNumber}</button>
        ))}
  
        <button disabled={page === courses?.totalPages} onClick={handleNext} className='flex items-center gap-1 rounded-xl shadow-xl p-1.5 border border-gray-100 text-sm font-semibold hover:scale-110 cursor-pointer'>Next<ArrowRight size={15}/></button>
      </div>

    </MainLayout>
  )
}

export default Courses
