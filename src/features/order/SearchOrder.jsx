import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
   const [query, setQuery] = useState('');
   const navigate = useNavigate();

   function handleSumbit(e){
      e.preventDefault();
      if(!query) return ;
      navigate(`/order/${query}`)
      setQuery("");

   }
  return (
     <form onSubmit={handleSumbit} >
      <input className="sm:w-64 rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring-yellow-500 focus:ring-opacity-50"value={query} onChange={e => setQuery(e.target.value)} placeholder="Search order #" />
   </form>
  )
}

export default SearchOrder
