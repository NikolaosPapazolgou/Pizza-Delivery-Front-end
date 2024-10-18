import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem.jsx";
function Menu() {
  //Is a custom hook that provides the loaded data
  //Its a convention feature of the react router when we declare it in a
  //imperatiave way
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2 ">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
//It's a function loader that is passed in the Menu route as a loader
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
