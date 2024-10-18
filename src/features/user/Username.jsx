import { useSelector } from "react-redux";

function Username() {
  //Getting the state from redux
  const { username } = useSelector((state) => state.user);
  if (!username) return null;
  return (
    <div className="text-sm font-semibold uppercase hidden md:block ">
      {username}
    </div>
  );
}

export default Username;
