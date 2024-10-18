import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview.jsx"
import Header from "./Header"
import Loader from "./Loader.jsx";

function AppLayout() {
   //The useNavigation hook provides as an object that returns the loading state of the routes 
   //You can access that state by navigation.state ('idle' means it has loaded, loading means its loading)
   const navigation = useNavigation();
   // eslint-disable-next-line no-unused-vars
   const isLoading = navigation.state === 'loading';
   
  return <div className="grid h-screen  grid-rows-[auto_1fr_auto] ">
      {isLoading && (<Loader />)}

         <Header />
         <div className="overflow-y-scroll ">
            <main className="max-w-3xl  mx-auto ">            
               <Outlet/> 
            </main>
         </div>

         <CartOverview/>
   </div>
}

export default AppLayout
